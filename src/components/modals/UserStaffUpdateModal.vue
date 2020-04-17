<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
                <p>{{ staffUserObject.id }}</p>
            </header>
            <section class="modal-card-body">
                <add-staff-user-form :staffUsers="staffUserObject" :isControl="false"></add-staff-user-form>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="updateUser">Submit</button>
            </footer>
        </div>
    </form>
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
                let formData = JSON.stringify(this.staffUserObject);

                axios({
                    method: "PUT",
                    url: "http://localhost:12345/auth/user/staff/"+this.staffUserObject._id,
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
            }
        }

    }
</script>

<style scoped>

</style>