import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';

describe('ClientesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });

  it('POST /clientes - deve criar um cliente', async () => {
    const res = await request(app.getHttpServer())
      .post('/clientes')
      .send({
        nome: 'Teste Cliente',
        email: `cliente${Date.now()}@teste.com`,
        senha: '123456',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email');
  });

  it('GET /clientes - deve retornar lista de clientes', async () => {
    const res = await request(app.getHttpServer()).get('/clientes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
