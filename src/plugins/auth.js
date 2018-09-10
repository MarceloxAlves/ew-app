
export default {
  logado: function (contexto) {
    if (contexto.$session.get('user')) return true
    return false;
  },
  autenticar: function (contexto)
  {
    if(this.logado(contexto)) return
    contexto.$router.push('/login')
  },
  userLogado: function (contexto) {
    if (contexto.$session.get('user')) return contexto.$session.get('user')
    return {
      nome : "Anonnimous",
      email: "anomino@anonimo.com",
      codigo: 0
    }
  }
}
