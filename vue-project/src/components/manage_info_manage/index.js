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
        value: '课外兼职',
        label: '课外兼职'
      }, {
        value: '婚恋交友',
        label: '婚恋交友'
      }, {
        value: '失物招领',
        label: '失物招领'
      }, {
        value: '休闲娱乐',
        label: '休闲娱乐'
      }, {
        value: '公共活动',
        label: '公共活动'
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
        value: '课外兼职',
        label: '课外兼职'
      }, {
        value: '婚恋交友',
        label: '婚恋交友'
      }, {
        value: '失物招领',
        label: '失物招领'
      }, {
        value: '休闲娱乐',
        label: '休闲娱乐'
      }, {
        value: '公共活动',
        label: '公共活动'
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
      commentData: null,
      value: '全部',
      pcategory: null,
      isP: false,
      categoryDialogVisible: false,
      row: {},
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
         goods_or_activity: 1,
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

    closeUserDialog() {
      this.dialogVisible = false;
      this.formVis_addUser = false;
      this.formVis_editUser = false;
    },


    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_all',
        data: {
         goods_or_activity: 1,
         page: val,
         status: -1,
         category: this.value,
         keyword: this.input
        }
      })
      .then((res) => {
        this.pages = res.data.pages
        this.tableData = res.data.data_list
        // let temp = res.data.data.datalist
        // for(let i = 0; i < temp.length; i++){
        //   let content = temp[i].content
        //   let contact = temp[i].contact_msg

        //     if(content.length > 15){
        //       temp[i].content = temp[i].content.substring(0, 14)
        //       temp[i].content = temp[i].content.concat("...")
        //     }
        //     if(contact.length > 15){
        //       temp[i].contact_msg = temp[i].contact_msg.substring(0, 14)
        //       temp[i].contact_msg = temp[i].contact_msg.concat("...")
        //     }
        // }
        // this.tableData = temp
      })
      .catch(err => {
        // console.log(err);
      });
    },

    

    showDetail(index, row) {
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
        console.log(this.commentData)
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
        name: 'manage_info_approve',
        path:'/manage_info_approve',
        query: {
          partnum: 1
        }
      })
    },

    refresh() {    
        this.axios({
          method: 'post',
          url: '/adminpage/task/get_all',
          data: {
           goods_or_activity: 1,
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