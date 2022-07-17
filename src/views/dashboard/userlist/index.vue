<template>
  <div class="main">
    <div class="container">
      <el-input
        v-model="queryInput"
        placeholder="请输入用户名"
        style="width: 50%; margin: 0 150px 50px 0"
        @keyup.native.enter="queryUser"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="queryUser"
        ></el-button>
      </el-input>
      <el-button type="primary" round @click="isAddShow = true"
        >添加用户</el-button
      >
      <!-- 表格 -->
      <el-table size="mini" border stripe :data="users" style="width: 100%">
        <!-- id -->
        <el-table-column label="#" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.username }}</p>
          </template>
        </el-table-column>
        <!-- 电话 -->
        <el-table-column label="电话" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.mobile }}</p>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column label="角色" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.role_name }}</p>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="updataType(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
            <el-button
              type="warning"
              icon="el-icon-setting"
              circle
              @click="userRole(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑用户 -->
      <el-dialog title="编辑用户" :visible.sync="flag">
        <el-form :rules="rules" :model="userDetailsList">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="userDetailsList.username" disabled> </el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userDetailsList.email"> </el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userDetailsList.mobile"> </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="flag = false">取消</el-button>
          <el-button type="primary" @click="updata">确定</el-button>
        </template>
      </el-dialog>

      <!-- 添加用户 -->
      <el-dialog
        title="添加用户"
        :visible.sync="isAddShow"
        @close="handleAddClose"
      >
        <el-form ref="addFormRef" :rules="rules" :model="loginForm">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="loginForm.username"> </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password"> </el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email"> </el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="loginForm.mobile"> </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="isAddShow = false">取消</el-button>
          <el-button type="primary" @click="userAdd">确定</el-button>
        </template>
      </el-dialog>

      <!-- 分配角色 -->
      <el-dialog title="分配角色" :visible.sync="isRoleShow" width="30%">
        <el-form :inline="true" :model="users2" class="demo-form-inline">
          <el-form-item label="当前的用户">
            <label>{{ users2.username }}</label></el-form-item
          ><br />
          <el-form-item label="当前的角色">
            <label>{{ users2.role_name }}</label> </el-form-item
          ><br />
          <el-form-item label="分配新角色">
            <el-select
              v-model="userRoles.roleName"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in userRoles"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleName"
              ></el-option>
            </el-select> </el-form-item
        ></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isRoleShow = false">取 消</el-button>
          <el-button type="primary" @click="branchUserRole">确 定</el-button>
        </span></el-dialog
      >
    </div>
  </div>
</template>

<script>
import { validMobile, validEmail } from '@/utils/validate'
import { userList, userAdd, userUpdataType, userDelete, userDetails, userPut } from '@/api/user'
import { rolesList, userRolesList } from '@/api/role'
export default {
  data () {
    // 验证手机号
    const validMobileFn = (rule, value, callback) => {
      if (validMobile(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    // 验证邮箱
    const validEmailFn = (rule, value, callback) => {
      if (validEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    // 验证用户名是否重复
    const validUserNameFn = async (rule, value, callback) => {
      // 拿到所有数据
      const res = await userList(this.querys)
      res.data.data.users.filter(item => item.username === this.loginForm.username).some(item => item.username === value) ? callback(new Error('名称重复')) : callback()
    }
    return {
      queryInput: '',
      input: '',
      isAddShow: false,
      isRoleShow: false, // 分配角色
      // 查询用户参数
      querys: {
        query: null,
        pagenum: 1,
        pagesize: 5
      },
      // 添加用户参数
      loginForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户校验规则
      users: [], // 用户数据列表
      flag: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validMobileFn, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validEmailFn, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { validator: validUserNameFn, trigger: 'change' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // 根据id查询用户信息列表
      userDetailsList: {},
      userRoles: [],
      users2: {},
      userRoles2: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUser()
  },

  methods: {
    async getUser () {
      try {
        const res = await userList(this.querys)
        this.users = res.data.data.users
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 查询用户
    async queryUser () {
      try {
        const res = await userList({ query: this.queryInput, pagenum: 1, pagesize: 5 })
        console.log(res)
        this.users = res.data.data.users
        this.$message({
          type: 'success',
          message: '查询成功'
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 添加用户
    async userAdd () {
      try {
        const res = await userAdd(this.loginForm)
        console.log(res)
        this.$message({
          type: 'success',
          message: '添加用户成功'
        })
        this.isAddShow = false
        this.getUser()
      } catch (error) {
        console.log(error)
      }
    },
    // 关闭dialog重置表单数据
    handleAddClose () {
      this.$refs.addFormRef.resetFields()
    },
    // 修改用户状态
    async updataType (index, row) {
      try {
        console.log(index, row)
        await userUpdataType({ id: row.id, type: row.mg_state })
        this.$message({
          message: '修改用户状态成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
        this.$message('修改用户状态失败')
      }
    },
    // 删除单个用户
    async handleDelete (index, row) {
      try {
        await userDelete(row.id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getUser()
      } catch (error) {
        console.log(error)
        this.$message('删除失败')
      }
    },
    // 根据id查询用户信息
    async handleEdit (index, row) {
      this.flag = true
      const res = await userDetails(row.id)
      console.log(res)
      this.userDetailsList = res.data.data
    },
    // 编辑用户提交
    async updata () {
      const res = await userPut({ id: this.userDetailsList.id, email: this.userDetailsList.email, mobile: this.userDetailsList.mobile })
      console.log(res)
      this.flag = false
      this.$message({
        message: '更新成功',
        type: 'success'
      })
      this.getUser()
    },
    // 分配角色
    async userRole (index, row) {
      this.isRoleShow = true
      try {
        const res = await rolesList()
        console.log(res)
        this.users.forEach(item => { if (item.id === row.id) { this.users2 = item } })
        this.userRoles = res.data.data
        this.userRoles.forEach(item => { if (item.id === row.id) { this.userRoles2 = item } })
      } catch (error) {
        console.log(error)
      }
    },
    // 分配角色
    async branchUserRole () {
      console.log(this.userRoles2.__ob__.dep.id)
      try {
        const res = await userRolesList({ id: this.users2.id, rid: this.userRoles2.__ob__.dep.id })
        console.log(res)
        this.isRoleShow = false
      } catch (error) {
        console.log(error)
        this.$message.error('分配失败')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.main {
  width: 100%;
  height: 670px;
  background-color: #eaedf1;
  padding: 20px 20px;
}
.container {
  padding: 20px 20px;
  background-color: #ffffff;
}
</style>
