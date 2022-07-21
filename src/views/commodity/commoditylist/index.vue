<template>
  <div class="container">
    <el-input
      v-model="form.query"
      placeholder="请输入用户名"
      style="width: 50%; margin: 0 150px 50px 0"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="queryCommodity"
      ></el-button>
    </el-input>
    <el-button type="primary" round @click="$router.push({ name: '/add' })"
      >添加商品</el-button
    >
    <!-- 表格 -->
    <el-card>
      <el-table :data="commodityList" size="mini" border stripe>
        <!-- id -->
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <!-- 商品名称 -->
        <el-table-column prop="goods_name" label="商品名称" width="300">
        </el-table-column>
        <!-- 商品价格 -->
        <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
        <!-- 商品重量 -->
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间">
          <template v-slot="scope">
            {{ scope.row.add_time | moment }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCommodity, removeCommodity, queryCommodity } from '@/api/commodity'
export default {
  filters: {},
  components: {},
  data () {
    return {
      form: {
        query: null,
        pagenum: 1,
        pagesize: 5
      },
      commodityList: [],
      total: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCommodityList()
  },
  methods: {
    // 商品列表数据
    async getCommodityList () {
      const res = await getCommodity(this.form)
      console.log(res)
      this.commodityList = res.data.data.goods
      this.total = res.data.data.total
    },
    // 查询商品
    async queryCommodity () {
      const res = await getCommodity(this.form)
      console.log(res)
      this.commodityList = res.data.data.goods
      this.total = res.data.data.total
      this.$message.success('查询成功')
    },
    // 删除商品
    async handleDelete (row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await removeCommodity(row.goods_id)
        this.getCommodityList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  padding: 20px 20px;
}
</style>
