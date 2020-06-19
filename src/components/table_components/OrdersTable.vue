<template>
    <div>
        <div style= "margin: 25px 0 0 20px">
            <h1 style="font-size: 30px">ORDERS TABLE</h1>
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
                    Create Order
                </span>
            </button>

            <div v-if="show" id="inputForm">
                <add-order-form v-on:addOrder="addOrder($event)">
                </add-order-form>
            </div>

            <div v-if="needsUpdate" id="updateOrder">
                <update-order-form v-bind:toUpdateObject="orderToUpdate"></update-order-form>
                <button class="button btn is-danger" @click="needsUpdate = false">Close</button>
            </div>
            <section v-if="ordersData">
                <b-table
                        :data="ordersData"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :opened-detailed="defaultOpenedDetails"
                        detailed
                        striped
                        detail-key="_id"
                        :show-detail-icon="true"
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
                        <b-table-column field="_id" label="Table No." width="10" centered sortable searchable>
                            {{ props.row.table_id }}
                        </b-table-column>

                        <b-table-column field="total_price" width="10" label="Total Price" centered sortable searchable>
                            <template>
                                <a @click="toggle(props.row)">
                                </a>
                                {{ props.row.total_price }}
                            </template>
                        </b-table-column>

<!--                        <b-table-column field="table_id" label="Table No." width="10" centered sortable searchable>
                            {{ props.row.table_id }}
                        </b-table-column>-->

                        <b-table-column field="created_at" label="Created At" width="200" centered sortable searchable>
                            <span class="tag is-success">
                                {{ dateConverter(props.row.created_at) }}
                            </span>
                        </b-table-column>

                        <b-table-column field="ready_at" label="Ready At" width="200" centered sortable searchable>
                            <span class="tag is-success">
                                {{ dateConverter(props.row.ready_at) }}
                            </span>
                        </b-table-column>

                        <b-table-column field="delivered_at" label="Delivered At" width="200" centered sortable searchable>
                            <span class="tag is-success">
                                {{ dateConverter(props.row.delivered_at) }}
                            </span>
                        </b-table-column>

                        <b-table-column field="delivered_at" label="User" width="300" centered sortable searchable>
                            <span class="tag is-success">
                                {{ props.row.staff_user_id }}
                            </span>
                        </b-table-column>

                        <b-table-column label="Actions" centered>
                            <b-tooltip label="View Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-success"
                                        @click="findOrder(props.row._id)">
                                    <span class="icon is-small">
                                      <i class="fas fa-eye"></i>
                                    </span>
                                </button>
                            </b-tooltip>

                            <b-tooltip label="Edit Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-info"
                                        @click="updateOrder(props.row._id)">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                                </button>
                            </b-tooltip>

                            <b-tooltip label="Delete Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-danger"
                                        @click="removeOrder(props.row._id)">
                            <span class="icon is-small">
                              <i class="fas fa-trash-alt"></i>
                            </span>
                                </button>
                            </b-tooltip>
                        </b-table-column>

                    </template>

                    <template slot="detail" slot-scope="props">
                        <ul>
                            <li v-for="(item, index) in props.row.items">
                                Item: {{ index+1 }} - {{ item.item_name }} - Price: {{ item.item_price }}
                            </li>
                        </ul>
                    </template>

                </b-table>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import AddOrderForm from "../formComponents/AddOrderForm";
    import unix_to_date_mixin from "../../mixins/unix_to_date_mixin";
    import UpdateOrderForm from "../formComponents/UpdateOrderForm";

    export default {
        name: "OrdersTable",
        components: {UpdateOrderForm, AddOrderForm},
        data() {
            return {
                defaultOpenedDetails: [1],
                ordersData: [],
                orderToUpdate: null,
                show: false,
                needsUpdate: false,
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 5,
                dateConverter: unix_to_date_mixin.computed.convertUnixToDate,
            }
        },
        mounted() {
            axios.get('http://192.168.0.55:12345/auth/orders').then(
                response => {
                    this.ordersData = response.data.payload;
                }
            );
        },
        methods: {
            toggle(row) {
                this.$refs.table.toggleDetails(row)
            },
            addOrder(orderData) {
                this.ordersData.push(orderData);
            },
            removeOrder(id) {
                this.$buefy.dialog.confirm({
                    title: 'Deleting Item',
                    message: 'Are you sure you want to <b>delete</b> item: '+ id +'? This action cannot be undone.',
                    confirmText: 'Delete Item',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: function() {
                        let url = 'http://192.168.0.55:12345/auth/order/'+id;
                        axios.delete(url).then(res => {
                            console.log(res.data);
                            location.reload();
                        })
                    }
                })
            },
            findOrder(id) {
                // find item item object
                let order = this.ordersData.find(order => order._id === id);

                // convert dates
                let created_date = unix_to_date_mixin.computed.convertUnixToDate(order.created_at);
                let ready_date = unix_to_date_mixin.computed.convertUnixToDate(order.ready_at);
                let delivered_date = unix_to_date_mixin.computed.convertUnixToDate(order.delivered_at);
                let payed_date = unix_to_date_mixin.computed.convertUnixToDate(order.payed_at);

                this.$buefy.dialog.alert({
                    title: "Order No:" + order._id,
                    message:
                        'For Table No: ' + order.table_id + '<br>' +
                        'Number of Items: ' + order.items.length + '<br>' +
                        'Total Price: £' + order.total_price + '<br>' +
                        'Created At: ' + created_date + '<br>' +
                        'Ready At: ' + ready_date + '<br>' +
                        'Delivered At: ' + delivered_date + '<br>' +
                        'Payed At:' + payed_date,
                    confirmText: 'OK'
                })
            },
            updateOrder(id) {
                this.needsUpdate = true;
                this.orderToUpdate = this.ordersData.find(order => order._id === id);
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