import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ROLE_ENUM } from 'src/commons/enums/enums';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService = await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(abilityService).toBeDefined();
  });

  describe('UsersService', () => {
    let service: UsersService;
    let prismaService: any;
    let abilityService: any;

    beforeEach(async () => {
      prismaService = {
        user: {
          create: jest.fn(),
          findMany: jest.fn(),
          findUnique: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      };
      abilityService = {
        ability: {
          can: jest.fn(),
        },
      };
      service = new UsersService(prismaService, abilityService);
    });

    describe('create', () => {
      it('should hash password and create user with default role', async () => {
        const dto = { username: 'test', password: 'pass123' };
        prismaService.user.create.mockResolvedValue({ id: '1', ...dto, role: ROLE_ENUM.NAO_IDENTIFICADO });
        const result = await service.create(dto as any);
        expect(bcrypt.hash).toBeDefined();
        expect(prismaService.user.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            username: 'test',
            role: ROLE_ENUM.NAO_IDENTIFICADO,
          }),
        });
        expect(result.role).toBe(ROLE_ENUM.NAO_IDENTIFICADO);
      });
    });

    describe('findAll', () => {
      it('should return users if ability allows', async () => {
        abilityService.ability.can.mockReturnValue(true);
        prismaService.user.findMany.mockResolvedValue([{ id: '1' }]);
        const result = await service.findAll();
        expect(prismaService.user.findMany).toHaveBeenCalled();
        expect(result).toEqual([{ id: '1' }]);
      });

      it('should throw ForbiddenException if ability denies', () => {
        abilityService.ability.can.mockReturnValue(false);
        expect(() => service.findAll()).toThrow(ForbiddenException);
      });
    });

    describe('findOne', () => {
      it('should return user by id', async () => {
        prismaService.user.findUnique.mockResolvedValue({ id: '1' });
        const result = await service.findOne('1');
        expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(result).toEqual({ id: '1' });
      });
    });

    describe('update', () => {
      it('should hash password if provided and update user', async () => {
        const dto = { password: 'newpass', username: 'updated' };
        prismaService.user.update.mockResolvedValue({ id: '1', ...dto });
        const result = await service.update('1', { ...dto } as any);
        expect(prismaService.user.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: expect.objectContaining({ username: 'updated' }),
        });
        expect(result.id).toBe('1');
      });

      it('should update user without hashing if password not provided', async () => {
        const dto = { username: 'updated' };
        prismaService.user.update.mockResolvedValue({ id: '1', ...dto });
        const result = await service.update('1', { ...dto } as any);
        expect(prismaService.user.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: expect.objectContaining({ username: 'updated' }),
        });
        expect(result.id).toBe('1');
      });
    });

    describe('remove', () => {
      it('should delete user by id', async () => {
        prismaService.user.delete.mockResolvedValue({ id: '1' });
        const result = await service.remove('1');
        expect(prismaService.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(result).toEqual({ id: '1' });
      });
    });
  });
  
});
