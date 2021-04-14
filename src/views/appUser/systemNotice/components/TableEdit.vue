<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <div style="min-height: 50vh">
        <h1 class="news-title">{{ form.title }}</h1>
        <div class="news-content" v-html="form.content"></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
           title: '1111111111111111111',
           content: '<p><strong>11111111111111111111111111</strong></p>'
        },
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        // this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
.news-title{
  text-align: center;
}
</style>