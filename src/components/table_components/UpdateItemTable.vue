<template>
    <div id="updateItemTable">
        <section id="allItems">
            <b-table
                    :data="itemsData"
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
                    <b-table-column field="item_name" label="Name" sortable searchable>
                        {{ props.row.item_name }}
                    </b-table-column>

                    <b-table-column field="item_type" label="Type" sortable searchable>
                        {{ props.row.item_type }}
                    </b-table-column>

                    <b-table-column field="item_price" label="Price" width="40" centered sortable searchable>
                        {{ props.row.item_price }}
                    </b-table-column>

                    <b-table-column label="Actions" centered>
                        <b-tooltip label="Edit Record"
                                   position="is-bottom"
                                   type="is-warning">
                            <button class="actionBtn button is-info"
                                    @click="addItem(props.row._id)">
                                <span class="icon is-small">
                                  <i class="fas fa-plus-circle"></i>
                                </span>
                            </button>
                        </b-tooltip>
                    </b-table-column>
                </template>
            </b-table>
        </section>
        <section id="selectedItems">
            <table class="table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in receivedItems">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.item_name}}</td>
                    <td>{{ item.item_price}}</td>
                    <td @click="removeItem(index)">
                            <span class="icon has-text-danger">
                                <i class="fas fa-minus-circle"></i>
                            </span>
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th>Total Price: </th>
                    <th></th>
                    <th>{{ getTotalPrice }}</th>
                </tr>
                </tfoot>
            </table>
            <button @click="confirmOrder" :disabled="orderNotConfirmed" class="button is-success">Confirm Order</button>
        </section>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "UpdateItemTable",
        props: [
            'receivedItems'
        ],
        data() {
            return {
                itemsData: [],
                selectedItems: [],
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 5,
                orderNotConfirmed: false,
                totalPrice: 0,
            }
        },
        mounted() {
            axios.get('http://192.168.0.55:12345/auth/items').then(
                response => {
                    this.itemsData = response.data.payload;
                }
            );
            this.selectedItems = this.receivedItems;
        },
        methods: {
            addItem(id) {
                let item = this.itemsData.find(item => item._id === id);
                this.selectedItems.push(item);
            },
            removeItem(index) {
                if (index > -1) {
                    this.selectedItems.splice(index, 1);
                }
            },
            confirmOrder() {
                this.orderNotConfirmed = true;
                this.$emit('confirmed', {
                    items: this.selectedItems,
                    totalPrice: this.totalPrice,
                })
            }
        },
        computed: {
            getTotalPrice: function () {
                let sum = 0;
                if (this.selectedItems.length) {
                    this.selectedItems.forEach(e => {
                        sum += e.item_price;
                    });
                }
                this.totalPrice = sum;

                return sum
            },
        }
    }
</script>

<style scoped>
    #updateItemTable{
        display: flex;
        justify-content: space-between;
    }
    #selectedItems {
        margin-right: 100px;
        margin-left: 25px;
    }
</style>