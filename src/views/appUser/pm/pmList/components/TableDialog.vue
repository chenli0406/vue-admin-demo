<template>
<div>
    <el-dialog
    title="项目成员"
    :visible.sync="dialog"
    width="50%"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目名称">
        <el-input disabled v-model="form.title"></el-input>
      </el-form-item>
    </el-form>
    <div class="mar-20">
      <label>项目成员</label>
      <el-button style="margin-left:20px" icon="el-icon-plus" type="primary" @click="add">
        添加成员
      </el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
    >
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="角色"
        prop="datetime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="联系电话"
        prop="author"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作">
        <template #default="{ row }">
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
    <el-dialog
    title="选择项目成员"
    :visible.sync="dialogMember"
    width="40%"
    @close="close"
  >
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
    >
     <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="手机号"
        prop="datetime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="角色"
        prop="author"
      ></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogMember = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确认选择</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { doEdit,getList, doDelete } from '@/api/table'
export default {
  name: 'TableEdit',
  data() {
    return {
      form: {
        title: 'xxxx项目',
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入项目名称' }],
      },
      list: [],
      listLoading: true,
      title: '',
      selectRows: [],
      dialog: false,
      dialogMember: false,
      elementLoadingText: '正在加载...',
       queryForm: {
        pageNo: 1,
        pageSize: 10,
        title: '',
      },
    }
  },
  computed: {
    height() {
      return this.$baseTableHeight()
    },
  },
  created() {
     this.fetchData()
  },
  methods: {
    show(row) {
      console.log(row)
      this.dialog = true
    },
    async fetchData() {
      this.listLoading = true
      const { data } = await getList(this.queryForm)
      this.list = data
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialog = false
      this.$emit('fetch-data')
    },
    add() {
      this.dialogMember = true;
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    onSubmit(){
      this.dialogMember = false;
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { msg } = await doEdit(this.form)
          this.$baseMessage(msg, 'success')
          this.$refs['form'].resetFields()
          this.dialog = false
          this.$emit('fetch-data')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await doDelete({ ids: row.id })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join()
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const { msg } = await doDelete({ ids: ids })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          this.$baseMessage('未选中任何行', 'error')
          return false
        }
      }
    },
  },
}
</script>
