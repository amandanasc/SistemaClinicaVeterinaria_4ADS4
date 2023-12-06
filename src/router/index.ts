import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadastrarPacienteView from '@/views/CadastrarPacienteView.vue'
import CadastrarConsultaView from '@/views/CadastrarConsultaView.vue'
import ListaPacientesView from '@/views/ListaPacientesView.vue'
import ListaConsultasView from '@/views/ListaConsultasView.vue'
import FinanceiroView from '@/views/FinanceiroView.vue'
import EditarPacienteView from '@/views/EditarPacienteView.vue'
import EditarConsultaView from '@/views/EditarConsultaView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastrar-paciente',
    name: 'cadastrar-paciente',
    component: CadastrarPacienteView
  },
  {
    path: '/lista-de-pacientes',
    name: 'lista-de-pacientes',
    component: ListaPacientesView
  },
  {
    path: '/editar-paciente/:pacienteId',
    name: 'editar-paciente',
    component: EditarPacienteView
  },
  {
    path: '/cadastrar-consulta',
    name: 'cadastrar-consulta',
    component: CadastrarConsultaView
  },
  {
    path: '/cadastrar-agendamento',
    name: 'cadastrar-agendamento',
    component: HomeView
  },
  {
    path: '/editar-consulta/:consultaId',
    name: 'editar-consulta',
    component: EditarConsultaView
  },
  {
    path: '/lista-de-consultas',
    name: 'lista-de-consultas',
    component: ListaConsultasView
  },
  {
    path: '/financeiro',
    name: 'financeiro',
    component: FinanceiroView
  },
  {
    path: '/editar-registro/:registroId',
    name: 'editar-registro',
    component: FinanceiroView,
  },
  {
    path: '/adicionar-registro',
    name: 'adicionar-registro',
    component: FinanceiroView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
