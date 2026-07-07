# Testes

## Visão Geral

O projeto usa [Vitest](https://vitest.dev/) para testes unitários e de integração. Os testes rodam automaticamente antes de todo deploy — um deploy com testes falhando é abortado.

## Rodando os Testes

```sh
npm run test          # Executa todos os testes uma vez
npm run test -- -u    # Executa e atualiza snapshots desatualizados
```

## Estrutura dos Testes

```
src/
  scripts/
    replaceSubstring.test.js         # Testes da função base de escrita no buffer
    CNAB/
      lineFields.test.js             # Invariantes e snapshots dos campos
      contentFormatter.test.js       # Integração: formatação de linhas
      __snapshots__/
        lineFields.test.js.snap      # Snapshots gerados automaticamente (não editar à mão)
```

## Arquivos de Teste

### `replaceSubstring.test.js`

Testa a função que escreve valores em posições fixas da linha CNAB. É a operação mais primitiva do sistema — todos os campos dependem dela.

Cobre: substituição no início, meio e fim da string; char único; preservação do comprimento total.

### `lineFields.test.js`

Valida invariantes estruturais de **todos** os campos de **todos** os tipos de registro (header, registro1, registro2, registro3, registro7, trailer).

**Invariantes verificadas por campo:**

| Teste | O que verifica |
|-------|---------------|
| `maxLength === endIndex - startIndex + 1` | Range declarado bate com o tamanho real |
| `typeof defaultValue === 'function'` | Campo sempre tem um gerador de valor padrão |
| Sobreposição de posições | Nenhum campo sobrescreve outro no buffer |

**Snapshots de defaults estáticos:** captura o `defaultValue` de todos os campos não-dinâmicos. Falha se qualquer placeholder for alterado acidentalmente.

Campos excluídos dos snapshots (não-determinísticos):

| Campo | Motivo |
|-------|--------|
| `documentoSacado` | CNPJ aleatório |
| `documentoSacadorAvalista` | CNPJ aleatório |
| `dataVencimento` | Data atual |
| `valorTitulo` | `Math.random()` |
| `ourNumber` (registro3) | Depende de linhas geradas |

### `contentFormatter.test.js`

Testa a integração entre `lineFactory`, `lineFields` e `contentFormatter` — gera linhas reais e verifica o output formatado.

Cobre:
- Linhas formatadas têm exatamente **444 caracteres**
- Identificadores de tipo corretos (`0` = header, `1` = registro1, `9` = trailer)
- `format()` injeta header e trailer automaticamente quando ausentes
- Valores de campos específicos nas posições corretas (ex: `codigoInscricaoSacado` nas posições 219–220)

## Deploy e Testes

O script `predeploy` bloqueia o deploy se qualquer teste falhar:

```json
"predeploy": "npm run test && npm run build"
```

Ou seja: `npm run deploy` → `predeploy` → `test` → se ok, `build` → `gh-pages`.

## Adicionando Testes para Novos Campos

Ao adicionar um campo com `defaultValue` estático (valor fixo, não aleatório):

1. Rode `npm run test -- -u` para atualizar os snapshots
2. Verifique que o snapshot gerado em `__snapshots__/lineFields.test.js.snap` reflete o valor esperado
3. Commite o arquivo `.snap` junto com a mudança — ele faz parte do contrato de regressão

Se o campo tiver default dinâmico (random, data, depende de `generatedLines`), adicione o nome do campo ao `Set` `DYNAMIC_FIELDS` em `lineFields.test.js`.
