<template>
  <div>
    <md-tabs md-sync-route>
      <md-tab id="tab-home" md-label="Salas" md-icon="record_voice_over"><salas></salas></md-tab>
      <md-tab id="tab-pages" md-label="Alunos" md-icon="groups"></md-tab>
      <md-tab id="tab-posts" md-label="Desafios" md-icon="games"></md-tab>
      <md-tab id="tab-favorites" md-label="Favorites" md-icon="favorite"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
    import Salas from "./Salas";
    export default {
        name: "Painel",
      components: {Salas},
      created(){
        this.$auth.autenticar(this)
      }
    }
</script>

<style scoped>

</style>
