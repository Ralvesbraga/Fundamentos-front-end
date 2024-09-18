carregaProfissionais = () =>{
    let xhr = new XMLHttpRequest; // instancia o objeto que pede a requisição pro site
    let url = "https://my-json-server.typicode.com/juniorlimeiras/json/profissionais"; //armazena a url do servidor que vamos acessar usando o xhr
    xhr.open('GET', url);// Usa o método get para requisitar os dados da url
    let tabela = document.querySelector('table');
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200){ //Verifica se já terminou a requisição e se todos os dados já foram passados
        let dados = JSON.parse(xhr.responseText);
            for (profissional of dados){
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
                opcoes.innerHTML = `<a  class="botao_verde"href="javascript:void(0)">Editar</a>" <a class="botao_vermelho"href="javascript:void(0)">Excluir</a>`;

                //Preenchendo a linha ("tr")
                linha.appendChild(id);
                linha.appendChild(nome);
                linha.appendChild(registro);
                linha.appendChild(telefone);
                linha.appendChild(email);
                linha.appendChild(especialidade);
                linha.appendChild(unidade);
                linha.appendChild(opcoes);
                tabela.tBodies[0].appendChild(linha); //Preenchendo a tabela
            }
        }
    });
    xhr.send();

};

carregaProfissionais();