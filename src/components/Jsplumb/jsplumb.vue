<template>
  <div id="container">
    <div v-for="items in container" :key="items.index">
      <div class="locker_col">
        <div
          class="locker_cell"
          v-for="item in items"
          :key="item.index"
          :id="item.nodeId"
        >
          <b>
            {{ item.name }}
          </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb";
export default {
  name: "FlowChart",
  inject: ["reload"],
  data() {
    return {
      jsPlumb: null,
      container: [
        [
          {
            name: "变压器故障起火",
            nodeId: "1001",
          },
        ],
        [
          {
            name: "重瓦斯动作",
            nodeId: "2001",
          },
          {
            name: "断路器分位",
            nodeId: "2002",
          },
          {
            name: "压力释放动作",
            nodeId: "2003",
          },
          {
            name: "火灾报警",
            nodeId: "2004",
          },
          {
            name: "火灾报警",
            nodeId: "2005",
          },
          {
            name: "火灾报警",
            nodeId: "2006",
          },
          {
            name: "火灾报警",
            nodeId: "2007",
          },
        ],
        [
          {
            name: "排油阀开启",
            nodeId: "3001",
          },
        ],
        [
          {
            name: "断油阀开启",
            nodeId: "4001",
          },
        ],
        [
          {
            name: "注氮阀开启",
            nodeId: "5001",
          },
        ],
        [
          {
            name: "注氮10分钟以上，达到防爆灭火效果",
            nodeId: "6001",
          },
        ],
        [
          {
            name: "灭火成功",
            nodeId: "7001",
          },
        ],
      ],
      connlist: [
        {
          sourceNodeId: "1001",
          targetNodeId: "2001",
        },
        {
          sourceNodeId: "1001",
          targetNodeId: "2002",
        },
        {
          sourceNodeId: "1001",
          targetNodeId: "2003",
        },
        {
          sourceNodeId: "1001",
          targetNodeId: "2004",
        },
        {
          sourceNodeId: "1001",
          targetNodeId: "2005",
        },
        {
          sourceNodeId: "1001",
          targetNodeId: "2006",
        },
        {
          sourceNodeId: "1001",
          targetNodeId: "2007",
        },
        {
          sourceNodeId: "2001",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "2002",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "2003",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "2004",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "2005",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "2006",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "2007",
          targetNodeId: "3001",
        },
        {
          sourceNodeId: "3001",
          targetNodeId: "4001",
        },
        {
          sourceNodeId: "4001",
          targetNodeId: "5001",
        },
        {
          sourceNodeId: "5001",
          targetNodeId: "6001",
        },
        {
          sourceNodeId: "6001",
          targetNodeId: "7001",
        },
      ],
      box_clientWidth: 0,
    };
  },
  created() {
    this.jsPlumb = jsPlumb.getInstance({
      Container: "container", //选择器id
      EndpointStyle: {
        radius: 1,
        fill: "white",
      }, //端点样式
      PaintStyle: {
        stroke: "white",
        strokeWidth: 1,
      }, // 绘画样式，默认8px线宽  #456
      HoverPaintStyle: {
        stroke: "black",
      }, // 默认悬停样式  默认为null
      EndpointHoverStyle: {
        fill: "black",
        radius: 1,
      }, // 端点悬停样式
      ConnectionOverlays: [
        [
          "Arrow",
          {
            location: 1,
            paintStyle: {
              stroke: "white",
              fill: "white",
            },
          },
        ],
      ],
      Connector: [
        "Flowchart",
        {
          gap: 1,
        },
      ], //要使用的默认连接器的类型：折线，流程等
      DrapOptions: {
        cursor: "crosshair",
        zIndex: 2000,
      },
    });
  },
  mounted() {
    let ins = this.jsPlumb;
    //   allConnection = ins.getAllConnections();
    ins.batch(() => {
      this.initAll();
      this.connectionAll();
    });
    this.switchContainer(true, true, false);
  },
  methods: {
    initAll() {
      let container = this.container;
      container.forEach((item, index) => {
        for (let i = 0; i < item.length; i++) {
          this.init(item[i].nodeId);
        }
      });
      // this.reload()
    },
    // 初始化规则使其可以连线、拖拽
    init(id) {
      let ins = this.jsPlumb,
        elem = document.getElementById(id);
      ins.makeSource(elem, {
        anchor: [
          "RightMiddle",
          {
            anchorCount: 150,
            shape: "Rectangle",
          },
        ],
        allowLoopback: false,
        maxConnections: 1,
      });
      ins.makeTarget(elem, {
        anchor: [
          "LeftMiddle",
          {
            anchorCount: 150,
            shape: "Rectangle",
          },
        ],
        allowLoopback: false,
        maxConnections: 1,
      });
    },
    connectionAll() {
      let ins = this.jsPlumb;
      ins.ready(() => {
        for (let i = 0; i < this.connlist.length; i++) {
          let conn = this.connlist[i],
            connection = ins.connect({
              source: conn.sourceNodeId,
              target: conn.targetNodeId,
            });
          connection.setPaintStyle({
            stroke: "white",
            strokeWidth: 1,
          });
        }
      });
    },
    switchContainer(target, source, draggable) {
      let elem = document.getElementsByName("cell"),
        ins = this.jsPlumb;
      ins.setSourceEnabled(elem, source);
      ins.setTargetEnabled(elem, target);
      ins.setDraggable(elem, draggable);
    },
  },
};
</script>

<style>
#container {
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100% - 18px;
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
  /* border: 1px solid var(--gzp-default-border); */
  /* background-color: orange; */
}

.locker_col {
  margin-left: 30px;
  margin-right: 30px;
}

.locker_cell {
  /* width: 150px; */
  flex: 1;
  line-height: 30px;
  min-width: 90px;
  max-width: 130px;
  white-space: pre-wrap;
  background: white;
  color: black;
  margin-top: 10px;
  /* margin-bottom: 10px; */
  margin-bottom: 10px;
  padding-left: 2px;
  padding-right: 2px;
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
}
</style>
