const { capitalizar, calculaImposto, calculaDesconto } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista 
// ou se a lista for vazia, retorne undefined.

const listaValida = (lista => (!Array.isArray(lista) || lista.length === 0) ? false : true);

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (listaValida(lista)) {
        let menorPreco = parseInt(lista[0]);
        lista.forEach(elemento => {
            if (parseInt(elemento) < menorPreco) menorPreco = elemento;
        });
        return menorPreco;
    }
    return undefined;
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (listaValida(lista)) {
        let maiorPreco = parseInt(lista[0]);
        lista.forEach(elemento => {
            if (parseInt(elemento) > maiorPreco) maiorPreco = elemento;
        });
        return maiorPreco;
    }
    return undefined;
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (listaValida(nomes)) return nomes.map(nome => capitalizar(nome));
    return undefined;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]

    const descontoBuscado = (nomeCategoria) => {
        if (categorias.includes(nomeCategoria)) {
            let posicao = categorias.indexOf(nomeCategoria);
            return descontos[posicao];
        }
        return 0;
    }
    return descontoBuscado(categoria);
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (listaValida(lista)) return lista.filter(preco => preco <= precoMaximo);
    return undefined;
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (listaValida(lista)) return lista.reduce((aux, atual) => aux += atual);
    return undefined;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (listaValida(lista)) return [obterMenorPreco(lista), obterMaiorPreco(lista)];
    return undefined;
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (listaValida(lista) && menorValor <= maiorValor) {
        return lista.filter(valor => valor >= menorValor && valor <= maiorValor);
    }
    return undefined;
}

// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
function obterDescontoTotal(categoria, cupom) {
    let descontoTotal = obterDescontoCategoria(categoria);
    if (cupom === 'ALURANU' || cupom === 'NULABSSA') descontoTotal += 10;
    return descontoTotal;
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if (listaValida(precos) && listaValida(categorias)) {
        const valorTotal = categorias.reduce(function (aux, catAtual, posicao) {
            const descontoPorcentagem = obterDescontoTotal(catAtual, cupom)/100;
            const preco = precos[posicao];
            return aux += (preco-(preco*descontoPorcentagem));
        }, 0);
        return valorTotal;
    }
    return undefined;
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    nomeCompleto = nomeCompleto.split(' ');
    nomeCompleto = nomeCompleto.map(nome => nome.length >= 3 ? capitalizar(nome) : nome);
    return nomeCompleto.join(' ');
}

// =======
// Desafio
// =======

// Crie uma função que recebe uma lista de preços e categorias e devolve um cupom fiscal conforme abaixo:
// (['Serpentina', 'Refrigerante'], [20, 7], ['Infantil', 'Bebida'], 'NULABSSA') => 
// Nome           Valor     Desconto  Imposto Total     
// Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
// Refrigerante   R$   7,00 R$   0,70         R$   6,30 
// Subtotal                                   R$  24,30 
// Cupom de Desconto: NULABSSA                R$   3,00 
// Total                                      R$  21,30
function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {
    if (!listaValida(listaNomesProdutos) || !listaValida(listaPrecosProdutos) || !listaValida(listaCategoriasProdutos)) return undefined;

    let cabecalho = "Nome           Valor     Desconto  Imposto Total     \n", corpoDaNota = '', rodapeDaNota = '';
    let listaDescontosProdutos = [], listaSubTotais = [];

    let imposto = 0;
    for (i=0; i<listaNomesProdutos.length; i++) {
        const nome = listaNomesProdutos[i], preco = listaPrecosProdutos[i], categoria = listaCategoriasProdutos[i];
        // obter % de imposto:
        if (calculaImposto(preco, listaCategoriasProdutos[i])===1) imposto = 15;
        // vai adicionar o desconto do produto atual
        listaDescontosProdutos.push((obterDescontoCategoria(categoria)/100)*preco);
        const valorDesconto = listaDescontosProdutos[i];
        // vai adicionar o preco do produto atual
        listaSubTotais.push(preco-(valorDesconto));

        corpoDaNota = corpoDaNota.concat(`${nome} R$  ${preco},00 R$   ${valorDesconto},00 ${imposto}% R$ ${listaSubTotais[i]},00\n`);
    }

    const subtotal = calcularTotalDaCompra(listaSubTotais);
    const total = calcularTotalDaCompraComDescontos(listaPrecosProdutos, listaCategoriasProdutos, cupom);
    console.log(cabecalho+corpoDaNota)
    return cabecalho+corpoDaNota+rodapeDaNota;
}
module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    capitalizarNomes,
    obterDescontoCategoria,
    obterPrecosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterPrecosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    capitalizarNomeCompleto,
    gerarCupomFiscal
};
