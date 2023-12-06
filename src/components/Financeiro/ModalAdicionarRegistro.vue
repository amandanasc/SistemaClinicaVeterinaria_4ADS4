<template>


<router-link class="link" to="/adicionar-registro" @click="isOpen = true">
  <button class="button secondary" @click="isOpen = true">Adicionar</button>
</router-link>

<div class="modal-container-add-registro" v-if="isOpen == true">
  <div class="modal-inner-add-registro">
    <div class="modal-content-add-registro">
      <div class="head-add-registro">
        <h3 class="title">Novo Registro</h3>
        <button class="close" @click="isOpen = false"> x </button>
      </div>
      <div class="content" >
        <form class="form">
            <div class="field">
                <label class="label">Nome do Cliente</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Nome do cliente" name="nome_cliente" v-model="registro.cliente">
                </div>
            </div>
            <div class="columns">
                <div class="column is-one-twos">
                    <label class="label">Valor da Consulta</label>
                    <div class="control">
                        <input class="input" type="number" step="0.01" min="0.01" placeholder="R$ 0,00" name="valor_consulta" v-model="registro.valor">
                    </div>
                </div>
                <div class="column is-one-twos">
                    <label class="label">Data do Pagamento</label>
                    <div class="control">
                        <input class="input" type="date" name="data" v-model="registro.data">
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">Veterinário Responsável</label>
                    <div class="control">
                        <div class="select is-normal">
                            <select class="select-option" v-model="registro.veterinario">
                                <option value="Maria Lúcia Santos">Maria Lúcia Santos</option>
                                <option value="Carlos Andrade">Carlos Andrade</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Forma de pagamento</label>
                    <div class="control">
                        <div class="select is-normal">
                            <select class="select-option" v-model="registro.formaPag">
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Crédito">Crédito</option>
                                <option value="Débito">Débito</option>
                                <option value="Pix">Pix</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="field column">
                    <label class="label">Telefone</label>
                    <div class="control">
                        <input class="input" type="tel" placeholder="(00)00000-0000" name="telefone_cliente" v-model="registro.telefone">
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
    <div class="buttons">
        <button class="button cancelar" @click="isOpen = false">
            <span>Cancelar</span>
        </button>
        <button class="button enviar" @click="EnviarDados">
            <span>Enviar</span>
        </button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import registrosColRef from './firebaseRegistro'
import { addDoc } from '@firebase/firestore';

export default defineComponent({
    name: 'ModalConsultas',
    props: {
      contentText: String,
      titleType: String
    },
    data() {
      return {
        isOpen: false,
        registro: {
          cliente: null,
          valor: null,
          data: null,
          veterinario: null,
          formaPag: null,
          telefone: null,
          notaFiscal: null
        }
      }
    },
    methods: {
      printContent() {
        window.print();
      },
      EnviarDados() {
          const addedDoc = addDoc(registrosColRef, this.registro);
          alert('Registro inserido!');
          this.$router.push('/');
      }
    }
})
</script>

<style lang="scss">

    .button.secondary {
        background-color: #385A64 !important;
        color: white;
        height: 46px;
    }

  .button.secondary:hover {
      color: white;
  }

  .form {
    padding: 15px;
  }

  .modal-container-add-registro {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.35) !important;
    position: absolute !important;
    padding: 0px !important;
    margin: 0px !important;
    z-index: 1000;
    top: 0px;
    left: 0px;

    .modal-inner-add-registro {
      background-color: #ffffff;
      width: 50%;
      margin-left: 27%;
      margin-top: 50px;
      border-radius: 10px;
      padding: 28px;
    }

    .head-add-registro {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        flex-direction: column-reverse;
        align-content: space-between;
        
        .title {
          color: #363636;
          font-size: 1.8rem;
          font-weight: 600;
          line-height: 1.125;
          max-width: 50%;
          text-align: left;
        }

        button.close {
          float: right;
          background: transparent;
          border: none;
          font-size: 18px;
          font-family: "FontAwesome";
          color: #385A64;
          text-align: right;
        }
    }

    .modal-content {
      p {
          text-align: justify;
      }
    }

    .print {
      background-color: #fafafa;
      padding: 20px !important;
      border: none;
      width: 100%;
    }

    
    .buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 0px !important;
    }

    .button.enviar {
        background-color: #FF726F;
        border: none;
        color: white;
        margin-top: 0px !important;
    }

    .button.cancelar {
        background-color: lightgrey;
        border: none;
        margin-right: 8px;
        margin-top: 0px !important;
        color: white;
    }

    .form .select-option {
        width: 270px;
    }
  }

</style>