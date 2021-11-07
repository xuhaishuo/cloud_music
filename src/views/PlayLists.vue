<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="highQuality.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ highQuality.name }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ highQuality.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="highQuality.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" v-for="(val,index) in classification" :key="index" :class="{ active: tag == val }" @click="tag = val">
          {{ val}}
        </span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,i) in playlist" :key="i">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量: {{ item.playCount }}
                <span class="num"></span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:'PlayLists',
  data() {
    return {
      // 精品歌单数据
      highQuality: {},
      // 歌单列表
      playlist: [],
      // 歌单分类
      classification: ['全部','欧美','华语','流行','说唱','摇滚','民谣','电子','轻音乐','影视原声','ACG','怀旧','治愈','旅行'],
      // 选择的数据
      tag: '全部',
      // 分页总数据
      total: 0,
      // 默认分页
      page: 1
    }
  },
  watch: {
    tag() {
      this.page = 1
      this.getHighQuality()
      this.getPlaylist()
    }
  },
  methods: {
    // 获取顶部精品歌单的数据
    async getHighQuality() {
      const {data:res} = await this.$http.get('/top/playlist/highquality',{params: {limit:1,cat: this.tag}})
      if (res.code !== 200) return this.$message.error('获取推荐精品歌单数据失败，请检查接口')
      this.highQuality = res.playlists[0]
    },
    // 获取歌单列表
    async getPlaylist() {
      const {data:res} = await this.$http.get('/top/playlist',{params: {limit: 10,cat: this.tag,offset: (this.page-1)*10}})
      if (res.code !== 200) return this.$message.error('获取歌单列表数据失败，请检查接口')
      this.playlist = res.playlists
      this.total = res.total
    },
    // 页数发生变化时调用
    handleCurrentChange(newPage) {
     this.page = newPage
     this.getPlaylist()
      
    }
  },
  created() {
    this.getHighQuality()
    this.getPlaylist()
  }
}
</script>

<style lang='less' scoped>

</style>