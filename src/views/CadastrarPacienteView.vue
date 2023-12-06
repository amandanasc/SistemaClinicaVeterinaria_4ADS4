<template>
    <PacientesFormulario />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PacientesFormulario from '@/components/Pacientes/PacientesFormulario.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    PacientesFormulario,
  },
});
</script>
