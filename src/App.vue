<template>

  <div v-if="login === false">
    <LoginComponent v-on:login="SignIn" :login="login"/>
  </div>

  <main v-else>
    <div class="columns main-content">
      <nav class="column is-one-fifths">
        <NavbarHorizontal />
      </nav>
      <div class="column is-four-fifths">

        <div class="login">
          <div class="user">
            <i class="fas fa-user-circle"></i>
            <i class="fas fa-sign-out-alt" @click="SignOut()"></i>
          </div>
        </div>
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import NavbarHorizontal from '@/components/NavbarHorizontal.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    LoginComponent,
    NavbarHorizontal,
  },
  data() {
    return {
      login: false
    }
  },
  methods: {
    SignIn() {
      this.login = true
      
    },
    SignOut() {
      this.login = false
    }
  },
  mounted() {
    this.login = true;
  }
})
</script>


<style lang="scss">

  main {
    background-color: #FBFBFB;
  }

  .user {
    display: inline-block;
    height: 24px;

    i {
      width: 32px;
      font-size: 24px;
      color: #FFF;
      margin-right: 18px;
      text-align: center;
    }
    
    i.fa-sign-out-alt {
      cursor: pointer;
    }
  }

  .login {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 15px -30px;
    // background-color: white;
    align-items: center;
    background-color: #FF5757;
    height: 55px;

    img {
      width: 200px;
    }
  }
</style>
