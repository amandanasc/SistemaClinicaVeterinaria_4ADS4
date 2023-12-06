<template>
  <div class="home">
    <AgendaConsultas />
    <div class="modal-agendamento">
      <ModalAgendamento />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AgendaConsultas from '../components/Consultas/AgendaConsultas.vue'
import ModalAgendamento from '../components/Consultas/ModalAgendamento.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    AgendaConsultas,
    ModalAgendamento
  },
});
</script>

<style scoped lang="scss">
  .modal-agendamento {
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
  }
</style>
