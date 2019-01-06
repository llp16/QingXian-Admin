<template>
<el-row>
    <!-- <msgDialog
        :textVisable="textVisable"
        :user_id="user_id"
        v-on:close="closeDialog">
    </msgDialog> -->
    <detailDialog
        :dialogVisible="detailDialogVisible"
        v-on:closeDialog="closeDetail"
        v-on:detailDataChanged="emitRefresh"
        :info="info"
        :taskData="taskData"
        :taskPages="taskPages"
        :user_id="user_id"
        ref = "detailDialog">
    </detailDialog>
    <msgDialog
        :textVisable="textVisable"
        :user_id="user_id"
        v-on:close="closeDialog">
    </msgDialog>
    <el-col>
    <el-card>
        <!-- <el-button type="primary" @click="showDialog" icon="el-icon-message"></el-button> -->
        <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="检索范围: " label-width="80px">
                <el-radio-group v-model="radio">
                    <el-radio-button label="0">全部</el-radio-button>
                </el-radio-group>
             </el-form-item>
        <el-form-item label="关键字: " label-width="80px" style="width: 300px">
            <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
        </el-form-item>
        </el-form>
    </el-card>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="user_id"
                label="用户ID"
                align="center">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="credit"
                label="信用分"
                width="120"
                align="center">
            </el-table-column>
            <el-table-column
                prop="user_contact"
                label="联系方式"
                align="center">
            </el-table-column>
            <el-table-column
                prop="task_num"
                label="发布的任务量"
                align="center">
            </el-table-column>
            <el-table-column
		    label="详情"
            align="center">
			<template slot-scope="scope">
				<el-button
                    size="mini"
                    type="primary"
                    @click="detailCheck(scope.$index, scope.row)">
                    查看</el-button>
				</template>
		    </el-table-column>
            <el-table-column
		    label="互动"
            align="center">
			<template slot-scope="scope">
				<el-button
                    size="mini"
                    type="info"
                    icon="el-icon-message"
                    @click="showDialog(scope.row)">
                </el-button>
				</template>
		    </el-table-column>
        </el-table>
    </el-col>
</el-row>
</template>
<style src="./index.less" lang="less"></style>
<script src="./index.js"></script>