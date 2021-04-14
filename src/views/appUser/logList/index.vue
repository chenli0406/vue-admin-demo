<template>
  <div class="table-container">
    <el-form
      ref="form"
      :model="queryForm"
      :inline="true"
      @submit.native.prevent
    >
      
      <el-form-item label="操作时间段">
        <el-date-picker
          v-model="dateRange"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          style="width: 360px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="queryForm.title" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          @click="handleQuery"
        >
          查询
        </el-button>
        <el-button
          icon="el-icon-refresh"
          type="danger"
          native-type="submit"
          @click="handleQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
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
        label="用户昵称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户名"
        prop="author"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="IP地址"
        prop="author"
      ></el-table-column>
       <el-table-column
        show-overflow-tooltip
        label="操作时间"
        prop="datetime"
        sortable
      ></el-table-column>
       <el-table-column
        show-overflow-tooltip
        label="操作描述"
        prop="author"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作结果"
        prop="author"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作参数"
        prop="author"
      ></el-table-column> 
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/table'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      dateRange: [],
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 20,
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
  beforeDestroy() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    handleQuery() {
      this.queryForm.pageNo = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const { data, totalCount } = await getList(this.queryForm)
      this.list = data
      const imageList = []
      data.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
      this.total = totalCount
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
  },
}
</script>
