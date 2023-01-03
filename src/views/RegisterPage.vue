<template>
  <FrontNavbar />
  <div class="container mt-5 w-50">
    <h2>註冊</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="registerName" class="form-label w-100">
          姓名
          <input type="text" id="registerName" name="registerName" class="form-control" v-model="user.username" />
        </label>
      </div>
      <div class="mb-3">
        <label for="registerEmail" class="form-label w-100">
          帳號
          <input type="email" id="registerEmail" name="registerEmail" class="form-control" v-model="user.useremail" />
        </label>
      </div>
      <div class="mb-3">
        <label for="registerPassword" class="form-label w-100">
          密碼
          <input type="password" id="registerPassword" name="registerPassword" class="form-control" v-model="user.password" />
        </label>
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-100">註冊</button>
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
        username: '',
        useremail: '',
        password: '',
      },
    };
  },
  methods: {
    register() {
      const url = `${process.env.VUE_APP_API}/api/register`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          console.log(res);
          alert(`${res.data.success.success}，請重新登入`);
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
