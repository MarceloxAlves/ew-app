<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <navbar :logado="logado" :user="userLogado" @logout="logout()"></navbar>
    <vue-progress-bar></vue-progress-bar>
    <notifications  position="bottom center" group="foo" />
    <md-content class="app-content md-alignment-center">
      <router-view :logado="logado" :user="userLogado" @login="login()" @logout="logout()"/>
    </md-content>
  </div>
</template>

<script>
import Navbar from "./components/NavBar";
export default {
  name: 'App',
  components: {Navbar},
  data(){
    return{
      logado: false,
      userLogado: null
    }
  },
  mounted() {
    this.login()
    this.$socket.on('update', (data) => {
      this.$notify({
        group: 'foo',
        title: 'Notificação',
        text: data,
        type: "success"
      });
    });
  },
  created(){
    this.$socket.emit('join',"Marcelo Alves")
  },
  watch:{

  },
  methods:{
    login(){
      if (this.$session.get("user")) {
        this.logado = true
        this.userLogado = this.$session.get("user")
      }
    },
    logout(){
      if (this.$session.get("user")) {
        this.$session.remove('user')
        this.logado = false
        this.userLogado = null
        this.$router.push('/login')
      }
    }

  }
}
</script>

<style lang="scss">

  $corbg:   "#2c3e50";
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}


@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #296C05, // The primary color of your brand
  accent: #773E17
));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
