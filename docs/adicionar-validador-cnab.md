# Adicionando um Novo Validador CNAB

## Visão Geral
O validador CNAB foi projetado para ser extensível. Para adicionar suporte a um novo tipo de CNAB (como CNAB 240), siga estes passos:

## Passo 1: Adicionar Constantes de ID de Linha

Atualize `src/scripts/CNAB/lineId.js` para incluir a configuração do novo tipo de CNAB:

```javascript
export const LINE_IDS = {
  400: {
    TRAILER: '9',
    HEADER: '0',
    VALID_REGISTERS: ['1', '2', '3', '7'],
    REQUIRES_REGISTER_1: ['2', '3', '7'],
  },
  240: {
    TRAILER: '9',
    HEADER: '0',
    VALID_REGISTERS: ['1', '3', '5'],  // Defina os IDs de registro válidos para CNAB 240
    REQUIRES_REGISTER_1: ['3', '5'],   // Defina quais registros precisam de um registro 1 precedente
  },
};
```

**Propriedades Principais:**
- `TRAILER`: Caractere que identifica a linha de trailer (geralmente '9')
- `HEADER`: Caractere que identifica a linha de header (geralmente '0')
- `VALID_REGISTERS`: Array de caracteres de ID de registro válidos para linhas intermediárias
- `REQUIRES_REGISTER_1`: Array de IDs de registro que devem ser precedidos por um registro '1'

## Passo 2: Criar a Página do Validador

Crie um novo arquivo de página: `src/pages/Cnab240Validator.jsx`

```jsx
import { useState } from 'react';
import { Toast } from '../vendors/swal/toast';
import FileUpload from '../components/CNAB/FileUpload';
import ValidationResult from '../components/CNAB/validation/Result';
import ValidationRules from '../components/CNAB/validation/Rules';
import CnabValidator from '../components/CNAB/Validator';
import '../styles/components/CnabValidator.css';

function Cnab240Validator() {
  const [validationResult, setValidationResult] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileLoaded = (content) => {
    try {
      // Chama o validador com o tipo CNAB '240' e tamanhos de linha esperados [240]
      const result = CnabValidator(content, '240', [240]);
      setValidationResult(result);

      if (result.isValid) {
        Toast.fire({
          icon: 'success',
          title: 'Arquivo CNAB 240 válido!',
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Arquivo CNAB 240 inválido',
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Erro ao validar arquivo',
        text: error.message,
      });
    }
  };

  const validationRules = [
    'O arquivo deve ter extensão .txt ou .rem',
    'Todas as linhas devem ter exatamente 240 caracteres',
    'A primeira linha (header) deve começar com "0"',
    'A última linha (trailer) deve começar com "9"',
    'Todas as linhas intermediárias devem ter um ID de registro válido',
    'Registros específicos devem ser precedidos por um registro "1"',
    'Registros não podem repetir (exceto registro "1")',
  ];

  return (
    <div className="container">
      <h2 className="text-center">Validador de CNAB 240</h2>

      <FileUpload
        onFileLoaded={handleFileLoaded}
        fileName={fileName}
        setFileName={setFileName}
      />

      {validationResult && <ValidationResult result={validationResult} />}

      <ValidationRules rules={validationRules} />
    </div>
  );
}

export default Cnab240Validator;
```

**Parâmetros Principais:**
- `CnabValidator(content, '240', [240])`:
  - Primeiro parâmetro: conteúdo do arquivo
  - Segundo parâmetro: tipo de CNAB ('240')
  - Terceiro parâmetro: array de tamanhos de linha válidos ([240])

## Passo 3: Adicionar Rota

Atualize `src/App.jsx` para incluir a nova rota:

```jsx
import Cnab240Validator from './pages/Cnab240Validator';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Cnab />} />
        <Route path="/csv" element={<Csv />} />
        <Route path="/validate" element={<Cnab400Validator />} />
        <Route path="/validate240" element={<Cnab240Validator />} />
      </Route>
    </Routes>
  );
}
```

## Passo 4: Adicionar Link de Navegação

Atualize `src/components/Navbar.jsx` para adicionar um link para o novo validador:

```jsx
<nav>
  <NavLink to="/">Gerar CNAB</NavLink>
  <NavLink to="/csv">Gerar CSV</NavLink>
  <NavLink to="/validate">Validar CNAB 400</NavLink>
  <NavLink to="/validate240">Validar CNAB 240</NavLink>
</nav>
```

## Passo 5: Personalizar Regras de Validação (Opcional)

Se o CNAB 240 tiver requisitos de validação diferentes, você pode modificar o array `validationRules` na sua página para refletir as regras específicas daquele tipo de CNAB.

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                   Cnab240Validator.jsx                  │
│  (Página que usa os componentes reutilizáveis)          │
│  - Chama CnabValidator('240', [240])                    │
│  - Exibe os resultados da validação                     │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┴──────────┬──────────────────┐
        │                    │                  │
┌───────▼──────┐  ┌─────────▼────────┐  ┌─────▼─────────┐
│ FileUpload   │  │ CnabValidator    │  │ Componentes   │
│ (Componente) │  │ (Lógica Central) │  │ de Validação  │
│              │  │ - Lê lineId.js   │  │ - Result      │
│              │  │ - Valida         │  │ - Rules       │
└──────────────┘  └──────────────────┘  └───────────────┘
```

## Testando Seu Novo Validador

1. Inicie o servidor de desenvolvimento: `npm run dev`
2. Navegue para `/#/validate240`
3. Faça upload de um arquivo CNAB 240 (.txt ou .rem)
4. Verifique se todas as validações funcionam corretamente

## Resumo

Para adicionar um novo validador CNAB:
1. ✅ Adicionar constantes em `src/scripts/CNAB/lineId.js`
2. ✅ Criar novo componente de página
3. ✅ Adicionar rota em `App.jsx`
4. ✅ Adicionar link de navegação em `Navbar.jsx`
5. ✅ Testar o validador

O componente principal `CnabValidator` lida com toda a lógica automaticamente com base na configuração que você fornece!
