<template>
  <div class="container mt-5 min-vh-100">
    <h2>{{ touristSpot.position }}</h2>

    <div class="mb-3">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="addFavoriteSpot" v-if="alreadyFavorite">收藏</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="deleteFavoriteSpot" v-else>已收藏</button>
    </div>

    <p>{{ touristSpot.description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touristSpot: {},
      alreadyFavorite: true,
    };
  },
  methods: {
    getTouristSpot() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/tourist-spot/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.touristSpot = res.data.spot;
          console.log(this.touristSpot);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addFavoriteSpot() {
      // this.$http.defaults.withCredentials = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/add-favorite/${id}`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        this.$http
          .post(url)
          .then((res) => {
            console.log(res);
            this.alreadyFavorite = false;
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.msg === 'Token has expired') {
              console.log('過期');
              this.refreshToken();
              this.addFavoriteSpot();
            }
            // if (err.response.data.error.error === '不可重複加入景點') {
            //   alert('此景點已被加入收藏');
            // }
          });
      } else {
        alert('請登入');
        this.$router.push('/login');
        console.log('沒有收到 token');
      }
    },
    deleteFavoriteSpot() {
      // this.alreadyFavorite = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/delete-favorite/${id}`;

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        this.$http
          .delete(url)
          .then((res) => {
            console.log(res);
            this.getFavoriteList();
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.msg === 'Token has expired') {
              console.log('過期');
              this.refreshToken();
              this.deleteFavoriteSpot(id);
            }
          });
      }
    },
    getFavoriteList() {
      const url = `${process.env.VUE_APP_API}/api/get-favorite`;

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        this.$http
          .get(url)
          .then((res) => {
            console.log(res);
            const isFavorite = res.data.favorite.map((item) => item.id);
            this.alreadyFavorite = !isFavorite.includes(this.touristSpot.id);
            // console.log(this.alreadyFavorite);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.msg === 'Token has expired') {
              console.log('過期');
              this.refreshToken();
              this.getFavoriteList();
            }
          });
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

          // this.checkLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getTouristSpot();
    this.getFavoriteList();
  },
};
</script>

<style></style>
