/**
 * js/app.js
 * Utilitários globais e UI.
 */

// --- SISTEMA DE TOAST NOTIFICATIONS ---
function showToast(mensagem, tipo = 'success') {
    const toastContainer = document.getElementById('toast-container') || criarToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerText = mensagem;
    
    toastContainer.appendChild(toast);
    
    // Animação de entrada e saída
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function criarToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// --- DARK MODE ---
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') document.body.classList.add('dark-theme');
    
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }
}

// --- MÁSCARAS DE INPUT ---
function aplicarMascaras() {
    document.querySelectorAll('[data-mask="cpf"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            val = val.replace(/(\d{3})(\d)/, '$1.$2');
            val = val.replace(/(\d{3})(\d)/, '$1.$2');
            val = val.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = val;
        });
    });

    document.querySelectorAll('[data-mask="telefone"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            val = val.replace(/^(\d{2})(\d)/g, '($1) $2');
            val = val.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = val;
        });
    });
}

// --- MENU MOBILE ---
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if(menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    aplicarMascaras();
    initMobileMenu();
});

// Adicione esta parte dentro de aplicarMascaras() no app.js
    document.querySelectorAll('[data-mask="cnpj"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            val = val.replace(/^(\d{2})(\d)/, '$1.$2');
            val = val.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            val = val.replace(/\.(\d{3})(\d)/, '.$1/$2');
            val = val.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = val;
        });
    });