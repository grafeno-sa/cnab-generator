# Adicionando Novos Campos CNAB

## Visão Geral
Os campos de CNAB Cobrança são configuráveis e organizados por tipo de registro. Este guia explica como adicionar novos campos ao gerador CNAB.

## Localização dos Campos

Os campos de CNAB Cobrança estão presentes no arquivo:
```
src/scripts/CNAB/lineFields.js
```

## Estrutura dos Campos

Os campos estão organizados por tipo de registro:

```javascript
const fields = {
  header: HEADER_FIELDS,
  registro1: REGISTRO1_FIELDS,
  registro2: REGISTRO2_FIELDS,
  registro3: REGISTRO3_FIELDS,
  registro7: REGISTRO7_FIELDS,
  trailer: TRAILER_FIELDS
}
```

### Tipos de Registro

- **header**: Linha de cabeçalho do arquivo (primeira linha)
- **registro1**: Registro tipo 1 (dados principais)
- **registro2**: Registro tipo 2 (dados complementares)
- **registro3**: Registro tipo 3 (informações adicionais)
- **registro7**: Registro tipo 7 (registro específico)
- **trailer**: Linha de trailer do arquivo (última linha)

## Formato de um Campo

Cada constante em `fields` é um array de objetos seguindo este formato:

```javascript
const TRAILER_FIELDS = [
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: ({ generatedLines }) => generatedLines.length + 2,
    maxLength: 6,
    paddingType: '0'
  }
]
```

### Propriedades do Campo

| Propriedade | Tipo | Descrição | Exemplo |
|-------------|------|-----------|---------|
| `name` | String | ID único do campo (sem espaços, camelCase) | `'serialNumber'` |
| `description` | String | Descrição que aparecerá na UI | `'Número sequencial'` |
| `startIndex` | Number | Posição inicial conforme layout CNAB | `439` |
| `endIndex` | Number | Posição final conforme layout CNAB | `444` |
| `defaultValue` | Function | Função que retorna o valor padrão (string) | `() => '000001'` |
| `maxLength` | Number | Quantidade de caracteres do campo | `6` |
| `paddingType` | String | Tipo de preenchimento: `'0'` ou `' '` (espaço) | `'0'` |

### Cálculo de `maxLength`

```javascript
maxLength = endIndex - startIndex + 1
```

Por exemplo, se `startIndex = 439` e `endIndex = 444`:
```javascript
maxLength = 444 - 439 + 1 = 6
```

## Adicionando um Novo Campo

### Passo 1: Identificar o Registro

Escolha o tipo de registro ao qual deseja adicionar o campo:
- `HEADER_FIELDS`
- `REGISTRO1_FIELDS`
- `REGISTRO2_FIELDS`
- `REGISTRO3_FIELDS`
- `REGISTRO7_FIELDS`
- `TRAILER_FIELDS`

### Passo 2: Consultar o Layout de Referência

Verifique o layout oficial do CNAB para obter:
- Posição inicial (startIndex)
- Posição final (endIndex)
- Tipo de preenchimento (numérico com zeros ou alfanumérico com espaços)

### Passo 3: Adicionar o Campo

Adicione um novo objeto ao array correspondente em `src/scripts/CNAB/lineFields.js`:

```javascript
const REGISTRO1_FIELDS = [
  // ... campos existentes ...
  {
    name: 'novoCAMPO',
    description: 'Descrição do Novo Campo',
    startIndex: 100,  // Conforme layout
    endIndex: 109,    // Conforme layout
    defaultValue: () => '',  // Valor padrão
    maxLength: 10,    // 109 - 100 + 1
    paddingType: ' '  // Espaço para alfanumérico, '0' para numérico
  }
]
```

## Exemplos Práticos

### Exemplo 1: Campo Numérico com Zeros à Esquerda

```javascript
{
  name: 'codigoBanco',
  description: 'Código do Banco',
  startIndex: 1,
  endIndex: 3,
  defaultValue: () => '274',
  maxLength: 3,
  paddingType: '0'  // Preenche com zeros: "274"
}
```

### Exemplo 2: Campo Alfanumérico com Espaços à Direita

```javascript
{
  name: 'nomeEmpresa',
  description: 'Nome da Empresa',
  startIndex: 47,
  endIndex: 76,
  defaultValue: () => 'EMPRESA EXEMPLO',
  maxLength: 30,
  paddingType: ' '  // Preenche com espaços: "EMPRESA EXEMPLO               "
}
```

### Exemplo 3: Campo com Valor Dinâmico

```javascript
{
  name: 'dataGeracao',
  description: 'Data de Geração do Arquivo',
  startIndex: 95,
  endIndex: 100,
  defaultValue: () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = String(hoje.getFullYear()).slice(-2);
    return dia + mes + ano;  // Formato: DDMMAA
  },
  maxLength: 6,
  paddingType: '0'
}
```

### Exemplo 4: Campo que Depende de Linhas Geradas

```javascript
{
  name: 'quantidadeRegistros',
  description: 'Quantidade de Registros',
  startIndex: 18,
  endIndex: 25,
  defaultValue: ({ generatedLines }) => String(generatedLines.length),
  maxLength: 8,
  paddingType: '0'  // Será preenchido como "00000042" para 42 registros
}
```

## Tipos de Preenchimento

### Numérico (`paddingType: '0'`)
Preenche com zeros à esquerda:
```javascript
// maxLength = 6, valor = "123"
// Resultado: "000123"
```

### Alfanumérico (`paddingType: ' '`)
Preenche com espaços à direita:
```javascript
// maxLength = 10, valor = "TESTE"
// Resultado: "TESTE     "
```

## Função `defaultValue`

A função `defaultValue` recebe um objeto de contexto com informações úteis:

```javascript
defaultValue: ({ generatedLines, currentLine, fieldValues }) => {
  // generatedLines: Array com todas as linhas já geradas
  // currentLine: Linha atual sendo processada
  // fieldValues: Valores dos campos já processados na linha atual
  
  return 'valor calculado';
}
```

### Exemplos de Uso do Contexto

```javascript
// Número sequencial baseado em linhas geradas
defaultValue: ({ generatedLines }) => String(generatedLines.length + 1)

// Valor condicional baseado em outro campo
defaultValue: ({ fieldValues }) => {
  return fieldValues.tipoPessoa === 'PJ' ? '00000000000000' : '00000000000';
}
```

## Validação e Testes

Após adicionar um novo campo:

1. **Verifique o Layout**: Confirme que `startIndex`, `endIndex` e `maxLength` estão corretos
2. **Teste a Geração**: Gere um arquivo CNAB e verifique se o campo aparece na posição correta
3. **Valide o Formato**: Certifique-se de que o padding está sendo aplicado corretamente
4. **Teste Valores Dinâmicos**: Se usar `generatedLines` ou `fieldValues`, teste diferentes cenários

## Dicas Importantes

- ✅ **Sempre consulte o layout oficial** do banco/CNAB antes de adicionar campos
- ✅ **Use `camelCase`** para o nome do campo (ex: `numeroDocumento`, não `numero_documento`)
- ✅ **Calcule `maxLength` corretamente**: `endIndex - startIndex + 1`
- ✅ **Escolha o `paddingType` correto**: `'0'` para numérico, `' '` para alfanumérico
- ✅ **Retorne sempre string** na função `defaultValue`, mesmo para números
- ✅ **Teste com arquivos reais** para garantir compatibilidade

## Resumo

Para adicionar um novo campo CNAB:
1. ✅ Abra `src/scripts/CNAB/lineFields.js`
2. ✅ Escolha o array do tipo de registro (header, registro1, etc.)
3. ✅ Consulte o layout oficial para obter posições
4. ✅ Adicione o novo objeto com todas as propriedades
5. ✅ Teste a geração do arquivo CNAB

O campo será automaticamente incluído na UI e no processo de geração do arquivo!
