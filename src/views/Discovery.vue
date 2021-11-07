<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item,i) in banners" :key="i">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,i) in list" :key="i">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,i) in songs" :key="i">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,i) in mvs" :key="i">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Discovery',
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs:[]
    }
  },
  methods: {
    // 获取轮播图的数据
    async getBanner() {
      const {data:res} = await this.$http.get('banner')
      if (res.code !== 200) return this.$message.error('获取轮播图数据失败，请检查接口')
      this.banners = res.banners
    },
    // 获取推荐歌单的数据
    async getPersonalized() {
      const {data:res} = await this.$http.get('personalized',{params: {limit: 10}})
      if (res.code !== 200) return this.$message.error('获取推荐歌单数据失败，请检查接口')
      this.list = res.result
    },
    // 获取最新音乐的数据
    async getNewSong() {
      const {data:res} = await this.$http.get('/personalized/newsong')
      if (res.code !== 200) return this.$message.error('获取推荐最新音乐数据失败，请检查接口')
      this.songs = res.result
    },
    // 播放音乐
    async playMusic(id) {
      const { data:res } = await this.$http.get('song/url',{params: {id}})
      if (res.code !== 200) return this.$message.error('获取该音乐数据失败，请检查接口')
      let music = res.data[0].url
      this.$parent.musicUrl = music
    },
    // 获取推荐mv的数据
    async getMv() {
      const {data:res} = await this.$http.get('/personalized/mv')
      if (res.code !== 200) return this.$message.error('获取该推荐mv数据失败，请检查接口')
      this.mvs = res.result
    }
  },
  created() {
    this.getBanner()
    this.getPersonalized()
    this.getNewSong()
    this.getMv()
  }

}
</script>

<style lang='less' scoped>

</style>