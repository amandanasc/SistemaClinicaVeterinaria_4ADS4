<template>
    <div class="navbar">
        <div class="logo">
          <router-link to="/"><img src="../assets/logo.png" alt="logo clínica mundo pet"></router-link>
        </div>

        <ul class="menu-nav">
            <router-link class="link" to="/cadastrar-paciente">
                <li class="menu-item">
                    <i class="fa-solid fa-dog"></i>
                    <span class="menu-option">Novo Paciente</span>
                </li>
            </router-link>
            <router-link class="link" to="/lista-de-pacientes">
                <li class="menu-item">
                    <i class="fa-solid fa-shield-dog"></i>
                    <span class="menu-option">Lista de Pacientes</span>
                </li>
            </router-link>
            <router-link class="link" to="/cadastrar-consulta">
                <li class="menu-item">
                    <i class="fa-solid fa-calendar-plus"></i>
                    <span class="menu-option">Nova Consulta</span>
                </li>
            </router-link>
            <router-link class="link" to="/lista-de-consultas">
                <li class="menu-item">
                    <i class="fa-solid fa-folder-open"></i>
                    <span class="menu-option">Lista de Consultas</span>
                </li>
            </router-link>
            <router-link class="link" to="/financeiro">
                <li class="menu-item">
                    <i class="fa-solid fa-money-check-dollar"></i>
                    <span class="menu-option">Financeiro</span>
                </li>
            </router-link>
        </ul>
    </div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavbarHorizontal'
})
</script>

<style scoped lang="scss">
    .navbar {
        background-color: white;
        height: calc(100vh + 150px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        box-shadow: 8px -12px 8px -8px rgb(0 0 0 / 62%);
        align-content: flex-start;
        
        .logo {
            display: flex;
            justify-content: flex-end;
            margin: 0px;
            background-color: white;

            img {
                width: 260px;
            }
        }

        .menu-nav {
            margin-top: 1rem !important;
            padding: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;

            i {
                width: 24px;
                font-size: 18px;
                color: #385A64;
                margin-right: 18px;
                text-align: center;
            }

            .menu-item {
                padding: 12px 8px 12px 24px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            .menu-item:hover {
                cursor: pointer;
                border-left: 8px solid #FF5757;
                background-color: #FCFCFC;

                .link, i {
                    color: #FF5757
                }
            }

                .link {
                    color: #385A64;
                    text-decoration: none;
                    font-weight: 500;
                }
        }
    }
</style>
