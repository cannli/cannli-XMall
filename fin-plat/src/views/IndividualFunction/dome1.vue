<template>
  <div>
    <titleText title="分析打包文件"></titleText>
    <div>
      打包后生成文件分析
      可以利用webpack-bundle-analyzer插件来分析我们打包后生成的文件
    </div>
    <titleText title="资源与依赖包的控制"></titleText>
    <div>
      通过上面进度可以看到，打包过程中，卡顿在压缩的地方过长，当项目越来越臃肿的时候，我们要需要对项目静态资源以及依赖包进行整理
      图片过大的可以压缩，这里推荐一个还不错的压缩链接
      项目中没有使用的依赖可以删除，可以按需引用的依赖，按需引用
      项目里面使用ElementUI和Echarts都是全部引用挂在Vue.prototype上，现都改为按需引用。
    </div>
    <titleText title="减少文件搜索范围"></titleText>
    <titleText title="happypack多线程执行"></titleText>
    <titleText title="babel-plugin-dynamic-import-node异步加载"></titleText>
    <a href="https://zhuanlan.zhihu.com/p/57304880">优化vue项目打包速度(webpack)</a>
    <a href="https://www.hangge.com/blog/cache/detail_2105.html">使用 webpack-parallel-uglify-plugin 插件来压缩代码(webpack)</a>
  </div>
</template>

<script>
  export default {
    name: "dome1",
    created() {
      const timer = setInterval(() => {
        console.log(111,5)
      }, 500);
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      })
    }
  }
</script>

<style scoped>

</style>
