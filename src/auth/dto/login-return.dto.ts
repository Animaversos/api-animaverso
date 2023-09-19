export class UserDto {
  id: number;
  usuario: string;
  email: string;
}

export class LoginReturnDto {
  access_token: string;
  refresh_token: string;
  usuario: UserDto;
}
