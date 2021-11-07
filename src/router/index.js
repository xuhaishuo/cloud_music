import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import Discovery from '../views/Discovery'
import PlayLists from '../views/PlayLists'
import PlayList from '../views/PlayList'
import Songs from '../views/Songs'
import Mvs from '../views/Mvs'
import Mv from '../views/Mv'
import Result from '../views/Results'

const router = new VueRouter({
	routes:[
    { path: '/', redirect: '/discovery' },
    // 发现音乐
		{ path: '/discovery', component: Discovery },
    // 推荐歌单
    { path: '/playlists', component: PlayLists },
    { path: '/playlist', component: PlayList },
    { path:'/songs', component: Songs },
    { path: '/mvs', component: Mvs },
    { path: '/mv', component: Mv },
    { path: '/result', component: Result }

	]
})

export default router