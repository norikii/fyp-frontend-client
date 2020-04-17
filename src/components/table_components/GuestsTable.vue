<template>
    <div>
        <div style= "margin: 25px 0 0 20px">
            <h1 style="font-size: 30px">GUEST USERS TABLE</h1>
        </div>
        <section>
            <b-table
                    :data="guestUserData"
                    :paginated="isPaginated"
                    :per-page="perPage"
                    :current-page.sync="currentPage"
                    :pagination-simple="isPaginationSimple"
                    :pagination-position="paginationPosition"
                    :default-sort-direction="defaultSortDirection"
                    :sort-icon="sortIcon"
                    :sort-icon-size="sortIconSize"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page">

                <template slot-scope="props">
                    <b-table-column field="email" label="Email" width="100" sortable searchable>
                        {{ props.row.email }}
                    </b-table-column>

                    <b-table-column label="Actions" width="40">
                        <b-tooltip label="View Record"
                                   position="is-bottom"
                                   type="is-warning">
                            <button class="actionBtn button is-success"
                                    @click="findGuestUser(props.row._id)">
                                <span class="icon is-small">
                                  <i class="fas fa-eye"></i>
                                </span>
                            </button>
                        </b-tooltip>
                    </b-table-column>
                </template>
            </b-table>
        </section>
    </div>
</template>

<script>
    import axios from "axios";
    import unix_to_date_mixin from "../../mixins/unix_to_date_mixin";

    export default {
        name: "GuestsTable",
        data() {
            return {
                guestUserData: [],
                show: false,
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 5
            }
        },
        mounted() {
            axios.get('http://localhost:12345/auth/user/guest/all').then(
                response => {
                    this.guestUserData = response.data;
                }
            );
        },
        methods: {
            findGuestUser(id) {
                // find guest user object
                let guestUser = this.guestUserData.find(user => user._id === id);

                // convert dates
                let last_login_date = unix_to_date_mixin.computed.convertUnixToDate(guestUser.logged_at);
                let created_date = unix_to_date_mixin.computed.convertUnixToDate(guestUser.created_at);
                let updated_date = unix_to_date_mixin.computed.convertUnixToDate(guestUser.updated_at);

                this.$buefy.dialog.alert({
                    title: guestUser.email,
                    message: 'Last Login: ' + last_login_date + '<br>' +
                             'Created At: ' + created_date + '<br>' +
                             'Updated At:' + updated_date,
                    confirmText: 'OK'
                })
            },
        }
    }
</script>

<style scoped>
    .dataTable {
        margin: 25px 10px 100px 10px;
        background-color: ghostwhite;
        border-radius: 3px;
    }
</style>