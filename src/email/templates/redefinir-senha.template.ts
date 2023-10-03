export const RedefinirSenhaTemplate = (link: string) => {
  // TODO - Informar a logo da Animaverso no header
  return `
    <!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Redefinição de Senha - Animaverso</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .header img {
      max-width: 200px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      background-color: orange;
      text-decoration: none;
      border-radius: 5px;
    }
    a {
     color: #ffffff !important;
    }
  </style>
</head>
<body>
  <div class='header'>
    <img src='caminho_para_a_logo.png' alt='Logo do Sistema'> 
  </div>

  <p>Prezado(a) Usuário(a),</p>

  <p>
    Você está recebendo este e-mail porque solicitou a redefinição da sua senha para acessar o Animaverso. 
    Clique no botão abaixo para redefinir sua senha:
  </p>

  <a href='${link}' class='button'>Redefinir Senha</a>

  <p>
    Se você não solicitou essa redefinição de senha, pode ignorar este e-mail com segurança.
  </p>

  <p>Atenciosamente,<br>
    Equipe de Suporte do Animaverso.
  </p>
</body>
</html>
    `;
};
