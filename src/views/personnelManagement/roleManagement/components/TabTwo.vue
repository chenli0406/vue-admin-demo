<template>
  <div class="roleManagement-container">
    <el-table v-loading="listLoading" :data="list">
      <el-table-column
        show-overflow-tooltip
        prop="permission"
        label="组名"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="permission" label="角色类型">
        <template>
          <div>
            <el-checkbox label="admin"></el-checkbox>
            <el-checkbox label="editor"></el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(row)"
          >
            新增
          </el-button>
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
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="选择角色组">
          <el-select
            v-model="form.title"
            placeholder="请选选择角色组"
            clearable
            size="small"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色名" prop="permission">
          <el-input v-model="form.permission" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/roleManagement'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      form: {
        permission: '',
      },
      rules: {
       title: [{ required: true, trigger: 'change', message: '请选择角色租' }],
        permission: [
          { required: true, trigger: 'blur', message: '请输入角色名' },
        ],
      },
      statusOptions: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '项目1',
          value: '1',
        },
        {
          label: '项目2',
          value: '3',
        },
      ],
      dialogFormVisible: false,
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        permission: '',
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleEdit(row) {
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$baseConfirm('你确定要删除当前项吗', null, async () => {
        const { msg } = await doDelete({ ids: row.id })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    queryData() {
      this.queryForm.pageNo = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const { data, totalCount } = await getList(this.queryForm)
      this.list = data
      this.total = totalCount
      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { msg } = await doEdit(this.form)
          this.$baseMessage(msg, 'success')
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('fetch-data')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },
  },
}
</script>
