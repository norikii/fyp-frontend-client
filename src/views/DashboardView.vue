<template>
    <div id="dashboard">



        <template v-if="loggedIn">
            <side-bar-component></side-bar-component>
            <data-table-component></data-table-component>
        </template>
        <div v-else>
            <h1>Unauthorized access</h1>
        </div>

    </div>
</template>

<script>
    import SideBarComponent from "../components/SideBarComponent";
    import DataTableComponent from "../components/DataTableComponent";
    import axios from 'axios'
    import { authComputed } from "../store/helper";

    export default {
        name: "DashboardView",
        components: {DataTableComponent, SideBarComponent},
        data() {
            return {
            }
        },
        created() {
            axios.get('http://192.168.0.55:12345/auth/dashboard').then(({data}) => {
                this.isLoading = false;
            })
        },
        computed: {
            ...authComputed
        }
    }
</script>

<style>
    #dashboard {
        display: flex;
        min-height: 100vh;
        height: auto;
    }
</style>