<template>
  <div class="container">
    <!-- 商品列表 -->
    <el-input
      v-model.trim="form.query"
      placeholder="请输入内容"
      style="width: 50%; margin: 0 150px 20px 0"
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- //分页 -->
      <el-pagination
        :current-page="form.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="dialogEditVisible">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model.number="editForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model.number="editForm.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="goods_introduce">
          <el-input v-model="editForm.goods_introduce"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCommodity, removeCommodity, getIdCommodity, editCommodity } from '@/api/commodity'
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
      total: null,

      // 编辑商品
      dialogEditVisible: false,
      editForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: ''
      },
      id: null

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
    // 分页
    handleSizeChange (pageSize) {
      this.form.pagesize = pageSize
      this.getCommodityList()
    },
    handleCurrentChange (pagenum) {
      this.form.pagenum = pagenum
      this.getCommodityList()
    },
    // 查询商品
    async queryCommodity () {
      const res = await getCommodity(this.form)
      console.log(res)
      this.commodityList = res.data.data.goods
      this.total = res.data.data.total
      this.$message.success('查询成功')
      this.form.query = ''
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
    },
    // 根据id查询商品信息
    async handleEdit (row) {
      this.id = row.goods_id
      const res = await getIdCommodity(row.goods_id)
      console.log(res)
      this.editForm = res.data.data
      console.log(this.editForm)
      this.dialogEditVisible = true
    },
    // 提交编辑商品
    async editSave () {
      try {
        await editCommodity(this.id, this.editForm)
        this.$message.success('修改成功')
        this.getCommodityList()
        this.dialogEditVisible = false
      } catch (error) {
        console.log(error)
        this.$message.error('修改失败')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  padding: 20px 20px;
}
</style>
