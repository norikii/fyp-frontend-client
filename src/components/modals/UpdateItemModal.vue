<template>
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Update Item</p>
            </header>
            <section class="modal-card-body">
                <div id="itemForm">
                    <div class="field">
                        <label class="label">Item Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Item Name" v-model="itemObject.item_name">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Item Description</label>
                        <div class="control">
                            <input class="textarea" type="text" placeholder="Item Description" v-model="itemObject.item_description">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Item Type</label>
                        <div class="select">
                            <select v-model="itemObject.item_type">
                                <option disabled value="">Select dropdown</option>
                                <option>Mains</option>
                                <option>Sides</option>
                                <option>Drinks</option>
                                <option>Deserts</option>
                            </select>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Estimate Prepare Time</label>
                        <div class="select">
                            <select v-model="itemObject.estimate_prepare_time">
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
                            <input class="input" type="text" placeholder="Item Price" v-model="itemObject.item_price">
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
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="updateItem">Submit</button>
            </footer>
        </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "UpdateItemModal",
        data() {
            return {
                selectedFile: null,
                filename: 'No file is selected ...',
                imageUrl: '',
            }
        },
        props: [
            'itemObject'
        ],
        methods: {
            updateItem() {
                let ept = this.convertPrepareTime(this.itemObject.estimate_prepare_time);

                this.itemObject.estimate_prepare_time = ept;
                this.itemObject.item_img = this.imageUrl;
                this.itemObject.item_price = parseFloat(this.itemObject.item_price);

                console.log(this.itemObject);
                axios({
                    method: "PUT",
                    url: "http://localhost:12345/auth/item/"+this.itemObject._id,
                    data: this.itemObject,
                }).then(res => {
                    console.log(res.data);
                    // this.itemsList.push(itemData)
                });
                this.$buefy.toast.open({
                    message: 'Your user has been updated!',
                    type: 'is-success'
                })
            },

            convertPrepareTime(minutes) {
                // return prepare time in milliseconds
                return parseInt(minutes) * 60 * 1000;
            },

            // selects picture
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
                });
            },
        }
    }
</script>

<style scoped>

</style>