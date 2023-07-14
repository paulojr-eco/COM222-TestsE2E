
# School-Management-Tests-E2E

<h2 align="center">
  Este projeto visa a implementação dos testes E2E sobre a aplicação construída durante o curso da disciplina COM222 na UNIFEI
</h2>

# :star: PlayWright
O framework de construção de testes da Microsoft foi utilizado para composição desse repository.


## Testes
Os testes objetivados foram:
  - Manuseio do CRUD de funcionários
  - Manuseio do CRUD de alunos
  - Cadastro de contas na plataforma

# :computer_mouse: Instalação

```bash
# Clonar o repositório
git clone https://github.com/paulojr-eco/COM222-TestsE2E.git

# Acessar o diretório
cd COM222-TestsE2E

# Instalar dependências
npm install

# Instalação do PlayWright
npm install -g playwright

# Execução dos testes
npx playwright test --headed --workers=1
