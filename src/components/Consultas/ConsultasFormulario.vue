<template>
<form class="form">

    <div class="box">  
        <legend class="legend">Nova Consulta</legend>
        <div class="field">
            <div class="columns">
                <div class="column">
                    <label class="label">Veterinário Responsável</label>
                    <div class="control">
                        <div class="select is-normal">
                            <select class="select-especies" v-model="veterinario">
                                <option value="Maria Lúcia Santos">Maria Lúcia Santos</option>
                                <option value="Carlos Andrade">Carlos Andrade</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <label class="label">Pet atendido</label>
                    <div class="control select is-normal">
                        <select class="select-vet is-one-third" v-model="paciente">
                            <option v-for="pet in pets" :key="pet.id" >
                            {{ pet.nomePet }}
                            </option>
                        </select>
                    </div>
                </div>  
                
                <div class="column">
                    <label class="label">Telefone</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="(00)00000-0000" name="telefone" v-model="telefone">
                    </div>
                </div> 
            </div>
        </div>
        
        <div class="field">
            <label class="label">Relatório da Consulta</label>
            <textarea class="textarea" rows="2" placeholder="Procedimentos realizados. Ex.: Foi aplicada vacina contra raiva, Remédio para dor..." v-model="relatorio"></textarea>
        </div>

        <div class="columns">
            <div class="column is-two-fifths">
                <div class="field">
                    <label class="label">Valor da Consulta</label>
                    <div class="control">
                        <input class="input" type="number" step="0.01" min="0.01" placeholder="R$ 0,00" name="valor_consulta" v-model="valor">
                    </div>
                </div>
            </div>

            <div class="column is-two-fifths">
                <label class="label">Data da Consulta</label>
                <div class="control">
                    <input class="input" type="date" name="data" v-model="data">
                </div>
            </div>

            <div class="column is-one-fifths">
                <div class="field">
                    <label class="label">Cadastrar Internação</label>
                    <div class="control">
                        <label class="radio">
                            <input class="radio-option" type="radio" name="internacao" value="true" @click="ShowInternacao(true)" >
                            Sim
                        </label>
                        <label class="radio">
                            <input class="radio-option" type="radio" name="internacao" value="false" @click="ShowInternacao(false)" >
                            Não
                        </label>
                    </div>
                </div>
            </div>
            
        </div>


        <div class="field" v-if="internacao===true">
            <legend class="sub-legend">Internação</legend>
            
            <div class="columns">
                <div class="column is-two-fifths">
                    <label class="label">Data de Entrada</label>
                    <div class="control">
                        <input class="input" type="date" name="data_entrada" v-model="interDataEntrada">
                    </div>
                </div>

                <div class="column is-two-fifths">
                    <label class="label">Data de Saída Prevista</label>
                    <div class="control">
                        <input class="input" type="date" name="data_saida" v-model="interDataSaida">
                    </div>
                </div>

                <div class="column is-one-fifths">
                    <label class="label">Leito</label>
                    <div class="control">
                        <input class="input" type="number" min="1" placeholder="Leito" name="leito" v-model="interLeito">
                    </div>
                </div>        
            </div>

            <div class="line"></div>
        </div>

        <div class="field">
            <label class="label">Receituário</label>
            <textarea class="textarea" placeholder="Receituário" v-model="receituario"></textarea>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <router-link class="link" to="/">
                    <button class="button is-link is-light has-text-dark">Cancel</button>
                </router-link>
            </div>
            <div class="control">
                <button class="button is-link primary" @click="createConsulta">Cadastrar</button>
            </div>
        </div>
    </div>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import consultasColRef from './firebaseConsultas'
import {addDoc} from 'firebase/firestore'

import pacientesColRef from '../Pacientes/firebasePacientes'
import { getDocs } from 'firebase/firestore'

export default defineComponent({
    name: 'ConsultasFormulario',
    data() {
        return {
            agendamento: false,
            data: null,
            veterinario: null,
            paciente: null,
            telefone: null,
            relatorio: null,
            valor: null,
            internacao: false,
            interDataEntrada: null,
            interDataSaida: null,
            interLeito: null,
            receituario: null,
            
            pets: [] as any,
            selectedDoc: null
        }
    },
    methods: {
        ShowInternacao(show: any) {
            show ? this.internacao = true : this.internacao = false            
        },
        createConsulta() {
            const addedDoc = addDoc(consultasColRef, this.$data);
            alert('Consulta criada!');
           this.$router.push('/');
        },
        async fetchPacientes() {
            let petsSnapShot = await getDocs(pacientesColRef);
            let pets = [] as any;
            petsSnapShot.forEach((pet) => {
                let petData = pet.data();
                petData.id = pet.id;
                pets.push(petData);
            });
            this.pets = pets;
        }
    },
    created() {
      this.fetchPacientes();
    }
})
</script>

<style lang="scss">

.form {
    padding: 10px 30px 30px 10px;
    margin: 0;
    
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

    .input:active, .input:focus, .is-active.input, .is-active.textarea, .is-focused.input, .is-focused.textarea, .select select.is-active, .select select.is-focused, .select select:active, .select select:focus, .textarea:active, .textarea:focus {
        border-color: #FF726F;
        box-shadow: 0 0 0 .125em rgba(#FFAAAA,.25);
    }

    .radio-option {
        width: 30px;
        margin-top: 10px;
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

    .sub-legend {
        padding: 2px;
        border-radius: 0px;
        font-size: 1.270rem;
    }

    .line {
        height: 3px;
        width: 100%;
        background-color: #FF5757;
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
