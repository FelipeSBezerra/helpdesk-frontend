# Readme do Front-end do Sistema Simplificado HelpDesk desenvolvido em Angular.

## Descrição

O Front-end do Sistema Simplificado HelpDesk é uma aplicação visual que simplifica a interação com a API do sistema, tornando mais acessível a utilização completa da solução. Com ele, é possível criar, acessar e gerenciar Ordens de Serviço, facilitando o controle dos chamados de clientes de um negócio de pequeno porte.

## Finalidade

O principal objetivo deste projeto é aprofundar-se e aplicar os conceitos de Single Page Applications (SPAs), segurança com autenticação e autorização utilizando Tokens JWT, mapeamento de rotas, componentização de elementos, diretivas, e outros recursos fundamentais para o desenvolvimento moderno de aplicações web, especialmente aqueles presentes no framework Angular.

## Tecnologias Utilizadas

A aplicação foi desenvolvida utilizando as seguintes tecnologias:

- **NodeJS**(***v18.16 ou qualquer outra compatível com a versão do angular***): Utilizado para execução do servidor, gerenciamento de dependências, compilação e outras tarefas de desenvolvimento.
- **Angular**(***v16***): Um poderoso framework utilizado para criar interfaces web de maneira eficiente e produtiva, oferecendo uma ampla gama de recursos para desenvolvimento front-end avançado
- **TypeScript**: Um superset da linguagem JavaScript que adiciona tipos estáticos opcionais e outras funcionalidades modernas, permitindo o desenvolvimento de aplicações robustas e escaláveis, fornecendo uma camada adicional de segurança e prevenindo erros comuns durante o desenvolvimento.
- **HTML e CSS**: Linguagens essenciais para estruturar e estilizar páginas web, permitindo criar layouts e designs atraentes e responsivos.
- **Angular Material**(***v16***): Uma biblioteca de componentes UI para Angular baseada no Material Design, que oferece uma variedade de componentes prontos para uso, facilitando o desenvolvimento de interfaces web modernas.

## Estrutura do Projeto

O projeto segue a estrutura padrão dos projetos criados com o Angular CLI.
Quanto à nomeclatura dos diretórios, seguem o padrão em camada com alguns módulos principais como:

- **Auth**: Diretório que contém a funcionalidade responsável por controlar o acesso às rotas da aplicação, verificando se o usuário está autenticado antes de permitir o acesso.
- **Components**: Diretório que armazena os componentes reutilizáveis da aplicação, seguindo boas práticas de modularização e reutilização de código
- **Config**: Diretório que contém arquivos de configuração da aplicação, como variáveis de ambiente.
- **Interceptors**: Diretório que guarda os interceptors do Angular, utilizados para modificar requisições HTTP globalmente, como adicionar cabeçalhos de autorização.
- **Models**: Diretório que contém as classes de modelo utilizadas pela aplicação para representar os dados de forma estruturada.
- **Service**: Diretório que contém os serviços da aplicação, responsáveis por encapsular a lógica de negócio e realizar chamadas HTTP para o backend.

## Executando o projeto

Certifique-se de ter a versão correta do Node.js e do Angular instalada conforme mencionado anteriormente. Em seguida, siga estes passos:

1. No diretório raiz, execute o comando **npm install** no terminal para instalar as dependências do projeto.
2. Execute o comando **ng serve** para iniciar o servidor web.

Com isso, o projeto estará disponível em ***`http://localhost:4200/`***

***Observação***: É importante mensionar que a o projeto está configurado para tertar se comunicar com a API em ***`http://localhost:8080/`***. Dessa forma, é necessário que a mesma esteja em execução na porta informada, ou em qualquer outra desde que seja alterada a baseURL no arquivo de configuração do projeto, que está no diretório Config. [Link para repositório da API](https://github.com/FelipeSBezerra/helpdesk-backend).

## Exibição de algumas telas da aplicação.

- **Tela de login**
![Tela de Login](https://thumbs2.imgbox.com/fa/1b/4mH0Z6BE_t.png)

- **Tela de início (Home)**
![Tela de Início (Home)](https://thumbs2.imgbox.com/81/48/PBlgGTUu_t.png)

- **Tela de listagem de técnicos**
![Tela de listagem de técnicos](https://thumbs2.imgbox.com/7b/b8/tfhuSIHl_t.png)

- **Tela de cadastro de técnico**
![Tela de cadastro de técnico](https://thumbs2.imgbox.com/56/3d/bRwqBjlc_t.png)

- **Tela de listagem de chamados**
![Tela de listagem de chamados](https://thumbs2.imgbox.com/62/14/jcz7D9ay_t.png)

- **Tela de cadastro de chamado**
![Tela de cadastro de chamado](https://thumbs2.imgbox.com/5f/87/1tx6XLpT_t.png)

- **Exemplo de Snackbar exibindo informações para o usuário**
![Exemplo de Snackbar exibindo informações para o usuário](https://thumbs2.imgbox.com/8f/2b/glqRf3Ci_t.png)

- **Tela das informações sobre um chamado**
![Tela das informações sobre um chamado](https://thumbs2.imgbox.com/a0/a3/QTiP3LLe_t.png)
