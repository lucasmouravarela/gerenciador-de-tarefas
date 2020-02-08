function places()
{
  document.getElementById('main').removeAttribute('class');

  document.getElementById('main').innerHTML = `
    <span class="h3">Configurações de Locais</span>
    <div class="text-right">
      <button class="btn btn-outline-primary" id="btn-novo-local">Novo Local</button>
    </div>
    <table class="table table-hover table-striped mt-3">
      <thead class="thead-dark">
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Localização</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="tabela-locais"></tbody>
    </table>
  `;

  $.ajax({
    url: API_URL + '/locais.json',
    type: 'GET',
    content: 'application/json',
    success: (resposta) => {
      document.getElementById('tabela-locais').innerHTML = '';

      for(let id in resposta) {
        let cadaLocal = resposta[id];

        document.getElementById('tabela-locais').innerHTML += `
          <tr>
            <td>${cadaLocal.nome}</td>
            <td>${cadaLocal.endereco}</td>
            <td>${cadaLocal.localizacao}</td>
            <td>
              <button onclick="excluirLocal('${id}')" class="btn btn-danger">Excluir</button>
            </td>
          </tr>
        `;
      }
    }
  });

  document.getElementById('btn-novo-local').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `
      <span class="h3">Cadastro de Local</span>
      <form id="form-local" class="mt-5">
        <label for="form-local-nome">Nome: </label>
        <input class="form-control" id="form-local-nome">
        <br>
        <label for="form-local-endereco">Endereço: </label>
        <textarea class="form-control" id="form-local-endereco"></textarea>
        <br>
        <label for="form-local-localizacao">Localização: </label>
        <input class="form-control" id="form-local-localizacao">
        <br>
        <button class="btn btn-primary">Adicionar</button>
        <button type="button" class="btn btn-secondary" id="form-local-cancelar">Cancelar</button>
      </form>
    `;

    document.getElementById('form-local-cancelar').addEventListener('click', () => {
      places();
    });

    document.getElementById('form-local').addEventListener('submit', () => {
      $.ajax({
        url: API_URL + '/locais.json',
        type: 'POST',
        dataType: 'json',
        content: 'application/json',
        data: JSON.stringify({
          nome: document.getElementById('form-local-nome').value,
          endereco: document.getElementById('form-local-endereco').value,
          localizacao: document.getElementById('form-local-localizacao').value,
        })
      });

      places();
    });
  });
}

function excluirLocal (id) {
  if (confirm('Tem certeza?')) {
    $.ajax({
      url: API_URL + `/locais/${id}.json`,
      type: 'DELETE',
      dataType: 'json',
      success: (response) => {
        places();
      }
    })
  }
}