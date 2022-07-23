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
        <el-form>
          <el-form-item label="选择商品分类">
            <el-cascader
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-alert>
    </el-card>
  </div>
</template>

<script>
import { getCommodityClass } from '@/api/commodity'
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async getCommodityClassList () {
      const res = await getCommodityClass()
      console.log(res)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
