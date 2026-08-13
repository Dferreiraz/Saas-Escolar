/**
 * js/alunos.js
 * Lógica específica do módulo de Alunos.
 */

const CHAVE_ALUNOS = 'alunos';
const tbody = document.querySelector('#tabela-alunos tbody');
const modal = document.getElementById('modal-aluno');
const form = document.getElementById('form-aluno');
const inputBusca = document.getElementById('busca');

// Funções de UI do Modal
const abrirModal = () => modal.classList.add('active');
const fecharModal = () => {
    modal.classList.remove('active');
    form.reset();
    document.getElementById('aluno-id').value = '';
    document.getElementById('modal-titulo').innerText = 'Novo Aluno';
};

// Renderizar Tabela
function renderizarTabela(filtro = '') {
    const alunos = StorageHelper.buscarDados(CHAVE_ALUNOS);
    tbody.innerHTML = ''; // Limpa a tabela

    // Lógica de busca
    const alunosFiltrados = alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(filtro.toLowerCase()) || 
        aluno.cpf.includes(filtro)
    );

    // Estado Vazio
    if (alunosFiltrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhum aluno encontrado.</td></tr>`;
        return;
    }

    // Gerar linhas dinamicamente usando Template Strings
    alunosFiltrados.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.turma}</td>
            <td>${aluno.responsavel}</td>
            <td>
                <button class="btn" onclick="editarAluno('${aluno.id}')"><i class="fas fa-edit" style="color: var(--primary)"></i></button>
                <button class="btn" onclick="excluirAluno('${aluno.id}')"><i class="fas fa-trash" style="color: var(--danger)"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Salvar / Atualizar Aluno
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    const id = document.getElementById('aluno-id').value;
    const alunoData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        turma: document.getElementById('turma').value,
        responsavel: document.getElementById('responsavel').value
    };

    if (id) {
        // Atualiza existente
        StorageHelper.atualizarItem(CHAVE_ALUNOS, id, alunoData);
        showToast('Aluno atualizado com sucesso!');
    } else {
        // Cria novo
        StorageHelper.adicionarItem(CHAVE_ALUNOS, alunoData);
        showToast('Aluno cadastrado com sucesso!');
    }

    fecharModal();
    renderizarTabela();
});

// Preparar Edição
window.editarAluno = (id) => {
    const alunos = StorageHelper.buscarDados(CHAVE_ALUNOS);
    const aluno = alunos.find(a => a.id === id);
    
    if (aluno) {
        document.getElementById('aluno-id').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('cpf').value = aluno.cpf;
        document.getElementById('turma').value = aluno.turma;
        document.getElementById('responsavel').value = aluno.responsavel;
        
        document.getElementById('modal-titulo').innerText = 'Editar Aluno';
        abrirModal();
    }
};

// Excluir com Confirmação
window.excluirAluno = (id) => {
    if (confirm('Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.')) {
        StorageHelper.removerItem(CHAVE_ALUNOS, id);
        showToast('Aluno removido com sucesso!', 'error');
        renderizarTabela();
    }
};

// Eventos
document.getElementById('btn-novo').addEventListener('click', abrirModal);
document.getElementById('btn-cancelar').addEventListener('click', fecharModal);
inputBusca.addEventListener('input', (e) => renderizarTabela(e.target.value));

// Inicialização
document.addEventListener('DOMContentLoaded', () => renderizarTabela());