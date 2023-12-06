<template>
    <div class="container">
        <legend class="legend">Lista de Pacientes</legend>

        <table class="table is-striped is-bordered is-narrow is-fullwidth ">
            <tr>
                <th>Nome Pet</th>
                <th>Cliente</th>
                <th>Telefone</th>
                <th>CPF</th>
                <th>Espécie Pet</th>
                <th>Raça</th>
                <th>Data Nasc</th>
                <th colspan="2">Opções</th>
            </tr>
            <tr v-for="paciente in pacientes" :key="paciente.id">
                <td>{{ paciente.nomePet }}</td>
                <td>{{paciente.nomeCli}}</td>
                <td>{{paciente.telefone}}</td>
                <td>{{paciente.cpf}}</td>
                <td>{{paciente.especiePet}}</td>
                <td>{{paciente.racaPet}}</td>
                <td>{{paciente.dataNasc}}</td>
                <td class="icons">
                    <router-link class="link" :to="{ path: `/editar-paciente/${paciente.id}`}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </router-link>
                </td>
                <td class="icons" @click="deletePaciente(paciente.id)"><i class="fa-solid fa-trash"></i></td>
            </tr>
        </table>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pacientesColRef from '../Pacientes/firebasePacientes'
import { getDocs, doc, deleteDoc } from 'firebase/firestore'

export default defineComponent({
    name: 'ListaPacientes',
    data() {
        return {
            pacientes: [] as any,
            selectedDoc: null
        }
    },
    methods: {
        async fetchPacientes() {
            let pacientesSnapShot = await getDocs(pacientesColRef);
            let pacientes = [] as any;
            pacientesSnapShot.forEach((paciente) => {
                let pacienteData = paciente.data();
                pacienteData.id = paciente.id;
                pacientes.push(pacienteData);
            });
            this.pacientes = pacientes;
        },
        async deletePaciente(pacienteId: string|undefined) {
            let pacienteRef = doc(pacientesColRef, pacienteId);
            await deleteDoc(pacienteRef);
            alert("Paciente deletado com sucesso!");
            this.$router.push('/');
        }
    },
    created() {
        this.fetchPacientes();
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

        td:first-child {
            max-width: 150px !important;
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
    }
</style>