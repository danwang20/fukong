<template>
  <section class="message-box c--message-box">
    <div
      class="message-container message-container-dev"
    >
      <el-button
        size="lager"
        class="message-title"
        @click="linkHandler(item.pageModelCode,item.resId)"
      >
        <!-- {{ curOption.title }} -->
       {{item.resDesc}}
      </el-button>
      <div class="message-content">
        <li
          v-for="(list, index) in item.deviceInfo"
          :key="index"
          class="message-list"
        >
          {{ list.devTitle }}
        </li>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    item: {
      
    },
    // deviceInfo: {
     
    // },
  },
  data () {
    return {
      defaultOption: {
        title: '标题',
        type: 'msg',
        template: null,
        labelKey: 'label',
        valueKey: 'value'

      },
      lists: []
    }
  },
  computed: {
  },
  watch: {

  },
  created () {
  },
  methods: {
    linkHandler (path,resId) {
      // this.$store.commit('savePageMessage',resId)
      // sessionStorage.setItem('pid',resId)
      console.log(resId);
      if (!path) return false
      this.$router.push({path:`/${path}`,
          query: {
            resId:resId
          }
          })

    },
  }
}
</script>

<style lang="less" scoped>
.message-box{
  position: relative;
  height: 100%;
}
.message-container{
  position: relative;
  height: 100%;
  overflow: auto;
}
.message-title{
  position: relative;
  text-align: center;
  font-size: 16px;
  margin: calc(var(--small-space) * 2) 0;
}
.message-content{
  position: relative;
  height: auto;
  padding: 0 calc(var(--large-space) * 2);
}
.message-list{
  position: relative;
  height: auto;
  padding-bottom: var(--small-space);
  font-size: 12px;
  color: var(--message-box-color);
}
.message-container-msg{
  border: 1px solid var(--message-box-border);
  padding-bottom: var(--extra-space);
  background-color: var(--message-box-background-color);
}
.message-container-log{
  display: flex;
  flex-direction: column;
  border: 1px solid var(--message-box-border);
  // title
  .message-title{
    font-size: 14px;
    margin: 0;
    padding: var(--middle-space) 0;
    background-color: var(--message-box-title-background-color2);
  }
  //
  .message-content{
    flex: 1;
    overflow: auto;
    background-color: var(--message-box-background-color);
    .message-list{
      padding: calc(var(--middle-space) * 1.5) 0 0 0;
      line-height: 1.2;
      letter-spacing: .6px;
      font-size: 12px;
    }
  }
}
.message-container-dev{
  text-align: center;
  border-bottom: 1px solid var(--message-box-border);
  .message-title{
    display: inline-block;
    /*background-color: var(--message-box-title-background-color);*/
    padding: var(--middle-space) calc(var(--large-space) * 2);
    &:hover{
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .message-content{
    position: relative;
    height: auto;
    text-align: left;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    .message-list{
      width: 50%;
      padding: var(--small-space) var(--large-space);
      font-size: 12px;
      border-radius: 4px;
      margin-bottom: var(--middle-space);
      text-align: center;
    }
    .message-dev-full{
      width: 100%;
    }
    .message-dev-warning{
      background-color: var(--warn-color-default)
    }
    .message-dev-error{
      background-color: var(--error-color-default);
    }
  }
}

.message-status{
  position: relative;
  height: auto;
  display: flex;
  justify-content: space-between;
  >div{
    position: relative;
    padding-top: 30px;
    &:before{
      position: absolute;
      top: 0;
      left: 50%;
      width: 20px;
      height: 20px;
      transform: translateX(-50%);
      display: block;
      content: '';
      border-radius: 50%;
      background-color: var(--message-box-status-default-color);
    }
  }
  .message-running:before{
    background-color: var(--message-box-status-success-color);
  }
  .message-error:before{
    background-color: var(--message-box-status-error-color);
  }
  .message-auto:before{
    background-color: var(--message-box-status-success-color);
  }
  .message-oper:before{
    background-color: var(--message-box-status-success-color);
  }
}
</style>
