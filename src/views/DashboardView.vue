<template>
    <div id="dashboard">
        <side-bar-component></side-bar-component>
        <data-table-component></data-table-component>
    </div>
</template>

<script>
    import SideBarComponent from "../components/SideBarComponent";
    import DataTableComponent from "../components/DataTableComponent";
    export default {
        name: "DashboardView",
        components: {DataTableComponent, SideBarComponent},
    }
</script>

<style>
    #dashboard {
        display: flex;
        min-height: 100vh;
        height: auto;
    }
</style>