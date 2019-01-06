import globalData from "../../assets/global/globalData";

export default {
  name: 'navBar',
  data () {
    return {
      activeItem: 0
    }
  },
  created() {
      this.$router.push({
        name: 'manage_good_approve',
        path:'/manage_good_approve',
        query: {
          partnum: this.activeItem
        }
      })
  },
  watch: {
    $route() {
      if(this.$route.query.partnum != undefined) {
        this.activeItem = Number(this.$route.query.partnum);
      }
    }
  }
}