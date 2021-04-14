<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="datatime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="username"
        label="账号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="datatime"
        label="最近登录时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="datatime"
        label="最近登录IP"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="username"
        label="用户状态"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="datatime"
        label="修改时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="240">
        <template #default="{ row }">
          <!-- <el-button type="text"  size="mini" @click="handleEdit(row)">
            编辑
          </el-button> -->
          <el-button type="text"  size="mini" @click="handleEdit(row)">
            查看用户角色
          </el-button>
          <el-button type="text" size="mini" @click="resetPassword(row)">
            重置密码
          </el-button>
          <el-button  type="text" size="mini" @click="handlFreeze(row)">
            冻结
          </el-button>
          <el-button type="text" size="mini" @click="handleUnfreeze(row)">
            解冻
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
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/userManagement'
import Edit from './components/UserManagementEdit'

export default {
  name: 'UserManagement',
  components: { Edit },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        username: '',
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
      if (row.id) {
        this.$refs['edit'].showEdit(row)
      } else {
        this.$refs['edit'].showEdit()
      }
    },
    handleDelete() {
      if (this.selectRows.length > 0) {
        const ids = this.selectRows.map((item) => item.id).join()
        this.$baseConfirm('你确定要删除选中项吗', null, async () => {
          const { msg } = await doDelete({ ids })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      } else {
        this.$baseMessage('未选中任何行', 'error')
        return false
      }
    },
    handlFreeze(row) {
       this.$baseConfirm('你确定要冻结该的用户吗', null, async () => {
          const { msg } = await doDelete({ ids: row.id })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
    },
    handleUnfreeze(row) {
        this.$baseConfirm('你确定要解冻该的用户吗', null, async () => {
        const { msg } = await doDelete({ ids: row.id })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    resetPassword(row) {
      this.$baseConfirm('你确定要重置选中项的密码吗', null, async () => {
        const { msg } = await doDelete({ ids: row.id })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
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
  },
}
</script>
