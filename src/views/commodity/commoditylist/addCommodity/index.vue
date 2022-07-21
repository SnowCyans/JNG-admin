<template>
  <div>
    <el-card style="margin: 30px; height: 1000px">
      <el-page-header style="margin-bottom: 20px" @back="goBack">
      </el-page-header>
      <el-alert
        title="添加商品信息"
        center
        :closable="false"
        type="info"
        show-icon
        style="margin-bottom: 20px"
      >
      </el-alert>

      <el-steps
        style="margin-bottom: 20px"
        align-center
        :active="active"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
        <el-tab-pane :model="form" style="width: 95%" label="基本信息">
          <el-form ref="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.commodityName"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model.number="form.weightPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model.number="form.commodityWeight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model.number="form.commodityNumber"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <div class="block">
                <el-cascader
                  v-model="form.commodityClass"
                  :options="CommodityClassList"
                  :props="{
                    expandTrigger: 'hover',
                    value: 'cat_id',
                    label: 'cat_name',
                  }"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { commodityClass } from '@/api/commodity'
export default {
  name: 'AddCommodity',
  filters: {},
  components: {},
  data () {
    return {
      active: 0,
      tabPosition: 'left',
      form: {
        commodityName: '',
        weightPrice: 0,
        commodityWeight: 0,
        commodityNumber: 0,
        commodityClasss: ''

      },
      CommodityClassList: [],
      value: []
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log(this.form.num)
    this.getCommodityClassList()
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    handleClick (tab, event) {
      if (this.active++ > 5) this.active = 0
    },
    async getCommodityClassList () {
      const res = await commodityClass()
      console.log(res)
      this.CommodityClassList = res.data.data
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
