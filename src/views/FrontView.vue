<template>
  <FrontNavbar />
  <router-view />
  <FrontFooter />
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter,
  },
};
</script>
<style lang="scss">
.animoBouncingLoader::after,
.animoBouncingLoader::before,
.animoBouncingLoader > div {
  display: inline-block;
  width: 13px;
  height: 13px;
  background: #f39c12;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.animoBouncingLoader::after,
.animoBouncingLoader::before,
.animoBouncingLoader > div {
  content: '';
}
.animoBouncingLoader > div {
  margin: 0 5px;
}
.animoBouncingLoader > div {
  animation-delay: 0.2s;
}
.animoBouncingLoader::after {
  animation-delay: 0.4s;
}
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
}
</style>
