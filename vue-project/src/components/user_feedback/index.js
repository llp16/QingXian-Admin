import globalData from "../../assets/global/globalData";
import msgDialog from "../Dialog_sendMsg/index.vue"

export default {
  name: 'user_feedback',
  components: {
    msgDialog,
  },
  
  data () {
    return {
      currentPage: 1,
      activeName: "first",
      pages: 0,
      tableData: null,
      PicVisible: false,
      textarea: null,
      user_id: null,
      type: 0,
      tab: 1,
      // pics: {},
      // user_id: null,
      // nickname: null,
      // date: null,
      pages: null,
      page: 1,
      textVisable: false,
      feedback: {
        pics: {}
      }
    }
  },
  created() {
    this.refresh();
    // globalData.basePageInfo.getIntoUserPage = true
  },
  methods: {
    handleChange(val) {
      this.page = val
      this.axios({
        method: 'post',
        url: '/adminpage/user/get_feedback',
        data:{
          type: this.type,
          page: this.page,
        }
      })
      .then((res) => {
        this.pages = res.data.pages
        this.tableData = res.data.feedback_list
      })
      .catch(err => {
        console.log(err);
      });
    },

    showDialog() {
      this.user_id = this.feedback.user_id
      console.log(this.user_id)
      this.textVisable = true
    },

    closeDialog() {
      this.textVisable = false
    },

    sucessMsg() {
      this.textVisable = false
      if(this.feedback != null && this.type === 0) {
        this.axios({
          method: 'post',
          url: '/adminpage/user/feedback_check',
          data:{
            feedback_id:this.feedback.feedback_id
          }
        })
        .then((res) => {
          console.log(res.data)
          this.$message({
            message: '已阅',
            type: 'success'
          });
          this.feedback = {
            pics:{}
          }
          this.refresh()
        })
        .catch(err => {
          console.log(err);
        });
      }
    },

    showDetail(index, row) {
      this.textarea = row.detail
      this.feedback = row
    },

    feedbackCheck() {
      if(this.feedback != null) {
        this.axios({
          method: 'post',
          url: '/adminpage/user/feedback_check',
          data:{
            feedback_id:this.feedback.feedback_id
          }
        })
        .then((res) => {
          console.log(res.data)
          this.$message({
            message: '已阅',
            type: 'success'
          });
          this.feedback = {
            pics:{}
          }
          this.refresh()
        })
        .catch(err => {
          console.log(err);
        });
      }
    },

    handleClick(tab) {
      if(tab.name == "first") {
        this.type = 0
      }
      else if(tab.name == "second") {
        this.type = 1
      }
      this.feedback = {
        pics:{}
      }
      this.refresh()
    },

    refresh() {    
      this.axios({
        method: 'post',
        url: '/adminpage/user/get_feedback',
        data:{
          type: this.type,
          page: this.page,
        }
      })
      .then((res) => {
        if(res.data.error != 0) {
          this.$message({
            type: 'warning',
            message: '您还未登录，不能浏览'
          }); 
          this.$router.push({
            name: 'adminpage/login',
            path:'/adminpage/login',
            query: {
            }
          })
        }
        else {
          console.log(res.data)
          this.pages = res.data.pages
          this.tableData = res.data.feedback_list
        }
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: 'warning',
          message: '您还未登录，不能浏览'
        }); 
        this.$router.push({
          name: 'adminpage/login',
          path:'/adminpage/login',
          query: {
          }
        })
      });
      

    }
  }
}