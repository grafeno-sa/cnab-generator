<h1 align="center">Awesome CNAB Generator 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

[![Node](https://img.shields.io/badge/v24.14%2B-339933.svg?logo=Node.js&logoColor=white)](https://nodejs.org/en/download/archive/v24.14.0)

### ✨ [Acesse: https://grafeno-sa.github.io/cnab-generator](https://grafeno-sa.github.io/cnab-generator/)

## Install

```sh
npm install
```

## Desenvolvimento

```sh
npm run dev
```

## Deploy

Gere o build primeiro!

```sh
npm run predeploy
```

Depois submeta o deploy. Esse comando atualiza o GH Pages automaticamente.

```sh
npm run deploy
```

## Documentação

Para informações sobre como estender o projeto, consulte a documentação em `/docs`:

### Guias de Desenvolvimento
- [Adicionando um Novo Validador CNAB](docs/adicionar-validador-cnab.md) - Guia completo para adicionar suporte a novos tipos de CNAB
- [Adicionando Novos Campos CNAB](docs/adicionar-campos-cnab.md) - Como configurar e adicionar campos personalizados ao gerador CNAB
- [Adicionando Novos Campos CSV](docs/adicionar-campos-csv.md) - Como configurar e adicionar campos personalizados ao gerador CSV
- [Estendendo o Desconstrutor CNAB](docs/estender-desconstrutor-cnab.md) - Como adicionar novos tipos de linha, funcionalidades e componentes ao desconstrutor

### Arquitetura
- [Estrutura do Gerador CNAB](docs/estrutura-cnab.md) - Diagrama e explicação da arquitetura do gerador CNAB
- [Estrutura do Gerador CSV](docs/estrutura-csv.md) - Diagrama e explicação da arquitetura do gerador CSV
- [Estrutura do Validador CNAB](docs/estrutura-validador-cnab.md) - Fluxograma completo do processo de validação de arquivos CNAB
- [Estrutura do Desconstrutor CNAB](docs/estrutura-desconstrutor-cnab.md) - Arquitetura completa com componentes, scripts e fluxo de dados
- [Mapeamento de Componentes do Desconstrutor](docs/mapeamento-componentes-desconstrutor.md) - Árvore de componentes, fluxo de dados e comunicação entre componentes


