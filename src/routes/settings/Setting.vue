<template>
    <div>
        <Header/>

        <div class="settings-page">
            <div class="settings">
                <div class="head"><i class="fa fa-cog"></i> Settings</div>

                <div class="wrapper">
                    <div class="links">
                        <div class="link">Change Card Details</div>
                        <!-- <div class="link">Change Signature</div> -->
                    </div>

                <div class="error" v-if="error">
                    <span>{{ error }}</span>
                    <span class="close" @click="error = ''">&times;</span>
                </div>

                <div class="msg" v-if="msg">
                    {{msg }}
                </div>

                    <div class="action">
                        <div class="form">
                            <form>
                                <div>
                                    <div>
                                    <label for="declaration">Declaration</label>
                                    <div>
                                        <input type="text" placeholder="Declaration" v-model="info.declaration">
                                    </div>
                                </div>
                                <div>
                                    <label for="declaration">Company Name</label>
                                    <div>
                                        <input type="text" placeholder="Company Name" v-model="info.companyName">
                                    </div>
                                </div>
                                <div>
                                    <label for="declaration">Address</label>
                                    <div>
                                        <input type="text" placeholder="Address" v-model="info.address">
                                    </div>
                                </div>
                                <div>
                                    <label for="declaration">Phone Number</label>
                                    <div>
                                        <input type="text" placeholder="Phone Number" v-model="info.phoneNumber">
                                    </div>
                                </div>
                                <div>
                                    <label for="declaration">Branch</label>
                                    <div>
                                        <input type="text" placeholder="Branch" v-model="info.branch">
                                    </div>
                                </div>
                                <div>
                                    <label for="declaration">Signature</label>
                                    <div>
                                        <input type="file" @change="onFileChange">
                                    </div>
                                </div>
                                </div>
                                <div>
                                    <button class="btn" @click.prevent="addNew">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'
import axios from 'axios'

export default {
    components: {
        Header
    },
    data() {
        return {
            info: {
                declaration: "",
                companyName: "",
                address: "",
                phoneNumber: "",
                branch: "",
                signature: ""
            },
            error: "",
            msg: "",
        }
    },
    created(){
        axios.get('https://nameless-basin-94170.herokuapp.com/api/card/structure')
        .then((res) => {
            this.info.declaration = res.data[res.data.length - 1].declaration
            this.info.companyName = res.data[res.data.length - 1].companyName
            this.info.address = res.data[res.data.length - 1].address
            this.info.phoneNumber = res.data[res.data.length - 1].phoneNumber
            this.info.branch = res.data[res.data.length - 1].branch
        })
        .catch(err => this.error = err)
    },
    methods: {
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if(!files.length)
                return
            this.info.signature = files[0]
            // this.createImage(files[0])
        },
        addNew(){
            if(this.info.signature == ""){
                return this.error = "No signature selected!"
            }
            const formData = new FormData();
            formData.append("declaration", this.info.declaration)
            formData.append("companyName", this.info.companyName)
            formData.append("address", this.info.address)
            formData.append("phoneNumber", this.info.phoneNumber)
            formData.append("branch", this.info.branch)
            formData.append("signature", this.info.signature)
            axios.post(`http://localhost:5000/api/card/structure`, formData)
            .then(() => {
                this.msg = "Information Saved Successfully"
            })
            .catch(err => this.error = err)
        }
    }
}
</script>

<style scoped>
    .settings-page {
        padding: 20px;
    }

    .settings {
        min-height: 400px;
        background: #fff;
        box-shadow: 0 0 6px 0 #ccc;
        /* padding: 10px; */
        border-radius: 10px;
    } 

    .head {
        padding: 10px;
        border-bottom: 2px solid green;
        font-weight: bold;
        /* width: 150px; */
    }

    .fa-cog {
        margin-right: 10px;
    }

    .wrapper {
        display: flex;
    }

    .links {
        border-right: 2px solid #ccc;
        flex: 1;
    }

    .link {
        padding: 20px 10px;
        font-weight: bold;
        border-bottom: 1px solid #f3f3f3;
    }

    .link:hover {
        background: #ccc;
        cursor: pointer;
    }

    .action {
        flex: 4;
        padding: 3em 20px;
    }

    form label {
        font-weight: bold;
    }

    form > div:first-child {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2em;
    }

    form input {
        padding: 10px;
        border: 2px solid #ccc;
        font-size: 15px;
        width: 100%;
        font-family: inherit;
        margin-top: 10px;
        border-radius: 5px;
    }

    form > div:nth-child(2) {
        text-align: center;
        margin-top: 20px;
    }

    form button {
        width: 200px;
        background-color: green;
        color: #fff;
    }

    form button:hover {
        background-color: #06aa06;
    }

     .error {
        top: 0;
        height: 50px;
        margin-left: 5px;
    }

    .error span:first-child {
        padding: 5px;
    }
</style>