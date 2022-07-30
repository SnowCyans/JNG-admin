<template>
  <div>
    <!-- 等级 -->
    <el-tag :type="levelone">
      {{ levelwo }}
    </el-tag>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  props: {
    level: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    levelone () {
      return this.level === '0' || this.level === null || this.level === 0 ? '' : this.level === '1' || this.level === 1 ? 'success' : 'warning'
    },
    levelwo () {
      return this.level === '0' || this.level === null || this.level === 0 ? '等级一' : this.level === '1' || this.level === 1 ? '等级二' : '等级三'
    }
  },
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
