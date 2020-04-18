<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://user-images.githubusercontent.com/2512512/74014548-b1b65180-496d-11ea-94d1-9495c01968b2.png" width="300px" />
</h1>
<h3 align="center">
  :rocket: Desafio 2: Etapa 1/4 do Desafio Final
</h3>
<p align="center">Essa é priemira etapa do <b>Desafio Final</b>, que consiste em uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack!<p>

### **Sobre o desafio**
Será a criação de uma aplicação para uma trasportadora fictícia, o FastFeet.

Nesse primeiro momento irei criar algumas funcionalidades básicas que aprendi ao longo das aulas até aqui.

## **Ferramentas**
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (PostgreSQL);
- jsonwebtoken
- yup
- bcryptjs

## **Funcionalidades**
Abaixo estão descritas as funcionalidades que serão feitas nessa primeira etapa.

# 1. Autenticação
Permitir que um usuário (administrador) se autentique utilizando e-mail e uma senha.

# 2. Gestão de destinatários
Permitir que os destinatários sejam mantidos (cadastrados/atualizados) na aplicação, e esses devem ter o **nome** do destinatário e campos de endereço: **rua, número, complemento, estado, cidade e CEP**.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação, sendo assim o destinatário não pode se autenticar no sistema.

<h3 align="center">
  :rocket: Desafio 2: Etapa 2/4 do Desafio Final
</h3>

# 1. Gestão de entregadores
Permita que o administrador possa cadastrar entregadores para a plataforma.

Foi criado rotas para listagem/cadastro/atualização/remoção de entregadores.

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

# 2. Gestão de encomendas
Apesar do entregador estar cadastrado, ele não é independente dentro da plataforma, o adm deve cadastrar encomendas para os entregadores.

Nessa funcionalidade criado um cadastro de encomendas por entregador.

A **data de início** deve ser cadastrada assim que for feita a retirada do produto pelo entregador, e as retiradas só podem ser feitas entre as 08:00 e 18:00h.

A **data de término** da entrega deve ser cadastrada quando o entregador finalizar a entrega.

Os campos **recipient_id** e **deliveryman_id** devem ser cadastrados no momento que for cadastrada a encomenda.

Quando a encomenda é **cadastrada** para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

Foi criado rotas para listagem/cadastro/atualização/remoção de encomendas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

## **Funcionalidades do entregador**
Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para os entregadores.

# 1. Visualizar encomendas
Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuidas a ele, que **não estejam entregues ou canceladas**;

Permitir que também que ele liste apenas as encomendas que já foram **entregues** por ele, com base em seu ID de cadastro;

# 2. Alterar status de encomendas
Você deve permitir que o entregador tenha rotas para incluir uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. **O entregador só pode fazer 5 retiradas por dia**.

Obs.: Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

# 3. Cadastrar problemas nas entregas
O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar.

Foi criado uma rota para a distribuidora listar todas as entregas com algum problema;

Foi criado uma rota para listar todos os problemas de uma encomenda baseado no ID da encomenda.

Foi criado uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados);

Foi criado uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda.

Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o sobre o cancelamento.
## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
