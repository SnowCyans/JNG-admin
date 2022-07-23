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
      <el-table
        :data="CommodityClassList"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
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
        <el-form-item label="父级分类">
          <div class="block">
            <el-cascader
              ref="cascader"
              :options="CommodityClassList"
              :props="{
                checkStrictly: true,
                value: 'cat_id',
                label: 'cat_name',
              }"
              clearable
              @change="handleChange"
            ></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddCommodityClass = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑提交商品分类 -->
    <el-dialog title="提示" :visible.sync="dialogEditClassVisible">
      <el-form :model="editClassForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="editClassForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClassSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Grade from '@/components/Grade'
import { getCommodityClass, removeCommodityClass, addCommodityClass, getIdCommodityClass, editCommodityClass } from '@/api/commodity'
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
      },
      // 编辑提交分类
      dialogEditClassVisible: false,
      editClassForm: {
        cat_name: ''
      },
      id: null
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
      const res = await getCommodityClass()
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
    },
    handleChange (value) {
      console.log(value)
    },
    save () {
      this.$refs.cascader.getCheckedNodes()
    },
    // 根据 id 查询分类
    async handleEdit (index, row) {
      console.log(row.cat_id)
      this.id = row.cat_id
      const res = await getIdCommodityClass(row.cat_id)
      console.log(res)
      this.editClassForm.cat_name = res.data.data.cat_name
      this.dialogEditClassVisible = true
    },
    // 标记分类提交
    async editClassSave () {
      try {
        await editCommodityClass(this.id, this.editClassForm)
        this.$message.success('更新成功')
        this.dialogEditClassVisible = false
        this.getCommodityClassList()
      } catch (error) {
        console.log(error)
        this.$message.error('更新失败')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
