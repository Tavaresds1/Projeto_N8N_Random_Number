# Conector n8n - Gerador de Números Aleatórios (Random.org)

Este projeto contém um conector (custom node) para a plataforma de automação n8n. Ele se conecta à API pública do [Random.org](https://www.random.org/) para gerar números inteiros verdadeiramente aleatórios com base em um intervalo (`Mínimo` e `Máximo`) definido pelo usuário.

O ambiente completo, incluindo a instância do n8n e o banco de dados PostgreSQL, é gerenciado via Docker Compose, facilitando a configuração e a execução.

## ✨ Funcionalidades

* Integração com a API pública do Random.org.
* Operação única: "True Random Number Generator".
* Entradas personalizáveis para valores de "Mínimo" (Min) e "Máximo" (Max).
* Ambiente de desenvolvimento e produção containerizado com Docker e Docker Compose.
* Ícone personalizado para fácil identificação do nó na interface do n8n.

## 🛠️ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

* [Node.js](https://nodejs.org/) (versão 22 LTS recomendada)
* [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar e iniciar o ambiente.

**1. Clone o repositório**
```bash
git clone [https://github.com/Tavaresds1/Projeto_N8N_Random_Number]
cd <NOME_DA_PASTA_DO_PROJETO>
```

**2. Configure as variáveis de ambiente**

O Docker Compose utiliza um arquivo `.env` para configurar os serviços. Copie o arquivo de exemplo para criar seu arquivo de configuração local.

```bash
# No Windows (prompt de comando)
copy .env .env
```
*Não é necessário alterar os valores do arquivo `.env` para rodar localmente.*

**3. Construa o conector customizado**

O conector precisa ser compilado de TypeScript para JavaScript antes de ser carregado pelo n8n.

```bash
# Navegue até a pasta do conector
cd custom-nodes

# Instale as dependências
npm install

# Compile o código
npm run build

# Volte para a pasta raiz do projeto
cd ..
```

**4. Inicie o n8n e o banco de dados**

Com o conector construído e o ambiente configurado, inicie os contêineres do Docker.

```bash
docker-compose up -d
```
O n8n pode levar alguns minutos para iniciar pela primeira vez.

**5. Acesse o n8n**

Após a inicialização, a interface do n8n estará disponível no seu navegador em:
[http://localhost:5678](http://localhost:5678)

## ⚙️ Como Usar o Conector

1.  Acesse sua instância do n8n.
2.  Crie um novo workflow.
3.  Clique no botão `+` para adicionar um novo nó.
4.  Procure por "**Random**". Você verá o conector com seu ícone personalizado.
5.  Adicione-o ao seu workflow e configure os campos "Min" e "Max" para gerar um número aleatório.

## 📝 Observação sobre o Endpoint da API

O desafio original sugeria o uso do endpoint `https://www.random.org/integers/?num=1&min=1&max=60&col=1&base=10&format=plain&rnd=new`.

No entanto, para que os campos `Min` e `Max` do conector fossem funcionais e pudessem ser dinamicamente definidos pelo usuário no workflow, a implementação utiliza uma abordagem mais flexível. O conector monta a URL de requisição (`https://www.random.org/integers/`) e anexa os parâmetros `min` e `max` com base nos valores fornecidos pelo usuário na interface do n8n.

O uso do endpoint com valores fixos (`min=1&max=60`) invalidaria o propósito principal do conector, que é permitir a total personalização do intervalo de números.

## ✉️ Contato
Desenvolvido por Gabriel Tavares de Souza - gabrieltavaresds11@gmail.com
