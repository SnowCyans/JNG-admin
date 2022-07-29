<template>
  <div>
    <!-- 订单列表 -->
    <el-input
      style="width: 500px; margin: 30px"
      placeholder="请输入内容"
      class="input-with-select"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-card style="margin: 0 30px">
      <el-table stripe :data="ordersList" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="280">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="180">
          <template v-slot="scope">
            <el-button
              :type="scope.row.pay_status === '0' ? 'danger' : 'success'"
              >{{
                scope.row.pay_status === "0" ? "未付款" : "已付款"
              }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="180">
        </el-table-column>
        <el-table-column label="下单时间">
          <template v-slot="scope">
            {{ scope.row.create_time | moment }}
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
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改收货地址 -->
    <el-dialog title="提示" :visible.sync="isEditOrderShow" width="30%">
      <div class="block">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover', value: 'value', label: 'label' }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditOrderShow = false">取 消</el-button>
        <el-button type="primary" @click="editSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import options from '@/city/city_data2017_element'

import { allOrders } from '@/api/orders'
export default {
  components: {},
  data () {
    return {
      // 查询订单列表参数
      paramsObj: {
        query: '',
        pagenum: 1,
        pagesize: 30
      },
      // 查询订单列表
      ordersList: [],
      // 修改收货地址dialog
      isEditOrderShow: false,
      options: options,
      value: []

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getOrdersList()
  },
  methods: {
    // 查询订单列表
    async getOrdersList () {
      const res = await allOrders(this.paramsObj)
      console.log(res)
      this.ordersList = res.data.data.goods
    },
    async handleEdit (index, row) {
      this.isEditOrderShow = true
      // const res = await getOrdersId(row.order_id)
      // console.log(res)
    },
    handleChange (value) {
      console.log(value)
    },
    editSave () {
      this.$message.success('修改成功')
      this.isEditOrderShow = false
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
