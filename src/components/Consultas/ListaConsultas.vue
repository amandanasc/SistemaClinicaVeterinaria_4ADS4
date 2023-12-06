<template>
    <div class="container">
        <legend class="legend">Lista de Consultas</legend>

        <table class="table is-striped is-bordered is-narrow is-fullwidth">
            <tr>
                <th>Veterinário</th>
                <th>Paciente</th>
                <th>Telefone</th>
                <th>Relatório</th>
                <th>Data Consulta</th>
                <th>Valor Consulta</th>
                <th>Internação</th>
                <th>Receituário</th>
                <th colspan="2">Opções</th>                
            </tr>
            <tr v-for="consulta in consultas" :key="consulta.id">
                <td v-if="!consulta.agendamento">{{ consulta.veterinario }}</td>
                <td v-if="!consulta.agendamento">{{ consulta.paciente }}</td>
                <td v-if="!consulta.agendamento">{{ consulta.telefone }}</td>
                <td id="relatorio" v-if="!consulta.agendamento">   
                    <ModalConsultas :content-text="consulta.relatorio" title-type="Relatório"/>
                </td>
                <td v-if="!consulta.agendamento">{{ consulta.data }}</td>
                <td v-if="!consulta.agendamento">R$ {{ consulta.valor }}</td>
                <td v-if="!consulta.agendamento">
                    <span v-if="consulta.internacao != false ">Sim</span>
                    <span v-if="consulta.internacao == false">Não</span>
                </td>
                <td id="receituario" v-if="!consulta.agendamento">
                    <ModalConsultas :content-text="consulta.receituario" title-type="Receituário"/>
                </td>
                <td class="icons" v-if="!consulta.agendamento">
                    <router-link class="link" :to="{ path: `/editar-consulta/${consulta.id}`}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </router-link>
                </td>
                <td class="icons" v-if="!consulta.agendamento" @click="deleteConsulta(consulta.id)"><i class="fa-solid fa-trash"></i></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalConsultas from './ModalConsultas.vue'
import consultasColRef from './firebaseConsultas'
import { getDocs, doc, deleteDoc } from "firebase/firestore"

export default defineComponent({
    name: 'ListaConsultas',
    components: {
        ModalConsultas
    },
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
        },
        
        async deleteConsulta(consultaId: string|undefined) {
            let consultaRef = doc(consultasColRef, consultaId);
            await deleteDoc(consultaRef);
            alert("Consulta deletada!");
        }
    },
    created() {
        this.fetchConsultas();
    }
})
</script>


<style scoped lang="scss">
    .container:not(.is-max-desktop) {
        padding: 0 25px 0 10px;
        margin-top: 25px;

        .table td,
        .table th {
            padding: 0.6em .5em;
            vertical-align: middle;
        }

        th {
            color: #385A64 !important;
            text-align: center !important;
        }

        td {
            text-align: center;
        }

        i {
            color: #385A64;
            margin-left: 8px;
        }

        i:hover {
            cursor: pointer;
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

        #receituario, #relatorio {
            text-align: center !important;
        }

        .link, .link:hover {
            text-decoration: none;
        }
    }
    
    .container:not(.is-max-desktop) {
        td:nth-child(9), td:last-child {
            text-align: center;
            max-width: 50px !important;

            i {
                margin: auto;
            }
        }
    }
</style>