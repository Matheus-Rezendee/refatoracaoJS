console.log("Conteúdo de Javascript")

// console.log(document)

// Como ler e manipular conteúdo em texto de tags
function manipularTitulo() {
    const titulo = document.getElementById("nome-empresa");
    console.log(titulo);
    const tituloTexto = titulo.innerText;
    console.log(tituloTexto);
    setTimeout(() => {
        titulo.innerText = "Outro título qualquer";
    }, 1000);
}

// PRÁTICA
// Alterem o conteúdo sobre a empresa.
// 1. Buscar pelo id correto OK
// 2. Printar na tela a tag e analisar o conteúdo OK
// 3. Printar o conteúdo no console
// 4. Alterar o conteúdo sobre a empresa 
// (insiram o nome da empresa no text, usando template string)

function converterParaArray(collection) {
    return Array.from(collection);
}

function exibirTextoElementos(elementos) {
    elementos.forEach(elemento => {
        console.log(elemento.innerText);
    });
}

function criarArrayNomes(elementos) {
    return elementos.map(elemento => elemento.innerText);
}

function lerComMenus() {
    const menus = document.getElementsByClassName("menu");
    console.log(menus);

    const menusArray = converterParaArray(menus);
    console.log(menusArray);

    exibirTextoElementos(menusArray);

    const menuNomes = criarArrayNomes(menusArray);
    console.log(`Os menus do site são: ${menuNomes.join(", ")}`);
}

function lerProdutos() {
    const produtosContainer = document.getElementById("produtos");
    console.log(produtosContainer);

    const produtos = produtosContainer.children;
    console.log(produtos);

    const produtosArray = converterParaArray(produtos);

    const produtosNomes = criarArrayNomes(produtosArray);
    console.log(`Produtos ofertados: ${produtosNomes.join(", ")}`);
}
lerComMenus();
lerProdutos();


function obterElemento(id) {
    return document.getElementById(id);
}

function obterConteudo(elemento) {
    return elemento.children[1];
}

function obterArrayDeFilhos(elemento) {
    return Array.from(elemento.children);
}

function extrairDadosDaVenda(venda) {
    const produtovendido = venda.children[1].innerText;
    const quantidadevendida = venda.children[2].innerText;
    const valorVendido = venda.children[3].innerText;
    const valorVendidoFloat = parseFloat(valorVendido.replace("R$ ", ""));
    return { produtovendido, quantidadevendida, valorVendidoFloat };
}

function processarVendas(listaDeVendasArray) {
    const produtosVendidos = {};

    listaDeVendasArray.forEach(venda => {
        const { produtovendido, quantidadevendida, valorVendidoFloat } = extrairDadosDaVenda(venda);

        if (!produtosVendidos[produtovendido]) {
            produtosVendidos[produtovendido] = {
                quantidade: 0, valor: 0
            };
        }

        produtosVendidos[produtovendido].quantidade += parseInt(quantidadevendida);
        produtosVendidos[produtovendido].valor += valorVendidoFloat;
    });

    return produtosVendidos;
}

function obterNomesDosProdutos(produtosVendidos) {
    return Object.keys(produtosVendidos);
}

function criarElementoComConteudo(elemento, conteudo) {
    const el = document.createElement(elemento);
    el.innerText = conteudo;
    return el;
}

function gerarResumoDeVendas(produtosVendidos, resumoVendasElemento) {
    const nomesDosProdutos = obterNomesDosProdutos(produtosVendidos);

    nomesDosProdutos.forEach(produto => {
        const tr = document.createElement("tr");
        const tdProduto = criarElementoComConteudo("td", produto);
        const tdQuantidade = criarElementoComConteudo("td", produtosVendidos[produto].quantidade);
        const tdValor = criarElementoComConteudo("td", `R$ ${produtosVendidos[produto].valor.toFixed(2).replace(".", ",")}`);

        tr.appendChild(tdProduto);
        tr.appendChild(tdQuantidade);
        tr.appendChild(tdValor);

        resumoVendasElemento.appendChild(tr);
    });
}

const vendas = obterElemento("vendas");
const conteudovendas = obterConteudo(vendas);
const listaDeVendas = obterArrayDeFilhos(conteudovendas);
const produtosVendidos = processarVendas(listaDeVendas);

const cabecalhoResumo = obterElemento("resumo-vendas-cab");
const resumoVendas = obterElemento("resumo-vendas");

gerarResumoDeVendas(produtosVendidos, resumoVendas);