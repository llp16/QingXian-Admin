<template>
    <el-row>
        <el-dialog
        title="内容"
        :visible.sync="textVisable"
        :before-close="handleClose"
        width="40%">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sendMsg">发 送</el-button>
        </span>
    </el-dialog>
    </el-row>
</template>
<style src="./index.less" lang="less"></style>
<script src="./index.js"></script>


