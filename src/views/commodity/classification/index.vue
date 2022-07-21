<template>
  <div>
    <!-- 商品分类 -->
    <el-card style="margin: 30px">
      <el-button
        style="margin-bottom: 20px"
        type="primary"
        @click="isAddCommodityClass = true"
        >添加分类</el-button
      >
      <el-table :data="CommodityClassList" border style="width: 100%">
        <el-table-column type="index" label="#" width="180"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <el-button
              disabled
              size="mini"
              :type="scope.row.cat_deleted ? 'success' : 'danger'"
              :icon="
                scope.row.cat_deleted ? 'el-icon-check' : 'el-icon-circle-close'
              "
              circle
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="scope">
            <Grade :level="scope.row.cat_level"></Grade>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加商品分类 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="isAddCommodityClass"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="腹肌分类">
          <div class="block">
            <el-cascader
              :options="CommodityClassList"
              :props="{
                checkStrictly: true,
                value: 'cat_id',
                label: 'cat_name',
              }"
              clearable
            ></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddCommodityClass = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Grade from '@/components/Grade'
import { commodityClass, removeCommodityClass } from '@/api/commodity'
export default {
  filters: {},
  components: { Grade },
  data () {
    return {
      CommodityClassList: [],
      // 添加商品分类dialog
      isAddCommodityClass: false,
      form: {
        name: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCommodityClassList()
  },
  methods: {
    // 查询商品分类列表
    async getCommodityClassList () {
      const res = await commodityClass()
      console.log(res)
      this.CommodityClassList = res.data.data
    },
    // 删除商品分类
    async handleDelete (index, row) {
      console.log(row.cat_id)
      this.$confirm('确定删除此分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await removeCommodityClass(row.cat_id)
        this.getCommodityClassList()
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
</style>
