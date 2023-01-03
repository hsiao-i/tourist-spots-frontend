<template>
  <div class="container mt-5 min-vh-100">
    <h2>觀光景點</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4 h-100">
      <div class="col" v-for="spot in touristSpots" :key="spot.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ spot.position }}</h5>
            <p class="card-text text-truncate">
              {{ spot.description }}
            </p>
            <div class="text-end">
              <router-link :to="`/tourist-spot/${spot.id}`" class="nav-link text-primary">查看更多</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const API_URL = 'http://127.0.0.1:5000';
export default {
  data() {
    return {
      isLoading: false,
      touristSpots: [],
    };
  },
  methods: {
    getTouristSpots() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/tourist-spots`)
        .then((res) => {
          this.touristSpots = res.data.spots;
          console.log(this.touristSpots);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTouristSpots();
  },
};
</script>
