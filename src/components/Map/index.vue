<template>
  <div class="map">
    <div id="map1"></div>
    <div>
      <ul>
        <li v-for="(item,i) in list" :key="i">
          <span>{{item.name}}</span><span>{{item.value}}</span>
        </li>
      </ul>
    </div>
    <div class="go">
      <router-link tag="h1" to="/china">中国地图</router-link>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import jsonp from "jsonp";
export default {
  name: "Map",
  data() {
    return {
      list: [],
      myChart: "",
      option: "",
      source: [
        { name: "上海", value: 1000 },
        { name: "四川", value: 1000 },
        { name: "山东", value: 1000 }
      ]
    };
  },
  mounted() {
    this.getSource();
    this.init();
    console.log(this.list);
    console.log(this.source);
  },
  methods: {
    init() {
      this.myChart = echarts.init(document.getElementById("map1"));
      // let that = this;
      this.option = {
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
        dataset: {
          source: this.list
        },
        visualMap: {
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
            // data: [
            //   // {name:'北京',value:1000}

            // ],
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
      // myChart.setOption(option);
    },
    getSource() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        (err, data) => {
          let mes = data.data.list.map(item => {
            return { name: item.name, value: item.value };
          });
          this.format(mes);

          // this.option.dataset[0].source = mes;
          this.myChart.setOption(this.option);
          // console.log(mes);
        }
      );
    },
    format(mes) {
      for (let i = 0; i < mes.length; i++) {
        this.list.push({ name: mes[i].name, value: mes[i].value });
      }

      // this.list.push({name:mes.name,value:mes.value});
    }
  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#map1 {
  width: 100%;
  height: 500px;
  background-color: cadetblue;
}
ul{
  box-sizing: border-box;
  border: 2px solid red;
  display: flex;
  width: 100%;
  height: 200px;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  background-color: cadetblue;
}
ul li{
  display: flex;
  width: 100px;
  height: 25px;
  justify-content: flex-start;
  align-items: center;
}
ul li span{
  margin-left: 3px;
}

</style>