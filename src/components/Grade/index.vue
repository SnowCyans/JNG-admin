<template>
  <div>
    <!-- 等级 -->
    <el-tag
      :type="
        level === '0' || level === 0
          ? ''
          : level === '1' || level === 1
          ? 'success'
          : 'warning'
      "
    >
      {{
        level === "0" || level === 0
          ? "等级一"
          : level === "1" || level === 1
          ? "等级二"
          : "等级三"
      }}
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
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
