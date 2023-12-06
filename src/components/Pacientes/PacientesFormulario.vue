<template>
<form class="form">
    <div class="box">

        <legend class="legend">Novo Paciente</legend>
        <div class="field">
            <div class="columns">
                <div class="column">
                    <label class="label">Nome do Pet</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome do Pet" name="nome_pet" v-model="nomePet">
                    </div>
                </div>
                
                <div class="column">
                    <label class="label">Raça do Pet</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Raça do Pet" name="raca_pet" v-model="racaPet">
                    </div>
                </div>            
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <label class="label">Espécie do Pet</label>
                <div class="control">
                    <div class="select is-normal">
                        <select class="select-especies" v-model="especiePet">
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
                    <input class="input" type="date" name="data_nasc_pet" v-model="dataNasc">
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Nome do Cliente</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome do cliente" name="nome_cliente" v-model="nomeCli">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">CPF</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="000.000.000-00" name="cpf_cliente" v-model="cpf">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Telefone</label>
                    <div class="control">
                        <input class="input" type="tel" placeholder="(00)00000-0000" name="telefone_cliente" v-model="telefone">
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link is-light has-text-dark" type="reset">Cancel</button>
            </div>
            <div class="control">
                <button class="button is-link primary" @click="EnviarDados">Cadastrar</button>
            </div>
        </div>
    </div>
</form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pacientesColRef from './firebasePacientes'
import { addDoc } from '@firebase/firestore'

export default defineComponent({
    name: 'PacientesFormulario',
    components: {
    },
    data() {
        return {
            nomePet: null,
            nomeCli: null,
            telefone: null,
            cpf: null,
            especiePet: null,
            racaPet: null,
            dataNasc: null
        }
    },
    methods: {
        EnviarDados() {
            const addedDoc = addDoc(pacientesColRef, this.$data);
            alert('Paciente inserido!');
            this.$router.push('/lista-de-pacientes');
        }
    }
})
</script>

<style lang="scss">

.form {
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
        background-color: #FF5757;
    }
    .primary:hover {
        background-color: #FF4545;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #FF5757;
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
        background-color: #FF5757;
        color: white;
        border-radius: 6px 6px 0px 0px;
        padding: 4px;
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
