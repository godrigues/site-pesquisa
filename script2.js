document.addEventListener("DOMContentLoaded", function() {
    const survey2Form = document.getElementById("survey2-form");
    
    let messageDiv = document.getElementById("message");
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "message";
        messageDiv.className = "message";
        survey2Form.parentElement.appendChild(messageDiv);
    }
    
    if (survey2Form) {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("ID de usuário não encontrado. Redirecionando para a página de identificação.");
            window.location.href = "index.html";
            return;
        }

        survey2Form.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            showMessage("Enviando suas respostas...", "info");
            
            let allAnswers = [];

            const survey1AnswersString = localStorage.getItem("survey1Answers");
            if (survey1AnswersString) {
                try {
                    const survey1Answers = JSON.parse(survey1AnswersString);
                    allAnswers = allAnswers.concat(survey1Answers);
                    localStorage.removeItem("survey1Answers");
                } catch (e) {
                    console.error("Erro ao parsear respostas da survey1 do localStorage:", e);
                }
            }
            
            // Coleta respostas da página atual (survey2.html)
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
                // --- INÍCIO DA MUDANÇA ---
                // Adiciona a resposta ao array junto com um timestamp
                allAnswers.push({
                    userId: userId,
                    questionId: questionId,
                    answer: answer,
                    timestamp: new Date().toISOString() // Captura o momento do envio
                });
                // --- FIM DA MUDANÇA ---
            });

            const validAnswers = allAnswers.filter(answer => answer.answer.trim() !== "");

            // URL do seu Google Apps Script implantado como API da Web
            const gasUrl = 'https://script.google.com/macros/s/AKfycbx_BSeYfATPGj4lzJImTnB8oyXCFRkznmfaHEbN7OscX-xEpfXG_9Vk8cz98USiD24SjA/exec'; // Substitua pela URL do seu GAS
            
            const formData = new FormData();
            formData.append('data', JSON.stringify(validAnswers));

            try {
                const response = await fetch(gasUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData,
                });
                
                window.location.href = 'thankyou.html';
            } catch (error) {
                console.error('Erro ao enviar as respostas:', error);
                showMessage("Ocorreu um erro ao enviar as respostas. Por favor, tente novamente.", "error");
            }
        });
    }

    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = "block";
        }
    }
});