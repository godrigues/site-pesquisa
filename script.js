// Script para a página de identificação do usuário
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userId = document.getElementById('userId').value.trim();
            
            if (userId) {
                // Salva o ID do usuário no localStorage
                localStorage.setItem('userId', userId);
                
                // Redireciona para a página da pesquisa
                window.location.href = 'survey.html';
            } else {
                alert('Por favor, insira um ID de usuário válido.');
            }
        });
    }
});




// Script para a página de pesquisa
document.addEventListener("DOMContentLoaded", function() {
    const surveyForm = document.getElementById("survey-form");


    // Verifica se está na página de pesquisa
    if (surveyForm) {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("ID de usuário não encontrado. Redirecionando para a página de identificação.");
            window.location.href = "index.html";
            return;
        }

        surveyForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const answers = [];
            
            // Coleta respostas de múltipla escolha (radio buttons)
            document.querySelectorAll(".question[data-question-id]").forEach(questionDiv => {
                const questionId = questionDiv.dataset.questionId;
                let answer = "";

                if (questionDiv.querySelector("input[type=\"radio\"]")) {
                    const selectedOption = questionDiv.querySelector(`input[name="${questionId}"]:checked`);
                    if (selectedOption) {
                        answer = selectedOption.value;
                    }
                } else if (questionDiv.querySelector("textarea")) {
                    answer = questionDiv.querySelector("textarea").value.trim();
                }

                // Sempre adiciona a resposta, mesmo que vazia, para manter a estrutura
                answers.push({
                    userId: userId,
                    questionId: questionId,
                    answer: answer
                });
            });

            // URL do seu Google Apps Script implantado como API da Web
            // const gasUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Substitua pela URL do seu GAS

            // Salva as respostas no localStorage
            localStorage.setItem("survey1Answers", JSON.stringify(answers));

            // Redireciona para a próxima página da pesquisa
            window.location.href = 'survey2.html';
        });
    }
});