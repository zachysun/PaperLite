<template>
  <header>
    <section>
      <span>PaperLite</span>
      <el-button class='search-ico' icon="el-icon-search" circle size="small"></el-button>
      <input type="text" placeholder="Search">
    </section>
  </header>
</template>

<script>
export default {
  name: 'pageHeader',
}
</script>

<style scoped>
header {
  height: 50px;
  background: #008899;
}

section {
  margin: 0 auto;
}

header span {
  cursor: pointer;
  float: left;
  width: 100px;
  font-size: 25px;
  line-height: 50px;
  color: #fff;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 0 4px;
}

.search-ico {
  float: right;
  margin: 9px 0;
}

header input {
  float: right;
  width: 400px;
  height: 30px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 9px 4px;
}

header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>