import Vue from "vue";
import VueRouter from "vue-router";
import MapRouter from "./map";
import ChinaRouter from "./china" ;

Vue.use(VueRouter);

const routes = [
  MapRouter,
  ChinaRouter,
  {
    path:"/*",
    redirect:"/map"
  }
];

const router = new VueRouter({
  routes
});

export default router;
