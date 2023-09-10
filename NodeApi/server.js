const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
}

app.get('/produtos', (req, res) => {
    res.status(200).send(lista_produtos.produtos);
});

app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

  const produto = lista_produtos.produtos.find((p) => p.id === id);

  if (!produto) {
    res.status(404).json({ error: 'Produto não encontrado' });
  } else {
    res.json({ produto });
  }
});

app.post('/produtos', (req, res) => {
    lista_produtos.produtos.push(req.body)
    res.status(201).send(req.body);
});

app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
  const novoProduto = req.body;

  const produtoExistente = lista_produtos.produtos.find((produto) => produto.id === id);

  if (!produtoExistente) {
    res.status(404).json({ error: 'Produto não encontrado' });
  } else {
    // Atualizar os dados do produto existente com os novos dados
    Object.assign(produtoExistente, novoProduto);
    res.json({ mensagem: 'Produto atualizado com sucesso', novoProduto: produtoExistente });
  }
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Encontre o índice do produto a ser excluído na lista
    const indiceProduto = lista_produtos.produtos.findIndex((produto) => produto.id === id);
  
    if (indiceProduto === -1) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      // Remova o produto da lista
      lista_produtos.produtos.splice(indiceProduto, 1);
      res.json({ mensagem: 'Produto excluído com sucesso', novaLista: lista_produtos.produtos });
    }
  });

app.listen(3000, () => {
    console.log('Sevidor inciado na porta 3000');
});