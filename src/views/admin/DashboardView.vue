<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/admin" class="navbar-brand" href="#">後台</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link active" aria-current="page">後台景點列表</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link" href="#">後台優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/order" class="nav-link" href="#">訂單</router-link>
          </li> -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" href="#">回到前台</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="signOut">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
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
    signOut() {
      document.cookie = 'accessToken=;refreshToken=;';
      this.$router.push('/');
    },
  },

  mounted() {
    this.checkLogin();
  },
};
</script>

<style></style>
