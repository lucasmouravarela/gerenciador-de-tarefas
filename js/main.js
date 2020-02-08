const API_URL = 'https://taskmanager-iwtraining.firebaseio.com';

calendar();

function resetMenu(opcaoSelecionada) {
    document.querySelectorAll('[data-action="menu"]').forEach((cadaOpcao) => {
      cadaOpcao.classList.add('btn-outline-primary');
      cadaOpcao.classList.remove('btn-primary');
    });
  
    document.getElementById(opcaoSelecionada).classList.remove('btn-outline-primary');
    document.getElementById(opcaoSelecionada).classList.add('btn-primary');
  }


document.getElementById('btn-agenda').addEventListener('click', () => {
    document.getElementById('main').innerHTML = '';
    calendar();

    location.assign('#agenda');

    resetMenu('btn-agenda');
});

document.getElementById('btn-config').addEventListener('click', () => {
    config();

    location.assign('#config');

    resetMenu('btn-config');
});

document.getElementById('btn-places').addEventListener('click', () => {
    places();
  
    location.assign('#locais');
  
    resetMenu('btn-places');
  });