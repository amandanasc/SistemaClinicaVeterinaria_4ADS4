<template>
<form class="form edit">
    <div class="box">

        <legend class="legend">Editar</legend>
        <div class="field">
            <div class="columns">
                <div class="column">
                    <label class="label">Nome do Pet</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome do Pet" name="nome_pet" v-model="pacienteInfo.nomePet">
                    </div>
                </div>
                
                <div class="column">
                    <label class="label">Raça do Pet</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Raça do Pet" name="raca_pet" v-model="pacienteInfo.racaPet">
                    </div>
                </div>            
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <label class="label">Espécie do Pet</label>
                <div class="control">
                    <div class="select is-normal">
                        <select class="select-especies" v-model="pacienteInfo.especiePet">
                            <option>Cachorro</option>
                            <option>Gato</option>
                            <option>Pássaro</option>
                            <option>Roedor</option>
                            <option>Réptil</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="column">
                <label class="label">Data Nascimento do Pet</label>
                <div class="control">
                    <input class="input" type="date" name="data_nasc_pet" v-model="pacienteInfo.dataNasc">
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Nome do Cliente</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome do cliente" name="nome_cliente" v-model="pacienteInfo.nomeCli">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">CPF</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="000.000.000-00" name="cpf_cliente" v-model="pacienteInfo.cpf">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Telefone</label>
                    <div class="control">
                        <input class="input" type="tel" placeholder="(00)00000-0000" name="telefone_cliente" v-model="pacienteInfo.telefone">
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <router-link class="link" to="/lista-de-pacientes">
                    <button class="button is-link is-light has-text-dark">Voltar</button>
                </router-link>
            </div>
            <div class="control">
                <button class="button is-link primary" @click="updatePaciente">Editar</button>
            </div>
        </div>
    </div>
</form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pacientesColRef from './firebasePacientes'
import { getDoc, doc, setDoc } from "firebase/firestore"

export default defineComponent({
    name: 'EditarPaciente',
    components: {
    },
    data() {
        return {
            selectedPaciente: {},
            pacienteId: null,
            docRef: null,
            pacienteInfo: {
                nomePet: null,
                nomeCli: null,
                telefone: null,
                cpf: null,
                especiePet: null,
                racaPet: null,
                dataNasc: null
            }
        }
    },
    methods: {
        async getPaciente(){
            let pacienteRef = doc(pacientesColRef  as any, this.pacienteId  as any) as any;
            this.docRef = pacienteRef as any;
            let paciente = await getDoc(this.docRef  as any);
            let pacienteData = paciente.data() as any;
            this.pacienteInfo.nomePet = pacienteData.nomePet;
            this.pacienteInfo.nomeCli = pacienteData.nomeCli;
            this.pacienteInfo.telefone = pacienteData.telefone;
            this.pacienteInfo.cpf = pacienteData.cpf;
            this.pacienteInfo.especiePet = pacienteData.especiePet;
            this.pacienteInfo.racaPet = pacienteData.racaPet;
            this.pacienteInfo.dataNasc = pacienteData.dataNasc;
        },
        updatePaciente() {
            setDoc(this.docRef  as any, this.pacienteInfo);
            alert(`O Paciente com o ID de ${this.pacienteId} foi atualizado com sucesso!`);
            this.$router.push("/lista-de-pacientes");
        }
    },
    created() {
        let pacienteId = this.$route.params.pacienteId;
        this.pacienteId = pacienteId as any;
        this.getPaciente();
    }
})
</script>

<style lang="scss">

.form.edit {
    padding: 10px 30px 30px 10px;
    margin: 0px;

    .select-especies {
        width: 460px;
    }

    .field.is-grouped {
        display: flex;
        justify-content: flex-end;
    }

    .primary {
        background-color: #748C93;
    }
    .primary:hover {
        background-color: #385A64;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #748C93;
    }

    .input:active, .input:focus, .is-active.input, 
    .is-active.textarea, .is-focused.input, .is-focused.textarea, 
    .select select.is-active, .select select.is-focused, .select select:active, 
    .select select:focus, .textarea:active, .textarea:focus {
        border-color: #FF726F;
        box-shadow: 0 0 0 .125em rgba(#FFAAAA,.25);
    }

    .label {
        color: #385A64;
    }

    legend {
        font-size: 1.270rem;
        display: inline-block;
        text-align: center;
        font-weight: 600;
        background-color: #748C93;
        color: white;
        border-radius: 6px 6px 0px 0px;
        padding: 4px;
    }

    .link, .link:hover {
        text-decoration: none;
    }
}

@media screen and (max-width: 768px){
   .form {
        .select-especies {
            width: 100%;
        }
    } 
}
</style>
