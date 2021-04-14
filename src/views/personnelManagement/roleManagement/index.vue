<template>
  <div class="roleManagement-container">
    <!-- <el-divider content-position="left">
      演示环境仅做基础功能展示，若想实现不同角色的真实菜单配置，需将settings.js路由加载模式改为all模式，由后端全面接管路由渲染与权限控制
    </el-divider> -->

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="所有组" name="first">
        <vab-query-form>
          <vab-query-form-left-panel :span="12">
            <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
              添加
            </el-button>
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete"
            >
              批量删除
            </el-button>
          </vab-query-form-left-panel>
        </vab-query-form>
        <el-table
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          @selection-change="setSelectRows"
        >
          <el-table-column
            show-overflow-tooltip
            type="selection"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="permission"
            label="组名"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="100">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(row)"
              >
                编辑
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
      </el-tab-pane>
      <el-tab-pane label="所有角色" name="second">
        <tab-two></tab-two>
      </el-tab-pane>
      <el-tab-pane label="角色绑定菜单" name="third">
         <tab-three></tab-three>
      </el-tab-pane>
    </el-tabs>
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/roleManagement';
import Edit from './components/RoleManagementEdit';
import TabTwo from './components/TabTwo';
import TabThree from './components/TabThree';
export default {
  name: 'RoleManagement',
  components: { Edit, TabTwo,TabThree },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      activeName: 'first',
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
    handleClick(tab, event) {
      console.log(tab, event)
    },
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
            const { msg } = await doDelete({ ids })
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
