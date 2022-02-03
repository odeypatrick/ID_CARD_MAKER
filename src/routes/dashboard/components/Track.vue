<template>
    <div class="track">
        <div class="item">
            <span class="text">Total Employees</span>
            <div>
                <h1>{{ employee }}</h1>
            </div>
        </div>
        <div class="item">
            <span class="text">Total Visitors</span>
            <div>
                <h1>{{ visitor }}</h1>
            </div>
        </div>
        <div class="item">
            <span class="text">Total Vendors</span>
            <div>
                <h1>{{ vendor }}</h1>
            </div>
        </div>
        <div class="item">
            <span class="text">Total Printed</span>
            <div>
                <h1>0</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employee: Number,
        visitor: Number,
        vendor: Number
    }
}
</script>

<style scoped>
    .track {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
    }

    .track .item {
        height: 150px;
        width: 200px;
        background-color: #fff;
        text-align: center;
        padding-top: 25px;
        border-radius: 20px;
        box-shadow: 0 0 6px 0 #ccc;
    }

    .text {
        /* font-size: 12px; */
        color: #545454;
        font-weight: bold;
    }

    .item h1 {
        color: #00a000;
        padding-top: 10px;
    }
</style>