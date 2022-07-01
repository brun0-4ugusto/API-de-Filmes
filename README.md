# API de Filmes

Quando vamos assistir um filme é comum pedirmos indicações. Queremos saber o que as pessoas acharam do filme, se é algo que vale a pena ser assistido. Portanto, essa é uma API que tem a finalidade de receber e armazenar comentários e notas de um filme. 😎

## Tipos de Usuário

-   Leitor 👀: Ele tem as permissões de ver as informações de um filme, comentários e dar uma nota para o filme. A cada filme que o usuário avaliar, ele ganha 1 ponto em seu perfil. Somados 20 pontos ele se torna um usuário básico.
-   Básico 🎉: Nesse perfil será possível postar comentários, notas e responder comentários. Cada resposta e comentário que o usuário enviar, ele ganha 1 ponto. Somados 100 pontos ele se torna um usuário avançado.
-   Avançado 🐱‍👤: Esse perfil tem as capacidades do BÁSICO, e mais citar outros comentários (comentários feitos por outros usuários) e marcar comentários como “gostei” ou "não gostei”.
-   Moderador 🐱‍🏍: Um usuário poderá se tornar MODERADOR de 2 formas: um moderador torna outro usuário moderador ou por pontuação, para se tornar MODERADOR o usuário deverá ter 1000 pontos. O moderador tem as capacidades do AVANÇADO, e mais excluir um comentário ou marcar como repetida.

## Como testar:

-   Requisítos:
    -   NodeJS (utilizei a versão 16.15.1)
    -   Mysql 8.0.29
    -   NPM 8.13.0
-   Passo a Passo:
    -   Clone o repositório
    -   Baixe todas as dependências
    -   Dê um **npm start** (essa api está configurada para a porta 3000)
    -   Clone o repositório da API de Login <https://github.com/brun0-4ugusto/API-de-autorizacao-de-login>
    -   Baixe todas as dependências
    -   Dê um **npm start** (essa api está configurada para a porta 4000)
    -   Dentro da pasta config tem o arquivo **config.json**, lá está a configuração de como é feita a conexão com o banco de dados, por motivos de teste o usuário é root e a senha é 1234, o nome da database é sistema_filmes, rodando no localhost com a porta padão.
    -   Com o sequelize cli é possível criar essa database (sistema_filmes), para isso (com o usuário root e senha 1234 - caso seja diferente, o arquivo config deve ser alterado - ) digite no terminal do VSCODE, ou de outro editor, o comando **npx sequelize-cli db:create**.
    -   Criada a database com sucesso, é necessário criar as tabelas para isso, digite no terminal **npx sequelize-cli db:migrate**
    -   É possível criar alguns dados falsos nas tabelas para facilitar os testes com o comando **npx sequelize-cli db:seed:all**, esses dados abrangem:
        -   4 Usuários, um de cada tipo, (visando facilitar os testes de permissões), todos com a senha **41512531**
        -   2 comentários de filmes
        -   2 notas de filmes
        -   1 resposta à comentários
    -   O projeto conta ainda com o **_Swagger_** para documentar e testar melhor os endpoints ele pode ser acessado na rota **http://localhost:3000/api-docs/**

## Endpoints da API:

### Cadastrar Usuário

### Request

`POST /usuario`

```
curl -X 'POST' \
  'http://localhost:3000/usuario' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "nome": "LetsCode",
  "email": "itau@itau.com",
  "senha": "itau@letscode"
}'
```

### Response

```
HTTP/1.1 201 Created
{
  "id": 5,
  "nome": "LetsCode",
  "email": "itau@itau.com",
  "senha": "$2b$12$g2mYR6mhdswShQLtjZZ0s.BpzbcFh5WXBXIqsq8Ucz0jT71K5jvkW",
  "updatedAt": "2022-07-01T00:00:26.621Z",
  "createdAt": "2022-07-01T00:00:26.621Z"
}
```

### Login

### Request

`POST /usuario/login`

```
curl -X 'POST' \
  'http://localhost:3000/usuario/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "itau@itau.com",
  "senha": "itau@letscode"
}'
```

### Response

```
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c
 connection: keep-alive
 date: Fri,01 Jul 2022 00:04:04 GMT
 keep-alive: timeout=5
 x-powered-by: Express
```

-   A partir desse momento, todas as requisições precisam do token contido no header **authorization**, **esse token expira a cada 30 minutos**

### Buscar Filmes

### Request

`GET /filme/`

```
curl -X 'GET' \
  'http://localhost:3000/filme/?id=tt3896198' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c'
```

### Response

```
{
  "info": {
    "Title": "Guardians of the Galaxy Vol. 2",
    "Year": "2017",
    "Rated": "PG-13",
    "Released": "05 May 2017",
    "Runtime": "136 min",
    "Genre": "Action, Adventure, Comedy",
    "Director": "James Gunn",
    "Writer": "James Gunn, Dan Abnett, Andy Lanning",
    "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista",
    "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
    "Language": "English",
    "Country": "United States",
    "Awards": "Nominated for 1 Oscar. 15 wins & 59 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "85%"
      },
      {
        "Source": "Metacritic",
        "Value": "67/100"
      }
    ],
    "Metascore": "67",
    "imdbRating": "7.6",
    "imdbVotes": "655,156",
    "imdbID": "tt3896198",
    "Type": "movie",
    "DVD": "22 Aug 2017",
    "BoxOffice": "$389,813,101",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
  },
  "interações": {
    "comentarios": [
      {
        "id": 1,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "comentario": "Muito Legal",
        "gostei": 1,
        "naoGostei": 0,
        "votantes": "{\"usuario\":\"admin@admin.com\",\"gostou\":\"true\"}",
        "repetido": true,
        "createdAt": "2022-06-30T22:39:12.000Z",
        "updatedAt": "2022-06-30T22:50:27.000Z",
        "autor": "ocao@covarde.com"
      },
      {
        "id": 3,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "comentario": "Um ótimo filme! Adorei!",
        "gostei": 0,
        "naoGostei": 0,
        "votantes": null,
        "repetido": false,
        "createdAt": "2022-06-30T22:47:02.000Z",
        "updatedAt": "2022-06-30T22:47:02.000Z",
        "autor": "admin@admin.com"
      },
      {
        "id": 4,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "comentario": "Um ótimo filme! Adorei!",
        "gostei": 0,
        "naoGostei": 0,
        "votantes": null,
        "repetido": false,
        "createdAt": "2022-06-30T22:47:36.000Z",
        "updatedAt": "2022-06-30T22:47:36.000Z",
        "autor": "admin@admin.com"
      }
    ],
    "notas": [
      {
        "id": 1,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "nota": 4,
        "createdAt": "2022-06-30T22:39:12.000Z",
        "updatedAt": "2022-06-30T22:39:12.000Z",
        "autor": "ocao@covarde.com"
      },
      {
        "id": 2,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "nota": 2,
        "createdAt": "2022-06-30T22:39:12.000Z",
        "updatedAt": "2022-06-30T22:39:12.000Z",
        "autor": "bobsquare@pants.com"
      },
      {
        "id": 3,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "nota": 4,
        "createdAt": "2022-06-30T22:42:13.000Z",
        "updatedAt": "2022-06-30T22:42:13.000Z",
        "autor": "itau@itau.com"
      },
      {
        "id": 4,
        "titulo": "Guardians of the Galaxy Vol. 2",
        "nota": 4,
        "createdAt": "2022-06-30T22:46:54.000Z",
        "updatedAt": "2022-06-30T22:46:54.000Z",
        "autor": "admin@admin.com"
      }
    ]
  }
}
```

### Dar nota a um filme

### Request

`POST /filme/nota`

```
curl -X 'POST' \
  'http://localhost:3000/filme/nota?id=tt0417741' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c' \
  -H 'Content-Type: application/json' \
  -d '{
  "nota": 4
}'
```

### Response

```
{
  "message": {
    "id": 5,
    "titulo": "Harry Potter and the Half-Blood Prince",
    "nota": 4,
    "imdbID": "tt0417741",
    "autor": "itau@itau.com",
    "updatedAt": "2022-07-01T00:17:15.448Z",
    "createdAt": "2022-07-01T00:17:15.448Z"
  }
}
```

### Postar Comentário

### Request

`POST /filme/comentario`

```
curl -X 'POST' \
  'http://localhost:3000/filme/comentario?id=tt3896198' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c' \
  -H 'Content-Type: application/json' \
  -d '{
  "comentario": "Um ótimo filme! Adorei!"
}'
```

### Response

```
{
  "message": {
    "id": 5,
    "titulo": "Guardians of the Galaxy Vol. 2",
    "comentario": "Um ótimo filme! Adorei!",
    "imdbID": "tt3896198",
    "autor": "itau@itau.com",
    "updatedAt": "2022-07-01T00:18:08.538Z",
    "createdAt": "2022-07-01T00:18:08.538Z"
  }
}
```

### Responder um comentário

### Request

`POST /filme/comentarios/:id`

```
curl -X 'POST' \
  'http://localhost:3000/filme/comentarios/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c' \
  -H 'Content-Type: application/json' \
  -d '{
  "resposta": "Concordo com você!"
}'
```

### Response

```
{
  "message": {
    "id": 4,
    "idComentario": 1,
    "resposta": "Concordo com você!",
    "autor": "itau@itau.com",
    "updatedAt": "2022-07-01T00:22:11.137Z",
    "createdAt": "2022-07-01T00:22:11.137Z"
  }
}
```

### Ver todas as respostas de um comentário

### Request

`GET /filme/comentarios/:id`

```
curl -X 'GET' \
  'http://localhost:3000/filme/comentarios/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c'
```

### Response

```
{
  "Todas as respostas": [
    "Não achei tão legal",
    "Concordo com você!",
    "Concordo com você!"
  ]
}
```

### Deletar um comentário

### Request

`DELETE /filme/comentarios/:id`

```
curl -X 'DELETE' \
  'http://localhost:3000/filme/comentarios/4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c'
```

### Response

```
 connection: keep-alive
 content-length: 28
 content-type: text/html; charset=utf-8

O comentário 4 foi deletado
```

### Marcar Comentário como repetido

### Request

`PUT /filme/comentarios/:id`

```
curl -X 'PUT' \
  'http://localhost:3000/filme/comentarios/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c'
```

### Response

```
connection: keep-alive
 content-length: 41
 content-type: text/html; charset=utf-8

O comentário 1 foi marcado como repetido
```

### Curtir um comentário

### Request

`POST /filme/:id`

```
curl -X 'POST' \
  'http://localhost:3000/filme/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c' \
  -H 'Content-Type: application/json' \
  -d '{
  "gostou": "true"
}'
```

### Response

```
connection: keep-alive
 content-length: 19
 content-type: text/html; charset=utf-8

 Enviado com sucesso
```

### Citar comentário

### Request

`GET /filme/:id`

```
curl -X 'GET' \
  'http://localhost:3000/filme/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c'
```

### Response

```
connection: keep-alive
 content-length: 35
 content-type: application/json; charset=utf-8

 {
  "Comentario Citado": "Muito Legal"
}
```

### Ver todos os likes de um comentário

### Request

`GET /filme/curtidas/:id`

```
curl -X 'GET' \
  'http://localhost:3000/filme/curtidas/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzM4NDQsImV4cCI6MTY1NjYzNTY0NH0.iJEAmUJnpX63TL6aBrKr8vgsZ_du9jH9pJlVNn_Sn3c'
```

### Response

```
connection: keep-alive
 content-length: 28
 content-type: application/json; charset=utf-8

 {
  "Gostei": 2,
  "Não Gostei": 0
}
```

### Tornar moderador

### Request

`POST /moderador`

```
curl -X 'POST' \
  'http://localhost:3000/moderador' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0YXVAaXRhdS5jb20iLCJpYXQiOjE2NTY2MzU3NTIsImV4cCI6MTY1NjYzNzU1Mn0.uMJlUQQiMWmGAWXgAxnegJPtnsBnWZiEv2ABd80Scik' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "itau@itau.com"
}'
```

### Response

```
connection: keep-alive
 content-length: 42
 content-type: text/html; charset=utf-8

 itau@itau.com foi incluído como Moderador
```
