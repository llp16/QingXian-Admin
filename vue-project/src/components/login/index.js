import globalData from "../../assets/global/globalData";
export default {
  name: 'login',
  components: {
  },
  
  data () {
    return {
        activeName: "user",
        account : {
            username:'',
            password:'',
        },
    }
  },
  created() {
  },
  methods: {

    // 登录函数
    userLogin(){
      this.axios({
        method: 'post',
        url: '/adminpage/login',
        data: {
          username: this.account.username,
          password: this.account.password,
        }
      })
      .then((res) => {

        if(res.data['error'] === 0)
        {
          console.log("ok")

          this.$message({
            type: 'success',
            message: '登录成功'
          });
          globalData.basePageInfo.getIntoUserPage = true
          this.$router.push({
            name: 'manage_good_approve',
            path:'/manage_good_approve',
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
    },
    
    changePass(value) {
      this.visible = !(value === 'show');
    }  
  }
}