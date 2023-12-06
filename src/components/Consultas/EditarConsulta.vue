<template>
<form class="form edit">
    <div class="box">  

        <legend class="legend">Editar</legend>

        <div class="field">
            <div class="columns">
                <div class="column">
                    <label class="label">Veterinário Responsável</label>
                    <div class="control">
                        <div class="select is-normal">
                            <select class="select-especies" v-model="consultaInfo.veterinario">
                                <option value="Maria Lúcia Santos">Maria Lúcia Santos</option>
                                <option value="Carlos Andrade">Carlos Andrade</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <label class="label">Pet atendido</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Pet atendido" name="nome_pet" v-model="consultaInfo.paciente">
                    </div>
                </div>  
            </div>
        </div>
        
        <div class="field">
            <label class="label">Relatório da Consulta</label>
            <textarea class="textarea" rows="2" placeholder="Procedimentos realizados. Ex.: Foi aplicada vacina contra raiva, Remédio para dor..." v-model="consultaInfo.relatorio"></textarea>
        </div>

        <div class="columns">
            <div class="column is-two-fifths">
                <div class="field">
                    <label class="label">Valor da Consulta</label>
                    <div class="control">
                        <input class="input" type="number" step="0.01" min="0.01" placeholder="R$ 0,00" name="valor_consulta" v-model="consultaInfo.valor">
                    </div>
                </div>
            </div>

            <div class="column is-two-fifths">
                <label class="label">Data da Consulta</label>
                <div class="control">
                    <input class="input" type="date" name="data" v-model="consultaInfo.data">
                </div>
            </div>

            <div class="column is-one-fifths">
                <div class="field">
                    <label class="label">Cadastrar Internação</label>
                    <div class="control">
                        <label class="radio">
                            <input class="radio-option" type="radio" name="internacao" value="true" @click="ShowInternacao(true)" v-model="consultaInfo.internacao">
                            Sim
                        </label>
                        <label class="radio">
                            <input class="radio-option" type="radio" name="internacao" value="false" @click="ShowInternacao(false)" v-model="consultaInfo.internacao">
                            Não
                        </label>
                    </div>
                </div>
            </div>
            
        </div>


        <div class="field" v-if="internacao===true || consultaInfo.internacao === true">
            <legend class="sub-legend">Internação</legend>
            
            <div class="columns">
                <div class="column is-two-fifths">
                    <label class="label">Data de Entrada</label>
                    <div class="control">
                        <input class="input" type="date" name="data_entrada" v-model="consultaInfo.interDataEntrada">
                    </div>
                </div>

                <div class="column is-two-fifths">
                    <label class="label">Data de Saída Prevista</label>
                    <div class="control">
                        <input class="input" type="date" name="data_saida" v-model="consultaInfo.interDataSaida">
                    </div>
                </div>

                <div class="column is-one-fifths">
                    <label class="label">Leito</label>
                    <div class="control">
                        <input class="input" type="number" min="1" placeholder="Leito" name="leito" v-model="consultaInfo.interLeito">
                    </div>
                </div>        
            </div>

            <div class="line"></div>
        </div>

        <div class="field">
            <label class="label">Receituário</label>
            <textarea class="textarea" placeholder="Receituário" v-model="consultaInfo.receituario"></textarea>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <router-link class="link" to="/lista-de-consultas">
                    <button class="button is-link is-light has-text-dark">Voltar</button>
                </router-link>
            </div>
            <div class="control">
                <button class="button is-link primary" @click="updateConsulta">Editar</button>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import { defineComponent } from 'vue'
import consultasColRef from './firebaseConsultas'
import { getDoc, doc, setDoc } from "firebase/firestore";

export default defineComponent({
    name: 'ConsultasFormulario',
    data() {
        return {
            internacao: false,
            selectedConsulta: {},
            consultaId: null,
            docRef: null,
            consultaInfo: {
                agendamento: false,
                data: null,
                veterinario: null,
                paciente: null,
                telefone: null,
                relatorio: null,
                valor: null,
                internacao: null,
                interDataEntrada: null,
                interDataSaida: null,
                interLeito: null,
                receituario: null
            }
        }
    },
    methods: {
        ShowInternacao(show) {
            show ? this.internacao = true : this.internacao = false            
        },
        async getConsulta() {
            let consultaRef = doc(consultasColRef, this.consultaId);
            this.docRef = consultaRef;
            let consulta = await getDoc(this.docRef);
            let consultaData = consulta.data();
            
            this.consultaInfo.agendamento = false;
            this.consultaInfo.data = consultaData.data;
            this.consultaInfo.veterinario = consultaData.veterinario;
            this.consultaInfo.paciente = consultaData.paciente;
            this.consultaInfo.telefone = consultaData.telefone;
            this.consultaInfo.relatorio = consultaData.relatorio;
            this.consultaInfo.valor = consultaData.valor;
            this.consultaInfo.internacao = consultaData.internacao;
            this.consultaInfo.interDataEntrada = consultaData.interDataEntrada;
            this.consultaInfo.interDataSaida = consultaData.interDataSaida;
            this.consultaInfo.interLeito = consultaData.interLeito;
            this.consultaInfo.receituario = consultaData.receituario;
        },
        async updateConsulta() {
            setDoc(this.docRef, this.consultaInfo);
            alert(`A Consulta ID-${this.consultaId} foi atualizado com sucesso!`);
            this.$router.push("/lista-de-consultas");
        },
    },
    created() {
        let consultaId = this.$route.params.consultaId;
        this.consultaId = consultaId;
        this.getConsulta();
    }
    
})
</script>

<style lang="scss">

.form.edit {
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
        background-color: #748C93;
    }
    .primary:hover {
        background-color: #385A64;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #748C93;
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
        background-color: #748C93;
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
        background-color: #748C93;
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
