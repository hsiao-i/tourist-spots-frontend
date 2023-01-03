<template>
  <h2>景點列表</h2>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">景點名稱</th>
        <th scope="col">描述</th>
        <!-- <th scope="col">圖片網址</th> -->
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="spot in touristSpots" :key="spot.id">
        <td width="100px">{{ spot.position }}</td>
        <td>{{ spot.description }}</td>
        <!-- <td>{{ spot.img_url }}</td> -->
        <td class="text-end" width="120px">
          <button type="button" class="btn btn-success btn-sm me-2" @click="editTouristSpot('showData', spot.id)">編輯</button>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteTouristSpot(spot.id)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="w-50 my-5">
    <h3>新增編輯區塊</h3>
    <div class="mb-3">
      <label for="title" class="form-label w-100">
        景點名稱
        <input type="text" class="form-control" v-model="addTouristSpot.position" />
      </label>
    </div>
    <div class="mb-3">
      <label for="img" class="form-label w-100">
        圖片網址
        <input type="text" class="form-control" v-model="addTouristSpot.img_url" />
      </label>
    </div>
    <div>
      <label for="description" class="w-100">
        景點描述
        <textarea name="description" id="description" class="form-control" style="height: 150px" v-model="addTouristSpot.description"></textarea>
      </label>
    </div>

    <div>
      <button type="button" class="btn btn-success" v-if="addOrEditStatus" @click="addSingleTouristSpot">新增</button>
      <button type="button" class="btn btn-success" v-else @click="editTouristSpot('revise')">更新內容</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touristSpots: [],
      addOrEditStatus: true,
      addTouristSpot: {
        position: '',
        description: '',
        img_url: '',
      },
      tempSpot: {},
    };
  },
  methods: {
    getTouristSpots() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/tourist-spots`)
        .then((res) => {
          this.touristSpots = res.data.spots;
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addSingleTouristSpot() {
      const url = `${process.env.VUE_APP_API}/api/add-tourist-spot`;
      this.$http
        .post(url, this.addTouristSpot)
        .then((res) => {
          this.getTouristSpots();
          this.addTouristSpot = {};
          alert('成功新增景點');
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTouristSpot(state, id) {
      this.addOrEditStatus = false;

      const urlSingleSpot = `${process.env.VUE_APP_API}/api/tourist-spot/${id}`;

      if (state === 'showData') {
        this.$http
          .get(urlSingleSpot)
          .then((res) => {
            this.tempSpot = res.data.spot;
            this.addTouristSpot = this.tempSpot;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (state === 'revise') {
        const spotId = this.addTouristSpot.id;
        console.log(state, spotId);
        const url = `${process.env.VUE_APP_API}/api/revise-tourist-spot/${spotId}`;

        this.$http
          .put(url, this.addTouristSpot)
          .then((res) => {
            this.addTouristSpot = {};
            this.addOrEditStatus = true;
            this.getTouristSpots();
            alert('成功更新景點資料');
            console.log(res);
            // alert(`${res.data.success.Success}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteTouristSpot(id) {
      const url = `${process.env.VUE_APP_API}/api/delete-tourist-spot/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          alert('成功刪除');
          this.getTouristSpots();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTouristSpots();
    // this.addOrEditStatus = true;
  },
};
</script>

<style></style>
