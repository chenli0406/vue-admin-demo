<template>
  <div class="table-container">
    <el-form
      ref="form"
      :model="queryForm"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item label="预警时间段">
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
      <el-form-item label="预警类型">
        <el-select
          v-model="queryForm.title"
          placeholder="请选择预警类型"
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
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="first">
                <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          :height="height"
          @selection-change="setSelectRows"
        >
          <el-table-column show-overflow-tooltip label="序号" width="95">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="title"
            label="预警信息"
            width="300"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="title"
            label="预警类型"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="预警时间"
            prop="datetime"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="150">
            <template #default="{ row }">
              <el-button
                type="danger"
                @click="handleDelete(row)"
              >
                确认消除
              </el-button>
            </template>
          </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="已处理" name="second">
        <el-table
          ref="tableSort"
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          :height="height"
          @selection-change="setSelectRows"
        >
          <el-table-column show-overflow-tooltip label="序号" width="95">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="title"
            label="预警信息"
            width="300"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="title"
            label="预警类型"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="预警时间"
            prop="datetime"
          ></el-table-column>
            <el-table-column
            show-overflow-tooltip
            prop="title"
            label="消除人"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="消除时间"
            prop="datetime"
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
      </el-tab-pane>
    </el-tabs>
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
      activeName: 'first',
      list: [],
      dateRange:[],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
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
    setSelectRows(val) {
      this.selectRows = val
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleAdd() {
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    addMember(row) {
      this.$refs['dialog'].show(row)
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
      this.total = totalCount
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    testMessage() {
      this.$baseMessage('test1', 'success')
    },
    testALert() {
      this.$baseAlert('11')
      this.$baseAlert('11', '自定义标题', () => {
        /* 可以写回调; */
      })
      this.$baseAlert('11', null, () => {
        /* 可以写回调; */
      })
    },
    testConfirm() {
      this.$baseConfirm(
        '你确定要执行该操作?',
        null,
        () => {
          /* 可以写回调; */
        },
        () => {
          /* 可以写回调; */
        }
      )
    },
    testNotify() {
      this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
    },
  },
}
</script>
