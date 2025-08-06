document.addEventListener("DOMContentLoaded", function() {
    const surveyForm = document.getElementById("survey-form");

    if (surveyForm) {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("ID de usuário não encontrado. Redirecionando para a página de identificação.");
            window.location.href = "index.html";
            return;
        }

        // Adiciona um 'ouvinte' de evento para o envio do formulário
        surveyForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const answers = [];
            
            // Itera sobre todas as perguntas da página para coletar as respostas
            document.querySelectorAll(".question[data-question-id]").forEach(questionDiv => {
                const questionId = questionDiv.dataset.questionId;
                let answer = "";
                
                // Coleta respostas de rádio ou texto
                if (questionDiv.querySelector("input[type=\"radio\"]")) {
                    const selectedOption = questionDiv.querySelector(`input[name="${questionId}"]:checked`);
                    if (selectedOption) {
                        answer = selectedOption.value;
                    }
                } else if (questionDiv.querySelector("textarea")) {
                    answer = questionDiv.querySelector("textarea").value.trim();
                }

                // --- INÍCIO DA MUDANÇA ---
                // Adiciona a resposta ao array junto com um timestamp
                answers.push({
                    userId: userId,
                    questionId: questionId,
                    answer: answer,
                    timestamp: new Date().toISOString() // Captura o momento do envio
                });
                // --- FIM DA MUDANÇA ---
            });

            localStorage.setItem("survey1Answers", JSON.stringify(answers));
            window.location.href = 'survey2.html';
        });
    }
});