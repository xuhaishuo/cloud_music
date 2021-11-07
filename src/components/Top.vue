<template>
  <div>
    <div class="top-container">
      <div class="left-box">
        <div class="icon-wrapper" style="margin-top:15px">
          <span class="iconfont icon-home" @click="goHome"></span>
          <span class="iconfont icon-sami-select"></span>
          <span class="iconfont icon-full-screen"></span>
        </div>
        <div class="history-wrapper">
          <span class="iconfont icon-arrow-lift" @click="go(-1)"></span>
          <span class="iconfont icon-arrow-right" @click="go(1)"></span>
        </div>
      </div>
      <div class="right-box">
        <div class="el-input el-input--small el-input--prefix">
          <input
            type="text"
            autocomplete="off"
            placeholder="搜索"
            class="el-input__inner"
            v-model="iptVal"
            @keyup.enter="toResult"
          />
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      // 和搜索框绑定的数据
      iptVal: ''
    }
  },
  methods: {
    toResult() {
      if (this.iptVal === '') return this.$message.warning('请输入相关内容')
      this.$router.push({
        path: '/result',
        query: {q: this.iptVal}
      })
    },
    go(val) {
      this.$router.go(val)
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>

</style>