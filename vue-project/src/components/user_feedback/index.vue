<template>
    <el-row>
        <msgDialog
            :textVisable="textVisable"
            :user_id="user_id"
            v-on:close="closeDialog"
            v-on:sucess="sucessMsg">
        </msgDialog>
        <el-dialog
            title="图片描述"
            :visible.sync="PicVisible"
            width="900px">
            <el-carousel height="700px" >
            <el-carousel-item v-for="(pic, index) in feedback.pics" :key="index">
            <img height="700" width="900" :src="pic">
            </el-carousel-item>
            </el-carousel>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="PicVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="未回复" name="first">
            <!-- <el-row>
                <el-col :span="4.5" style="height:1000px">
                <el-card style="height:750px">
                    <el-table
                    :data="tableData"
                    style="width:200px">
                        <el-table-column
                            prop="feedback_id"
                            label="反馈ID"
                            width="50"
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
                    <el-row>
                        <el-pagination
                            @current-change="handleChange"
                            :current-page="currentPage1"
                            layout="prev, pager, next"
                            background="true"
                            :pager-count="3"
                            :page-count="pages">
                        </el-pagination>
                    </el-row>
                </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card style="height:750px">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="用户昵称：">
                                <span style="font-size: 18px;">{{feedback.nickname}}</span>
                                <el-button type="info" icon="el-icon-message" @click="showDialog"></el-button>
                            </el-form-item>
                            <el-form-item label="反馈日期：">
                                <span style="font-size: 18px;">{{feedback.time}}</span>
                            </el-form-item>
                            <el-form-item label="内容：">
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    readonly="true"
                                    v-model="textarea">
                                </el-input><br>
                            </el-form-item>
                            <el-form-item label="图片描述：">
                                <el-col>
                                    <el-carousel height="350px" >
                                    <el-carousel-item v-for="(pic, index) in feedback.pics" :key="index">
                                        <img height="350" width="450" @click="PicVisible = true" :src="pic">
                                    </el-carousel-item>
                                    </el-carousel>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row> -->
        </el-tab-pane>
        <el-tab-pane label="历史反馈" name="second"></el-tab-pane>
                  <el-row>
                <el-col :span="4.5" style="height:1000px">
                <el-card style="height:750px">
                    <el-table
                    :data="tableData"
                    style="width:200px">
                        <el-table-column
                            prop="feedback_id"
                            label="反馈ID"
                            width="50"
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
                    <el-row>
                        <el-pagination
                            @current-change="handleChange"
                            :current-page="currentPage1"
                            layout="prev, pager, next"
                            background="true"
                            :pager-count="3"
                            :page-count="pages">
                        </el-pagination>
                    </el-row>
                </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card style="height:750px">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="用户昵称：">
                                <span style="font-size: 18px;">{{feedback.nickname}}</span>
                                <el-button type="info" icon="el-icon-message" @click="showDialog"></el-button>
                            </el-form-item>
                            <el-form-item label="反馈日期：">
                                <span style="font-size: 18px;">{{feedback.time}}</span>
                            </el-form-item>
                            <el-form-item label="内容：">
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    readonly="true"
                                    v-model="textarea">
                                </el-input><br>
                            </el-form-item>
                            <el-form-item label="图片描述：">
                                <el-col>
                                    <el-carousel height="350px" >
                                    <el-carousel-item v-for="(pic, index) in feedback.pics" :key="index">
                                        <img height="350" width="450" @click="PicVisible = true" :src="pic">
                                    </el-carousel-item>
                                    </el-carousel>
                                </el-col>
                            </el-form-item>
                            <!-- <el-col offset="20">
                                <el-button type="primary" @click="feedbackCheck">已阅</el-button>
                            </el-col>    -->
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-tabs>
    </el-row>
</template>
<style src="./index.less" lang="less"></style>
<script src="./index.js"></script>