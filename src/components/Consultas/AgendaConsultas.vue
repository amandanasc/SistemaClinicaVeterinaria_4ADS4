<template>
    <div class="container">
        <legend class="legend">Agendamentos de Hoje</legend>

        <table class="table is-striped is-bordered is-narrow is-fullwidth ">
            <tr>
                <th>Paciente</th>
                <th>Data Consulta</th>
                <th>Veterinário</th>
                <th>Contato</th>
                <th colspan="2">Opções</th>
            </tr>
            <tr v-for="consulta in consultas" :key="consulta.id">
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, today: consulta.data === currentDate, agendadaFirst: consulta.data > currentDate}">{{ consulta.paciente }}</td>
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, today: consulta.data === currentDate, agendadaFirst: consulta.data > currentDate}">{{ consulta.data }}</td>
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, today: consulta.data === currentDate, agendadaFirst: consulta.data > currentDate}">{{ consulta.veterinario }}</td>
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, today: consulta.data === currentDate, agendadaFirst: consulta.data > currentDate}">{{ consulta.telefone }}</td>
                <td class="icons"  :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, today: consulta.data === currentDate, agendadaFirst: consulta.data > currentDate}">
                    <router-link class="link" :to="{ path: `/editar-consulta/${consulta.id}`}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </router-link>
                </td>
                <td class="icons" @click="deleteConsulta(consulta.id)" :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, today: consulta.data === currentDate, agendadaFirst: consulta.data > currentDate}"><i class="fa-solid fa-trash"></i></td>
            </tr>
        </table>

        <legend class="legend">Próximos Agendamentos</legend>

        <table class="table is-striped is-bordered is-narrow is-fullwidth ">
            <tr>
                <th>Paciente</th>
                <th>Data Consulta</th>
                <th>Veterinário</th>
                <th>Contato</th>
                <th>Opções</th>
            </tr>
            <tr v-for="consulta in consultas" :key="consulta.id">
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, todaySecond: consulta.data === currentDate && consulta.agendamento == true, agendadaSecond: consulta.data > currentDate && consulta.agendamento == true}">{{ consulta.paciente }}</td>
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, todaySecond: consulta.data === currentDate && consulta.agendamento == true, agendadaSecond: consulta.data > currentDate && consulta.agendamento == true}">{{ consulta.data }}</td>
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, todaySecond: consulta.data === currentDate && consulta.agendamento == true, agendadaSecond: consulta.data > currentDate && consulta.agendamento == true}">{{ consulta.veterinario }}</td>
                <td :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, todaySecond: consulta.data === currentDate && consulta.agendamento == true, agendadaSecond: consulta.data > currentDate && consulta.agendamento == true}">{{ consulta.telefone }}</td>
                <td class="icons" @click="deleteConsulta(consulta.id)" :class="{finalizada: (consulta.data < currentDate) || consulta.agendamento == false || consulta.finalizado == true, todaySecond: consulta.data === currentDate && consulta.agendamento == true, agendadaSecond: consulta.data > currentDate  && consulta.agendamento == true}"><i class="fa-solid fa-trash"></i></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import consultasColRef from './firebaseConsultas'
import { getDocs, doc, deleteDoc } from "firebase/firestore"

export default defineComponent({
    name: 'AgendaConsultas',
    data() {
        return {
            currentDate: new Date().toISOString().substring(0,10),
            consultas: [] as any,
            selectedDoc: null
        }
    },
    methods: {
        async fetchConsultas() {
            let consultasSnapShot = await getDocs(consultasColRef);
            let consultas = [] as any;

            consultasSnapShot.forEach((consulta) => {
                let consultaData = consulta.data();
                consultaData.id = consulta.id;
                consultas.push(consultaData);
            });
            
            console.log(consultas);
            this.consultas = consultas;
            this.$router.push('/');
        },

        async deleteConsulta(consultaId: string|undefined) {
            let consultaRef = doc(consultasColRef, consultaId);
            await deleteDoc(consultaRef);
            alert("Consulta deletada!");

            this.$router.push('/');
        },
    },
    created() {
        this.fetchConsultas();
    }
})
</script>
<style scoped lang="scss">
    .today {
        background-color: lightgreen;
    }
    .todaySecond {
        display: none;
    }
    .agendadaSecond {
        background-color: lightpink;
    }
    .agendadaFirst {
        display: none;
    }
    .finalizada {
        display: none;
    }
    .table td:not(#relatorio, #receituario),
    .table th {
        padding: 0.6em .5em;
        vertical-align: middle;
    }
    th {
        color: #385A64 !important;
        text-align: center !important;
        max-width: none !important;
    }
    td {
        text-align: center !important;
        max-width: none !important;
    }
    i {
        color: #385A64;
        margin-left: 8px;
    }
    i:hover {
        cursor: pointer;
    }
    tr:nth-child(2n) {
        background-color: whitesmoke !important;
    }
    .link, .link:hover {
        text-decoration: none;
    }
    legend {
        font-size: 1.270rem;
        display: inline-block;
        text-align: center;
        font-weight: 600;
        background-color: #385A64;
        color: white;
        border-radius: 6px 6px 0px 0px;
        padding: 4px;
    }
</style>