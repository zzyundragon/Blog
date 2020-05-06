const HomePage = () => import(/* webpackChunkName:"home" */'@/views/HomePage/index.vue')
const About = () => import(/* webpackChunkName:"about" */'@/views/About.vue')
// const Agora = () => import(/* webpackChunkName:"Agora" */'@/views/Agora.vue')

export default [
  {
    path: '/',
    name: 'HomePage',
    // redirect: '/home',
    component: HomePage,
    meta: {
      title: '首页'
    },
    children: [
      // {
      //   name: 'about',
      //   path: '/about',
      //   component: About,
      //   meta: {
      //     title: 'about'
      //   }
      // }
    ]
  },
  {
    name: 'about',
    path: '/about',
    component: About,
    meta: {
      title: 'about'
    }
  } // ,
  // {
  //   name: 'agora',
  //   path: '/agora',
  //   component: Agora,
  //   meta: {
  //     title: 'Agora'
  //   }
  // }
]
