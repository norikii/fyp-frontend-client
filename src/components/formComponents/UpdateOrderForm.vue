<template>
    <div id="itemForm">
        <div class="field">
            <label class="label">Table No.</label>
            <div class="control">
                <input class="input" type="text" placeholder="Table No." v-model="toUpdateObject.table_id">
            </div>
        </div>

        <div>
            <update-item-table v-bind:receivedItems="toUpdateObject.items" v-on:confirmed="getItems($event)"></update-item-table>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button @click="updateOrder" class="button is-link">Submit</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import AddItemTable from "../table_components/AddItemTable";
    import axios from "axios";
    import UpdateItemTable from "../table_components/UpdateItemTable";
    export default {
        name: "UpdateOrderForm",
        components: {UpdateItemTable, AddItemTable},
        props: [
            'toUpdateObject'
        ],
        data() {
            return {
                tableNo: 0,
                selectedItems: [],
                totalPrice: 0,
            }
        },
        methods: {
            updateOrder() {
                let orderData = {
                    'table_id': parseInt(this.toUpdateObject.table_id),
                    'items': this.selectedItems,
                    'total_price': this.totalPrice
                };

                console.log(orderData);

                axios({
                    method: "PUT",
                    url: "http://192.168.0.55:12345/auth/order/"+this.toUpdateObject._id,
                    data: orderData,
                }).then(res => {
                    console.log(res.data);
                    this.$emit('addOrder', orderData)
                });
                this.$buefy.toast.open({
                    message: 'Your order has been updated!',
                    type: 'is-success'
                })
            },
            getItems(itemsObject) {
                this.selectedItems = itemsObject.items;
                this.totalPrice = itemsObject.totalPrice;
            }
        }
    }
</script>

<style scoped>

</style>