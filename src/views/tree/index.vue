<template>
  <div>
    <!-- 权限列表 -->
    <el-card style="margin: 30px 20px">
      <el-table
        ref="list"
        border
        :data="jurisdictionList"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="date" type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="400">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="400">
        </el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <!-- <el-tag
              :type="
                scope.row.level === '0'
                  ? ''
                  : scope.row.level === '1'
                  ? 'success'
                  : 'warning'
              "
            >
              {{
                scope.row.level === "0"
                  ? "等级一"
                  : scope.row.level === "1"
                  ? "等级二"
                  : "等级三"
              }}
            </el-tag> -->
            <Grade :level="scope.row.level"></Grade>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Grade from '@/components/Grade'
import { allRights } from '@/api/jurisdiction'
export default {
  filters: {},
  components: { Grade },
  data () {
    return {
      // 权限列表
      jurisdictionList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getAllRights()
  },
  methods: {
    // 权限列表
    async getAllRights () {
      const res = await allRights('list')
      console.log(res)
      this.jurisdictionList = res.data.data
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
