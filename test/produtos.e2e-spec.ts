import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';

describe('ProdutosController (e2e)', () => {
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

  it('POST /produtos - deve criar um produto', async () => {
    const res = await request(app.getHttpServer())
      .post('/produtos').send({
        nome: 'Notebook Gamer',
        descricao: 'Um notebook poderoso para jogos',
        preco: 4599.90,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Notebook Gamer');
  });

  it('GET /produtos - deve retornar todos os produtos', async () => {
    const res = await request(app.getHttpServer()).get('/produtos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /produtos com filtro - deve retornar produtos por faixa de preço', async () => {
    const res = await request(app.getHttpServer())
      .get('/produtos?preco_min=4000&preco_max=5000');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((produto) => {
      expect(produto.preco).toBeGreaterThanOrEqual(4000);
      expect(produto.preco).toBeLessThanOrEqual(5000);
    });
  });
});
