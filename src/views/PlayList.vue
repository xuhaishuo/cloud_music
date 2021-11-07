<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{ playlist.creator.nickname }}</span>
          <span class="time">{{ playlist.createTime | dateYear }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,i) in playlist.tags" :key="i">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,i) in playlist.tracks" :key="i">
              <td>{{ i+1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv" v-if="item.mv !== 0"></span>
                  </div>
                  <!-- <span>电视剧加油练习生插曲</span> -->
                </div>
              </td>
              <td>{{ item.ar[0].name  }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | dateFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">({{ hotCount }})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,i) in hotComment" :key="i">
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
            <div class="item" v-for="(item,i) in newComment" :key="i">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'PlayList',
  data() {
    return {
      // tab的显示
      activeIndex: '1',
      // 接口返回的数据
      playlist: {},
      // 热门评论数据
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 最新评论数据
      newComment: [],
      // 最新评论的总数
      total: 0,
      page: 1
    }
  },
  methods: {
    // 获取歌单搜索结果
    async getSearch() {
      const { data:res } = await this.$http.get('/playlist/detail', {
        params: {
          id: this.$route.query.q
        }
      })
      if (res.code !== 200) return this.$message.error("获取搜索数据失败，请检查接口")
      this.playlist = res.playlist
    },
    // 获取热门评论
    async getHotComment() {
      const { data:res } = await this.$http.get('/comment/hot',{params:{id: this.$route.query.q,type: 2}})
      if (res.code !== 200) return this.$message.error("获取评论数据失败，请检查接口")
      this.hotComment = res.hotComments
      this.hotCount = res.total
    },
    // 获取最新评论
    async getNewComment() {
      const { data:res } = await this.$http.get('/comment/playlist',{params:{
        id: this.$route.query.q,
        limit: 10,
        offset: (this.page - 1) * 10
        }
      })
      if (res.code !== 200) return this.$message.error("获取评论数据失败，请检查接口")
      this.total = res.total
      this.newComment = res.comments
    },
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getNewComment()
    }
  },
  created() {
    this.getSearch()
    this.getHotComment()
    this.getNewComment()
  }
}
</script>

<style lang='less' scoped>
thead {
  text-align: left;
}
</style>