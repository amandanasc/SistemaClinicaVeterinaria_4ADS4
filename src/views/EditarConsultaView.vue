<template>
    <EditarConsulta />
</template>
<script>
import { defineComponent } from 'vue'
import EditarConsulta from '@/components/Consultas/EditarConsulta.vue'

export default defineComponent({
    name: 'EditarConsultaView',
    components: {
        EditarConsulta
    }
})
</script>
