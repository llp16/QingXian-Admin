import globalData from "../../assets/global/globalData";
import msgDialog from "../Dialog_sendMsg/index.vue"
import detailDialog from "../user_info/index.vue"


export default {
  name: 'manage_user',
  components: {
    msgDialog,
    detailDialog
  },
  
  data () {
    return {
      form: {
        key:null
      },
      taskData: null,
      detailDialogVisible: false,
      personDetail: null,
      user_id: null,
      info: {},      
      textVisable: false,
      radio: 0,
      taskPages: null,
      currentPage: 1,
      pages: 0,
      tableData: null,
      keyword: null,
    }
  },
  created() {
    this.refresh();
  },
  methods: {

    detailCheck(index, row){
      this.user_id = row.user_id;
      this.detailDialogVisible = true;
      this.axios({
        method: 'post',
        url: '/adminpage/user/get_detail',
        data:{
          user_id: this.user_id,
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
        url: '/adminpage/user/history_task',
        data:{
          user_id: this.user_id,
          page: 1,
        }
      })
      .then((res) => {
        this.taskData = res.data.data_list
        this.taskPages = res.data.pages
      })
      .catch(err => {
        console.log(err);
      });
    },

    showDialog(row) {
      this.user_id = row.user_id
      this.textVisable = true
    },

    closeDialog() {
      this.textVisable = false
    },

    closeDetail(){
      this.detailDialogVisible = false;
    },

    searchUser() {
      this.axios({
        method: 'post',
        url: '/adminpage/user/get_user_list',
        data: {
          user_id: -1,
          keyword: this.keyword,
          page: 1,
        }
      })
      .then((res) => {
        this.tableData = res.data.user_list
        this.pages = res.data.pages
      })
      .catch(err => {
        console.log(err);
      })
    },

    // showDialog() {
    //   this.textVisable = true
    // },

    // closeDialog() {
    //   this.detailDialogVisible= false
    // },

    refresh() {    
    this.axios({
      method: 'post',
      url: '/adminpage/user/get_user_list',
      data: {
        user_id: -1,
        keyword: "",
        page: 1,
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
        this.tableData = res.data.user_list
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
    }
  }
}