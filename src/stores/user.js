import { defineStore } from 'pinia';

export default defineStore('User Store', {
  state: () => {
    return {
      tempTouristSpot: {},
    };
  },
});
