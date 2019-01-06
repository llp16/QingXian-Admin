export default {
    name: "Dialog",
    data() {
      return {
        PicVisible: false,
        info: {
          label:null,
          category:null,
          title:null,
          price:null,
          content:null,
          user_contact:null,
          nickname:null,
          pics:null,
          user_id:null,
        },
        textVisable: false,
        comment_id: null,
        textarea: null,
        task_id:null,
        page: 1,
        commentData: [],
        commentPages: null,

      };
    },
    props: {
      dialogVisible:{
        type: Boolean,
        default: false
      },
      task_id:{
        type: String,
        default: false
      },
      info:this.info,
      commentPages: this.commentPages,
      commentData:this.commentData
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
        this.$emit('close')
      },

      refresh() {
        this.axios({
          method: 'post',
          url: '/adminpage/task/get_comments',
          data: {
            task_id: this.task_id,
            page: this.page
          }
        })
        .then((res) => {
          this.commentData = res.data.comment_list
        })
        .catch(err => {
          console.log(err);
        });
      },

      showTextarea(index, row){
        this.comment_id = row.comment_id
        this.textVisable = true
      },

      handleCommentChange(val) {
        // console.log(`当前页: ${val}`);
        this.commentPage = val
        this.axios({
            method: 'post',
            url: '/adminpage/task/get_comments',
            data: {
            task_id: this.task_id,
            page: this.commentPage
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
          this.textVisable = false
          this.textarea = null
          this.refresh()
        })
        .catch(err => {
          console.log(err);
        });
      },

    }
  }
  