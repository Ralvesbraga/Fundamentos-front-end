//     let xhr = new XMLHttpRequest; // instancia o objeto que pede a requisição pro site
//     xhr.open('GET', url);// Usa o método get para requisitar os dados da url
//     let tabela = document.querySelector('table');
//     xhr.addEventListener('readystatechange', () => {
//         if (xhr.readyState === 4 && xhr.status === 200){ //Verifica se já terminou a requisição e se todos os dados já foram passados
//         let dados = JSON.parse(xhr.responseText);
//             for (profissional of dados){
//                 inserirProfissional(profissional);
//             }
//         }
//         excluirLinha();
//     });
//     xhr.send();

// };

carregaProfissionais = () =>{
    let url = "https://my-json-server.typicode.com/juniorlimeiras/json/profissionais"; //armazena a url do servidor que vamos acessar usando o xhr
    fetch(url).then(resposta => {
        return resposta.json()
    }).then(dados =>{
        for(const profisional of dados){
            inserirProfissional(profisional);
        }
        editarLinha();
        excluirLinha();
        quantidadeProfissionais();
    });
}

carregaUnidades = () =>{
    let url = "https://my-json-server.typicode.com/juniorlimeiras/json/unidades";
    fetch(url).then(resposta => {
        return resposta.json()
    }).then(dados=>{
        for(let unidade of dados){
            let option = document.createElement('option');
            option.value = unidade.id;
            option.text = unidade.nome;
            form.unidade.appendChild(option);
        }
    })
}

carregaEspecialidades = () =>{
    let url = "https://my-json-server.typicode.com/juniorlimeiras/json/especialidades";
    fetch(url).then(resposta =>{
        return resposta.json()
    }).then(dados=>{
        for(especialidade of dados){
            let option = document.createElement('option');
            option.value = especialidade.id;
            option.text = especialidade.nome;
            form.especialidade.appendChild(option);
        }
    })
}   

carregaProfissionais();
carregaUnidades();
carregaEspecialidades();

//Função que recebe um objeto do tipo profissional
const inserirProfissional = (profissional) =>{
    // Criação dos elementos HTML
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let nome = document.createElement('td');
    let registro = document.createElement('td');
    let telefone = document.createElement('td');
    let email  = document.createElement('td');
    let especialidade = document.createElement('td');
    let unidade = document.createElement('td');
    let opcoes = document.createElement('td');
    //Preenchendo os elementos HTML ('td')
    id.textContent =  profissional.id;   
    nome.textContent =  profissional.nome;   
    registro.textContent =  profissional.registro;   
    telefone.textContent = profissional.telefone;   
    email.textContent  =  profissional.email;   
    especialidade.textContent =  profissional.especialidade;   
    unidade.textContent =  profissional.unidade;
    opcoes.innerHTML = `<a  class="botao_verde"href="javascript:void(0)">Editar</a> <a class="botao_vermelho"href="javascript:void(0)">Excluir</a>`;
    //Preenchendo a linha ("tr")
    linha.appendChild(id);
    linha.appendChild(nome);
    linha.appendChild(registro);
    linha.appendChild(telefone);
    linha.appendChild(email);
    linha.appendChild(unidade);
    linha.appendChild(especialidade);
    linha.appendChild(opcoes);
    tabela.tBodies[0].appendChild(linha); //Preenchendo a tabela
};


//Inserindo Profissional
let form = document.querySelector('form');
let tabela = document.querySelector('table')

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); //Evita que a página seja recarregada.
    objeto ={
        id: tabela.tBodies[0].rows.length + 1,
        nome: form.nome.value,
        registro: form.registroConselho.value,
        telefone: form.telefone.value,
        email: form.email.value,
        unidade: form.unidade.options[form.unidade.selectedIndex].label,
        especialidade: form.especialidade.options[form.especialidade.selectedIndex].label
    }
    inserirProfissional(objeto);
    editarLinha();
    //Carregar a função que exclui a linha
    excluirLinha();
    quantidadeProfissionais();
    botaoAdicionar.classList.remove('inativo');
    div.classList.add('inativo');
});

// Função que atualiza a quantidade de profissionais na tfoot
function quantidadeProfissionais(){
    foot = document.querySelector('#quantidadeProfissionais');
    foot.textContent = 'Quantidade de Profissionais: ' + (tabela.getElementsByTagName('tr').length - 2);
}


//Botão Adicionar
let botaoAdicionar = document.querySelector('div#add');
let div = document.querySelector('div.inativo')
//Escutador de evento
botaoAdicionar.addEventListener('click', ()=> {
    div.classList.remove('inativo');
    botaoAdicionar.classList.add('inativo');
    form.reset();
});

//Botão Cancelar
let botaoCancelar = document.querySelector('input[type="button"]');
botaoCancelar.addEventListener('click', () => {
    div.classList.add('inativo');
    botaoAdicionar.classList.remove('inativo')
    form.reset();
});

//Botão Excluir
function excluirLinha() {
    botoes = document.querySelectorAll('a.botao_vermelho');
    for (const botao of botoes) {
        botao.addEventListener('click', () => {
            botao.parentNode.parentNode.remove();
            quantidadeProfissionais();
        })
    }
}

//Botão Editar
function editarLinha(){
    botoes = document.querySelectorAll('td a.botao_verde');
    for(let botao of botoes){
        botao.addEventListener('click', ()=> {
            //Pega a linha da tabela que está sendo editada
            let linha = botao.parentNode.parentNode;
            //Pega os campos da linha
            let dados = linha.getElementsByTagName('td');

            // Armazena em cada variavel o texto do campo correspondente
            let nome = dados[1].textContent; 
            let registro = dados[2].textContent; 
            let telefone = dados[3].textContent; 
            let email = dados[4].textContent;
            let unidade = dados[5].textContent;
            let especialidade = dados[6].textContent;

            // Chama a função para pegar os índices contidos nos respectivos campos
            let indices = retorna_indice(unidade, especialidade);

            // Modifica o form com o valor dos campos da linha
            document.getElementById('nome').value = nome;
            document.getElementById('registroConselho').value = registro;
            document.getElementById('telefone').value = telefone;
            document.getElementById('email').value = email;
            document.getElementById('unidade').selectedIndex = +indices[0];
            document.getElementById('especialidade').selectedIndex = +indices[1];
            //Remove a linha
            linha.remove();
            //Mostra o fomulário
            div.classList.remove('inativo');
            //
            botaoAdicionar.classList.add('inativo');
        });
    }
}

function retorna_indice(unidade, especialidade){
    let unidadeOp = document.getElementById('unidade').options;
    let idUnidade = 0;
    for (let option of unidadeOp) {
        if (option.text === unidade) {
            idUnidade = option.value;
        }
    }
    let especialidadeOp = document.getElementById('especialidade').options;
    let idEspecialidade = 0;
    for (let option of especialidadeOp) {
        if (option.text === especialidade) {
            idEspecialidade = option.value;
        }
    }

    return [idUnidade, idEspecialidade];
}