function config(){
    document.getElementById('main').setAttribute('class', '');
    
    document.getElementById('main').innerHTML = `
        <span class="h3">Configurações Tipos</span>

        <div class="text-right">
            <button class="btn btn-outline-primary" id="btn-novo-tipo">Novo Tipo</button>
        </div>

        <table class="table table-hover table-striped mt-3">
            <thead class="thead-dark">
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead> 
            <tbody id="tabela-tipos"></tbody>
        </table>   
    `;
    $.ajax({
        url: API_URL + '/tipos.json',
        type: 'GET',
        content: 'application/json',
        success: (resposta) => {
            document.getElementById('tabela-tipos').innerHTML = '';

            for(let id in resposta) {
                let cadaTipo = (resposta[id]);

                document.getElementById('tabela-tipos').innerHTML += `
                    <tr>
                        <td>${cadaTipo.nome}</td>
                        <td>${cadaTipo.descricao}</td>
                        <td>
                            <button onclick="excluirTipo('${id}')" class="btn btn-danger">Excluir</button>
                        </td>
                    </tr>    
                `;
            }
        }
    })
    document.getElementById('btn-novo-tipo').addEventListener('click', () => {
        document.getElementById('main').innerHTML = `
            <span class="h3">Cadastro de Tipo</span>

            <form id="form-tipo">
                <label for="nome">Nome:</label>
                <input class="form-control" id="form-tipo-nome">
                <br>

                <label for="nome">Descrição:</label> 
                <textarea class="form-control" id="form-tipo-descricao"></textarea>
                <br>

                <button class="btn btn-primary">Adicionar</button>
                <button type="button" class="btn btn-secondary" id="form-tipo-cancelar">Cancelar</button>
            </form>
        `;

        document.getElementById('form-tipo-cancelar').addEventListener('click', () => {
            config();
        });
        
        document.getElementById('form-tipo').addEventListener('submit', () => {
            $.ajax({
                url: API_URL + '/tipos.json',
                type: 'POST',
                dataType: 'json',
                content: 'application/json',
                data: JSON.stringify({
                    nome: document.getElementById('form-tipo-nome').value,
                    descricao: document.getElementById('form-tipo-descricao').value,
                })
            });

            calendar();
        });
    });
}

function excluirTipo(id) {
    if (confirm('Tem certeza?')) {
      $.ajax({
        url: API_URL + `/tipos/${id}.json`,
        type: 'DELETE',
        dataType: 'json',
        success: (response) => {
          config();
        }
      });
    }
  }
