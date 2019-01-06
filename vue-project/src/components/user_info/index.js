import msgDialog from "../Dialog_sendMsg/index.vue"

export default {
    components: {
        msgDialog
    },
    data () {
        return{
            info: {},
            pageInfo: null,
            infoNum: "first",
            activeName: "second",
            commentData: null,
            commentPage: 1,
            commentPages: null,
            taskData: null,
            taskPage: 1,
            user_id: null,
            taskPages: null,
            comment_id: null,
            textVisable: null,
            deleteVisable: null,
            textarea: null,
        }
    },
    props: {
        personDetail: this.personDetail,
        taskData: this.taskData,
        taskPages: this.taskPages,
        user_id: this.user_id,
        dialogVisible:{
            type: Boolean,
            default: false
        },
        info: this.info
    },
    methods: {
        //更新数据
        detailDataChanged(){
            this.$emit("detailDataChanged");       
        },

        showDialog() {
            this.textVisable = true
        },

        closeDialog() {
            this.textVisable = false
          },

        // 关闭所有
        handleClose() {
            this.activeName = "second"
            this.commentData = null
            this.$emit("closeDialog");
        },

        showTextarea(index, row){
            console.log(row)
            this.comment_id = row.comment_id
            this.deleteVisable = true
            // this.deleteComment();
        },

        deleteComment() {
            this.axios({
              method: 'post',
              url: '/adminpage/task/delete_comment',
              data: {
                comment_id: this.comment_id,
                reason: this.textarea
              }
            })
            .then((res) => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.deleteVisable = false
              this.textarea = null
              this.axios({
                method: 'post',
                url: '/adminpage/user/history_comment',
                data:{
                  user_id: this.user_id,
                  page: this.commentPage,
                }
              })
              .then((res) => {
                this.commentPages = res.data.pages
                this.commentData = res.data.comment_list
              })
              .catch(err => {
                console.log(err);
              });
            })
            .catch(err => {
              console.log(err);
            });
          },
        
        handleClick(tab, event) {
            // console.log(tab, event)
            if((tab.name == "third") && (this.commentData == null)) {
                this.axios({
                    method: 'post',
                    url: '/adminpage/user/history_comment',
                    data:{
                      user_id: this.user_id,
                      page: this.commentPage,
                    }
                  })
                  .then((res) => {
                    console.log(this.user_id, this.commentPage)
                    this.commentPages = res.data.pages
                    this.commentData = res.data.comment_list
                  })
                  .catch(err => {
                    console.log(err);
                  });
            }
        },

        handleTaskChange(val) {
            // console.log(`当前页: ${val}`);
            this.taskPage = val
            this.axios({
                method: 'post',
                url: '/adminpage/user/history_task',
                data:{
                  user_id: this.user_id,
                  page: this.taskPage,
                }
              })
              .then((res) => {
                this.taskPages = res.data.pages
                this.taskData = res.data.data_list
              })
              .catch(err => {
                console.log(err);
              });
          },

          handleCommentChange(val) {
            // console.log(`当前页: ${val}`);
            this.commentPage = val
            this.axios({
                method: 'post',
                url: '/adminpage/user/history_comment',
                data:{
                  user_id: this.user_id,
                  page: this.commentPage,
                }
              })
              .then((res) => {
                this.commentPages = res.data.pages
                this.commentData = res.data.comment_list
              })
              .catch(err => {
                console.log(err);
              });
          },
      
    }
  }