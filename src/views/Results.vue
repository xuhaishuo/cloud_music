<template>
   <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,i) in list1" :key="i"
              @dblclick="playMusic(item.id)">
              <td>{{ i+1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid !== 0"></span>
                  </div>
                  <span v-if="item.alias.length != 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | dateFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,i) in list2" :key="i" @click="toPlayList(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | strFormat }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,i) in list3" :key="i" @click="toMv(item.id)">
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
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="page"
        :page-size="limit"
      ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data() {
    return {
      // tabs组件的切换数据
      activeName: 'songs',
      // 存放搜索结果 list1存放歌曲，list2存放歌单，list3存放mv
      list1: [],
      list2:[],
      list3: [],
      count: 0,
      // 搜索类型:歌曲 1，歌单 1000，mv 1004
      type: 1,
      // 限制获取的条目数
      limit: 10,
      page: 1
    }
  },
  watch: {
    activeName() {
      // songs歌曲，lists歌单，mv
      if (this.activeName === 'songs') {
        this.type = 1
        this.limit = 10
        this.page = 1
        this.getSearch()
      } else if (this.activeName === 'lists') {
        this.type = 1000
        this.limit = 10
        this.page = 1
        this.getSearch()
      } else {
        this.type = 1004
        this.limit = 8
        this.page = 1
        this.getSearch()
      }
    }
  },
  methods: {
    // 获取歌曲搜索的结果数据
    async getSearch() {
      const { data:res } = await this.$http.get('/search',{params: {
        keywords: this.$route.query.q,
        type: this.type,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }})
      if (res.code !== 200) return this.$message.error("获取搜索数据失败，请检查接口")
      if (this.activeName == 'songs'){
        this.list1 = res.result.songs
        this.count = res.result.songCount
      } else if (this.activeName == 'lists') {
        this.list2 = res.result.playlists
        this.count = res.result.playlistCount
      } else {
        this.list3 = res.result.mvs
        this.count = res.result.mvCount
      }
    },
    // 双击播放音乐
    async playMusic(id) {
      const { data:res } = await this.$http.get('song/url',{params: {id}})
      if (res.code !== 200) return this.$message.error('获取该音乐数据失败，请检查接口')
      let music = res.data[0].url
      this.$parent.musicUrl = music
    },
    // 页码改变时调用
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getSearch()
    },
    // 点击跳转到歌单界面
    toPlayList(id) {
      this.$router.push({
        path: '/playlist',
        query: {
          q: id
        }
      })
    },
    // 点击跳转到mv界面
    toMv(id) {
      this.$router.push({
        path: '/mv',
        query: {
          q: id
        }
      })
    }
  },
  created() {
    this.getSearch()
  }
}
</script>

<style lang='less' scoped>
thead {
  text-align: left;
}

.name-wrap {
  min-height: 50px;
  padding-top: 15px;
}

.song-wrap {
  height: 50px;
}
</style>