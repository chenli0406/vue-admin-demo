<template>
  <div class="roleManagement-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-table v-loading="listLoading" :data="list">
          <el-table-column
            show-overflow-tooltip
            prop="permission"
            label="组名"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="permission"
            label="角色类型"
          >
            <template>
              <div>
                <el-radio label="admin"></el-radio>
                <el-radio label="平台管理"></el-radio>
              </div>
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
      </el-col>
      <el-col :span="8">
        <el-tree
          :data="tableData"
          show-checkbox
          node-key="id"
          :default-checked-keys="[5]"
          :props="defaultProps"
          @check-change="handleCheckChange"
        ></el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/roleManagement'
import { getRouterList } from '@/api/router'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      tableData: [],
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        permission: '',
      },
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  created() {
    this.fetchData()
    this.MenuData()
  },
  methods: {

    handleCheckChange(data, checked, indeterminate) {
        console.log(data);
      },
    async MenuData() {
      const res = await getRouterList()
      this.tableData = res.data
      console.log(this.tableData)
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
