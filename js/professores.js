/**
 * js/professores.js
 * Lógica específica do módulo de Professores.
 */

const CHAVE_PROF = 'professores';
const tbodyProf = document.querySelector('#tabela-professores tbody');
const modalProf = document.getElementById('modal-professor');
const formProf = document.getElementById('form-professor');
const inputBuscaProf = document.getElementById('busca');

// Controle do Modal
const abrirModalProf = () => modalProf.classList.add('active');
const fecharModalProf = () => {
    modalProf.classList.remove('active');
    formProf.reset();
    document.getElementById('professor-id').value = '';
    document.getElementById('modal-titulo').innerText = 'Novo Professor';
};

// Renderizar Tabela
function renderizarTabelaProf(filtro = '') {
    const professores = StorageHelper.buscarDados(CHAVE_PROF);
    tbodyProf.innerHTML = ''; 

    // Permite buscar por nome ou disciplina
    const professoresFiltrados = professores.filter(prof => 
        prof.nome.toLowerCase().includes(filtro.toLowerCase()) || 
        prof.disciplina.toLowerCase().includes(filtro.toLowerCase())
    );

    if (professoresFiltrados.length === 0) {
        tbodyProf.innerHTML = `<tr><td colspan="6" class="empty-state">Nenhum professor encontrado.</td></tr>`;
        return;
    }

    professoresFiltrados.forEach(prof => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prof.nome}</td>
            <td>${prof.cpf}</td>
            <td><span style="background: var(--bg-color); padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">${prof.disciplina}</span></td>
            <td>${prof.formacao}</td>
            <td>${prof.telefone}</td>
            <td>
                <button class="btn" onclick="editarProfessor('${prof.id}')"><i class="fas fa-edit" style="color: var(--primary)"></i></button>
                <button class="btn" onclick="excluirProfessor('${prof.id}')"><i class="fas fa-trash" style="color: var(--danger)"></i></button>
            </td>
        `;
        tbodyProf.appendChild(tr);
    });
}

// Salvar / Atualizar
formProf.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('professor-id').value;
    const dadosProf = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        disciplina: document.getElementById('disciplina').value,
        formacao: document.getElementById('formacao').value
    };

    if (id) {
        StorageHelper.atualizarItem(CHAVE_PROF, id, dadosProf);
        showToast('Professor atualizado com sucesso!');
    } else {
        StorageHelper.adicionarItem(CHAVE_PROF, dadosProf);
        showToast('Professor cadastrado com sucesso!');
    }

    fecharModalProf();
    renderizarTabelaProf();
});

// Preparar Edição
window.editarProfessor = (id) => {
    const professores = StorageHelper.buscarDados(CHAVE_PROF);
    const prof = professores.find(p => p.id === id);
    
    if (prof) {
        document.getElementById('professor-id').value = prof.id;
        document.getElementById('nome').value = prof.nome;
        document.getElementById('cpf').value = prof.cpf;
        document.getElementById('telefone').value = prof.telefone;
        document.getElementById('email').value = prof.email;
        document.getElementById('disciplina').value = prof.disciplina;
        document.getElementById('formacao').value = prof.formacao;
        
        document.getElementById('modal-titulo').innerText = 'Editar Professor';
        abrirModalProf();
    }
};

// Excluir
window.excluirProfessor = (id) => {
    if (confirm('Atenção: Tem certeza que deseja remover o cadastro deste professor?')) {
        StorageHelper.removerItem(CHAVE_PROF, id);
        showToast('Professor removido do sistema.', 'error');
        renderizarTabelaProf();
    }
};

// Eventos
document.getElementById('btn-novo').addEventListener('click', abrirModalProf);
document.getElementById('btn-cancelar').addEventListener('click', fecharModalProf);
inputBuscaProf.addEventListener('input', (e) => renderizarTabelaProf(e.target.value));

// Iniciar a view
document.addEventListener('DOMContentLoaded', () => renderizarTabelaProf());    