<template>
    <div>
        <div style= "margin: 25px 0 0 20px">
            <h1 style="font-size: 30px">ITEMS TABLE</h1>
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
                    Add Item
                </span>
            </button>

            <div v-if="show" id="inputForm">
                <add-item-form v-on:addItem="addItem($event)">
                </add-item-form>
            </div>
            <section>
                <b-table
                        :data="itemsData"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        striped
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
                        <b-table-column field="item_img" label="Image" centered>
                            <div>
                                <img :src="props.row.item_img">
                            </div>
                        </b-table-column>

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
                            <b-tooltip label="View Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-success"
                                        @click="findItem(props.row._id)">
                                    <span class="icon is-small">
                                      <i class="fas fa-eye"></i>
                                    </span>
                                </button>
                            </b-tooltip>

                            <b-tooltip label="Edit Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-info"
                                        @click="updateItem(props.row._id)">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                                </button>
                            </b-tooltip>

                            <b-tooltip label="Delete Record"
                                       position="is-bottom"
                                       type="is-warning">
                                <button class="actionBtn button is-danger"
                                        @click="removeItem(props.row._id, props.row.item_name)">
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
    import unix_to_date_mixin from "../../mixins/unix_to_date_mixin";
    import AddItemForm from "../formComponents/AddItemForm";
    import UserStaffUpdateModal from "../modals/UserStaffUpdateModal";
    import UpdateItemModal from "../modals/UpdateItemModal";

    export default {
        name: "ItemsTable",
        components: {AddItemForm},
        data() {
            return {
                itemsData: [],
                show: false,
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 10,
            }
        },
        mounted() {
            axios.get('http://192.168.0.55:12345/auth/items').then(
                response => {
                    this.itemsData = response.data.payload;
                }
            );
        },
        methods: {
            addItem(item) {
                this.itemsData.push(item);
            },
            removeItem(id, name) {
                this.$buefy.dialog.confirm({
                    title: 'Deleting Item',
                    message: 'Are you sure you want to <b>delete</b> item: '+ name +'? This action cannot be undone.',
                    confirmText: 'Delete Item',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: function() {
                        let url = 'http://192.168.0.55:12345/auth/item/'+id;
                        axios.delete(url).then(res => {
                            console.log(res.data);
                            location.reload();
                        })
                    }
                })
            },

            // displays the selected item
            findItem(id) {
                // find item item object
                let item = this.itemsData.find(item => item._id === id);
                console.log(item.item_price);

                // convert dates
                let created_date = unix_to_date_mixin.computed.convertUnixToDate(item.created_at);
                let updated_date = unix_to_date_mixin.computed.convertUnixToDate(item.updated_at);

                this.$buefy.dialog.alert({
                    title: item.email,
                    message:
                        '<div>Img: <img :src="'+ item.item_img +'"></div>' +
                        'Name: ' + item.item_name + '<br>' +
                        'Description: ' + item.item_description + '<br>' +
                        'EPT: ' + item.estimate_prepare_time + '<br>' +
                        'Type: ' + item.item_type + '<br>' +
                        'Price: ' + item.item_price + '<br>' +
                        'Created At: ' + created_date + '<br>' +
                        'Updated At:' + updated_date,
                    confirmText: 'OK'
                })
            },

            // opens modal with form to update the item
            updateItem(id) {
                let itemObject = this.itemsData.find(item => item._id === id);
                this.$buefy.modal.open({
                    parent: this,
                    props: {itemObject: itemObject},
                    component: UpdateItemModal,
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

    img {
        display: block;
        max-width:75px;
        max-height:75px;
        width: auto;
        height: auto;
    }
</style>