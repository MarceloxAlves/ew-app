<template>
  <div>
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="toggleMenu" v-if="!showNavigation && logado">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button to="/">
        <span class="md-title">Edit World</span>
      </md-button>

      <div class="md-toolbar-section-end">
        <md-button v-show="!logado" class="md-primary" to="/account">Criar Conta</md-button>
        <md-button v-show="!logado" class="md-accent" to="/login" >Acessar</md-button>
        <md-button class="md-icon-button" @click="togglePanel" v-if="!showSidepanel && logado">
          <md-icon> more_vert</md-icon>
        </md-button>
      </div>

    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Edit World</span>
      </md-toolbar>

      <md-list>
        <md-list-item to="/painel">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Inicio</span>
        </md-list-item>

        <md-list-item to="/salas">
          <md-icon>record_voice_over</md-icon>
          <span class="md-list-item-text">Salas</span>
        </md-list-item>

        <md-list-item to="/desafios">
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item to="/">
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-drawer class="md-right" v-if="showSidepanel" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Perfil</span>
      </md-toolbar>

      <md-avatar class="md-avatar-icon md-large">
        <md-icon>person_pin</md-icon>
      </md-avatar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text ">{{user.nome}}</span>

        </md-list-item>

        <md-list-item @click="logout()" >
          <span class="md-list-item-text">Sair</span>
          <md-button class="md-icon-button md-list-action" >
            <md-icon>keyboard_return</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>

  </div>

</template>

<script>
  export default {
    name: 'navbar',
    props: ['logado','user'],
    data: () => ({
      showNavigation: false,
      showSidepanel: false
    }),
    watch:{
      logado(novo){
      }
    },
    methods: {
      logout(){
        this.showSidepanel = false;
        this.$emit('logout')
      },
      toggleMenu () {
        this.showNavigation = !this.showNavigation
      },
      togglePanel () {
        this.showSidepanel = !this.showSidepanel
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-content {
    padding: 16px;
  }
</style>
