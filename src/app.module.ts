import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmailService } from './email/email.service';
import { EnderecosModule } from './enderecos/enderecos.module';
import { PetsModule } from './pets/pets.module';
import { SupabaseModule } from './storage/supabase/supabase.module';
import { InteressadosModule } from './interessados/interessados.module';
import { CupomModule } from './cupom/cupom.module';

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnderecosModule,
    PetsModule,
    SupabaseModule,
    InteressadosModule,
    CupomModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EmailService,
  ],
})
export class AppModule {}
