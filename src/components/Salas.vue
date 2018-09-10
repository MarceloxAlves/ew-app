<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Salas</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Procurar por nome..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="Nenhuma sala encontrada!"
        :md-description="`Cadastre uma nova sala`">
        <md-button class="md-primary md-raised" @click="newUser">Criar Sala</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.codigo }}</md-table-cell>
        <md-table-cell align="left" md-label="Descrição" md-sort-by="name">{{ item.descricao }}</md-table-cell>
        <md-table-cell align="left" md-label="Professor" >{{ item.professor.nome }}</md-table-cell>
        <md-table-cell align="left" md-label="Ativa" >
          <md-chip v-if="item.ativa" class="md-primary" md-deletable>Ativa</md-chip>
          <md-chip v-else class="md-accent" md-deletable>Inativa</md-chip>
        </md-table-cell>
        <md-table-cell md-label="Conexao">
          <md-button class="md-fab md-mini"  >
            <md-icon>swap_horiz</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Cadastro Sala</md-dialog-title>
      <md-dialog-content>
        <form novalidate  class="md-large-size-100" @submit.prevent="validateSala" >
          <md-card class="painel md-layout-item  md-small-size-100 md-elevation-1">
            <md-card-content >
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('decricao')">
                    <label for="descricao">Descrição</label>
                    <md-input type="" name="descricao" id="descricao"  v-model="form.descricao" />
                    <span class="md-error" v-if="!$v.form.descricao.required">A descrição é obrigatório</span>
                  </md-field>
                </div>
              </div>
              <md-dialog-actions>
                <md-button class="md-accent" @click="showDialog = false">Fechar</md-button>
                <md-button type="submit" class="md-primary">Salvar Sala</md-button>
              </md-dialog-actions>
            </md-card-content>
          </md-card>
        </form>
      </md-dialog-content>
    </md-dialog>
    <md-button class="md-fab md-fab-bottom-right md-large"  @click="showDialog = !showDialog">
      <md-icon>add</md-icon>
    </md-button>

  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.descricao).includes(toLower(term)))
    }

    return items
  }

  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Salas',
    mixins: [validationMixin],
    data: () => ({
      search: null,
      searched: [],
      salas: [],
      showDialog: false,
      form: {
        descricao: null,
        professor: null
      },
    }),
    methods: {
      newUser () {
        this.showDialog = true;
      },
      searchOnTable () {
        this.searched = searchByName(this.salas, this.search)
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.descricao = null
      },
      loadSalas () {
        this.$http.get('/sala')
          .then(response => {
             this.salas = response.data
             this.searched = this.salas
          })
          .catch(e=>{
            console.log(e)
            this.$notify({
              group: 'foo',
              text: 'Erro ao conectar no servidor',
              type: "error"
            });
          });
        //this.$socket.emit('professor-cadastrar',this.form)
      },
      saveSala () {
        this.$http.post('/sala/salvar',this.form)
          .then(response => {
            let result = response.data
            if (result.status == 'success'){
              this.loadSalas();
              this.clearForm()
              this.$notify({
                group: 'foo',
                text:  'Sala cadastrada com sucesso!',
                type: "success"
              });
            }else{
              this.$notify({
                group: 'foo',
                title: 'Erro ao Salvar',
                text:  result.msg,
                type: "error"
              });
            }

          })
          .catch(e=>{
            this.$notify({
              group: 'foo',
              text: 'Erro ao conectar no servidor',
              type: "error"
            });
          });
        //this.$socket.emit('professor-cadastrar',this.form)
      },
      validateSala () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveSala()
        }
      },
    },
    validations: {
      form: {
        descricao: {
          required,
        }
      }
    },
    created () {
      this.$auth.autenticar(this)
      this.loadSalas();
      let professor =  this.$auth.userLogado(this)
      this.form.professor =  professor.codigo

    }
  }
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
</style>
