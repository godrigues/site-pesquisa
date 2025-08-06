# Instruções para Configuração do Google Sheets e Google Apps Script

Este documento detalha os passos necessários para configurar o Google Sheets como seu banco de dados e o Google Apps Script como seu endpoint de API para a aplicação de pesquisa.

## Passo 1: Configurar o Google Sheet

1.  **Crie uma Nova Planilha Google:**
    *   Vá para [Google Sheets](https://docs.google.com/spreadsheets/)
    *   Clique em "Em branco" para criar uma nova planilha.

2.  **Nomeie sua Planilha:**
    *   Renomeie a planilha para algo como "Dados da Pesquisa".

3.  **Obtenha o ID da Planilha:**
    *   O ID da planilha está na URL. Por exemplo, se a URL for `https://docs.google.com/spreadsheets/d/1ABCDEFG12345/edit#gid=0`, o ID é `1ABCDEFG12345`.
    *   Copie este ID, você precisará dele no Google Apps Script.

4.  **Crie a Aba de Respostas:**
    *   Certifique-se de que a primeira aba (ou a aba que você deseja usar) esteja nomeada como `Respostas`. Se não estiver, clique duas vezes no nome da aba e renomeie-a.

## Passo 2: Configurar o Google Apps Script

1.  **Abra o Editor de Script:**
    *   Na sua planilha Google, vá em `Extensões > Apps Script`.
    *   Isso abrirá uma nova aba com o editor de script.

2.  **Cole o Código do `Code.gs`:**
    *   No editor de script, você verá um arquivo `Code.gs` padrão.
    *   Apague todo o conteúdo existente e cole o código fornecido no arquivo `Code.gs` (que você pode encontrar na pasta do seu projeto):

    ```javascript
function doPost(e) {
  var sheetId = 'YOUR_SPREADSHEET_ID'; // Substitua pelo ID da sua planilha
  var sheetName = 'Respostas'; // Nome da aba da planilha
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ 'status': 'error', 'message': 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  }

  var data = JSON.parse(e.postData.contents);

  // Adiciona cabeçalhos se a planilha estiver vazia
  if (sheet.getLastRow() == 0) {
    sheet.appendRow(['Timestamp', 'User ID', 'Question ID', 'Answer']);
  }

  // Adiciona os dados à planilha
  var timestamp = new Date();
  sheet.appendRow([timestamp, data.userId, data.questionId, data.answer]);

  return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput("Este é um endpoint POST. Por favor, envie dados via POST.").setMimeType(ContentService.MimeType.TEXT);
}
    ```

3.  **Substitua o ID da Planilha:**
    *   No código que você colou, localize a linha:
        `var sheetId = 'YOUR_SPREADSHEET_ID';`
    *   Substitua `YOUR_SPREADSHEET_ID` pelo ID da planilha que você copiou no Passo 1.3.

4.  **Salve o Projeto do Script:**
    *   Clique no ícone de disquete (Salvar projeto) ou vá em `Arquivo > Salvar projeto`.
    *   Nomeie o projeto (ex: "API de Pesquisa").

5.  **Implante o Script como Aplicativo da Web:**
    *   Vá em `Implantar > Nova implantação`.
    *   Clique em "Selecionar tipo" (o ícone de engrenagem) e escolha `Aplicativo da web`.
    *   Configure os seguintes campos:
        *   **Descrição da implantação:** (Opcional) Uma breve descrição.
        *   **Executar como:** `Eu` (seu e-mail).
        *   **Quem tem acesso:** `Qualquer pessoa` (para que seu frontend possa acessá-lo).
    *   Clique em `Implantar`.

6.  **Autorize o Projeto (Primeira Vez):**
    *   Na primeira implantação, o Google pedirá autorização. Clique em `Autorizar acesso`.
    *   Selecione sua conta Google.
    *   Se aparecer um aviso de "Este app não foi verificado", clique em `Avançado` e depois em `Ir para [Nome do seu projeto] (não seguro)`.
    *   Clique em `Permitir`.

7.  **Copie a URL do Aplicativo da Web:**
    *   Após a implantação bem-sucedida, você verá uma caixa de diálogo com a "URL do aplicativo da web".
    *   **Copie esta URL.** Você precisará dela para o seu arquivo `script.js`.

## Passo 3: Atualizar o Frontend (script.js)

1.  **Abra o arquivo `script.js`** no seu projeto local.

2.  **Localize a linha:**
    `const gasUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`

3.  **Substitua `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`** pela URL do aplicativo da web que você copiou no Passo 2.7.

## Próximos Passos

*   Abra o arquivo `index.html` no seu navegador para iniciar a aplicação.
*   Insira um ID de usuário e clique em "Iniciar Pesquisa".
*   Na página da pesquisa, responda às perguntas e clique em "Enviar Respostas".
*   Você será redirecionado para uma página de agradecimento.
*   Verifique sua planilha Google (aba `Respostas`) para confirmar que os dados foram registrados.


