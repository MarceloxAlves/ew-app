<template>
  <div class="bg-marrom">
        <br>
        <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateUser">
        <md-card class="painel md-layout-item md-size-60  md-small-size-100 md-elevation-10">
          <md-card-header>
            <div class="md-title md-primary">Cadastro Professor</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('nome')">
                  <label for="nome">Nome</label>
                  <md-input name="nome" id="nome" autocomplete="given-name" v-model="form.nome" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.nome.required">Nome é obrigatório!</span>
                  <span class="md-error" v-else-if="!$v.form.nome.minlength">Nome inválido!</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('instituicao')">
                  <label for="last-name">Instituicao</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.instituicao" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.instituicao.required">A instituição é obrigatório</span>
                </md-field>
              </div>
            </div>
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.email.required">O email é obrigatório</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
            </md-field>

            <md-field :class="getValidationClass('senha')">
              <label for="email">Senha</label>
              <md-input type="password" autocomplete="current-password" name="senha" id="senha" v-model="form.senha"/>
              <span class="md-error" v-if="!$v.form.senha.required">A senha é obrigatória</span>
              <span class="md-error" v-else-if="!$v.form.senha.minlength">Senha possui menos de 8 caracteres</span>
            </md-field>
          </md-card-content>

          <!--<md-progress-bar md-mode="indeterminate" v-if="sending" />-->

          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Criar conta</md-button>
          </md-card-actions>
        </md-card>
        <md-snackbar class="md-accent" :md-active.sync="userSaved">O usuário {{ lastUser }} cadastrado com sucesso!</md-snackbar>
      </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        nome: null,
        instituicao: null,
        email: null,
        senha: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        nome: {
          required,
          minLength: minLength(3)
        },
        senha: {
          required,
          minLength: minLength(8)
        },
        instituicao: {
          required
        },
        email: {
          required,
          email
        }
      }
    },
    created(){

    },
    methods: {
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
        this.form.nome = null
        this.form.instituicao = null
        this.form.email = null
        this.form.senha = null
      },
      saveUser () {
        this.sending = true
        this.$http.post('/professor/salvar',this.form)
          .then(response => {
            let result = response.data
            console.log(result)
            this.sending = false
            if (result.status == 'success'){
              this.$notify({
                group: 'foo',
                title: 'Sucesso',
                text: 'Usuário Cadastrado com sucesso!',
                type: "success"
              });
                this.clearForm()
            }else{
              this.$notify({
                group: 'foo',
                title: 'Erro ao cadastrar',
                text: result.msg,
                type: "error"
              });
            }

          })
          .catch(e=>{
            this.sending  = false
            this.$notify({
              group: 'foo',
              title: 'Erro ao cadastrar',
              text: 'Erro ao conectar no servidor',
              type: "error"
            });
            console.log(e)
          });
        //this.$socket.emit('professor-cadastrar',this.form)
      },
      validateUser () {
         this.$v.$touch()

        if (!this.$v.$invalid) {
         this.saveUser()
         }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

  }

  .painel{
    background: url('../assets/bg.png') no-repeat center center fixed ;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }


</style>
