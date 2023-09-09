# API Bancária

![GitHub last commit](https://img.shields.io/github/last-commit/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario)

## Descrição

A API Bancária é um projeto que simula um sistema bancário simples, permitindo que os usuários criem contas bancárias, realizem transações (depósitos, saques e transferências), consultem seus saldos e extratos. Esta API foi desenvolvida como parte de um projeto de estudo.

## Funcionalidades

- Criar uma conta bancária com informações pessoais.
- Atualizar informações da conta bancária.
- Excluir uma conta bancária.
- Realizar depósitos em uma conta.
- Realizar saques em uma conta.
- Realizar transferências entre contas.
- Consultar o saldo de uma conta.
- Visualizar o extrato de transações de uma conta.

## Como Funciona

1. Clone este repositório para o seu ambiente local:
```node
git clone https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario.git
```

2. Instale as dependências necessárias:
```node
npm install
```

3. Inicie o servidor:
```node
npm run dev
```

4. Acesse a API em:
```
http://localhost:8000.
```

## Endpoints

- GET /contas - Lista todas as contas bancárias.
- POST /contas - Cria uma nova conta bancária.
- PUT /contas/:numeroConta/usuario - Atualiza informações do usuário da conta.
- DELETE /contas/:numeroConta - Exclui uma conta bancária.
- POST /transacoes/depositar - Realiza um depósito em uma conta.
- POST /transacoes/sacar - Realiza um saque em uma conta.
- POST /transacoes/transferir - Realiza uma transferência entre contas.
- GET /contas/saldo - Consulta o saldo de uma conta.
- GET /contas/extrato - Lista o extrato de transações de uma conta.

## Exemplo de Uso

Aqui estão alguns exemplos de como utilizar algumas das endpoints:

### Criar uma Conta Bancária
Acesse:
```
POST /contas
```

#### Corpo da Requisição:
```json
{
    "nome": "João da Silva",
    "cpf": "12345678901",
    "data_nascimento": "1990-01-15",
    "telefone": "111234-5678",
    "email": "joao@example.com",
    "senha": "minha_senha"
}

```

#### Corpo da Resposta:
![Imagem do corpo da resposta vazio](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/32898478-51fd-45c8-8c8f-b6198fe83d9c)

### Listar Contas Bancarias

Essa endpoint precisa que seja informada a senha do banco como parametro para que as contas cadastradas sejam listadas. Nada deve ser informado no corpo da requisição.

Acesse:
```
GET /contas?senha_banco=Cubos123Bank
```

#### Corpo da Resposta:
![Imagem das contas listadas no corpo da resposta](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/e502de5f-1687-4840-9ea3-5133e03106d1)


### Realizar um Depósito
Acesse:
```
POST /transacoes/depositar
```

#### Corpo da Requisição:
```json
{
    "numero_conta": "1",
    "valor": 1000
}
```

#### Resposta de Sucesso:
![Imagem do corpo da resposta vazio](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/7883c5f1-b3e3-42f6-b858-8e07c76886ac)


#### Resposta de Erro:
![Imagem do corpo da resposta com mensagem de erro](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/1f2d9951-1bce-4a53-a3b4-f599d2bd6249)


### Realizar uma Transferência
Acesse:
```
POST /transacoes/transferir
```
#### Corpo da Requisição:
```json
{
    "numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "minha_senha"
}
```

#### Resposta de Sucesso:
![Imagem do corpo da resposta vazio](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/8feeb7c9-aa68-4b16-aead-b2a6ba11acaf)


#### Resposta de Erro:
![Imagem do corpo da resposta com mensagem de erro](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/1c606baf-6b3b-4295-8d44-78208e9ec33e)


### Emitir Extrato

Essa endpoint precisa que seja informada a senha do usuario e o número da conta como parametros para que o extrato seja emitido. Nada deve ser informado no corpo da requisição.

Acesse:
```
GET /contas/extrato?numero_conta=1&senha=minha_senha
```

#### Resposta de Sucesso:
![Imagem do corpo da resposta com o extrato de movimentações uma conta](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/60872ecc-3e6f-423d-bbcb-774ed28b3211)


#### Resposta de Erro:
![Imagem do corpo da resposta com mensagem de erro](https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario/assets/137848525/ad137598-2cc9-49cd-8c51-86c560caff57)
