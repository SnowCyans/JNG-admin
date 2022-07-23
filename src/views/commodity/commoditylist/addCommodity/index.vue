<template>
  <div>
    <el-card style="margin: 30px; height: 1000px">
      <el-page-header style="margin-bottom: 20px" @back="goBack">
      </el-page-header>
      <el-alert
        title="添加商品信息"
        center
        :closable="false"
        type="info"
        show-icon
        style="margin-bottom: 20px"
      >
      </el-alert>

      <el-steps
        style="margin-bottom: 20px"
        align-center
        :active="active"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
        <el-tab-pane style="width: 95%" label="基本信息">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model.number="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model.number="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model.number="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                ref="myCascader"
                v-model="form.commodityClass"
                :options="CommodityClassList"
                :props="{
                  expandTrigger: 'hover',
                  value: 'cat_id',
                  label: 'cat_name',
                }"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-checkbox-group
            v-for="item in commodityPm"
            :key="item.attr_id"
            v-model="checkList"
          >
            <el-checkbox
              style="margin-bottm: 20px"
              checked
              :label="item.attr_id"
              border
              >{{ item.attr_vals }}</el-checkbox
            >
          </el-checkbox-group>
        </el-tab-pane>

        <el-tab-pane label="商品属性">
          <el-form
            ref="attributeForm"
            :model="attributeForm"
            label-width="80px"
          >
            <el-form-item
              v-for="item in attributeList"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="商品图片">
          <el-upload class="upload-demo" drag action="" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <editoritem
            v-model="form.goods_introduce"
            :catch-data="catchData"
            :content="editorContent"
            @change="handleChange"
          ></editoritem>
          <el-button type="primary" plain @click="save">确定添加</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import editoritem from '@/components/editoritem'
import { parameterList } from '@/api/comClassPm'
import { commodityClass, addCommodity } from '@/api/commodity'
export default {
  name: 'AddCommodity',
  filters: {},
  components: { editoritem },
  data () {
    return {
      active: 0,
      tabPosition: 'left',
      form: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: '',
        // 商品内容
        goods_introduce: '',
        pics: {}

      },
      // 商品分类数据列表
      CommodityClassList: [],

      // 校验规则
      rules: {
        goods_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_number: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },

      // 商品参数
      checked1: true,
      checkList: [],
      commodityPm: [],

      // 商品属性
      attributeForm: {
        name: ''
      },
      attributeList: []

    }
  },
  created () {
    this.getCommodityClassList()
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    async handleClick (tab, event) {
      // step
      if (tab.index === '0') {
        this.active = 0
      } else if (tab.index === '1') {
        this.active = 1
      } else if (tab.index === '2') {
        this.active = 2
      } else if (tab.index === '3') {
        this.active = 3
      } else if (tab.index === '4') {
        this.active = 4
      } else if (tab.index === '5') {
        this.active = 5
      }

      // 商品参数
      if (this.active === 1) {
        const res = await parameterList({ id: 6, sel: 'many' })
        console.log(res)
        this.commodityPm = res.data.data

        // 商品属性
      } else if (this.active === 2) {
        const res = await parameterList({ id: 6, sel: 'only' })
        console.log(res)
        this.attributeList = res.data.data
      }
    },
    // 商品分类数据列表
    async getCommodityClassList () {
      const res = await commodityClass()
      console.log(res)
      this.CommodityClassList = res.data.data
    },
    // 监听富文本的输入
    catchData (e) {
      console.log(e)
      this.form.goods_introduce = e
    },
    // 富文本中的内容
    editorContent (e) {
      console.log(e)
    },

    // 确定添加商品
    async save () {
      // const res = await addCommodity(this.form)
      // console.log(res)
      console.log(this.form.goods_cat)
      console.log(this.$refs.myCascader.getCheckedNodes())
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
