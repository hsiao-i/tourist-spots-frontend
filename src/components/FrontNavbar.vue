<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #f0f0f0">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LOGO</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        data-bs-parent="#selector"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavHam"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav navbar-right mb-2 mb-lg-0" ref="collapse">
          <li class="nav-item">
            <router-link to="/" class="nav-link">景點</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorite" class="nav-link">我的收藏</router-link>
          </li>
          <template v-if="notSavedAccessToken">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">註冊</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">登入</router-link>
            </li>
          </template>
          <template v-if="!notSavedAccessToken">
            <li class="nav-item">
              <router-link to="/login" class="nav-link" @click="signOut">登出</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import mixinCollapse from '@/mixins/mixinCollapse';

export default {
  mixins: [mixinCollapse],
  data() {
    return {
      notSavedAccessToken: true,
    };
  },
  methods: {
    getCookie() {
      const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      // console.log(refreshToken === '');
      if (refreshToken !== '') {
        this.notSavedAccessToken = false;
      }
    },
    signOut() {
      document.cookie = 'accessToken=;';
      document.cookie = 'refreshToken=;';
      this.notSavedAccessToken = true;
      this.$router.push('/');
      console.log(document.cookie);
    },
  },
  mounted() {
    this.getCookie();
  },
};
</script>

<style></style>
