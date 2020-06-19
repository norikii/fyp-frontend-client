<template>
    <div id="itemForm">
        <div class="field">
            <label class="label">First Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="First Name" v-model="staffUserObject.first_name">
            </div>
        </div>

        <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Last Name" v-model="staffUserObject.last_name">
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email input" value="hello@" v-model="staffUserObject.email">
                <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" value="somerandompass" v-model="staffUserObject.password">
                <span class="icon is-small is-left">
      <i class="fas fa-key"></i>
    </span>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="staffUserObject.is_admin">
                    Is Admin
                </label>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button @click="addStaffUser" class="button is-link">Submit</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AddStaffUserForm",
        props: [
            'staffUsers',
        ],
        data() {
            return {
                staffUserObject: {
                    first_name: this.staffUsers.first_name,
                    last_name: this.staffUsers.last_name,
                    email: this.staffUsers.email,
                    is_admin: this.staffUsers.is_admin,
                },
            }
        },
        methods: {
            addStaffUser() {
                let formData = JSON.stringify(this.staffUserObject);
                axios({
                    method: "POST",
                    url: "http://192.168.0.55:12345/user/staff/register",
                    data: formData,
                }).then(res => {
                    console.log(res.data);
                    this.$emit('addStaffUser', this.staffUserObject)
                    // this.itemsList.push(itemData)
                });
                this.$buefy.toast.open({
                    message: 'Your item has been added!',
                    type: 'is-success'
                })
            },
        }
    }
</script>

<style scoped>
    #itemForm {
        margin-bottom: 30px;

    }
</style>