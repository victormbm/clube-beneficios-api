# Clube de Benefícios API

API desenvolvida em NestJS para gerenciar clientes, produtos e compras, com autenticação JWT e integração com MongoDB.

## Descrição
Esta API permite:
- Cadastro e autenticação de clientes
- Cadastro e listagem de produtos
- Registro de compras relacionando clientes e produtos
- Testes automatizados (e2e) com Jest e Supertest

## Instalação
```bash
npm install
```

## Como rodar
### Ambiente de desenvolvimento
```bash
npm run start:dev
```
A API ficará disponível em `http://localhost:3000`.

### Ambiente de produção
```bash
npm run build
npm run start:prod
```

## Configuração do MongoDB
Por padrão, a aplicação conecta em um MongoDB local:
```
mongodb://localhost/clube-beneficios
```
Você pode alterar a string de conexão em `src/app.module.ts` ou usar variáveis de ambiente.

## Testes automatizados
Execute os testes e2e com:
```bash
npm run test:e2e
```

## Exemplos de uso
### Cadastro de cliente
```http
POST /clientes
{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "123456"
}
```

### Login
```http
POST /auth/login
{
  "email": "joao@email.com",
  "senha": "123456"
}
```
Resposta:
```json
{
  "access_token": "..."
}
```

### Cadastro de produto
```http
POST /produtos
{
  "nome": "Tênis Nike",
  "descricao": "Tênis esportivo confortável",
  "preco": 399.90
}
```

### Registro de compra
```http
POST /compras
{
  "cliente_id": "<id_cliente>",
  "produto_id": "<id_produto>"
}
```

## Observações
- Para acessar rotas protegidas, envie o token JWT no header:
  ```
  Authorization: Bearer <access_token>
  ```
- Altere as configurações conforme seu ambiente.

---

Se tiver dúvidas, sugestões ou quiser contribuir, fique à vontade!
