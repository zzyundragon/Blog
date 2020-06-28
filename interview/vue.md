### 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

vue中的key主要用在vue的虚拟dom算法，在新旧节点nodes对比时辨识VNodes。如果不使用key，vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改或者复用相同类型的元素的算法。而使用key时，它会基于key的变化重新排列元素顺序，并且移除key不存在的元素。有相同父元素的子元素必须有独特的key，重复的key会造成渲染错误。key也可以用于强制替换元素/组件，而不是重复使用它。比如需要完整地触发组件的生命周期，比如触发过渡。

```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
// 当text发生变化时，span总是会被替换而不是被修改，因此会触发过渡。
```

### 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的 

采用数据劫持结合发布订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的getter和setter，在数据变动时发布消息给订阅者，触发相应的监听回调。首先将需要观察的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter，这样数据对象发生变化时都会触发setter，达到数据变化监听的效果。compile解析模板指令，将模板中的变量替换成数据，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据发生变动，收到通知更新视图。

### 聊聊 Redux 和 Vuex 的设计思想

[这篇关于状态共享设计的思想写的太好的](https://zhuanlan.zhihu.com/p/53599723)

vuex是专门为vue应用程序设计的状态管理模式，它把组件中需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态以可预测的方式发生变化。

每个vuex里面有一个全局store，包含着应用中所有需要共享的状态state，vue通过store选项将state注入到整个应用之中，这样子组件可以通过this.$store.state访问到状态，state改变状态相应的组件也会得到高效的更新，这里利用了vue的响应式机制。

state不能直接更改，必须通过一个约定的唯一方式mutation显式地提交修改。mutation类似于事件，每个mutation都有一个字符串的事件类型和一个回调函数。通过store.commit('mutationFunc')的触发方式来提交变更。

mutation是同步操作，试想一下如果修改state状态值不是同步的话会很难调试，不知道什么时候状态发生改变，并且很难确定状态的变更顺序。如果需要一些做一些异步处理，vuex提供了另一个概念action，在实际开发过程中，通常需要先去发送一个请求然后根据请求结果去修改state，这时应该使用action。按照vuex的设计理念，把同步和异步分开，异步想怎么搞怎么搞，但是不要干扰同步操作，vue通过store.dispatch('actionFunc')来触发某个action，里面不管执行多少异步操作，完事之后都通过store.commmit('mutationFunc')来触发mutation来修改状态，一个action里面可以触发多个mutation。

此外还有一个getter，这个主要是方便计算属性的复用，类似于vue中的computed，不过不同的是每次调用store.getters.xxx都会进行调用计算过的state，而不会产生缓存结果。

vuex虽然是单一状态树，但是不影响模块化，当应用数据比较复杂庞大时，可以将store分割成多个modules，每个模块都有自己的state、mutation、action和getter，甚至是嵌套子模块，从上到下以同样的方式分割。

vuex状态发生变化的两种方式：
- 同步操作：view-commit-mutation-state变化-view变化
- 异步操作：view-dispatch-action-mutation-state变化-view变化

### vuex中的store是如何挂载注入到组件中的
  > vue插件机制；全局混入
  
首先在vue项目中引入vuex，通过vue.use(vuex)安装，利用vue插件机制，使用vue.use方法时会调用vuex的install方法，装载vuex。在install方法中做了两步操作，一是将传入的vue保存并传参给了applyMixin方法，二是applyMixin接收到vue对象后，对vue全局混入了一个beforeCreate钩子函数，将vue实例化时传递的store保存在所有组件的this.$store中。

### vuex的state和getters是如何映射到各个组件实例中响应式更新状态呢
   
vuex中的state是响应式的，它借助了vue的响应式原理，将state存入vue实例的data中，vuex的getter则是借助了vue实例中的computed计算属性实现了数据的实时监听。

### vue-router

作用：根据不同的路径映射到不同的视图。vue-router支持三种路由方式：hash、history、abstract，提供了<router-link>和<router-view>两种组件，还提供了简单的路由配置和一系列好用的api。

