# SocialPostify

![Projeto em Ação](link-para-imagem-ou-gif.gif)

## Descrição
Apresentando o SocialPostify, uma ferramenta de agendamento de posts em redes sociais. Com o SocialPostify, você pode programar e gerenciar facilmente o conteúdo que deseja compartilhar em suas redes sociais, oferecendo conveniência e eficiência.

![link]()

## Sobre

### Visão Geral

O **SocialPostify** é uma ferramenta de agendamento de posts em redes sociais projetada para oferecer praticidade e eficiência no gerenciamento de conteúdo compartilhado. Com o SocialPostify, você pode programar facilmente as postagens que deseja compartilhar em suas redes sociais, garantindo uma presença online consistente e alinhada com seus objetivos de marketing e comunicação.

**Principais Características:**

- **Segurança Avançada:** Implementamos um sistema de cadastro e login seguro, utilizando JWT (JSON Web Tokens) com tokens completos que expiram, garantindo a proteção de suas informações.

- **Gerenciamento de Redes Sociais:** Com nosso sistema de CRUD, você pode salvar suas redes sociais e nomes de usuário, permitindo fácil manipulação desses dados.

- **Agendamento de Posts:** Crie posts com títulos e conteúdo personalizado e agende-os para serem compartilhados em suas redes sociais, com a opção de programação para datas específicas.

- **Filtragem Avançada:** Use nosso sistema de filtragem para encontrar facilmente as informações que você precisa, economizando tempo e melhorando a experiência do usuário.

- **Funcionalidades de Bloqueio:** Adicionamos funcionalidades de bloqueio para aumentar ainda mais a segurança, garantindo que suas informações pessoais permaneçam protegidas.

- **Testes Automatizados:** Todas as nossas rotas são testadas e validadas, garantindo a integridade e o funcionamento adequado do sistema.

### Motivação

Vivemos em uma era digital onde as redes sociais desempenham um papel fundamental em nossas vidas. Profissionais de Social Media estão em alta, ajudando pessoas ocupadas a cuidar de suas presenças online. No entanto, também reconhecemos a importância de fornecer uma solução acessível para quem deseja manter suas redes sociais de forma organizada, sem a necessidade de contratar terceiros.

Este projeto foi desenvolvido com a missão de ser uma ferramenta valiosa tanto para aqueles que precisam de auxílio quanto para aqueles que desejam gerenciar suas redes com eficiência. Acreditamos que ele pode fazer a diferença em uma época em que o engajamento nas redes sociais é crucial, e o tempo é um recurso cada vez mais escasso. Nosso objetivo é simplificar e melhorar a experiência das pessoas nas redes sociais, tornando o gerenciamento de conteúdo mais acessível e eficaz para todos.

### Features

- **Autenticação Segura:** Utilizamos um sistema de autenticação segura com JWT (JSON Web Tokens) para proteger os dados dos usuários.

- **Gerenciamento de Dados:** Oferecemos operações CRUD completas (Criar, Ler, Atualizar, Excluir) para redes sociais, posts e publicações, permitindo que você tenha controle total sobre seus dados.

- **Armazenamento Duradouro:** Seus dados são armazenados permanentemente em nosso banco de dados, garantindo que suas informações estejam sempre disponíveis.

- **Filtragem Eficiente:** Implementamos um sistema de filtragem eficiente para que você possa encontrar rapidamente as informações de que precisa.

- **Funcionalidades de Bloqueio:** Adicionamos funcionalidades de bloqueio para aumentar a segurança de sua conta.

- **Publicações Agendadas:** Você pode programar e agendar suas publicações em redes sociais para maior conveniência.

- **Testes Automatizados:** Cada rota é coberta por testes automatizados, garantindo que tudo funcione conforme o esperado.

### Próximos Passos

- **Desenvolvimento do Front-end:** Estamos trabalhando no desenvolvimento de um front-end atraente e eficiente para a aplicação, tornando a experiência do usuário ainda melhor.

- **Sistemas de Avisos:** Planejamos implementar sistemas de avisos para que, quando o dia de uma publicação agendada chegar, os usuários recebam notificações por e-mail ou outro meio de comunicação, garantindo que nunca percam um prazo.

- **Integração de Redes Sociais:** Estamos explorando a possibilidade de integrar diretamente com várias redes sociais populares, tornando o processo de agendamento de postagens ainda mais conveniente.

- **Agendamento Automático:** Estamos considerando a implementação de um sistema de agendamento automático, onde o SocialPostify pode recomendar os melhores horários para suas postagens, com base em análises de dados das suas redes sociais.

- **Análise de Dados Avançada:** Planejamos adicionar recursos de análise de dados avançada, permitindo que você acompanhe o desempenho das suas postagens e faça ajustes para obter melhores resultados.

## Tecnologias
<p>
<img src="https://img.shields.io/badge/-Javascript-F7DF1E?logo=javascript&logoColor=white"  alt="JavaScript" width="100" height="30">
<img src="https://img.shields.io/badge/-Node-339933?logo=nodedotjs&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white" width="100" height="30">
<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white" width="100" height="30">
<img src="https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-Nest-E0234E?logo=nestjs&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-.ENV-000000?logo=dotenv&logoColor=white" width="80" height="30">
</p>

## Como Rodar

Para rodar o SocialPostify em sua máquina local, siga estas etapas:

1. Clone o repositório para sua máquina:

    ```bash
    git clone https://github.com/seu-usuario/socialpostify.git
    ```
2. Acesse o diretório do projeto:
    ```bash
    cd socialpostify
    ```
3. Instale as dependências do projeto utilizando o npm:
    ```bash
    npm install
    ```
4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
  env
    ```bash
    DATABASE_URL="sua-url-do-banco-de-dados"
    JWT_SECRET="sua-chave-secreta-jwt"
    ```
Certifique-se de substituir "sua-url-do-banco-de-dados" pela URL do seu banco de dados e "sua-chave-secreta-jwt" por uma chave secreta para JWT.

5. Execute as migrações do banco de dados para criar as tabelas necessárias:
    ```bash
    npx prisma migrate dev
    ```
6. Inicie o servidor:
    ```bash
    npm start
    ```
O SocialPostify estará rodando em http://localhost:3000. Você pode acessar o aplicativo em seu navegador.

Certifique-se de ter o Node.js, npm e o Prisma instalados em sua máquina antes de prosseguir com essas etapas.

Agora você pode começar a usar o SocialPostify localmente!
