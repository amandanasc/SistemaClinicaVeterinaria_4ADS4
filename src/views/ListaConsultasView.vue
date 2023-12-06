<template>
    <ListaConsultas />
</template>
<script>
import { defineComponent } from 'vue'
import ListaConsultas from '@/components/Consultas/ListaConsultas.vue'

export default defineComponent({
    name: 'ListaConsultasView',
    components: {
        ListaConsultas
    }
})
</script>
