import globalData from "../../assets/global/globalData";

export default {
  name: 'header',
  data () {
    return {
      date: null
    }
  },
  created() {
  },
  methods: {
    clicklogin(){
    let location = globalData.basePageInfo.getIntoUserPage
      if(location != false)
      {
        this.$message({
          type: 'info',
          message: '您已登录'
        }); 
      }
      else
      {
        this.$router.push({
          name: '/adminpage/login',
          path:'/adminpage/login',
          query: {
          }
        })
      }
    },
    clicklogout(){
        this.axios({
          method: 'post',
          url: '/adminpage/logout',
          data: {
          }
        })
        .then((res) => {
          this.$message({
            type: 'success',
            message: '退出登录成功'
          });
          this.$router.push({
            name: 'adminpage/login',
            path:'/adminpage/login',
            query: {
            }
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}