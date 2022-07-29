<template>
  <div>
    <!-- 分类参数 -->
    <el-card>
      <el-alert
        show-icon
        style="margin: 20px 0"
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
      >
      </el-alert>
      <el-form>
        <el-form-item label="选择商品分类">
          <el-cascader
            :options="CommodityClassList"
            :props="{
              checkStrictly: true,
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
            }"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">动态参数</el-tab-pane>
        <el-tab-pane label="静态属性" name="second">静态属性</el-tab-pane>
      </el-tabs>

      <el-button
        style="margin: 15px 0"
        type="primary"
        disabled
        size="mini"
        round
        >添加参数</el-button
      >

      <el-table border style="width: 100%">
        <el-table-column prop="" label="" type="expand" width="180">
        </el-table-column>
        <el-table-column prop="" label="#" width="180"> </el-table-column>
        <el-table-column prop="" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCommodityClass } from '@/api/commodity'
export default {
  filters: {},
  components: {},
  data () {
    return {
      CommodityClassList: [],
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCommodityClassList()
  },
  methods: {
    async getCommodityClassList () {
      const res = await getCommodityClass()
      console.log(res)
      this.CommodityClassList = res.data.data
    }
  },
  handleClick (tab, event) {
    console.log(tab, event)
  }
}
</script>

<style scoped lang='scss'>
</style>
