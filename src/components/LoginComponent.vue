<template>
    <div class="login-form-container">
        <form class="login-form" form action="" method="POST" id="loginForm">   
            <div>
                <img alt="Vue logo" class="logo" src="@/assets/logo.png" />
            </div>
            <div class="form-floating login-username">
                <input type="text" class="form-control" id="username_input" placeholder="username" name="username" v-model="username">
                <label for="username_input">Username</label>
            </div>

            <div class="form-floating login-password">
                <input type="password" class="form-control" id="password_input" placeholder="password" name="password" v-model="password">
                <label for="password_input">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" id="login_signin" @click="$emit('login')">Login</button>
        </form>
        <figure class="image">
            <img src="../assets/vet-landing-page.png">
        </figure>
    </div>      
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LoginComponent',
    props: {
        login: {
            type: Boolean,
            default: false
        }
    }
})
</script>


<style>
    .form-control {
        margin-bottom: 10px;
        max-width: 495px;
    }

    button.w-100.btn.btn-lg.btn-primary {
        background-color: #FF5757;
        border: none;
        max-width: 495px;
    }

    .login-form-container {
        display: flex;
        justify-content: space-around;
    }

    form.login-form {
        margin-top: 5%;
    }
    
    .image img {
        width: 500px;
    }
</style>