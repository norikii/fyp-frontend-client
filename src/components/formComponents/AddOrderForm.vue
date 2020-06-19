<template>
    <div id="itemForm">
        <div class="field">
            <label class="label">Table No.</label>
            <div class="control">
                <input class="input" type="text" placeholder="Table No." v-model="tableNo">
            </div>
        </div>

        <div>
            <add-item-table v-on:confirmed="getItems($event)"></add-item-table>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button @click="createOrder" class="button is-link">Submit</button>
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
    export default {
        name: "AddOrderForm",
        components: {AddItemTable},
        data() {
            return {
                tableNo: 0,
                selectedItems: [],
                totalPrice: 0,
            }
        },
        methods: {
            createOrder() {
                let orderData = {
                    'table_id': parseInt(this.tableNo),
                    'items': this.selectedItems,
                    'total_price': this.totalPrice
                };

                console.log(orderData);

                axios({
                    method: "POST",
                    url: "http://192.168.0.55:12345/auth/order",
                    data: orderData,
                }).then(res => {
                    console.log(res.data);
                    this.$emit('addOrder', orderData.payload)
                });
                this.$buefy.toast.open({
                    message: 'Your order has been created!',
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