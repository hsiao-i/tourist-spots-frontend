"use strict";(self["webpackChunkhexschool_project_frontend"]=self["webpackChunkhexschool_project_frontend"]||[]).push([[566],{8566:function(e,r,s){s.r(r),s.d(r,{default:function(){return h}});var t=s(6252),a=s(9963);const o={class:"container mt-5 w-50"},l=(0,t._)("h2",null,"註冊",-1),n={class:"mb-3"},i={for:"registerName",class:"form-label w-100"},u={class:"mb-3"},c={for:"registerEmail",class:"form-label w-100"},m={class:"mb-3"},d={for:"registerPassword",class:"form-label w-100"},p=(0,t._)("div",null,[(0,t._)("button",{type:"submit",class:"btn btn-primary w-100"},"註冊")],-1);function b(e,r,s,b,f,w){const _=(0,t.up)("FrontNavbar");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t.Wm)(_),(0,t._)("div",o,[l,(0,t._)("form",{onSubmit:r[3]||(r[3]=(0,a.iM)(((...e)=>w.register&&w.register(...e)),["prevent"]))},[(0,t._)("div",n,[(0,t._)("label",i,[(0,t.Uk)(" 姓名 "),(0,t.wy)((0,t._)("input",{type:"text",id:"registerName",name:"registerName",class:"form-control","onUpdate:modelValue":r[0]||(r[0]=e=>f.user.username=e)},null,512),[[a.nr,f.user.username]])])]),(0,t._)("div",u,[(0,t._)("label",c,[(0,t.Uk)(" 帳號 "),(0,t.wy)((0,t._)("input",{type:"email",id:"registerEmail",name:"registerEmail",class:"form-control","onUpdate:modelValue":r[1]||(r[1]=e=>f.user.useremail=e)},null,512),[[a.nr,f.user.useremail]])])]),(0,t._)("div",m,[(0,t._)("label",d,[(0,t.Uk)(" 密碼 "),(0,t.wy)((0,t._)("input",{type:"password",id:"registerPassword",name:"registerPassword",class:"form-control","onUpdate:modelValue":r[2]||(r[2]=e=>f.user.password=e)},null,512),[[a.nr,f.user.password]])])]),p],32)])],64)}s(7658);var f=s(7077),w={components:{FrontNavbar:f.Z},data(){return{user:{username:"",useremail:"",password:""}}},methods:{register(){const e="https://tourist-spots-backend.onrender.com/api/register";this.$http.post(e,this.user).then((e=>{console.log(e),alert(`${e.data.success.success}，請重新登入`),this.$router.push("/login")})).catch((e=>{console.log(e)}))}}},_=s(3744);const g=(0,_.Z)(w,[["render",b]]);var h=g}}]);
//# sourceMappingURL=566.fee63ca1.js.map