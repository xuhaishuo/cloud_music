<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" v-for="(item,i) in area" :key="i" 
        @click="tag = item.val" :class="{ active: tag == item.val }">
        {{ item.name }}
      </span>
    </div>
    <!-- 底部的table -->
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
        <tr class="el-table__row" v-for="(item,i) in list" :key="i">
          <td>{{ i+1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <!-- 播放按钮 -->
              <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | dateFormat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Songs',
  data() {
    return {
      tag: 0,
      // 音乐数据
      list: [],
      // 每个地区对应的tag值
      area: [
        {name:'全部',val:0},
        {name:'华语',val:7},
        {name:'欧美',val:96},
        {name:'日本',val:8},
        {name:'韩国',val:16}
      ]
    }
  },
  watch: {
    tag() {
      this.getNewSongs()
    }
  },
  methods: {
    // 获取最新音乐数据
    async getNewSongs() {
      const { data:res } = await this.$http.get('/top/song',{params: {type: this.tag}})
      if (res.code !== 200) return this.$message.error('获取最新音乐数据失败，请检查接口')
      this.list = res.data
    },
    // 播放音乐
    async playMusic(id) {
      const { data:res } = await this.$http.get('song/url',{params: {id}})
      if (res.code !== 200) return this.$message.error('获取该音乐数据失败，请检查接口')
      let music = res.data[0].url
      this.$parent.musicUrl = music
    }
  },
  created() {
    this.getNewSongs()
  }
}
</script>

<style lang='less' scoped>
thead {
  th {
    text-align: left;
  }
}
</style>