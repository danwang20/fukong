<template>
    <div class="xhsxt">
        <div class="xhsxt_left"></div>
         <div class="xhsxt_right"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.xhsxt {
    width: 100%;
    height: 100%;
    display: flex;
    .xhsxt_left {
        flex: 1;
        background-color: red;
    }
    .xhsxt_right {
        flex: 1;
        background-color: green;
    }
}
</style>