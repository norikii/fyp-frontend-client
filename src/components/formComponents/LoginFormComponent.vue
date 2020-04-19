<template>
    <div class="box container">
        <section>
            <b-field label="Email"
                     :type="inputErrType"
                     :message="inputErrMsg">
                <b-input  type="email"
                         v-model="emailInput"
                         maxlength="50">
                </b-input>
            </b-field>

            <b-field label="Password">
                <b-input
                         type="password"
                         v-model="passwordInput"
                         :placeholder="passwordInput"
                         password-reveal>
                </b-input>
            </b-field>

            <div id="buttons">
                <button @click="login" class="button is-info" style="align-self: start">Log In</button>
                <button  class="button is-danger" style="align-self: end">Cancel</button>
            </div>
<!--            <b-notification-->
<!--                    type="is-danger"-->
<!--                    aria-close-label="Close notification"-->
<!--                    role="alert">-->
<!--                Invalid input-->
<!--            </b-notification>-->

        </section>
    </div>
</template>

<script>
    export default {
        name: "LogInForm",
        data: function () {
            return {
                emailInput: "",
                passwordInput: "",
                // is-danger if error
                inputErrType: "",
                inputErrMsg: ""
            }
        },
        methods: {
            success() {

            },
            login() {
                // dispatching a login action
                this.$store.dispatch(
                    'login', {
                        // this payload will be sent
                        email: this.emailInput,
                        password: this.passwordInput
                    }).then( () => {
                        // then we redirect to the dashboard route
                        this.$router.push({name: 'dashboard'})
                })
            }
        },
        computed: {

        },

    }
</script>

<style scoped>
    #buttons {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 20px;
    }
</style>