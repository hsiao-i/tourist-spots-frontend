<template>
  <div class="container mt-5 min-vh-100">
    <h2>我的收藏</h2>
    <div v-if="favoriteSpots.length === 0"><p class="text-center text-secondary">目前無收藏</p></div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th scope="col" width="100px">景點名稱</th>
          <th scope="col">描述</th>
          <th scope="col">圖片網址</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="favorite in favoriteSpots" :key="favorite.id">
          <td>
            <router-link :to="`/tourist-spot/${favorite.id}`">{{ favorite.position }}</router-link>
          </td>
          <td>{{ favorite.description }}</td>
          <td>{{ favorite.img_url }}</td>
          <td class="text-end">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteFavoriteSpot(favorite.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteSpots: [],
    };
  },
  methods: {
    getFavoriteSpots() {
      const url = `${process.env.VUE_APP_API}/api/get-favorite`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        this.$http
          .get(url)
          .then((res) => {
            console.log(res);
            this.favoriteSpots = res.data.favorite;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteFavoriteSpot(id) {
      // this.alreadyFavorite = true;
      const url = `${process.env.VUE_APP_API}/api/delete-favorite/${id}`;

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        this.$http
          .delete(url)
          .then((res) => {
            console.log(res);
            this.getFavoriteSpots();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
        const url = `${process.env.VUE_APP_API}/api/check-login`;
        this.$http
          .post(url)
          .then((res) => {
            console.log(res);
            this.checkSuccess = true;
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.msg === 'Token has expired') {
              console.log('過期');
              this.refreshToken();
            }
            // this.$router.push('/login');
          });
      } else {
        alert('尚未登入');
        this.$router.push('/login');
      }
    },
    refreshToken() {
      const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
      const refreshUrl = `${process.env.VUE_APP_API}/api/refresh`;

      this.$http
        .post(refreshUrl)
        .then((res) => {
          console.log(res);
          document.cookie = `accessToken=${res.data.access_token}`;
          document.cookie = `refreshToken=${refreshToken}`;
          console.log(document.cookie);
          this.checkLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.checkLogin();
    this.getFavoriteSpots();
  },
};
</script>

<style></style>
