<template>
  <div>
    <h1>EditWorld</h1>
    <input v-model="user"/>
    <button @click="onLogar">Conectar</button>
  </div>

</template>

<script>
    export default {
      name: "Home",
      data() {
        return {
          user: '',
          message: '',
          logado: false,
          messages: [],
        }
      },
      created(){
        this.$socket.on('logado', function(msg){
          console.log(msg)
        });
      },
      methods: {

        onLogar() {
          this.$socket.emit('logar', this.user);
        },

        sendMessage() {
          this.$socket.emit('join', this.user);
        }
      }
    }
</script>

<style scoped>

</style>
