<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="楼栋号" prop="title">
            <el-input
              v-model.trim="form.title"
              autocomplete="off"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业态" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标准层层高" prop="title">
            <el-input
              v-model.trim="form.title"
              autocomplete="off"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总楼层数" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同开工时间" prop="title">
            <el-date-picker
              v-model="value1"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地下室层数" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同±0时间" prop="title">
            <el-input
              v-model.trim="form.title"
              autocomplete="off"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否带人防" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option value="" label="请选择"></el-option>
              <el-option :value="1" label="是"></el-option>
              <el-option :value="0" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同封顶时间" prop="title">
            <el-date-picker
              v-model="value1"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否全剪外墙" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option value="" label="请选择"></el-option>
              <el-option :value="1" label="是"></el-option>
              <el-option :value="0" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拆架完成时间" prop="title">
            <el-date-picker
              v-model="value1"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建造体系" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单体完工时间" prop="title">
            <el-date-picker
              v-model="value1"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外墙构造" prop="title">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="外抹" name="1"></el-checkbox>
              <el-checkbox label="防水涂料" name="2"></el-checkbox>
              <el-checkbox label="保温板" name="3"></el-checkbox>
              <el-checkbox label="一体板" name="4"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同竣备时间" prop="title">
            <el-date-picker
              v-model="value1"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面砖和涂料是饰面" prop="title">
            <el-radio-group v-model="form.title">
              <el-radio label="涂料"></el-radio>
              <el-radio label="面钻"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="填充墙材料" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交付标准" prop="title">
            <el-select v-model="form.title" clearable size="small">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
        title: '',
        type:[]
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入项目名称' }],
      },
      title: '',
      value1: '',
      dialogFormVisible: false,
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
    }
  },
  created() {},
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = '添加合同'
      } else {
        this.title = '编辑合同'
        this.form = Object.assign({}, row)
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.$emit('fetch-data')
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
