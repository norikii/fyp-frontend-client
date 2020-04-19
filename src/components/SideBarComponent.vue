<template>
    <div id="sideBar">
        <aside class="menu" style="padding: 10px">

            <p id="userNameText"><span style="margin-right: 20px" class="icon"><i class="fas fa-user-cog"></i></span>User: {{ userFirstName }} {{ userLastName }}</p>

            <p class="menu-label">
                Administration
            </p>
            <ul class="menu-list">
                <li>
                    <router-link
                        to="/dashboard"
                        tag="a" exact>
                    <span class="icon"><i class="fas fa-users-cog"></i></span>Staff Users
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/dashboard/items"
                        tag="a">
                    <span class="icon"><i class="fas fa-list-alt"></i></span>Items
                </router-link>
                </li>
                <li>
                    <router-link
                            to="/dashboard/orders"
                            tag="a">
                        <span class="icon"><i class="fas fa-receipt"></i></span>Orders
                    </router-link>
                </li>
                <li>
                    <router-link
                            to="/dashboard/guests"
                            tag="a" exact>
                        <span class="icon"><i class="fas fa-users"></i></span>Guest Users
                    </router-link>
                </li>
            </ul>
            <p class="menu-label">
                Actions
            </p>
            <ul class="menu-list">
                <li @click="logout"><a><span class="icon"><i class="fas fa-sign-out-alt"></i></span>Log Out</a></li>
            </ul>
        </aside>
    </div>

</template>

<script>


    export default {
        data() {
            return {
                userFirstName: 'John',
                userLastName: 'Doe',
                nameInitials: 'JD',
                isActive: false
            };
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        },
        computed: {
            // getName() {
            //     this.userFirstName = this.$store.loginResponse.;
            //     this.userLastName = ;
            // }
        }

    }
</script>

<style>
    #sideBar {
        flex: 1;
        background-color: #282828;
    }

    .icon {
        margin-right: 5px;
    }

    .menu-label {

    }

    #userNameText {
        font-weight: bold;
        font-size: 20px;
        text-transform: uppercase;
        color: #F5F5F5;
        margin-top: 15px;
        margin-left: 30px;
    }


</style>