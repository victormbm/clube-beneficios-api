# Respostas Desafio Desenvolvedores

## Questão 2 – Banco de Dados

### a) Que banco de dados você recomendaria para essa aplicação?
    Nesse caso eu recomendo o uso do MongoDB junto com o mongoose.
    Motivos :
        - Maior flexibilidade nos schemas para MVPs
        -A Documentação fica aninhada o que facilita os relacionamentos simples.
        - Boa integração com o Node/Nest
        - Fica escalável e de fácil configuração local ou na nuvem

### b) Modelos com Mongoose

#### Cliente
```ts
@Schema({ timestamps: true })
export class Cliente {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;
  
}
```

#### Produto
```ts
@Schema({ timestamps: true })
export class Produto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  preco: number;
}
```

#### Compra
```ts
@Schema({ timestamps: true })
export class Compra {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' })
  cliente_id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Produto' })
  produto_id: string;
}
```


## Questão 3 – Autenticação e Segurança

### 3.a) Como você implementaria autenticação para os clientes? Utilize JWT em seu exemplo.

Implementei autenticação com JWT da seguinte forma:

1. Criei o módulo auth com controller e service.
2. Adicionei um endpoint POST /auth/login para gerar o token JWT.
3. Utilizei bcrypt para verificar a senha informada com a hash salva.
4. Gerei o token com @nestjs/jwt usando sub (ID) e email.
5. Configurei a estratégia JWT (passport-jwt) para proteger rotas.
6. Rotas privadas usam @UseGuards(AuthGuard(jwt)).

Exemplo de login:
```ts
@Post('login')
async login(@Body() body: { email: string, senha: string }) {
  const cliente = await this.authService.validateCliente(body.email, body.senha);
  return this.authService.login(cliente);
}
```

### 3.b) Como garantiria a segurança das senhas no banco de dados? Apresente um trecho de código ilustrando sua resposta.

As senhas são protegidas utilizando hash com bcrypt antes de serem salvas no banco. Exemplo:

```ts
import * as bcrypt from 'bcrypt';

async function criarCliente(createClienteDto: CreateClienteDto) {
  const hashedPassword = await bcrypt.hash(createClienteDto.senha, 10);
  const cliente = new this.clienteModel({
    ...createClienteDto,
    senha: hashedPassword,
  });
  return cliente.save();
}
```

Assim, mesmo que o banco seja comprometido, as senhas não ficam expostas em texto puro.

## Questão 4 – Boas Práticas e Testes

### 4.a) Quais são as boas práticas para organizar o código de uma API Node.js?

- Procuro separar tudo em módulos, tipo: clientes, produtos, auth, compras... cada um na sua pasta.
- Uso DTOs pra garantir que os dados que chegam estão certinhos.
- Deixo a lógica de negócio nos services e só uso os controllers pra receber as requisições.
- Os schemas ajudam a manter o padrão dos dados no banco (uso Mongoose).
- Tento manter os arquivos organizados por domínio, fica mais fácil de achar depois.
- Escrevo testes automatizados, tanto unitários quanto de ponta a ponta (e2e).
- Configurações sensíveis, tipo senha e chave JWT, sempre vão pra variável de ambiente.
- Nomes de arquivos, variáveis e funções sempre claros, nada de abreviação doida.

### 4.b) Como você implementaria testes para os endpoints da API? Forneça um exemplo usando Jest ou Supertest.

Eu curto bastante testar usando Jest junto com o Supertest. Aqui vai um exemplo real do meu projeto, testando o endpoint de clientes:

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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
});
```

Com esse tipo de teste, eu garanto que a API tá funcionando de verdade, igual o usuário usaria. E se quebrar alguma coisa, já descubro com mais facilidade.

## Questão 5 – Desempenho e Escalabilidade

### 5.a) Quais estratégias você utilizaria para melhorar o desempenho da API?

- Procuro criar índices no MongoDB, principalmente em campos que são muito buscados, tipo email e referências.
- Sempre coloco paginação nas rotas de listagem, assim não sobrecarrega o servidor trazendo tudo de uma vez.
- Valido os dados logo na entrada usando DTOs, pra já barrar requisição errada de cara.
- No Mongoose, costumo usar projection/select pra trazer só o que realmente preciso do banco.
- Se tiver algum endpoint que não muda muito, penso em usar cache pra agilizar.
- E claro, monitoro com logs pra identificar onde pode estar travando e ajustar se precisar.

### 5.b) Como garantiria que a API possa escalar para atender um grande número de requisições?

- Deixo a API stateless, sem guardar nada importante em memória local, assim dá pra rodar várias instâncias sem dor de cabeça.
- Gosto de usar PM2 ou Docker pra subir múltiplas instâncias quando precisa.
- Configuro um balanceador de carga (tipo Nginx ou AWS ELB) pra dividir as requisições entre as instâncias.
- O banco de dados, prefiro usar um serviço gerenciado e escalável, tipo MongoDB Atlas.
- Se começar a ter muita tarefa pesada, penso em usar filas (RabbitMQ, SQS) pra processar de forma assíncrona.
- E vou acompanhando o consumo de recursos pra escalar horizontalmente quando for necessário.
.











