<template>
<el-row>
    <el-dialog
        title="删除原因"
        :visible.sync="deleteVisable"
        width="40%">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisable = false">取 消</el-button>
        <el-button type="primary" @click="deleteComment">发 送</el-button>
        </span>
    </el-dialog>
    <el-dialog title="用户信息" 
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="900px">
        <el-tabs 
            v-model="infoNum">
            <el-tab-pane label="基本信息" name="first">
                <el-row>
                    <el-col :span="15">
                        <p class="text">
                        <el-row><span>昵称：{{info.nickname}}</span></el-row><br>
                        <el-row><span>联系方式：{{info.user_contact}}</span></el-row><br>
                        <el-row><span>信用分：{{info.credit}}</span></el-row><br>
                        <el-row><span>历史任务总数：{{info.task_num}}</span></el-row><br>
                        <el-row><span>历史评论总数：{{info.comment_num}}</span></el-row><br>
                        <el-row><span>收藏任务总数：{{info.collect_num}}</span></el-row><br>
                         </p>
                        <el-row>
                            <el-button type="primary" @click="showDialog">发消息</el-button>                     
                        </el-row>
                        <br>
                    </el-col>
                    <el-col :span="9">
                        <el-row><img height="250" width="250" :src="info.avatar_url" style="border:1px solid #000"></el-row>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-tabs 
            v-model="activeName"
            type="card"
            @tab-click="handleClick">
            <el-tab-pane label="历史任务" name="second">
        <el-row>
        <el-table
            :data="taskData"
            style="width:100%">
            <el-table-column
                type="index"
                label="序号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="label"
                label="标签"
                align="center">
            </el-table-column>
            <el-table-column
                prop="category"
                label="分类"
                align="center">
                <!-- <template slot-scope="scope">
                <el-select v-model="scope.row.category" @change="selectCChange(scope.row)" @visible-change="savePcategory(scope.row)">
                    <el-option
                    v-for="item in options" 
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template> -->
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                label="任务状态"
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
            <!-- <el-table-column
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
            </el-table-column> -->
        </el-table>
        </el-row>
        <br>
        <el-row>
            <el-pagination
                @current-change="handleTaskChange"
                :current-page="currentPage1"
                layout="prev, pager, next, jumper"
                background="true"
                :pager-count="5"
                :page-count="taskPages">
            </el-pagination>
        </el-row>
            </el-tab-pane>
            <el-tab-pane label="历史评论" name="third">
                <el-row>
                    <el-table
                        :data="commentData"
                        style="width:100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="task_title"
                            label="任务标题"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="receiver_nickname"
                            label="被评论者昵称"
                            align="center">
                            <!-- <template slot-scope="scope">
                            <el-select v-model="scope.row.category" @change="selectCChange(scope.row)" @visible-change="savePcategory(scope.row)">
                                <el-option
                                v-for="item in options" 
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="detail"
                            label="内容"
                            width="300px"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="日期"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="140"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                    round
                                    size="mini"
                                    type="danger"
                                    @click="showTextarea(scope.$index, scope.row)">
                                    删除
                                    </el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    </el-row>
                    <br>
                    <el-row>
                        <el-pagination
                            @current-change="handleCommentChange"
                            layout="prev, pager, next, jumper"
                            background="true"
                            :pager-count="5"
                            :page-count="commentPages">
                        </el-pagination>
                    </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
    <msgDialog
        :textVisable="textVisable"
        :user_id="user_id"
        v-on:close="closeDialog">
    </msgDialog>
</el-row>
</template>
<style src="./index.less" lang="less"></style>
<script src="./index.js"></script>


