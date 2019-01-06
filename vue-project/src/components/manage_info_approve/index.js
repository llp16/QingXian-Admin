// import editDialog from "../Dialog/index.vue"
import globalData from "../../assets/global/globalData";
import editDialog from "../Dialog/index.vue"

export default {
  name: 'manage_info_manage',
  components: {
    editDialog,
  },
  
  data () {
    return {
      changePwdDialogVisible: false,
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
      commentData: null,  
      value: '全部',
      pcategory: null,
      isP: false,
      categoryDialogVisible: false,
      row: {},
      pages: null,
      page: 1,
      dialogVisible: false,
      tableData: null,
      detail_data:null,
      websock: null,
      state: null,
      info: {
        label: null,
        category: null,
        title: null,
        price: null,
        content: null,
        contact_msg: null,
        nick_name: null,
        pic_urls: null,
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

    restoreCategory() {
      this.row.category = this.pcategory
      this.categoryDialogVisible = false
    },

    savePcategory(row) {
      if(this.isP == false){
        this.pcategory = row.category
        this.isP = true
      }else{
        this.isP = false
      }
    },

    modifyCate(index, row) {
      this.axios({
        method: 'post',
        url: '/adminpage/task/change_category',
        data:{
          task_id: row.task_id,
          category: row.category,
        }
      })
      .then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.refresh()
      })
      .catch(err => {
        console.log(err);
      });
    },

    agreeGood(index, row) {
      if(this.tableData.length === 1){
        this.page = this.page - 1
      }
      this.axios({
        method: 'post',
        url: '/adminpage/task/check',
        data:{
          task_id: row.task_id,
          agree: 1,
        }
      })
      .then((res) => {
        this.$message({
          message: '审核成功',
          type: 'success'
        });
        this.refresh()
  
      })
      .catch(err => {
        console.log(err);
      });
    },

    disagreeGood(index, row) {
      this.axios({
        method: 'post',
        url: '/adminpage/task/check',
        data:{
          task_id: row.task_id,
          agree: 0,
        }
      })
      .then((res) => {
        this.$message({
          message: '审核成功',
          type: 'success'
        });
        this.refresh()
      })
      .catch(err => {
        console.log(err);
      });
    },

    
    
    closecloseUserDialog() {
      this.dialogVisible = false;
      this.formVis_addUser = false;
      this.formVis_editUser = false;
    },

    closeDetail() {
      this.dialogVisible = false;
    },


    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_all',
        data: {
         goods_or_activity: 1,
         page: val,
         status: 0,
         category: "全部",
         keyword: "" 
        }
      })
      .then((res) => {
        this.page = val
        this.tableData = res.data.data_list
        this.pages = res.data.pages
      
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
     
      this.dialogVisible = true
    },

    change2manage(){
      this.$router.push({
        name: 'manage_info_manage',
        path:'/manage_info_manage',
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
           status: 0,
           category: "全部",
           keyword: ""
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
              console.log(res.data.data_list)
              this.tableData = res.data.data_list
              this.pages = res.data.pages
            }
          
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