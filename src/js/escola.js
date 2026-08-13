/**
 * js/escola.js
 * Lógica específica do módulo de Escolas.
 */

const CHAVE_ESCOLAS = 'escolas';
const tbodyEscolas = document.querySelector('#tabela-escolas tbody');
const modalEscola = document.getElementById('modal-escola');
const formEscola = document.getElementById('form-escola');
const inputBuscaEscola = document.getElementById('busca');

// Controle do Modal
const abrirModalEscola = () => modalEscola.classList.add('active');
const fecharModalEscola = () => {
    modalEscola.classList.remove('active');
    formEscola.reset();
    document.getElementById('escola-id').value = '';
    document.getElementById('modal-titulo').innerText = 'Nova Escola';
};

// Renderizar Tabela
function renderizarTabelaEscolas(filtro = '') {
    const escolas = StorageHelper.buscarDados(CHAVE_ESCOLAS);
    tbodyEscolas.innerHTML = ''; 

    const escolasFiltradas = escolas.filter(escola => 
        escola.nome.toLowerCase().includes(filtro.toLowerCase()) || 
        escola.cnpj.includes(filtro)
    );

    if (escolasFiltradas.length === 0) {
        tbodyEscolas.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhuma escola encontrada.</td></tr>`;
        return;
    }

    escolasFiltradas.forEach(escola => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escola.nome}</strong></td>
            <td>${escola.cnpj}</td>
            <td>${escola.diretor}</td>
            <td>${escola.telefone}</td>
            <td>
                <button class="btn" onclick="editarEscola('${escola.id}')" title="Editar"><i class="fas fa-edit" style="color: var(--primary)"></i></button>
                <button class="btn" onclick="excluirEscola('${escola.id}')" title="Excluir"><i class="fas fa-trash" style="color: var(--danger)"></i></button>
            </td>
        `;
        tbodyEscolas.appendChild(tr);
    });
}

// Salvar / Atualizar
formEscola.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('escola-id').value;
    const dadosEscola = {
        nome: document.getElementById('nome').value,
        cnpj: document.getElementById('cnpj').value,
        diretor: document.getElementById('diretor').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value
    };

    if (id) {
        StorageHelper.atualizarItem(CHAVE_ESCOLAS, id, dadosEscola);
        showToast('Escola atualizada com sucesso!');
    } else {
        StorageHelper.adicionarItem(CHAVE_ESCOLAS, dadosEscola);
        showToast('Escola cadastrada com sucesso!');
    }

    fecharModalEscola();
    renderizarTabelaEscolas();
});

// Preparar Edição
window.editarEscola = (id) => {
    const escolas = StorageHelper.buscarDados(CHAVE_ESCOLAS);
    const escola = escolas.find(e => e.id === id);
    
    if (escola) {
        document.getElementById('escola-id').value = escola.id;
        document.getElementById('nome').value = escola.nome;
        document.getElementById('cnpj').value = escola.cnpj;
        document.getElementById('diretor').value = escola.diretor;
        document.getElementById('telefone').value = escola.telefone;
        document.getElementById('email').value = escola.email;
        document.getElementById('endereco').value = escola.endereco;
        
        document.getElementById('modal-titulo').innerText = 'Editar Escola';
        abrirModalEscola();
    }
};

// Excluir
window.excluirEscola = (id) => {
    if (confirm('Tem certeza que deseja excluir esta escola? Todos os dados vinculados podem ser afetados.')) {
        StorageHelper.removerItem(CHAVE_ESCOLAS, id);
        showToast('Escola removida com sucesso!', 'error');
        renderizarTabelaEscolas();
    }
};

// Eventos
document.getElementById('btn-novo').addEventListener('click', abrirModalEscola);
document.getElementById('btn-cancelar').addEventListener('click', fecharModalEscola);
inputBuscaEscola.addEventListener('input', (e) => renderizarTabelaEscolas(e.target.value));

// Iniciar a view
document.addEventListener('DOMContentLoaded', () => renderizarTabelaEscolas());