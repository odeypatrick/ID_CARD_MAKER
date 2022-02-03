<template>
  <div class="edit-page">
      <!-- <center>
          <h2 style="padding-bottom: 20px">Edit Record</h2>
      </center> -->
      <form>
        <div>
            <div>
                <label>Name</label>
                <div>
                    <input type="text" placeholder="Name">
                </div>
            </div>
            <div>
                <label>Card No/ID</label>
                <div>
                    <input type="text" placeholder="Card ID">
                </div>
            </div>
            <div>
                <label>Department</label>
                <div>
                    <input type="text" placeholder="Department">
                </div>
            </div>
            <div>
                <label>Rank</label>
                <div>
                    <input type="text" placeholder="Rank">
                </div>
            </div>
            <div>
                <label>Picture</label>
                <div>
                    <input type="file" ref="file">
                </div>
            </div>
            <div>
                <label>Signature</label>
                <div>
                    <input type="file" ref="signature">
                </div>
            </div>
            <div>
                <label>Expiry Date</label>
                <div>
                    <input type="text" placeholder="07/23">
                </div>
            </div>
        </div>
        <div>
            <button>
                Edit Record
            </button>
        </div>
      </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    form > div {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1em;
    }

    form > div:nth-child(2) {
        text-align: center;
        margin-top: 10px;
        width: 100%;
    }

    form button {
        width: 200px;
        background-color: #145e6f;
        color: #fff;
    }

    form button:hover {
        background-color: #1d879e;
        transition: 0.4s ease-in-out;
    }

    form input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
        font-family: inherit;
        font-size: 15px;
    }

    form label {
        font-weight:bold;
    }
</style>