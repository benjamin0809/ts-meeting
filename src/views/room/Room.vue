<template>
  <div>
    <div class="page-title">
      {{ $t('room.roomManage') }}
      <el-button
        size="mini"
        type="primary"
        style="margin-left:20px;"
        @click="addRoom"
      >
        {{ $t('room.add') }}
      </el-button>
    </div>

    <el-dialog
      ref="roomDialog"
      :title="$t('room.dialogTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('roomForm')"
    >
      <el-form
        ref="roomForm"
        :model="roomForm"
        :rules="rules"
      >
        <el-form-item
          :label="$t('room.name')"
          prop="name"
        >
          <el-input
            v-model="roomForm.name"
            type="text"
            auto-complete="off"
            placeholder
          />
        </el-form-item>
        <el-form-item
          :label="$t('room.site')"
          prop="site"
        >
          <el-select
            v-model="roomForm.site"
            :placeholder="$t('room.pleaseChoose')"
          >
            <el-option
              v-for="item in siteData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelForm('roomForm')">{{ $t('room.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="submitForm('roomForm')"
        >{{ $t('room.confirm') }}</el-button>
      </span>
    </el-dialog>

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date" />
          {{ $t('room.all') }}
        </span>
        <el-table
          :data="roomData"
          style="width: 100%"
          :empty-text="$t('common.noData')"
        >
          <el-table-column
            :label="$t('room.date')"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('room.name')"
            width="500"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('room.site')"
            width="180"
          >
            <template slot-scope="scope">
              <el-tag size="medium">
                {{ scope.row.site }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('room.operation')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                {{ $t('room.edit') }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                {{ $t('room.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane
        v-for="item in siteData"
        :key="item.label"
        :label="item.label"
      >
        <el-table
          :data="roomData.filter(p => p.site===item.value)"
          style="width: 100%"
          :empty-text="$t('common.noData')"
        >
          <el-table-column
            :label="$t('room.date')"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('room.name')"
            width="500"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('room.site')"
            width="180"
          >
            <template slot-scope="scope">
              <el-tag size="medium">
                {{ scope.row.site }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- align="right" -->
          <el-table-column :label="$t('room.operation')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                {{ $t('room.edit') }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                {{ $t('room.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { dateFormat } from '../../utils/date'
@Component({
  name: 'manage'
})
export default class extends Vue {
  siteData = [
    {
      date: '2020-01-02',
      label: '龙华',
      value: 'LH'
    },
    {
      date: '2020-01-02',
      label: '贵阳',
      value: 'GY'
    }
  ]

  roomData = [
    {
      id: 1,
      date: '2016-05-02',
      name: 'E7棟4樓視訊會議室2',
      site: 'LH'
    },
    {
      id: 2,
      date: '2016-05-04',
      name: 'E7棟4樓視訊會議室1',
      site: 'LH'
    },
    {
      id: 3,
      date: '2016-05-01',
      name: '貴陽1.5F教育訓練室（一）',
      site: 'GY'
    },
    {
      id: 4,
      date: '2016-05-03',
      name: '貴陽1.5F教育訓練室（二）',
      site: 'GY'
    }
  ]

  dialogVisible = false
  roomForm = {
    id: 0,
    name: '',
    site: '',
    ModifyTime: '',
    ModifyUser: ''
  }

  addRoom() {
    this.dialogVisible = true
  }

  validateName(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('room.nameHint').toString()))
    } else {
      callback()
    }
  }
  validateSite(rule: any, value: any, callback: any) {
    if (this.roomForm.site === '') {
      callback(new Error(this.$t('room.siteHint').toString()))
    } else {
      callback()
    }
  }

  rules = {
    name: [{ validator: this.validateName, trigger: 'blur' }],
    site: [{ validator: this.validateSite, trigger: 'change' }]
  }

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        // 判断是新增还是编辑
        const index = this.roomData.findIndex(p => p.id === this.roomForm.id)
        if (index > -1) {
          let updateItem = this.roomData.find(p => p.id === this.roomForm.id)
          if (updateItem) {
            updateItem.name = this.roomForm.name
            updateItem.site = this.roomForm.site
          }
          // this.resetForm(formName);
        } else {
          this.roomData.push({
            id: Math.random(),
            date: dateFormat(new Date()),
            name: this.roomForm.name,
            site: this.roomForm.site
          })
        }

        this.resetForm(formName)
        this.$message(this.$t('common.saveSuccess').toString())
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  cancelForm(formName: string) {
    this.dialogVisible = false
    this.resetForm(formName)
  }

  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields()
  }

  handleEdit(index: any, row: any) {
    console.log(index, row)
    this.roomForm.id = row.id
    this.roomForm.name = row.name
    this.roomForm.site = row.site
    this.dialogVisible = true
  }

  handleDelete(index: any, row: any) {
    this.$confirm(this.$t('common.deleteConfirm').toString(), {
      cancelButtonText: this.$t('common.cancel').toString(),
      confirmButtonText: this.$t('common.confirm').toString()
    })
      .then(_ => {
        // 删除操作
        let a = this.roomData.findIndex(p => p.name === row.name)
        this.roomData.splice(a, 1)
        console.log(index, row)
        this.$message(this.$t('common.deleteSuccess').toString())
      })
      .catch(_ => {
        console.log('取消了删除')
      })
  }
}
</script>

<style lang="scss" scope>
.page-title {
  text-align: left;
  padding: 20px 0px;
  font-size: 20px;
}
</style>
