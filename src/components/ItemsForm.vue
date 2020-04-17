<template>
    <div class="container">
            <div id="form" class="control">
                <input class="input is-rounded" type="text" placeholder="Item Name" v-model="orderItem.name">
                <textarea class="textarea is-rounded" placeholder="Item Description" v-model="orderItem.description"></textarea>
                <!--            <input class="input is-rounded" type="file" placeholder="Item Img" v-model="orderItem.img">-->
                <div class="field">
                    <div class="file is-info has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" @change="onFileSelected" accept="image/*">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">Select your file…</span>
                            </span>
                            <span class="file-name">{{ filename }}</span>
                        </label>
                        <div>
                            <img :src="imageUrl" height="100">
                            <p>{{ imageUrl }}</p>
                        </div>
                    </div>
                </div>
                <input class="input is-rounded" type="text" placeholder="Item Price" v-model="orderItem.price">
                <input class="input is-rounded" type="text" placeholder="Estimate time" v-model="orderItem.ept">
                <br>
                <br>
                <button class="button is-success is-rounded" @click="addItem">Add Item</button>
            </div>

        <hr>
        <hr>

        <div class="table is-striped is-hoverable">
            <table style="width:100%">
                <tr>
                    <th>Index</th>
                    <th>Item Name</th>
                    <th>Item Description</th>
                    <th>Img</th>
                    <th>Item Price</th>
                    <th>Estimate prepare time</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="item in itemsList" @click="itemPage(item._id)">
                    <td>{{ item._id }}</td>
                    <td>{{item.item_name}}</td>
                    <td>{{item.item_description}}</td>
                    <td><img :src="getImg(item.item_img)"></td>
                    <td>{{item.item_price}}</td>
                    <td>{{item.estimate_prepare_time}}</td>
                    <td>
                        <b-button type="is-success">
                            <i class="fas fa-eye"></i>
                        </b-button>
                        <b-button style="margin-left: 5px" type="is-info">
                            <i class="fas fa-edit"></i>
                        </b-button>
                        <b-button style="margin-left: 5px" type="is-danger" @click="deleteItem(item._id, item.item_name)">
                            <i class="fas fa-trash-alt"></i>
                        </b-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ItemsForm",
        data: function () {
            return {
                orderItem: {
                    name: '',
                    description: '',
                    img: '',
                    price: '',
                    ept: ''
                },
                selectedFile: null,
                filename: 'No file is selected ...',
                imageUrl: '',
                itemsList: [],
                gotUrl: ''
            }
        },
        mounted() {
            axios.get('http://localhost:12345/auth/items').then(
                response => this.itemsList = response.data
            );
            // this.gotUrl = this.itemsList[4].item_img
        },
        methods: {
            addItem() {
                // const fd = new FormData();
                // fd.append('img', this.selectedFile, this.selectedFile.name);

                let itemData = {
                    "item_name": this.orderItem.name,
                    "item_description": this.orderItem.description,
                    "item_img": this.imageUrl,
                    "item_price": parseInt(this.orderItem.price),
                    "estimate_prepare_time": parseInt(this.orderItem.price)
                };
                // transferring data to allow
                let formData = JSON.stringify(itemData);
                axios({
                    method: "POST",
                    url: "http://localhost:12345/item",
                    data: formData,
                }).then(res => {
                    console.log(res.data);
                    this.itemsList.push(itemData)
                });
                this.$buefy.toast.open({
                    message: 'Your item has been added!',
                    type: 'is-success'
                })
            },
            deleteItem(id, itemName) {
                this.$buefy.dialog.confirm({
                    title: 'Deleting Item',
                    message: 'Are you sure you want to <b>delete</b> item: '+ itemName +'? This action cannot be undone.',
                    confirmText: 'Delete Item',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: function() {
                        let url = 'http://localhost:12345/items/'+id;
                        console.log(url);
                        axios.delete(url).then(res => {
                            console.log(res.data)
                        })
                        // axios({
                        //     method: "DELETE",
                        //     url: "http://localhost:12345/items/" + id,
                        // }).then(res => {
                        //     console.log(res.data);
                        // });
                        // this.$buefy.toast.open('Item deleted!');
                    }
                })


                // this.$buefy.toast.open({
                //     message: 'Your item has been added!',
                //     type: 'is-success'
                // })
            },
            // inputValidation(data) {
            //     switch () {
            //
            //     }
            // },
            getImg(image) {
                return image;
            },
            itemPage(item) {

            },
            removeItem(index) {
                this.itemsList.splice(index, 1);
            },
            onFileSelected(event) {
                const files = event.target.files;
                let filename = files[0].name;
                this.filename = filename;
                this.selectedFile = event.target.files[0];
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file!')
                }
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files[0]);
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                })
            },
        },
    }
</script>

<style scoped>
    #form {
        width: 30%;
    }
    .input  {
        margin-top: 20px;
    }
    .textarea {
        margin-top: 20px;
    }
    .itemTable {
        margin-top: 30px;
    }
    .field {
        margin-top: 20px;
    }
    img {
        display: block;
        max-width:75px;
        max-height:75px;
        width: auto;
        height: auto;
    }
</style>