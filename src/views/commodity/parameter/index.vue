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
            ref="cascader"
            v-model="form.id"
            :options="CommodityClassList"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
            }"
            @change="handleChange"
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
        size="mini"
        round
        @click="addParameter"
        >添加参数</el-button
      >

      <el-table border :data="parameterList" style="width: 100%">
        <el-table-column prop="" label="" type="expand" width="180">
        </el-table-column>
        <el-table-column type="index" label="#" width="180"> </el-table-column>
        <el-table-column prop="attr_name" label="分类名称" width="400">
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
    </el-card>
    <!-- dialog -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="editOrAddForm" label-width="80px">
        <el-form-item label="动态参数">
          <el-input v-model="editOrAddForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parameterList, removeparameterList } from '@/api/comClassPm'
import { getCommodityClass } from '@/api/commodity'
export default {
  filters: {},
  components: {},
  data () {
    return {
      CommodityClassList: [],
      activeName: 'first',
      form: {
        id: null,
        sel: 'many'
      },
      // 分类参数列表
      parameterList: [],
      dialogVisible: false,
      // 判断是编辑还是添加  true为编辑 false添加
      editOrAdd: false,
      editOrAddForm: {
        id: null,
        attrId: null,
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      }
    }
  },
  computed: {
    title () {
      return this.editOrAdd ? '修改动态参数' : '添加动态参数'
    }
  },
  watch: {},
  created () {
    this.getCommodityClassList()
  },
  methods: {
    async getCommodityClassList () {
      const res = await getCommodityClass()
      console.log(res)
      this.CommodityClassList = res.data.data
    },
    async handleClick (tab) {
      if (tab.index === '1') {
        this.form.sel = 'only'
        const res = await parameterList(this.form)
        console.log(res)
        this.parameterList = res.data.data
      } else {
        this.form.sel = 'many'
        const res = await parameterList(this.form)
        console.log(res)
        this.parameterList = res.data.data
      }
    },
    // 获取选中的内容
    async handleChange () {
      const casca = this.$refs.cascader.getCheckedNodes()
      this.form.id = casca[0].data.cat_id
      const res = await parameterList(this.form)
      this.parameterList = res.data.data
    },

    // 编辑
    async handleEdit (row) {
      this.editOrAdd = true
      this.dialogVisible = true
      console.log(row.attr_name)
      this.editOrAddForm.attr_name = row.attr_name
    },
    // 删除
    async handleDelete (row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await removeparameterList({ id: row.cat_id, attrid: row.attr_id })
        this.$message.success('删除成功')
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
    // 添加
    addParameter () {
      this.editOrAdd = false
      this.dialogVisible = true
    },
    // 保存
    async save () {
    }
  }

}
</script>

<style scoped lang='scss'>
</style>
