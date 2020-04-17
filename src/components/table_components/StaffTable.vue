<template>
    <div>
        <div style= "margin: 25px 0 0 20px">
            <h1 style="font-size: 30px">STAFF USERS TABLE</h1>
        </div>
        <div class="dataTable">
            <button
                    v-if="true"
                    @click="show = !show"
                    style="margin-bottom: 15px"
                    class="button is-info">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
                <span>
                    Create User
                </span>
            </button>

            <div v-if="show" id="inputForm">
                <add-staff-user-form
                        staffUsers="staffUserObject"
                        isControl="true"
                        v-on:addStaffUser="addStaffUser($event)">
                </add-staff-user-form>
            </div>
            <section>
                <b-table
                        :data="staffUserData"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :current-page.sync="currentPage"
                        :pagination-simple="isPaginationSimple"
                        :pagination-position="paginationPosition"
                        :default-sort-direction="defaultSortDirection"
                        :sort-icon="sortIcon"
                        :sort-icon-size="sortIconSize"
                        default-sort="user.first_name"
                        aria-next-label="Next page"
                        aria-previous-label="Previous page"
                        aria-page-label="Page"
                        aria-current-label="Current page">

                    <template slot-scope="props">
                        <b-table-column field="first_name" label="First Name" sortable searchable>
                            {{ props.row.first_name }}
                        </b-table-column>

                        <b-table-column field="last_name" label="Last Name" sortable searchable>
                            {{ props.row.last_name }}
                        </b-table-column>

                        <b-table-column field="email" label="Email" sortable searchable>
                            {{ props.row.email }}
                        </b-table-column>

                        <b-table-column field="is_admin" label="Is Admin" sortable centered>
                            <span v-if=props.row.is_admin class="icon is-small has-text-success">
                                <i class="fas fa-check-circle"></i>
                            </span>
                            <span v-else class="icon is-small has-text-danger">
                                <i class="fas fa-times-circle"></i>
                            </span>

                        </b-table-column>

                        <b-table-column label="Actions" centered>
                            <b-tooltip label="View Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-success"
                                        @click="findStaffUser(props.row._id)">
                                    <span class="icon is-small">
                                      <i class="fas fa-eye"></i>
                                    </span>
                                </button>
                            </b-tooltip>

                            <b-tooltip label="Edit Record"
                                       position="is-bottom"
                                       type="is-warning">
                        <button class="actionBtn button is-info"
                                @click="updateStaffUser(props.row._id)">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                        </button>
                            </b-tooltip>

                            <b-tooltip label="Delete Record"
                                       position="is-bottom"
                                       type="is-warning">
                        <button class="actionBtn button is-danger"
                                @click="removeStaffUser(props.row._id, props.row.email)">
                            <span class="icon is-small">
                              <i class="fas fa-trash-alt"></i>
                            </span>
                        </button>
                            </b-tooltip>

                        </b-table-column>

                    </template>
                </b-table>
            </section>
        </div>
    </div>

</template>

<script>
    import axios from "axios";
    import AddStaffUserForm from "../formComponents/AddStaffUserForm";
    import UserStaffUpdateModal from "../modals/UserStaffUpdateModal";
    import unix_to_date_mixin from "../../mixins/unix_to_date_mixin";

    export default {
        name: "StaffTable",
        components: {
            AddStaffUserForm,
        },
        data() {
            return {
                isUserAdded: false,
                staffUserObject: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    is_admin: false,
                },
                staffUserData: [],
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
            axios.get('http://localhost:12345/auth/user/staff/all').then(
                response => {
                    this.staffUserData = response.data;
                }
            );
        },
        methods: {
            addStaffUser(staffUser) {
                this.staffUserData.push(staffUser);
            },
            removeStaffUser(id, email) {
                this.$buefy.dialog.confirm({
                    title: 'Deleting Item',
                    message: 'Are you sure you want to <b>delete</b> user: '+ email +'? This action cannot be undone.',
                    confirmText: 'Delete Item',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: function() {
                        let url = 'http://localhost:12345/auth/user/staff/'+id;
                        axios.delete(url).then(res => {
                            console.log(res.data)
                        })
                    }
                })
            },
            findStaffUser(id) {
                // find staff user object
                let staffUser = this.staffUserData.find(user => user._id === id);

                // convert dates
                let created_date = unix_to_date_mixin.computed.convertUnixToDate(staffUser.created_at);
                let updated_date = unix_to_date_mixin.computed.convertUnixToDate(staffUser.updated_at);

                this.$buefy.dialog.alert({
                    title: staffUser.first_name + ' ' + staffUser.last_name,
                    message: 'Email: ' + staffUser.email + '<br>' +
                        'Is Admin: ' + staffUser.is_admin + '<br>' +
                        'Created At: ' + created_date + '<br>' +
                        'Updated At:' + updated_date,
                    confirmText: 'OK'
                })
            },
            updateStaffUser(id) {
                let userObject = this.staffUserData.find(user => user._id === id);
                this.$buefy.modal.open({
                    parent: this,
                    props: {staffUserObject: userObject},
                    component: UserStaffUpdateModal,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
            }
        }
    }
</script>

<style scoped>
    .dataTable {
        margin: 25px 10px 100px 10px;
        background-color: ghostwhite;
        border-radius: 3px;
    }

    .actionBtn {
        margin-left: 0.5em;
    }
</style>