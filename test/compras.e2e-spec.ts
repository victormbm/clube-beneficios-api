import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';

describe('ComprasController (e2e)', () => {
  let app: INestApplication;
  let clienteId: string;
  let produtoId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const cliente = await request(app.getHttpServer())
      .post('/clientes')
      .send({
        nome: 'Cliente Compra',
        email: `compras${Date.now()}@teste.com`,
        senha: '123456',
      });

    clienteId = cliente.body._id;

    const produto = await request(app.getHttpServer())
      .post('/produtos')
      .send({
        nome: 'Produto Compra',
        descricao: 'Produto usado para teste de compra',
        preco: 150,
      });

    produtoId = produto.body._id;
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });

  it('POST /compras - deve registrar uma compra', async () => {
    const res = await request(app.getHttpServer())
      .post('/compras')
      .send({
        cliente_id: clienteId,
        produto_id: produtoId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.cliente_id).toBe(clienteId);
    expect(res.body.produto_id).toBe(produtoId);
  });

  it('GET /compras - deve retornar lista de compras', async () => {
    const res = await request(app.getHttpServer()).get('/compras');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /compras?cliente_id= - deve filtrar compras por cliente', async () => {
    const res = await request(app.getHttpServer()).get(`/compras?cliente_id=${clienteId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((compra) => {
      expect(compra.cliente_id._id).toBe(clienteId);
    });
  });
});
