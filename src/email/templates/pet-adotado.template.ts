export const PetAdotadoTemplate = (nomePet: string, cupom: string) => {
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
    <img src='https://qencdxllvvjlbwzowlmk.supabase.co/storage/v1/object/public/pets/logo-com-nome.png' alt='Logo do Sistema'> 
  </div>

  <p>Prezado(a) Usuário(a),</p>

  <p>
    Parabéns, você adotou o ${nomePet}, e como forma de nosso agradecimento por ajudar um aumiguinho/miauguinho daremos um cupom de 10% de desconto nas lojas parceiras com o cupom abaixo!
  </p>

  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
    <h2>Ganhe 10% de desconto na suas proximas compras em uma loja parceira do animaverso!</h2>
    <p>Use o cupom <strong>${cupom}</strong>.</p>
    <p>Este cupom é valido somente para ser usado uma unica vez.</p>
  </div>

 

  <p>Atenciosamente,<br>
    Equipe de Suporte do Animaverso.
  </p>
</body>
</html>
    `;
};
