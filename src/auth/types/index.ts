export type VerifyPasswordData = {
  senha_login: string;
  senha_usuario: string;
};

export type RecuperarSenhaData = {
  email: string;
};

export type ReturnMessage = {
  message: string;
};

export type AtualizarSenhaEsquecidaDto = {
  senha: string;
};
