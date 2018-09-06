<template>
    <h1>EditWorld</h1>
</template>

<script>
    import io from 'socket.io-client';
    export default {
      name: "Home",
      data() {
        return {
          user: '',
          message: '',
          messages: [],
          socket: io('localhost:3001')
        }
      },
      methods: {
        sendMessage(e) {
          e.preventDefault();
        }
      }
    }
</script>

<style scoped>

</style>
