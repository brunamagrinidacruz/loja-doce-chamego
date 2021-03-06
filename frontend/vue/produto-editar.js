var app = new Vue({
      el: "#app",

      data: {
            erros: [],
            nome: "",
            preco: "",
            quantidadeEstoque: "",
            quantidadeVendida: "",
            descricao: "",
            fotos: []
      },

      methods: {
            camposValidos() {
                  this.erros = []

                  if (!this.nome)
                        this.erros.push("Digite o nome")

                  if (!this.preco)
                        this.erros.push("Digite o preço")

                  if (!this.quantidadeEstoque)
                        this.erros.push("Digite a quantidade em estoque")

                  if (!this.descricao)
                        this.erros.push("Digite a descrição")

                  if (!this.fotos[0] || !this.fotos[1] || !this.fotos[2])
                        this.erros.push("Preencha todos os campos de imagem")
                        
                  if (!isNumber(this.preco))
                        this.erros.push("Preço inválido")
                        
                  if (!isNumber(this.quantidadeEstoque))
                        this.erros.push("Quantidade inválida")
                  
                  if (this.erros.length > 0)   
                        return false;
                  return true;
            },

            editar: async function() {
                  if (this.camposValidos()){   
                        try {
                              let resp = await fetch('http://localhost:3000/produto/' + localStorage.getItem("produtoEditar"), {
                                    method: 'PUT',
                                    headers: {
                                          'Content-type': 'application/json; charset=UTF-8'
                                    },
                                    body: JSON.stringify({
                                          nome: this.nome,
                                          preco: this.preco,
                                          quantidadeEstoque: this.quantidadeEstoque,
                                          quantidadeVendida: this.quantidadeVendida,
                                          descricao: this.descricao,
                                          fotos: this.fotos,
                                    })
                              })
            
                              resp = await resp.json()
                              alert(resp.mensagem)
                        } catch (e) {
                              alert("Error: " + e)
                        }
                        
                        window.location.href = 'produtos.html'
                  }
            }
      },

      mounted() {
            this.$nextTick(function () {
                  fetch('http://localhost:3000/produto/' + localStorage.getItem("produtoEditar"))
                  .then(response => {
                        if (!response.ok) {
                              throw new Error("Ocorreu um erro!");
                        }
                        return response.json();
                  })
                  .then(data => {
                        this.nome = data.nome
                        this.preco = data.preco
                        this.quantidadeEstoque = data.quantidadeEstoque
                        this.quantidadeVendida = data.quantidadeVendida
                        this.descricao = data.descricao
                        this.fotos = data.fotos
                  })
                  .catch(err => console.log(err.message))
            })
      }
})

function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
}