<template>
    <ListaPacientes />
</template>
<script>
import { defineComponent } from 'vue'
import ListaPacientes from '@/components/Pacientes/ListaPacientes.vue'

export default defineComponent({
    name: 'ListaPacientesView',
    components: {
        ListaPacientes
    }
})
</script>
