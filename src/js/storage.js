/**
 * js/storage.js
 * Camada de abstração do LocalStorage.
 */

const StorageHelper = {
    // Busca dados. Se não existir, retorna um array vazio.
    buscarDados: (chave) => {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : [];
    },

    // Salva os dados substituindo o que havia antes.
    salvarDados: (chave, dados) => {
        localStorage.setItem(chave, JSON.stringify(dados));
    },

    // Adiciona um novo registro com ID único.
    adicionarItem: (chave, item) => {
        const dados = StorageHelper.buscarDados(chave);
        item.id = crypto.randomUUID(); // Gera um ID único e seguro
        item.dataCadastro = new Date().toISOString();
        dados.push(item);
        StorageHelper.salvarDados(chave, dados);
        return item;
    },

    // Atualiza um registro existente.
    atualizarItem: (chave, id, itemAtualizado) => {
        const dados = StorageHelper.buscarDados(chave);
        const index = dados.findIndex(item => item.id === id);
        if (index !== -1) {
            dados[index] = { ...dados[index], ...itemAtualizado };
            StorageHelper.salvarDados(chave, dados);
        }
    },

    // Remove um registro.
    removerItem: (chave, id) => {
        let dados = StorageHelper.buscarDados(chave);
        dados = dados.filter(item => item.id !== id);
        StorageHelper.salvarDados(chave, dados);
    }
};