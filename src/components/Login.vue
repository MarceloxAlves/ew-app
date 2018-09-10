<template>
  <div class="bg-marrom">
        <br>
        <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateUser">
        <md-card class="painel md-layout-item md-size-60  md-small-size-100 md-elevation-10">
          <md-card-header>
            <div class="md-title md-primary">Login</div>
          </md-card-header>

          <md-card-content>
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
            </md-field>
          </md-card-content>

          <!--<md-progress-bar md-mode="indeterminate" v-if="sending" />-->

          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Acessar</md-button>
          </md-card-actions>
        </md-card>
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
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null,
        senha: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        senha: {
          required,
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
        this.form.email = null
        this.form.senha = null
      },
      saveUser () {
        this.sending = true
        this.$http.post('/professor/login',this.form)
          .then(response => {
            let result = response.data
            console.log(result)
            this.sending = false
            if (result.status == 'success'){
                this.clearForm()
                this.$session.set('user', {
                  codigo: result.result.codigo,
                  email: result.result.email,
                  nome: result.result.nome
                });
                this.$emit('login')
                this.$router.push('/painel')
            }else{
              this.$notify({
                group: 'foo',
                title: 'Erro ao logar',
                text:  result.msg,
                type: "error"
              });
            }

          })
          .catch(e=>{
            this.sending  = false
            console.log(e)
            this.$notify({
              group: 'foo',
              title: 'Erro ao logar',
              text: 'Erro ao conectar no servidor',
              type: "error"
            });
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
