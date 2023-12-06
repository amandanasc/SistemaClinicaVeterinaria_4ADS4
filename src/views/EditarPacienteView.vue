<template>
    <EditarPaciente />
</template>
<script>
import { defineComponent } from 'vue'
import EditarPaciente from '@/components/Pacientes/EditarPaciente.vue'

export default defineComponent({
    name: 'EditarPacienteView',
    components: {
        EditarPaciente
    }
})
</script>
