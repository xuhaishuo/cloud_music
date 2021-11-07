<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvUrl" autoplay></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{ mvmsg.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvmsg.name }}</h2>
          <span class="date">发布：{{ mvmsg.publishTime }}</span>
          <span class="number">播放：{{ mvmsg.playCount }}次</span>
          <p class="desc">{{ mvmsg.desc }}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{ hotComments.length }})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,i) in hotComments" :key="i">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length  !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFull }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">({{ total }})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,i) in comments" :key="i">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length  !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFull }}</div>
            </div>
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
        :page-size="10"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,i) in mvs" :key="i">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | strFormat }}</div>
              </div>
              <span class="time">{{ item.duration | dateFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mv',
  data() {
    return {
      // 当前mv地址
      mvUrl: '',
      // 相关mv的数据
      mvs: [],
      // 当前mv的相关信息
      mvmsg: {},
      // 当前歌手的封面信息
      icon: '',
      // 热门评论
      hotComments: [],
      // 普通评论
      comments: [],
      total: 0,
      page: 1
    }
  },
  methods: {
    // 获取当前mv的播放地址
    async getMv() {
      const { data:res } = await this.$http.get('/mv/url',{params: {id: this.$route.query.q}})
      if (res.code !== 200) return this.$message.error("获取搜索数据失败，请检查接口")
      this.mvUrl = res.data.url
    },
    // 获取相关mv
    async getRelatedMv() {
      const { data:res } = await this.$http.get('/simi/mv',{params: {mvid: this.$route.query.q}})
      if (res.code !== 200) return this.$message.error("获取搜索数据失败，请检查接口")
      this.mvs = res.mvs
    },
    // 获取mv的信息
    async getMvMsg() {
      const { data:res } = await this.$http.get('/mv/detail',{params: {mvid: this.$route.query.q}})
      if (res.code !== 200) return this.$message.error("获取搜索数据失败，请检查接口")
      this.mvmsg = res.data
      const { data:sig } = await this.$http.get('/artists',{params: {id: res.data.artistId}})
      this.icon = sig.artist.picUrl
    },
    // 获取评论信息
    async getComment() {
      const { data:res } = await this.$http.get('/comment/mv',{params: {
        id: this.$route.query.q,
        limit: 10,
        offset: (this.page - 1) * 10
      }})
      if (res.code !== 200) return this.$message.error("获取搜索数据失败，请检查接口")
      console.log(res)
      if (res.hotComments)  this.hotComments = res.hotComments
      this.comments = res.comments
      this.total = res.total
    },
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getComment()
    }
  },
  created() {
    this.getMv()
    this.getRelatedMv()
    this.getMvMsg()
    this.getComment()
  }
}
</script>

<style lang='less' scoped>

</style>