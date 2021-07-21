Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
}
  
Storage.prototype.getObject = function(key) {
      let value = this.getItem(key);
      return value && JSON.parse(value);
}

var app = new Vue({
      el: '#app',
      
      data: {
            produto: "",
            produtos: [],
            todosProdutos: []
      },

      watch: {
            produto() {
                  if(this.produto === "") {
                        this.produtos = this.todosProdutos;
                  } else {
                        this.produtos = this.todosProdutos.filter((item) => {
                              return item.nome.toUpperCase().includes(this.produto.toUpperCase());
                        })
                  }
            }
      },

      methods: {
            adicionar_carrinho(item) {
                  const usuario = localStorage.getObject("usuario");
                  //Está logado
                  if(usuario !== null) {
                        if(usuario.ehAdministrador) {
                              alert("Entre como um cliente para adicionar ao carrinho!");
                              return;
                        }
                  } else { //Nao está logado
                        alert("Entre como um cliente para adicionar ao carrinho!");
                        window.location.href = 'login.html';
                        return;
                  }

                  //É cliente
                  //localStorage.removeItem('itens');
                  let itens = []
                  //itens.push(10)
                  itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho'))
                  if (itensCarrinho !== null)
                        itens = JSON.parse(localStorage.getItem('itensCarrinho'))
                  itens.push(item._id)
                  // itens.push(item)
                  localStorage.setItem('itensCarrinho', JSON.stringify(itens))
                  console.log(itens);
                  alert("Adicionado ao carrinho!")
                  // window.location.href = 'carrinho.html'
            }
      },

      mounted() {
            this.$nextTick(function () {
                  fetch('http://localhost:3000/produto')
                  .then(response => {
                              // valida se a requisição falhou
                              if (!response.ok) {
                                    return new Error('falhou a requisição') // cairá no catch da promise
                              }

                              // verificando pelo status
                              if (response.status === 404) {
                                    return new Error('não encontrou qualquer resultado')
                              }

                              // retorna uma promise com os dados em JSON
                              return response.json()
                        })
                  .then(data => {
                        this.produtos = data;
                        this.todosProdutos = data;
                  })
                  .catch(err => console.log(err.message))
            })
      }

})