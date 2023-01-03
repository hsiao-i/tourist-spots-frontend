<template>
  <FrontNavbar />
  <div class="container mt-5 w-50">
    <h2>登入</h2>
    <form @submit.prevent="signIn">
      <div class="mb-3">
        <label for="loginEmail" class="form-label w-100">
          帳號
          <input type="email" id="loginEmail" name="loginEmail" class="form-control" v-model="user.useremail" />
        </label>
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label w-100">
          密碼
          <input type="password" id="loginPassword" name="loginPassword" class="form-control" v-model="user.password" />
        </label>
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-100">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';

export default {
  components: {
    FrontNavbar,
  },
  data() {
    return {
      user: {
        useremail: '',
        password: '',
      },
      // loginEmail: '',
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_API}/api/login`;
      this.$http
        .post(url, this.user, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          const accessToken = res.data.success.access_token;
          const refreshToken = res.data.success.refresh_token;

          if (this.user.useremail === 'test1@mail.com') {
            document.cookie = `accessToken=${accessToken}`;
            document.cookie = `refreshToken=${refreshToken}`;

            this.$router.push({ path: '/admin' });
            alert('成功登入後台');
          } else {
            alert('成功登入');
            document.cookie = `accessToken=${accessToken}`;
            document.cookie = `refreshToken=${refreshToken}`;
            this.$router.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error.status === 401) {
            alert(err.response.data.error.error);
          }
        });
    },
  },
  mounted() {
    document.cookie = 'accessToken=;refreshToken=;';
  },
};
</script>

<style></style>
