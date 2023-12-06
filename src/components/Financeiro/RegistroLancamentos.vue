<template>
    <div class="container">
        <legend class="legend">Registro Financeiro</legend>

        <table class="table is-striped is-bordered is-narrow is-fullwidth ">
            <tr>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Data Pagamento</th>
                <th>Telefone</th>
                <th>Veterinário Responsável</th>
                <th>Forma de Pagamento</th>
                <th>Nota fiscal</th>   
                <th>Editar</th>    
            </tr>
            <tr v-for="registro in registros" :key="registro.id">
                <td>{{ registro.cliente }}</td>
                <td>R$ {{ registro.valor }}</td>
                <td>{{ registro.data }}</td>
                <td>{{ registro.telefone }}</td>
                <td>{{ registro.veterinario }}</td>           
                <td>{{ registro.formaPag }}</td>
                <td class="notafiscal" :class="{done: registro.notaFiscal != null, missing: registro.notaFiscal == null}">
                    <span v-if="registro.notaFiscal != null">
                        <a :href='registro.notaFiscal'><i class="fa-solid fa-up-right-from-square"></i></a>
                    </span>
                    <span v-if="registro.notaFiscal == null">Pendente</span>
                </td>
                <td class="icons">
                    <router-link :to="{ path: `/editar-registro/${registro.id}`}">
                        <ModalEditarRegistro :myId="registro.id" />
                    </router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalEditarRegistro from './ModalEditarRegistro.vue'
import registrosColRef from './firebaseRegistro'
import { getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore'

export default defineComponent({
    name: 'ListaConsultas',
    components: {
        ModalEditarRegistro
    },
    data() {
        return {
            currentDate: new Date().toISOString().substring(0,10),
            registros: [] as any,
            selectedDoc: null,
        }
    },
    methods: {
        async fetchRegistros() {
            let registrosSnapShot = await getDocs(registrosColRef);
            let registros = [] as any;

            registrosSnapShot.forEach((registro) => {
                let registroData = registro.data();
                registroData.id = registro.id;
                registros.push(registroData);
            });

            this.registros = registros;
        },
        async deleteRegistro(registroId: string|undefined) {
            let registroRef = doc(registrosColRef, registroId);
            await deleteDoc(registroRef);
            alert("Registro deletado com sucesso!");
            this.$router.push('/');
        },
    },
    created() {
        this.fetchRegistros();
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

        th:nth-child(2) {
            min-width: 100px;
        }

        th:nth-child(4) {
            min-width: 140px;
        }
        th:nth-child(6), td:nth-child(6) {
            max-width: 125px !important;
        }
        th:nth-child(7) {
            max-width: 110px !important;
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

        .link, .link:hover {
            text-decoration: none;
        }
    }

    .missing {
        background-color: lightcoral;
        font-weight: 600;
    }

    .done {
        background-color: transparent !important;
    }
</style>