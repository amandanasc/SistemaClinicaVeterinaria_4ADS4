<template>
    <RegistroLancamentos />
    <div class="modal-registro">
        <ModalAdicionarRegistro />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegistroLancamentos from '../components/Financeiro/RegistroLancamentos.vue'
import ModalAdicionarRegistro from '../components/Financeiro/ModalAdicionarRegistro.vue'

export default defineComponent({
    components: {
        RegistroLancamentos,
        ModalAdicionarRegistro
    }
})
</script>

<style scoped lang="scss">
  .modal-registro {
    display: flex;
    justify-content: flex-end;
    margin-right: 24px;
  }
</style>