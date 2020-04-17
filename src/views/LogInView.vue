<template>
    <div class="container">
        <div id="loginWindow">
            <h1>LOG INTO THE SYSTEM</h1>
            <login-form id="login"></login-form>
        </div>

    </div>
</template>

<script>
    import LogInForm from "../components/formComponents/LoginFormComponent";
    export default {
        name: "LogInView",
        components: {
            "login-form": LogInForm
        }
    }
</script>

<style scoped>
    #login {
        width: 400px;
    }
    h1 {
        justify-content: center;
        margin-bottom: 30px;
        font-weight: bold;
        font-size: 2em;
    }
    #loginWindow {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-top: 220px;
    }

</style>