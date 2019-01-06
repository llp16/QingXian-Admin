export default {
    name: "Dialog_SendMsg",
    data() {
      return {
        textVisable: false,
        textarea: null,
        user_id: null,
      };
    },
    props: {
      textVisable:{
        type: Boolean,
        default: false
      },
      user_id: this.user_id
    },
    methods: {
      sendMsg() {
        this.axios({
          method: 'post',
          url: '/adminpage/user/send_msg',
          data: {
            user_id: this.user_id,
            detail: this.textarea,
            relevant_task_id: -1,
          }
        })
        .then((res) => {
          this.$message({
            type: 'success',
            message: '发送成功'
          }); 
          this.textarea = null
          this.user_id = null
          this.$emit('sucess')
          this.$emit('close')
        })
        .catch(err => {
          console.log(err);
        });
        
      },
      
      handleClose() {
        this.$emit('close')
      }
    }
  }
  