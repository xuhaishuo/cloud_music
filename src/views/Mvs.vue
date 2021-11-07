<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(val,i) in areas" :key="i">
            <span class="title" :class="{ active: area == val }" @click="area = val">
              {{ val }}
            </span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(val,i) in types" :key="i">
            <span class="title" :class="{ active: type == val }" @click="type = val">
              {{ val }}
            </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(val,i) in orders" :key="i">
            <span class="title" :class="{ active: order == val }" @click="order = val">
              {{ val }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item,i) in list" :key="i">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | strFormat }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="limit"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mvs",
  data() {
    return {
      area: '全部',
      areas: ['全部','内地','港台','欧美','日本','韩国'],
      type: '全部',
      types: ['全部','官方版','原声','现场版','网易出品'],
      order: '上升最快',
      orders: ['上升最快','最热','最新'],
      limit: 8,
      total: 0,
      page: 1,
      // mv数据
      list: []
    }
  },
  watch: {
    area() {
      this.page = 1
      this.getMvs()
    },
    type() {
      this.page = 1
      this.getMvs()
    },
    order() {
      this.page = 1
      this.getMvs()
    }
  },
  methods: {
    // 获取全部mv数据
    async getMvs() {
      const { data:res } = await this.$http.get('/mv/all',{params: {
        area: this.area,
        type: this.type,
        order: this.order,
        limit: this.limit,
        offset: (this.page - 1) * this.limit 
      }})
      if (res.code !== 200) return this.$message.error("获取最新MV数据失败，请检查接口")
      this.list = res.data
      if (res.count) this.total = res.count
    },
    // 页码改变时调用
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getMvs()
    }
  },
  created() {
    this.getMvs()
  }
}
</script>

<style>

</style>