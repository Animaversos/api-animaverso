import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { Supabase } from '../../storage/supabase/supabase';
import { CupomService } from '../../cupom/cupom.service';
import { EmailService } from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseModule } from '../../storage/supabase/supabase.module';

describe('PetsService', () => {
  let petsService: PetsService;
  let supabaseMock: Supabase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        CupomService,
        EmailService,
        PrismaService,
        // Mock do Supabase
        {
          provide: Supabase,
          useValue: {
            getClient: jest.fn(() => ({
              query: jest.fn().mockResolvedValue({ data: [] }),
            })),
          },
        },
      ],
      imports: [SupabaseModule],
    })
      .overrideProvider(Supabase)
      .useValue({
        getClient: jest.fn(),
        query: jest.fn(),
      })
      .compile();

    petsService = module.get<PetsService>(PetsService);
    supabaseMock = module.get<Supabase>(Supabase);
  });

  it('should be defined', () => {
    expect(petsService).toBeDefined();
    expect(1).toBe(2);
  });
});
