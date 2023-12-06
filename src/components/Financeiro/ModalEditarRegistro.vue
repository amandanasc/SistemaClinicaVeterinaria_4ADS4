<template>

<span @click="isOpen = true, openModal()">
    <i class="fa-solid fa-pen-to-square" style="color: #385A64;"></i>
</span>

<div class="modal-container" v-if="isOpen == true">
  <div class="modal-inner">
    <div class="modal-content">

      <div class="head">
        <h3 class="title">Editar</h3>
        <button class="close" @click="isOpen = false"> x </button>
      </div>
      <div class="content">
        <form>
            <div class="field">
                <label class="label">Telefone</label>
                <div class="control">
                    <input class="input" type="tel" placeholder="(00)00000-0000" name="telefone_cliente" v-model="registroInfo.telefone">
                </div>
            </div>
            <div class="field">
                <label class="label">Nota fiscal</label>
                <div class="control">
                    <input class="input" type="text" placeholder="https://url.com.br" name="nota_fiscal" v-model="registroInfo.notaFiscal">
                </div>
            </div>
        </form>
      </div>
    </div>
    <div class="buttons">
        <button class="button cancelar" @click="isOpen = false">
            <span>Cancelar</span>
        </button>
        <button class="button enviar" @click="updateRegistro()">
            <span>Enviar</span>
        </button>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import registrosColRef from './firebaseRegistro'
import { getDoc, doc, setDoc } from "firebase/firestore";

export default defineComponent({
    name: 'ModalEditarRegistro',
    props: {
      myId: String,
    },
    data() {
      return {
        isOpen: false,
        selectedRegistro: {},
        registroId: null,
        docRef: null,

        registroInfo: {
          cliente: null,
          data: null,
          formaPag: null,
          notaFiscal: null,
          telefone: null,
          valor: null,
          veterinario: null
        }
      }
    },
    methods: {
      async getRegistro() {
        let registroRef = doc(registrosColRef, this.registroId);
        this.docRef = registroRef;
        let registro = await getDoc(this.docRef);
        let registroData = registro.data();

        console.log("All data: \n", registroData);

        this.registroInfo.cliente = registroData.cliente;
        this.registroInfo.data = registroData.data;
        this.registroInfo.formaPag = registroData.formaPag;
        this.registroInfo.notaFiscal = registroData.notaFiscal;
        this.registroInfo.telefone = registroData.telefone;
        this.registroInfo.valor = registroData.valor;
        this.registroInfo.veterinario = registroData.veterinario;

      },
      async updateRegistro() {
        setDoc(this.docRef, this.registroInfo);
        alert(`A Consulta ID-${this.registroId} foi atualizado com sucesso!`);
        this.$router.push("/");
      }
    },
    created() {
        let registroId = this.$route.params.registroId;
        this.registroId = registroId;
        this.getRegistro(registroId);
    }
})
</script>

<style lang="scss">

  .modal-container {
    width: 100vw;
    overflow: overlay;
    background-color: rgba(0,0,0,0.35) !important;
    height: 100vh;
    position: absolute !important;
    padding: 0px !important;
    margin: 0px !important;
    z-index: 1000;
    top: -25px;
    left: -24px;

    .modal-inner {
      background-color: white;
      width: 40%;
      margin: 50px 200px 150px 260px;
      border-radius: 10px;
      padding: 20px 40px 40px 40px;
    }

    .head {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        flex-direction: column-reverse;
        align-content: space-between;
        
        .title {
          color: #363636;
          font-size: 2rem;
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

    .buttons {
        display: flex;
        justify-content: flex-end;
    }

    .button.enviar {
        background-color: #FF726F;
        border: none;
        margin-top: 20px;
        color: white;
    }

    .button.cancelar {
        background-color: lightgrey;
        border: none;
        margin-top: 20px;
        margin-right: 8px;
        color: white;
    }

    .label {
      text-align: left;
    }
}

</style>