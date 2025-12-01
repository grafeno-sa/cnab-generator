# Adicionando Novos Campos CSV

## Visão Geral
Os campos de geração de CSV são configuráveis e organizados por categoria. Este guia explica como adicionar novos campos ao gerador CSV.

## Localização dos Campos

Os campos de CSV estão presentes no arquivo:
```
src/scripts/CSV/lineFields.js
```

## Categorias de Campos

Os campos estão classificados em 3 categorias:

| Categoria | Descrição | Exemplo de Campos |
|-----------|-----------|-------------------|
| `payer` | Dados do pagador | Nome, CPF/CNPJ, Endereço |
| `grantor` | Dados do sacador avalista | Nome, CPF/CNPJ |
| `asset` | Dados da cobrança/título | Valor, Vencimento, Número do documento |

## Estrutura dos Campos

A constante `CSV_LINE_FIELDS` é um array de objetos seguindo este formato:

```javascript
const CSV_LINE_FIELDS = [
  {
    name: 'nome',
    description: 'Nome pagador',
    defaultValue: () => 'Pagador Aleatório',
    category: 'payer',
  }
]
```

### Propriedades do Campo

| Propriedade | Tipo | Descrição | Exemplo |
|-------------|------|-----------|---------|
| `name` | String | ID da coluna conforme layout (único) | `'nome'` |
| `description` | String | Descrição que aparecerá na UI | `'Nome pagador'` |
| `defaultValue` | Function | Função que retorna o valor padrão (string) | `() => 'João Silva'` |
| `category` | String | Categoria do campo: `'payer'`, `'grantor'` ou `'asset'` | `'payer'` |

## Adicionando um Novo Campo

### Passo 1: Identificar a Categoria

Escolha a categoria apropriada para o campo:
- **`payer`**: Informações sobre quem vai pagar (devedor)
- **`grantor`**: Informações sobre o sacador avalista (garantidor)
- **`asset`**: Informações sobre o título/cobrança em si

### Passo 2: Consultar o Layout de Referência

Verifique o layout oficial do CSV para obter:
- Nome da coluna (deve ser exatamente como no layout)
- Tipo de dado esperado
- Formato dos dados

### Passo 3: Adicionar o Campo

Adicione um novo objeto ao array `CSV_LINE_FIELDS` em `src/scripts/CSV/lineFields.js`:

```javascript
const CSV_LINE_FIELDS = [
  // ... campos existentes ...
  {
    name: 'novaColuna',
    description: 'Descrição da Nova Coluna',
    defaultValue: () => 'valor padrão',
    category: 'payer', // ou 'grantor' ou 'asset'
  }
]
```

## Exemplos Práticos

### Exemplo 1: Campo de Pagador (Payer)

```javascript
{
  name: 'emailPagador',
  description: 'Email do Pagador',
  defaultValue: () => 'pagador@exemplo.com',
  category: 'payer',
}
```

### Exemplo 2: Campo de Sacador Avalista (Grantor)

```javascript
{
  name: 'telefoneAvalista',
  description: 'Telefone do Avalista',
  defaultValue: () => '11999999999',
  category: 'grantor',
}
```

### Exemplo 3: Campo de Título/Cobrança (Asset)

```javascript
{
  name: 'numeroDocumento',
  description: 'Número do Documento',
  defaultValue: () => '000000001',
  category: 'asset',
}
```

### Exemplo 4: Campo com Data Dinâmica

```javascript
{
  name: 'dataEmissao',
  description: 'Data de Emissão',
  defaultValue: () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;  // Formato: DD/MM/AAAA
  },
  category: 'asset',
}
```

### Exemplo 5: Campo com Valor Numérico

```javascript
{
  name: 'valorTitulo',
  description: 'Valor do Título',
  defaultValue: () => '100.00',
  category: 'asset',
}
```

### Exemplo 6: Campo com CPF/CNPJ

```javascript
{
  name: 'cpfCnpjPagador',
  description: 'CPF/CNPJ do Pagador',
  defaultValue: () => '00000000000',
  category: 'payer',
}
```

## Categorias Detalhadas

### Categoria `payer` (Pagador)

Campos relacionados à pessoa ou empresa que deve efetuar o pagamento:

```javascript
// Exemplos de campos de pagador
{
  name: 'nome',
  description: 'Nome do Pagador',
  defaultValue: () => 'João Silva',
  category: 'payer',
},
{
  name: 'endereco',
  description: 'Endereço do Pagador',
  defaultValue: () => 'Rua Exemplo, 123',
  category: 'payer',
},
{
  name: 'cidade',
  description: 'Cidade do Pagador',
  defaultValue: () => 'São Paulo',
  category: 'payer',
}
```

### Categoria `grantor` (Sacador Avalista)

Campos relacionados ao garantidor ou avalista do título:

```javascript
// Exemplos de campos de sacador avalista
{
  name: 'nomeAvalista',
  description: 'Nome do Avalista',
  defaultValue: () => 'Empresa Avalista LTDA',
  category: 'grantor',
},
{
  name: 'cnpjAvalista',
  description: 'CNPJ do Avalista',
  defaultValue: () => '00000000000000',
  category: 'grantor',
}
```

### Categoria `asset` (Título/Cobrança)

Campos relacionados ao título de cobrança propriamente dito:

```javascript
// Exemplos de campos de título
{
  name: 'valorTitulo',
  description: 'Valor do Título',
  defaultValue: () => '1000.00',
  category: 'asset',
},
{
  name: 'dataVencimento',
  description: 'Data de Vencimento',
  defaultValue: () => '31/12/2025',
  category: 'asset',
},
{
  name: 'numeroDocumento',
  description: 'Número do Documento',
  defaultValue: () => '000001',
  category: 'asset',
}
```

## Função `defaultValue`

A função `defaultValue` deve sempre retornar uma string:

```javascript
// ✅ Correto - retorna string
defaultValue: () => '123'
defaultValue: () => 'texto'
defaultValue: () => String(numero)

// ❌ Incorreto - retorna número
defaultValue: () => 123
```

### Valores Dinâmicos

Você pode gerar valores dinâmicos na função `defaultValue`:

```javascript
// Data atual
defaultValue: () => {
  const hoje = new Date();
  return hoje.toLocaleDateString('pt-BR');
}

// Número aleatório
defaultValue: () => {
  return String(Math.floor(Math.random() * 10000));
}

// Valor condicional
defaultValue: () => {
  const tipo = Math.random() > 0.5 ? 'PF' : 'PJ';
  return tipo === 'PF' ? '00000000000' : '00000000000000';
}
```

## Ordenação dos Campos

Os campos aparecerão no CSV na ordem em que são definidos no array `CSV_LINE_FIELDS`. Para reordenar:

1. Consulte o layout de referência para a ordem correta
2. Reorganize os objetos no array conforme necessário

```javascript
const CSV_LINE_FIELDS = [
  // Primeiro campo (primeira coluna no CSV)
  { name: 'campo1', ... },
  
  // Segundo campo (segunda coluna no CSV)
  { name: 'campo2', ... },
  
  // Terceiro campo (terceira coluna no CSV)
  { name: 'campo3', ... },
]
```

## Validação e Testes

Após adicionar um novo campo:

1. **Verifique o Layout**: Confirme que o nome da coluna está correto
2. **Teste a Geração**: Gere um arquivo CSV e verifique se o campo aparece
3. **Valide o Formato**: Certifique-se de que o formato dos dados está correto
4. **Teste na UI**: Verifique se o campo aparece corretamente no formulário

## Diferenças entre CSV e CNAB

| Aspecto | CSV | CNAB |
|---------|-----|------|
| Posições fixas | ❌ Não | ✅ Sim (startIndex/endIndex) |
| Separador | ✅ Vírgula ou ponto-e-vírgula | ❌ Não tem |
| Padding | ❌ Não necessário | ✅ Necessário (paddingType) |
| maxLength | ❌ Não usado | ✅ Obrigatório |
| Categorias | ✅ payer/grantor/asset | ❌ Registros (header/1/2/3/7/trailer) |

## Dicas Importantes

- ✅ **Use o nome exato** da coluna conforme o layout de referência
- ✅ **Escolha a categoria correta** (payer, grantor ou asset)
- ✅ **Retorne sempre string** na função `defaultValue`
- ✅ **Mantenha a ordem** dos campos conforme o layout
- ✅ **Teste com importação** para garantir compatibilidade
- ✅ **Documente campos personalizados** se forem específicos do seu caso

## Resumo

Para adicionar um novo campo CSV:
1. ✅ Abra `src/scripts/CSV/lineFields.js`
2. ✅ Consulte o layout oficial para obter o nome da coluna
3. ✅ Escolha a categoria apropriada (payer, grantor ou asset)
4. ✅ Adicione o novo objeto com todas as propriedades
5. ✅ Teste a geração do arquivo CSV

O campo será automaticamente incluído na UI e no processo de geração do arquivo!
