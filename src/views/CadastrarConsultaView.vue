<template>
    <ConsultasFormulario />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ConsultasFormulario from '@/components/Consultas/ConsultasFormulario.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    ConsultasFormulario,
  },
});
</script>
