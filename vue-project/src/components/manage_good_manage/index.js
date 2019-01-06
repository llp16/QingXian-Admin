// import editDialog from "../Dialog/index.vue"
import globalData from "../../assets/global/globalData";
import editDialog from "../Dialog/index.vue"

export default {
  name: 'manage_good_manage',
  components: {
    editDialog,
  },
  data () {
    return {
      options_all: [{
        value: '全部',
        label: '全部'
      }, {
        value: '学习',
        label: '学习'
      }, {
        value: '日用',
        label: '日用'
      }, {
        value: '服饰',
        label: '服饰'
      }, {
        value: '运动',
        label: '运动'
      }, {
        value: '电子',
        label: '电子'
      }, {
        value: '美妆',
        label: '美妆'
      }, {
        value: '其它',
        label: '其它'
      }],
      options_status: [{
        value: '已下架',
        label: '已下架'
      }, {
        value: '已上架',
        label: '已上架'
      }],
      options: [{
        value: '学习',
        label: '学习'
      }, {
        value: '日用',
        label: '日用'
      }, {
        value: '服饰',
        label: '服饰'
      }, {
        value: '运动',
        label: '运动'
      }, {
        value: '电子',
        label: '电子'
      }, {
        value: '美妆',
        label: '美妆'
      }, {
        value: '其它',
        label: '其它'
      }],
      options_status: [{
        value: '已下架',
        label: '已下架'
      }, {
        value: '已上架',
        label: '已上架'
      }],
      commentPages: null,
      commentPage: 1,
      commentData: null,
      value: '全部',
      pcategory: null,
      isP: false,
      categoryDialogVisible: false,
      row: {},
      task_id: null,
      changePwdDialogVisible: false,
      pages: 0,
      page: 1,
      dialogVisible: false,
      textVisable: false,
      textarea: null,
      content: null,
      contact: null,
      tableData: null,
      websock: null,
      pstatus: null,
      selectDialogVisible: false,
      input: null,
      state: null,
      info: globalData.basePageInfo.goodData[0],
      account:{
        username: null,
        password: null,
        newPassWord: null,
      },
    }
  },
  created() {
    this.refresh()
  },
  methods: {
 

    selectCChange(row) {
      this.row = row
      this.categoryDialogVisible = true
    },

    selectSChange(row) {
      this.row = row
      this.selectDialogVisible = true
    },

    send2user() {

      this.axios({
        method: 'post',
        url: '/adminpage/task/check',
        data:{
          task_id: this.row.task_id,
          agree: 0,
          undercarriage_reason: this.textarea
        }
      })
      .then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.selectDialogVisible = false
        this.textVisable = false
        this.textarea = null
        this.refresh()
      })
      .catch(err => {
        console.log(err);
      });
    },

    changeCategory() {
      console.log(this.row.category)
      this.axios({
        method: 'post',
        url: '/adminpage/task/change_category',
        data:{
          task_id: this.row.task_id,
          category: this.row.category,
        }
      })
      .then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        console.log(res.data)
        this.categoryDialogVisible = false
        this.refresh()
      })
      .catch(err => {
        console.log(err);
      });
    },

    changeStatus() {
      let status = null
      if(this.row.status == "已下架"){
        status = 0
        this.textVisable = true
      }else{
        status = 1
        this.axios({
          method: 'post',
          url: '/adminpage/task/check',
          data:{
            task_id: this.row.task_id,
            agree: status,
          }
        })
        .then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.selectDialogVisible = false
          this.textarea = null
          this.refresh()
        })
        .catch(err => {
          console.log(err);
        });
      }
    
    },

    restoreCategory() {
      this.row.category = this.pcategory
      this.categoryDialogVisible = false
    },

    restoreStatus() {
      this.row.status = this.pstatus
      this.textarea = null
      this.textVisable = false
      this.selectDialogVisible = false
    },

    savePcategory(row) {
      if(this.isP == false){
        this.pcategory = row.category
        this.isP = true
      }else{
        this.isP = false
      }
    },

    savePstatus(row) {
      // console.log(row.status)
      if(this.isP == false){
        this.pstatus = row.status
        this.isP = true
      }else{
        this.isP = false
      }
    },

    search() {
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_all',
        data: {
         goods_or_activity: 0,
         page: 1,
         status: -1,
         category: this.value,
         keyword: this.input
        }
      })
      .then((res) => {
        this.pages = res.data.pages
        this.tableData = res.data.data_list
      })
      .catch(err => {
        // console.log(err);
      });
    },  


    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_all',
        data: {
         goods_or_activity: 0,
         page: val,
         status: -1,
         category: this.value,
         keyword: this.input
        }
      })
      .then((res) => {
        this.pages = res.data.pages
        this.tableData = res.data.data_list
      })
      .catch(err => {
        // console.log(err);
      });
    },

    

    showDetail(index, row) {
      this.task_id = row.task_id
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_task_detail',
        data: {
         task_id: row.task_id
        }
      })
      .then((res) => {
        this.info = res.data
      })
      .catch(err => {
        console.log(err);
      });
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_comments',
        data: {
         task_id: row.task_id,
         page: this.commentPage
        }
      })
      .then((res) => {
        this.commentData = res.data.comment_list
        this.commentPages = res.data.pages
      })
      .catch(err => {
        console.log(err);
      });
      this.dialogVisible = true
    },

    categoryChange(row){
      
    },

    change2approve(){
      this.$router.push({
        name: 'manage_good_approve',
        path:'/manage_good_approve',
        query: {
          partnum: 0
        }
      })
    },

    refresh() {    
        this.axios({
          method: 'post',
          url: '/adminpage/task/get_all',
          data: {
           goods_or_activity: 0,
           page: this.page,
           status: -1,
           category: this.value,
           keyword: this.input
          }
        })
        .then((res) => {
          this.pages = res.data.pages
          this.tableData = res.data.data_list
      
        })
        .catch(err => {
          // console.log(err);
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
        })
    },

    

    changePwd(){
      this.axios({
        method: 'post',
        url: '/controller/changePwd',
        data: {
          username: this.account.username,
          password: this.account.password,
          newPassWord: this.account.newPassWord
        }
      })
      .then((res) => {
        console.log(res.data['msg'])
        if(res.data['error'] === 0)
        {
          this.$message({
            type: 'success',
            message: '密码修改成功'
          });
          this.changePwdDialogVisible = false
        }
        else if(res.data['error'] === 100)
        {
          this.$message({
            type: 'warning',
            message: '您还未登录,请重新登录'
          });
          this.$router.push({
            name: 'adminpage/login',
            path:'/adminpage/login',
            query: {
            }
          })
        }
        else
        {
          this.$message({
            type: 'info',
            message: res.data['msg']
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}