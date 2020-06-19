<template>
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Update Staff User</p>
            </header>
            <section class="modal-card-body">
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
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="staffUserObject.is_admin">
                                Is Admin
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="updateUser">Submit</button>
            </footer>
        </div>
</template>

<script>
    import AddStaffUserForm from "../formComponents/AddStaffUserForm";
    import axios from "axios";
    export default {
        name: "UserStaffUpdateModal",
        components: {AddStaffUserForm},
        props: [
            'staffUserObject'
        ],
        methods: {
            updateUser() {
                axios({
                    method: "PUT",
                    url: "http://192.168.0.55:12345/auth/user/staff/"+this.staffUserObject._id,
                    data: this.staffUserObject,
                }).then(res => {
                    console.log(res.data);
                    // this.itemsList.push(itemData)
                });
                this.$buefy.toast.open({
                    message: 'Your user has been updated!',
                    type: 'is-success'
                })
            },
        }

    }
</script>

<style scoped>

</style>