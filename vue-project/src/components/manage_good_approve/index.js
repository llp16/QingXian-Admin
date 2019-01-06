// import editDialog from "../Dialog/index.vue"
import globalData from "../../assets/global/globalData";
import editDialog from "../Dialog/index.vue"
import { isDate } from "util";

export default {
  name: 'manage_good_approve',
  components: {
    editDialog,
  },
  
  data () {
    return {
      changePwdDialogVisible: false,
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
      commentData: null,
      pcategory: null,
      isP: false,
      row: {},
      categoryDialogVisible: null,
      value: '全部',
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
    selectChange(row) {
      row.modifyBtn = false
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


    savePcategory(row) {
      if(this.isP == false){
        this.pcategory = row.category
        this.isP = true
      }else{
        this.isP = false
      }
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

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.axios({
        method: 'post',
        url: '/adminpage/task/get_all',
        data: {
         goods_or_activity: 0,
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
        console.log(res.data)
        
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
      // this.info = this.deepCopy(row)
      // this.info.content = this.detail_data[index]["content"]
      // this.info.contact_msg = this.detail_data[index]["contact_msg"]
      this.dialogVisible = true
    },

    change2manage(){
      this.$router.push({
        name: 'manage_good_manage',
        path:'/manage_good_manage',
        query: {
          partnum: 0
        }
      })
    },
    
    deepCopy(obj){
      if(typeof obj != 'object'){
          return obj;
      }
      var newobj = {};

      for ( var attr in obj) {
        newobj[attr] = this.deepCopy(obj[attr]);
      }
      return newobj
    },

    refresh() {    

        this.axios({
          method: 'post',
          url: '/adminpage/task/get_all',
          data: {
           goods_or_activity: 0,
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
          else{
            this.tableData = res.data.data_list
            this.pages = res.data.pages
          }
        })
        .catch((err) => {
          
        })
    },


    selectCChange(row) {
      this.row = row
      this.categoryDialogVisible = true
      console.log("cate:"+this.categoryDialogVisible)
      console.log("detail:"+this.dialogVisible)
    },

    closeDetail() {
      this.dialogVisible = false;
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