<template>
    <div id="itemForm">
        <div class="field">
            <label class="label">Item Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Item Name" v-model="itemName">
            </div>
        </div>

        <div class="field">
            <label class="label">Item Description</label>
            <div class="control">
                <input class="textarea" type="text" placeholder="Item Description" v-model="itemDescription">
            </div>
        </div>

        <div class="field">
            <label class="label">Item Type</label>
            <div class="select">
                <select v-model="itemType">
                    <option disabled value="">Select dropdown</option>
                    <option>Mains</option>
                    <option>Sides</option>
                    <option>Soups</option>
                    <option>Drinks</option>
                    <option>Alcohol</option>
                    <option>Deserts</option>
                </select>
            </div>
        </div>

        <div class="field">
            <label class="label">Estimate Prepare Time</label>
            <div class="select">
                <select v-model="prepareTime">
                    <option disabled value="">Select Time</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    <option>30</option>
                    <option>35</option>
                    <option>40</option>
                    <option>45</option>
                    <option>50</option>
                </select>
            </div>
        </div>

        <div class="field">
            <label class="label">Item Price</label>
            <div class="control">
                <input class="control" type="text" placeholder="Item Price" v-model="itemPrice">
            </div>
        </div>



        <div class="field" style="">
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
                </div>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button @click="addItem" class="button is-link">Submit</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AddItemForm",
        data() {
            return {
                selectedFile: null,
                filename: 'No file is selected ...',
                imageUrl: '',
                itemType: '',
                prepareTime: '',
                itemName: '',
                itemDescription: '',
                itemPrice: ''
            }
        },
        methods: {
            convertPrepareTime(minutes) {
                // return prepare time in milliseconds
                return parseInt(minutes);
            },
            addItem() {
                let ept = this.convertPrepareTime(this.prepareTime);
                let itemData = {
                    "item_name": this.itemName,
                    "item_description": this.itemDescription,
                    "item_img": this.imageUrl,
                    "item_type": this.itemType,
                    "item_price": parseInt(this.itemPrice),
                    "estimate_prepare_time": ept
                };
                // transferring data to allow
                let formData = JSON.stringify(itemData);
                axios({
                    method: "POST",
                    url: "http://192.168.0.55:12345/auth/item",
                    data: formData,
                }).then(res => {
                    console.log(res.data);
                    this.$emit('addItem', itemData)
                });
                this.$buefy.toast.open({
                    message: 'Your item has been added!',
                    type: 'is-success'
                })
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
        }
    }
</script>

<style scoped>
    img {
        display: block;
        max-width:100px;
        max-height:100px;
        width: auto;
        height: auto;
    }

    #itemForm {
        margin-bottom: 30px;

    }
</style>