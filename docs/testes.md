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
    replaceSubstring.test.js           # Testes da função base de escrita no buffer
    CNAB/
      lineFields.test.js               # Invariantes e snapshots dos campos
      contentFormatter.test.js         # Integração: formatação de linhas
      lineFactory.ourNumber.test.js    # Geração do NN (gerarNN/multicedente) na criação da linha
      ourNumberGenerator.test.js       # Cálculo de base + dígito verificador (Vortx/BMP)
      assignorDistributor.test.js      # Distribuição de cedentes entre registro1 (Multicedente)
      headerBankRecalculator.test.js   # Recálculo do NN quando o banco do header muda
      lineGenerationValidator.test.js  # Regras de sequência e unicidade de header/trailer
      cnabDefaultFlow.test.js          # Integração: gerar só registro1 e baixar (fluxo padrão)
      __snapshots__/
        lineFields.test.js.snap        # Snapshots gerados automaticamente (não editar à mão)
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

### `lineFactory.ourNumber.test.js`

Testa o `defaultValue` do campo `ourNumber` do `registro1` na criação da linha, conforme `gerarNN`/`multicedente`.

Cobre:
- Fica em branco quando `gerarNN` é `false` ou `settings` não é informado
- Sem Multicedente, usa o banco do header (BMP por padrão, Vortx quando `header.bankNumber` é `310`)
- Com Multicedente, usa o `numBancoCobrador` da própria linha, ignorando o banco do header

### `ourNumberGenerator.test.js`

Testa o cálculo de base + dígito verificador do Nosso Número, replicando o algoritmo Ruby de produção (`Boletos::Vortx::Helper` / `Boletos::Bmp::Helper`, grafeno-pagamentos) contra vetores conhecidos.

Cobre:
- `vortxCheckDigit` e `bmpCheckDigit` batem com os vetores de referência
- A faixa numérica da base respeita o banco (`310` = Vortx, `274`/default = BMP)
- Deduplicação de base contra `generatedLines` já existentes

### `assignorDistributor.test.js`

Testa a distribuição de cedentes entre as linhas `registro1` no modo Multicedente (`AssignorEditor` → "Aplicar distribuição multicedente").

Cobre:
- Validação (cedente obrigatório, conta preenchida, ao menos 1 `registro1` por cedente)
- Blocos contíguos e do mesmo tamanho, com a sobra da divisão inteira no último bloco
- Recalcula `ourNumber` de cada linha redistribuída quando `gerarNN` está ativo

### `headerBankRecalculator.test.js`

Testa o recálculo automático do `ourNumber` das linhas `registro1` já geradas quando o banco do header é alterado depois (fora do Multicedente, onde o banco vem da própria linha).

Cobre:
- Regenera o NN de toda linha `registro1` que já tinha um valor, usando o novo `bankCode`
- Não mexe em linhas `registro1` sem NN nem em linhas de outros tipos
- Evita colisão de base entre as linhas recalculadas

### `lineGenerationValidator.test.js`

Testa as regras de sequência de `LineGenerationValidator` (usado por `LineGenerator.jsx` antes de gerar qualquer linha).

Cobre:
- `registro2`/`registro3`/`registro7` exigem um `registro1` precedente
- Um tipo não pode repetir logo após si mesmo, exceto `registro1`
- Header e trailer só podem existir uma vez no arquivo, mesmo com `registro1` entre as tentativas
- Header/trailer podem ser adicionados de novo depois que o existente é removido

### `cnabDefaultFlow.test.js`

Teste de integração do fluxo mais comum do gerador: adicionar só `registro1` (sem header/trailer manual) e baixar. Existe especificamente para não regredir com mudanças no validator (ex.: a unicidade de header/trailer).

Cobre:
- `registro1` pode ser a primeira linha gerada, sem precisar de header
- Múltiplas linhas de `registro1` em sequência continuam válidas
- `ContentFormatter` injeta header e trailer automaticamente no arquivo final

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
