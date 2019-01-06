<template>
    <el-row>
    <el-dialog
        title="图片描述"
        :visible.sync="PicVisible"
        width="900px">
        <el-carousel height="700px" >
        <el-carousel-item v-for="(pic, index) in info.pics" :key="index">
        <img height="700" width="900" :src="pic">
        </el-carousel-item>
        </el-carousel>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="PicVisible = false">确 定</el-button>
        </span> -->
    </el-dialog>
    <el-dialog
        title="删除原因"
        :visible.sync="textVisable"
        width="40%">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="textVisable = false">取 消</el-button>
        <el-button type="primary" @click="deleteComment">发 送</el-button>
        </span>
    </el-dialog>
    <el-dialog title="商品详情" 
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="900px">
    <el-row :gutter="20">
        <el-col :span="11">
        <p class="text">
            <el-row><span>标签: {{info.label}}</span></el-row><br>
            <el-row><span>分类: {{info.category}}</span></el-row><br>
            <el-row><span>标题: {{info.title}}</span></el-row><br>
            <el-row><span>价格: {{info.price}}</span></el-row><br>
            <el-row><span>文字内容： {{info.content}}</span></el-row><br>
            <el-row><span>联系方式： {{info.user_contact}}</span></el-row><br>
            <el-row><span>用户昵称： {{info.nickname}}</span></el-row><br>
            <el-row><span>用户id： {{info.user_id}}</span></el-row><br>
        </p>
        </el-col>
        <el-col :span="12">
            <el-carousel height="350px" >
            <el-carousel-item v-for="(pic, index) in info.pics" :key="index">
            <img height="350" width="450" @click="PicVisible = true" :src="pic">
            </el-carousel-item>
            </el-carousel>
        </el-col>
    </el-row>
    <el-row>
        <el-table
            :data="commentData"
            style="100%">
            <el-table-column
                prop="comment_id"
                label="评论ID"
                align="center">
            </el-table-column>
            <el-table-column
                prop="reviewer_id"
                label="评论者ID"
                align="center">
            </el-table-column>
            <el-table-column
                prop="reviewer_nickname"
                label="评论者昵称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="receiver_id"
                label="被评论者ID"
                align="center">
            </el-table-column>
            <el-table-column
                prop="receiver_nickname"
                label="被评论者昵称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="detail"
                label="内容"
                align="center">
            </el-table-column>
            <el-table-column
                prop="time"
                label="评论时间"
                align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                width="140">
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
    <el-row>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCommentChange"
            :current-page="currentPage1"
            layout="prev, pager, next, jumper"
            background="true"
            :pager-count="5"
            :page-count="commentPages">
        </el-pagination>
    </el-row>

    </el-dialog>
    </el-row>
</template>
<style src="./index.less" lang="less"></style>
<script src="./index.js"></script>


