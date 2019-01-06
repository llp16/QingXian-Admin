<template>
  <el-row id="page_1" style="height: 100%">
      <el-dialog
        title="提醒"
        :visible.sync="selectDialogVisible"
        :before-close="restoreStatus"
        width="35%">
        <span>确认将商品状态从“{{pstatus}}”修改为“{{row.status}}”?</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="restoreStatus">取 消</el-button>
        <el-button type="primary" @click="changeStatus">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="提醒"
        :visible.sync="categoryDialogVisible"
        :before-close="restoreCategory"
        width="35%">
        <span>确认将商品分类从“{{pcategory}}”修改为“{{row.category}}”?</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="restoreCategory">取 消</el-button>
        <el-button type="primary" @click="changeCategory">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="下架原因"
        :visible.sync="textVisable"
        width="40%"
        :before-close="restoreStatus">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="textVisable = false">取 消</el-button>
        <el-button type="primary" @click="send2user">发 送</el-button>
        </span>
    </el-dialog>
    <el-row :gutter="30">
        <el-col :span="2">
            <el-button type="primary" @click="change2approve">任务审核</el-button>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" @click="change2manage">任务管理</el-button>
        </el-col>
    </el-row><br>
    <el-row>
        <el-col :span="15">
            <el-card>
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="分类: " label-width="80px" >
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options_all" 
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="关键字: " label-width="80px">
                    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            </el-card><br><br>
        </el-col>
    </el-row>
    <editDialog
     :dialogVisible="dialogVisible"
                    :info="info"
                    :commentData="commentData"
                    :task_id="task_id"
					v-on:closeDialog="closeUserDialog">
					</editDialog>
    <el-table
        :data="tableData"
        style="width:100%">
        <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
        </el-table-column>
        <el-table-column
            prop="label"
            label="标签"
            align="center">
        </el-table-column>
        <el-table-column
            label="分类"
            align="center"
            width="140">
            <template slot-scope="scope">
            <el-select v-model="scope.row.category" @change="selectCChange(scope.row)" @visible-change="savePcategory(scope.row)">
                <el-option
                v-for="item in options" 
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </template>
        </el-table-column>
        <el-table-column
            label="商品状态"
            align="center"
            width="120">
            <template slot-scope="scope">
            <el-select v-model="scope.row.status" @change="selectSChange(scope.row)" @visible-change="savePstatus(scope.row)">
                <el-option
                v-for="item in options_status" 
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            align="center">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格"
            align="center">
        </el-table-column>
        <el-table-column
            prop="content"
            label="文字内容"
            align="center">
        </el-table-column>
        <el-table-column
            prop="user_contact"
            label="联系方式"
            align="center">
        </el-table-column>
        <el-table-column
            prop="nickname"
            label="用户昵称"
            align="center">
        </el-table-column>
        <el-table-column
		    label="详情"
			width="140"
            align="center">
			<template slot-scope="scope">
				<el-button
					round
					size="mini"
					type="primary"
					@click="showDetail(scope.$index, scope.row)">
					查看
					</el-button>
				</template>
		</el-table-column>
    </el-table>
    <br>
        <el-row>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                layout="prev, pager, next, jumper"
                background="true"
                :page-count="pages">
            </el-pagination>
        </el-row>
  </el-row>
</template>

<script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
<style src="./index.less" lang="less"></style>
<script src="./index.js"></script>