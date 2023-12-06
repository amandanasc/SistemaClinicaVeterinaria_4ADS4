<template>

<button class="button secondary" @click="isOpen = true">Visualizar</button>

<div class="modal-container" v-if="isOpen == true">
  <div class="modal-inner">
    <div class="modal-content" id="printable">
      <div class="head">
        <h3 class="title">{{ titleType }}</h3>
        <button class="close" @click="isOpen = false"> x </button>
      </div>
      <div class="content" >
        <p>{{ contentText }}</p>
      </div>
    </div>
      <button class="print" @click="printContent()">
        <i class="fa-solid fa-print"></i>
      </button>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalConsultas',
    props: {
      contentText: String,
      titleType: String
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      printContent() {
        window.print();
      }
    }
})
</script>

<style lang="scss">

  .button.secondary {
      background-color: #385A64 !important;
      color: white;
      height: 35px;
  }

  .button.secondary:hover {
      color: white;
  }

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
  }


  @media print {
    body * {
      visibility: hidden;
    }
    #printable, #printable * {
      visibility: visible;
    }
    #printable {
      position: fixed;
      left: 0;
      top: 0;
      
      p {
        font-size: 18px;
      }
    }
  }

</style>