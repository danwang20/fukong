<template>
  <section class="c-fireControl">
    <div class="c-fireControl-left">
      <div class="c-fireControl-left-top">
        <Gzp />
      </div>
      <div class="c-fireControl-left-bottom">
        <div class="c-fireControl-left-bottom-left"></div>
        <div class="c-fireControl-left-bottom-right">
          <Descriptions :descriptionCigfer="descriptionData.config3" />
        </div>
      </div>
    </div>
    <section class="c-fireControl-right">
      <Descriptions :descriptionCigfer="descriptionData.config1" />
      <Descriptions :descriptionCigfer="descriptionData.config2" />
      <Descriptions :descriptionCigfer="descriptionData.config1" />
      <Descriptions :descriptionCigfer="descriptionData.config1" />
      <Descriptions :descriptionCigfer="descriptionData.config1" />
    </section>
  </section>
</template>

<script>
import descriptionsFormData from "../../components/Descriptions/descriptionsFormConfig";
import Descriptions from "../../components/Descriptions/descriptionsForm.vue";
import Gzp from "../../components/Gzp/Gzp.vue";
export default {
  components: {
    Descriptions,
    Gzp,
  },
  data() {
    return {
      descriptionData: {
        config1: descriptionsFormData.descriptionsConfig1,
        config2: descriptionsFormData.descriptionsConfig2,
        config3: descriptionsFormData.descriptionsConfig3,
      },
    };
  },
};
</script>

<style scoped>
.c-fireControl {
  display: flex;
  height: 100%;
}
.c-fireControl-left {
  display: flex;
  flex-direction: column;
  flex: 3;
  /* width: 800px; */
  /* background-color: black; */
}
.c-fireControl-left-top {
  flex: 1;
  position: relative;
  /* background-color: pink; */
  display: flex;
}
.c-fireControl-left-bottom {
  flex: 1;
  display: flex;
}
.c-fireControl-left-bottom-left {
  /* background-color: yellow; */
  flex: 3;
}
.c-fireControl-left-bottom-right {
  /* background-image: url("../../assets/images/ZongLan/bg.png"); */
  /* background-color: green; */
  flex: 1;
}
.c-fireControl-right {
  flex: 2;
  /* background-color: rgb(71, 134, 207); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-image: url("../../assets/images/ZongLan/bg.png"); */
}
.c-descriptions {
  border: 1px solid var(--table-default-border);
}
</style>