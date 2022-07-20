<template>
  <div class="main">
    <div class="container">
      <!-- 添加角色 -->
      <el-button
        style="margin-bottom: 20px"
        class="addrolebutton"
        type="primary"
        round
        @click="
          isDialogShow = true;
          isEditRole = false;
          addRuleForm = {};
        "
        >添加角色</el-button
      >
      <el-card>
        <el-table border stripe :data="rolesList" style="width: 100%">
          <el-table-column type="expand" width="72" label="#">
            <template slot-scope="scope">
              <!-- 展开行 -->
              <el-row
                v-for="item in rolesList[scope.$index].children"
                :key="item.id"
                :gutter="20"
              >
                <el-col :span="6"
                  ><div>
                    <el-tag>{{ item.authName }}</el-tag>
                    &nbsp;<i class="el-icon-caret-right"></i></div
                ></el-col>
                <el-col :span="18"
                  ><div>
                    <el-row v-for="item1 in item.children" :key="item1.id">
                      <el-col>
                        <el-row>
                          <el-col :span="5"
                            ><el-tag type="success">{{ item1.authName }}</el-tag
                            >&nbsp; <i class="el-icon-caret-right"></i
                          ></el-col>
                          <el-col :span="19"
                            ><el-tag
                              v-for="item2 in item1.children"
                              :key="item2.id"
                              closable
                              @close="
                                removeJurisdiction(scope.$index, scope.row)
                              "
                              >{{ item2.authName }}</el-tag
                            ></el-col
                          >
                        </el-row>
                      </el-col>
                    </el-row>
                  </div></el-col
                >
              </el-row>
            </template>
          </el-table-column>
          <!-- id -->
          <el-table-column label="#" width="72">
            <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <!-- 姓名 -->
          <el-table-column label="角色名称" width="350">
            <template slot-scope="scope">
              <p>{{ scope.row.roleName }}</p>
            </template>
          </el-table-column>

          <!-- 角色 -->
          <el-table-column label="角色描述" width="350">
            <template slot-scope="scope">
              <p>{{ scope.row.roleDesc }}</p>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row)"
              ></el-button>
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row)"
              ></el-button>
              <!-- 设置 -->
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
                @click="handleSetting(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 添加或编辑角色 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="isEditRole ? '编辑角色' : '新增角色'"
        :visible.sync="isDialogShow"
        width="30%"
        @close="reset"
      >
        <el-form
          ref="myForm"
          :rules="rules"
          :model="addRuleForm"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRuleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addRuleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="confirmRole">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配权限 -->
      <el-dialog title="分配权限" :visible.sync="branchDialogShow" width="30%">
        <!-- <branch :roles-list="rolesList"></branch> -->
        <el-tree
          v-if="branchDialogShow"
          ref="tree"
          :data="jurisdictionList"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="{ label: 'authName' }"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="branchDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { rolesList, addRole, editRole, removeRole } from '@/api/role'
import { allRights, removeRoleJurisdiction, addRoleJurisdiction } from '@/api/jurisdiction'
export default {

  data () {
    // 添加角色名称不能重复规则
    const validaRoleNameFn = async (rule, value, callback) => {
      const res = await rolesList()
      console.log(res)
      if (this.isEditRole === false) {
        res.data.data.filter(item => item.roleName === this.addRuleForm.roleName).some(item => item.roleName === value) ? callback(new Error('角色名称重复')) : callback()
      }
    }
    return {
      // 角色列表
      rolesList: [],
      // 显示隐藏添加角色对话框
      isDialogShow: false,
      // 添加角色参数
      addRuleForm: {
        roleName: '', roleDesc: ''
      },
      // 添加角色校验规则
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { validator: validaRoleNameFn, trigger: 'change' }
        ]
      },
      // 用来判断当前是再做添加还是再做编辑
      isEditRole: false,
      removeId: null, // 权限id
      // 当前角色数据
      editRole: {},
      editId: null,
      branchDialogShow: false, // 分配权限对话框
      jurisdictionList: [], // 权限列表
      roleId: null // 角色Id
    }
  },
  computed: {},
  watch: {},
  created () {
    // 打开页面渲染数据
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList () {
      const res = await rolesList()
      console.log(res)
      this.rolesList = res.data.data
    },
    // 添加或编辑
    async confirmRole () {
      // 编辑
      if (this.isEditRole) {
        try {
          await editRole({ id: this.editId, roleName: this.addRuleForm.roleName, roleDesc: this.addRuleForm.roleDesc })
          this.$message.success('修改成功')
          this.isDialogShow = false
          this.getRoleList()
        } catch (error) {
          console.log(error)
        }
      } else {
        // 添加
        try {
          const res = await addRole(this.addRuleForm)
          console.log(res)
          this.isDialogShow = false
          this.$message.success('添加成功')
          this.getRoleList()
        } catch (error) {
          console.log(error)
          this.$message.error('添加失败')
        }
      }
    },
    // 关闭添加dialog重置表单数据
    reset () {
      if (this.isEditRole === false) {
        this.$refs.myForm.resetFields()
      }
    },
    // 编辑角色 获取用户信息
    async handleEdit (row) {
      this.isEditRole = true
      this.isDialogShow = true
      this.editId = row.id
      console.log(this.editId)
      if (this.isEditRole) {
        this.addRuleForm = { ...row }
      }
    },
    // 删除角色
    async handleDelete (row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await removeRole(row.id)
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
    // // 删除角色指定权限
    removeJurisdiction (index, row) {
      // console.log(this.rolesList[index].children[index].children[index].children[index].id)
      this.$confirm('确定删除此权限吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.removeId = this.rolesList[index].children[index].children[index].children[index].id
        await removeRoleJurisdiction({ roleId: row.id, rightId: this.removeId })
        this.getRoleList()
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
    // 分配权限
    async handleSetting (index, row) {
      this.branchDialogShow = true
      this.roleId = row.id
      const res = await allRights('tree')
      console.log(res)
      this.jurisdictionList = res.data.data
      // console.log(res.data.data[index].children)
      console.log(row.children)
      // $nextTick支持传入一个回调函数，只有当Vue的DOM操作更新结束之后，才会执行这个回调函数，所以，在传入的回调函数中输出DOM的值，一定是更新之后的结果。
      this.$nextTick(function () {
        this.$refs.tree.setCheckedNodes(row.children)
      })
    },
    // 确定分配
    async save () {
      try {
        console.log(this.roleId)
        // 用扩展运算符合并数组
        const list = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
        console.log(list)
        const CheckedKeysList = list.join(',')
        await addRoleJurisdiction({ roleId: this.roleId, rids: CheckedKeysList })
        this.$message.success('分配成功')
        this.branchDialogShow = false
        this.getRoleList()
      } catch (error) {
        console.log(error)
        this.$message.error('分配失败')
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
