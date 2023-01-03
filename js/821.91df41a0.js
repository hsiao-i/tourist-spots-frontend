"use strict";(self["webpackChunkhexschool_project_frontend"]=self["webpackChunkhexschool_project_frontend"]||[]).push([[821],{7821:function(t,e,o){o.r(e),o.d(e,{default:function(){return p}});var s=o(6252),r=o(3577);const n={class:"container mt-5 min-vh-100"},i={class:"mb-3"};function a(t,e,o,a,c,h){return(0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("h2",null,(0,r.zw)(c.touristSpot.position),1),(0,s._)("div",i,[c.alreadyFavorite?((0,s.wg)(),(0,s.iD)("button",{key:0,type:"button",class:"btn btn-outline-secondary btn-sm",onClick:e[0]||(e[0]=(...t)=>h.addFavoriteSpot&&h.addFavoriteSpot(...t))},"收藏")):((0,s.wg)(),(0,s.iD)("button",{key:1,type:"button",class:"btn btn-secondary btn-sm",onClick:e[1]||(e[1]=(...t)=>h.deleteFavoriteSpot&&h.deleteFavoriteSpot(...t))},"已收藏"))]),(0,s._)("p",null,(0,r.zw)(c.touristSpot.description),1)])}o(7658);var c={data(){return{touristSpot:{},alreadyFavorite:!0}},methods:{getTouristSpot(){const{id:t}=this.$route.params,e=`https://tourist-spots-backend.onrender.com/api/tourist-spot/${t}`;this.$http.get(e).then((t=>{this.touristSpot=t.data.spot,console.log(this.touristSpot)})).catch((t=>{console.log(t)}))},addFavoriteSpot(){const{id:t}=this.$route.params,e=`https://tourist-spots-backend.onrender.com/api/add-favorite/${t}`,o=document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,"$1");o?(this.$http.defaults.headers.common.Authorization=`Bearer ${o}`,this.$http.post(e).then((t=>{console.log(t),this.alreadyFavorite=!1})).catch((t=>{console.log(t),"Token has expired"===t.response.data.msg&&(console.log("過期"),this.refreshToken(),this.addFavoriteSpot())}))):(alert("請登入"),this.$router.push("/login"),console.log("沒有收到 token"))},deleteFavoriteSpot(){const{id:t}=this.$route.params,e=`https://tourist-spots-backend.onrender.com/api/delete-favorite/${t}`,o=document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,"$1");o&&(this.$http.defaults.headers.common.Authorization=`Bearer ${o}`,this.$http.delete(e).then((t=>{console.log(t),this.getFavoriteList()})).catch((e=>{console.log(e),"Token has expired"===e.response.data.msg&&(console.log("過期"),this.refreshToken(),this.deleteFavoriteSpot(t))})))},getFavoriteList(){const t="https://tourist-spots-backend.onrender.com/api/get-favorite",e=document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,"$1");e&&(this.$http.defaults.headers.common.Authorization=`Bearer ${e}`,this.$http.get(t).then((t=>{console.log(t);const e=t.data.favorite.map((t=>t.id));this.alreadyFavorite=!e.includes(this.touristSpot.id)})).catch((t=>{console.log(t),"Token has expired"===t.response.data.msg&&(console.log("過期"),this.refreshToken(),this.getFavoriteList())})))},refreshToken(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=`Bearer ${t}`;const e="https://tourist-spots-backend.onrender.com/api/refresh";this.$http.post(e).then((e=>{console.log(e),document.cookie=`accessToken=${e.data.access_token}`,document.cookie=`refreshToken=${t}`})).catch((t=>{console.log(t)}))}},mounted(){this.getTouristSpot(),this.getFavoriteList()}},h=o(3744);const d=(0,h.Z)(c,[["render",a]]);var p=d}}]);
//# sourceMappingURL=821.91df41a0.js.map