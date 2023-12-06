<template>


<router-link class="link" to="/cadastrar-agendamento" @click="isOpen = true">
    <button class="button secondary" @click="isOpen = true">Adicionar</button>
</router-link>

<div class="modal-container-agendamento" v-if="isOpen == true">
  <div class="modal-inner-agendamento">
    <div class="modal-content-agendamento">

      <div class="head-agendamento">
        <h3 class="title">Adicionar Agendamento</h3>
        <button class="close" @click="isOpen = false"> x </button>
      </div>
      <div class="content" >
        <form>
            <div class="field">
              <label class="label">Pet atendido</label>
              <div class="control select is-normal">
                  <select class="select-vet is-one-third" v-model="agendamento.paciente">
                      <option v-for="pet in pets" :key="pet.id" >
                      {{ pet.nomePet }}
                      </option>
                  </select>
              </div>
            </div>  

            <div class="field">
              <label class="label">Contato cliente</label>
              <div class="control">
                  <input class="input" type="tel" placeholder="(00) 00000-0000" name="telefone_pet" v-model="agendamento.telefone">
              </div>
            </div>
            <div class="field">
                <label class="label">Veterinário Responsável</label>
                <div class="control">
                    <div class="select is-normal">
                        <select class="select-vet" v-model="agendamento.veterinario">
                            <option value="Maria Lúcia Santos">Maria Lúcia</option>
                            <option value="Carlos Andrade">Carlos</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Data da Consulta</label>
                <div class="control">
                    <input class="input" type="date" name="data" v-model="agendamento.data">
                </div>
            </div>
        </form>
      </div>
    </div>
    <div class="buttons">
        <button class="button cancelar" @click="isOpen = false">
            <span>Cancelar</span>
        </button>
        <button class="button enviar" @click="createConsulta()">
            <span>Enviar</span>
        </button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import consultasColRef from './firebaseConsultas'
import {addDoc} from 'firebase/firestore'

import pacientesColRef from '../Pacientes/firebasePacientes'
import { getDocs } from 'firebase/firestore'

export default defineComponent({
    name: 'ModalEditarRegistro',
    props: {
    },
    data() {
      return {
        isOpen: false,
        agendamento: {
          agendamento: true,
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
          receituario: null
        },
                    
        pets: [] as any,
        selectedDoc: null
      }
    },
    methods: {
        createConsulta() {
            const addedDoc = addDoc(consultasColRef, this.agendamento);
            alert('Agendamento criado!');
            this.isOpen = false;
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

  .modal-container-agendamento {
    width: 100vw;
    // overflow: overlay;
    background-color: rgba(0,0,0,0.35) !important;
    height: 100vh;
    position: absolute !important;
    padding: 0px !important;
    margin: 0px !important;
    z-index: 1000;
    top: 0px;
    left: 0px;

    .modal-inner-agendamento {
        background-color: white;
        width: 40%;
        margin-left: 33%;
        margin-top: 50px;
        border-radius: 10px;
        padding: 20px 40px 40px 40px;
    }

    .head-agendamento {
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

    .link, .link:hover {
        text-decoration: none !important;
    }

    .select-vet {
        width: 600px;
    }
}

</style>