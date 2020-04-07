<template>
  <div id="china">
    <div class="map">
      <h1>this is map page</h1>
    </div>
    <div class="go">
      <router-link to="/map" tag="h1">go to map</router-link>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import jsonp from 'jsonp';

let option = {
        title: {
          text: "中国疫情情况图",
          x: "center",
          textStyle: {
            color: "red"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "地区：{b}<br/>确诊：{c}"
        },
        // dataset:{
        //         source:[
        //             // {name:'北京',value:10000}
        //             this.list
        //         ]
        //     },
        visualMap: {
          // min: 800,
          // max: 50000,
          // text: ['High', 'Low'],
          // realtime: false,
          // calculable: true,
          // inRange: {
          //     color: ['lightskyblue', 'yellow', 'orangered']
          // }
          type: "piecewise",
          pieces: [
            { min: 1500 }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 900, max: 1500 },
            { min: 310, max: 1000 },
            { min: 200, max: 300 },
            { min: 10, max: 200 },
            { value: 0 }
          ],
          inRange: {
            color: ["#fff", "#ffaa75", "#660208"]
          }
        },
        series: [
          {
            type: "map",
            map: "china",
            data:[
                // {name:'北京',value:1000}
                // that.list
                ],
            label: {
              show: true,
              color: "#ff461f",
              fontSize: 12
            },
            zoom: 1.2,
            itemStyle: {
              areaColor: "#3eede7",
              borderColor: "blue"
            },
            emphasis: {}
          }
        ]
      };

export default {
  name: "Chian",
  data() {
    return {
        list:'',
        MyCharts:''
    };
  },
  
  mounted() {
    this.getData();
    // console.log(this.source); 
    this.MyCharts = echarts.init(document.getElementsByClassName("map")[0]);
  },
  methods: {
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        (err, data) => {
            let source =  data.data.list.map(item =>{
                return {name:item.name,value:item.value}
            })
            this.format(source);
            option.series[0].data = source;
            this.MyCharts.setOption(option);
            // console.log(source);
        }
      );
    },
    format(source){
        console.log(source);
        this.list = source;
    }


  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 550px;
  background-color: cornflowerblue;
}
</style>