document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    
    // Verifica se o formulário de usuário existe na página
    if (userForm) {
        // Adiciona um 'ouvinte' de evento para o envio do formulário
        userForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário
            
            const userId = document.getElementById('userId').value.trim();
            
            // Verifica se o ID do usuário não está vazio
            if (userId) {
                // Salva o ID do usuário no armazenamento local do navegador
                localStorage.setItem('userId', userId);
                
                // Redireciona o usuário para a página da primeira pesquisa
                window.location.href = 'survey.html';
            } else {
                alert('Por favor, insira um ID de usuário válido.');
            }
        });
    }
});