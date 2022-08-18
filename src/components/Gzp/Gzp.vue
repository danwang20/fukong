<template>
  <section id="gzp-box" class="gzp-box" style="height: 100%">
    <span v-if="isShow" class="gzp-title">光字牌</span>
    <div class="gzp-content">
      <div
        v-for="(list, index) in option"
        :key="index"
        :id="'gzp' + index"
        @click="asd(list)"
        class="gzp-list"
      >
        {{ list.labelKey }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GzpBox",
  props: {
    option: {
      type: Array,
      default: () => {
        return [];
      },
    },
    methods: {
      type: Object,
      default: () => {
        return {};
      },
    },
    api: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      lists: [],
      defaultOption: {
        labelKey: "gzpname",
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    asd(object) {
      console.log(object.labelKey);
      let sid = object.labelKey;
      if (sid == 1) {
        document.getElementById("gzp3").style.animation =
          "blink 1s infinite linear";
        document.getElementById("gzp4").style.animation =
          "blink 1s infinite linear";
        document.getElementById("gzp5").style.animation =
          "blink 1s infinite linear";
        document.getElementById("gzp3").style.order = "-1";
        document.getElementById("gzp4").style.order = "-1";
        document.getElementById("gzp5").style.order = "-1";
      } else if (sid == 2) {
        document.getElementById("gzp3").style.animation = "";
        document.getElementById("gzp4").style.animation = "";
        document.getElementById("gzp5").style.animation = "";
        document.getElementById("gzp3").style.order = "";
        document.getElementById("gzp4").style.order = "";
        document.getElementById("gzp5").style.order = "";
      }
    },
  },
};
</script>

<style scoped>
.gzp-box {
  position: relative;
  width: 100%;
  /* height: 500px; */
  /* top: 50px; */
  /* left: 100px; */
  display: flex;
  flex-direction: column;
  /* background-color: var(--table-default-background-color); */
  border: 1px solid var(--gzp-default-border);
}
.gzp-box h4 {
  position: relative;
  height: auto;
  text-align: center;
  font-size: 1.3em;
  margin: 0;
  padding: var(--extra-space) 0;
}
.gzp-title {
  background-color: blue;
  text-align: center;
  height: 20px;
  padding: 1px 0px;
}
.gzp-content {
  position: relative;
  flex: 1;
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
  /* padding-top: var(--extra-space); */
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  /* background-color: blue; */
}
.gzp-list {
  position: relative;
  display: inline-block;
  width: 180px;
  height: 30px;
  text-align: center;
  padding: var(--middle-space) var(--extra-space);
  background-color: var(--gzp-default-background-color);
  border: 1px solid var(--gzp-default-border);
  border-radius: 2px;
  /* margin-left: var(--middle-space); */
  /* margin-left: 3px; */
  /* margin-right: 3px; */
  /* margin-bottom: var(--extra-space); */
  font-size: 12px;
  color: white;
  /* min-height: 50px; */
}
/* .gzp-list:hover {
  animation: blink 1s infinite linear;
} */
.gzp-list-abnormal {
  animation: blink 1s infinite linear;
  border-color: var(--error-color-default);
}
</style>