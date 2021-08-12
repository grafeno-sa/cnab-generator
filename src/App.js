import React, { useState } from 'react'
import { generate } from 'gerador-validador-cpf'
import faker from 'faker'

const App = (props) => {
  const [fundDocument, setFundDocument] = useState(props.fundDocument);
  const [operationType, setOperationType] = useState(props.operationType);
  const [acquisitions, setAcquisitions] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [chargeSettlements, setChargeSettlements] = useState([]);
  const [repurchases, setRepurchases] = useState([]);
  const [largeCnabModeEnabled, setLargeCnabModeEnabled] = useState(false);

  const formProps = {
    acquisition: {
      operations: acquisitions,
      setOperations: setAcquisitions,
      largeCnabModeEnabled: largeCnabModeEnabled,
      setLargeCnabModeEnabled: setLargeCnabModeEnabled,
      fields: ACQUISITION_FIELDS,
      bodyLineTemplate: ACQUISITION_BODY_LINE_TEMPLATE,
      headerLineTemplate: DEFAULT_HEADER_LINE_TEMPLATE,
    },
    settlement: {
      acquisitions: acquisitions,
      operations: settlements,
      setOperations: setSettlements,
      largeCnabModeEnabled: largeCnabModeEnabled,
      setLargeCnabModeEnabled: setLargeCnabModeEnabled,
      fields: SETTLEMENT_FIELDS,
      bodyLineTemplate: SETTLEMENT_BODY_LINE_TEMPLATE,
      headerLineTemplate: DEFAULT_HEADER_LINE_TEMPLATE,
    },
    chargeSettlement: {
      acquisitions: acquisitions,
      operations: chargeSettlements,
      setOperations: setChargeSettlements,
      largeCnabModeEnabled: largeCnabModeEnabled,
      setLargeCnabModeEnabled: setLargeCnabModeEnabled,
      fields: CHARGE_SETTLEMENT_FIELDS,
      bodyLineTemplate: CHARGE_SETTLEMENT_BODY_LINE_TEMPLATE,
      headerLineTemplate: DEFAULT_HEADER_LINE_TEMPLATE,
    },
    repurchase: {
      operations: repurchases,
      setOperations: setRepurchases,
      largeCnabModeEnabled: largeCnabModeEnabled,
      setLargeCnabModeEnabled: setLargeCnabModeEnabled,
      fields: REPURCHASE_FIELDS,
      bodyLineTemplate: REPURCHASE_BODY_LINE_TEMPLATE,
      headerLineTemplate: DEFAULT_HEADER_LINE_TEMPLATE,
    },
  };

  return (
    <div>
      <fieldset>
        <legend>Informações da remessa</legend>
        <div>
          <label>CNPJ do fundo</label>
          <input
            type="text"
            value={fundDocument}
            onChange={(e) => setFundDocument(e.target.value)}
            maxLength={14}
          />
        </div>
        <div>
          <label>Tipo da remessa</label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
          >
            <option value={ACQUISITION}>Aquisição</option>
            <option value={SETTLEMENT}>Baixa</option>
            <option value={CHARGE_SETTLEMENT}>Baixa (cobrança)</option>
            <option value={REPURCHASE}>Recompra</option>
          </select>
        </div>
      </fieldset>
      {operationType && (
        <FormBatchOperations
          {...formProps[operationType]}
          operationType={operationType}
          fundDocument={fundDocument}
        />
      )}
    </div>
  );
};

const FormBatchOperations = (props) => {
  const updateOperation = (props, operationIndex, fieldName, value) => {
    const newOperations = props.operations.slice();

    newOperations[operationIndex][fieldName] = value;

    props.setOperations(newOperations);
  };

  const removeOperation = (operationIndex) => {
    let operationsCopy = props.operations.slice();

    delete operationsCopy[operationIndex];

    props.setOperations(operationsCopy.flat(0));
  };

  const formatCnabContent = () => {
    const fundField = HEADER_FIELDS[0];
    const fundDocumentSliceSize = fundField.endIndex - fundField.startIndex + 1;
    const formattedFundDocument = props.fundDocument.padStart(
      fundDocumentSliceSize,
      "0"
    );
    const header = props.headerLineTemplate.replaceAt(
      fundField.startIndex - 1,
      formattedFundDocument
    );
    const body = props.operations.map((operation) => {
      let formattedLine = props.bodyLineTemplate;

      props.fields.forEach((field) => {
        const sliceSize = field.endIndex - field.startIndex + 1;
        const formattedValue = (operation[field.name] || "").padStart(
          sliceSize,
          "0"
        );

        formattedLine = formattedLine.replaceAt(
          field.startIndex - 1,
          formattedValue
        );
      });

      return formattedLine;
    });

    return [header, ...body, DEFAULT_FOOTER_LINE_TEMPLATE].join("\n");
  };

  return (
    <fieldset>
      <legend>Informações da remessa - Aquisição</legend>
      <div>
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 1)
          }
        >
          Adicionar 1 linha
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 10)
          }
        >
          Adicionar 10 linhas
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 100)
          }
        >
          Adicionar 100 linhas
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 1000)
          }
        >
          Adicionar 1.000 linhas
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 10000)
          }
        >
          Adicionar 10.000 linhas
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 25000)
          }
        >
          Adicionar 25.000 linhas
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 50000)
          }
        >
          Adicionar 50.000 linhas
        </button>
        <br />
        <button
          onClick={() =>
            createOperation(props, props.operations, props.setOperations, props.setLargeCnabModeEnabled, 100000)
          }
        >
          Adicionar 100.000 linhas
        </button>
      </div>
      <hr />
      <div>
        <button onClick={() => downloadAsTxt(props, formatCnabContent())}>
          Baixar CNAB
        </button>
      </div>
      <hr />
      {
        props.largeCnabModeEnabled && (
        	<p>Desliguei o preview para CNABs muito grandes para não travar o navegador, mas o botão de download ainda funciona, só clicar alí :)</p>
        )
      }
      {
        !props.largeCnabModeEnabled && (
          <div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Linha</th>
                  {props.fields.map((field, index) => (
                    <th key={index}>{field.description}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.operations.map((operation, index) =>
                  renderOperationForm(
                    props,
                    operation,
                    index,
                    updateOperation,
                    removeOperation
                  )
                )}
              </tbody>
            </table>
            <textarea
              key={new Date().getTime()}
              style={{
                width: "100%",
                height: "200px",
                whiteSpace: "nowrap",
                overflow: "auto",
              }}
              value={formatCnabContent()}
              onChange={() => {}}
            />
          </div>
        )
      }
    </fieldset>
  );
};

const renderOperationForm = (
  props,
  operation,
  operationIndex,
  updateOperation,
  removeOperation
) => {
  return (
    <tr key={operationIndex}>
      <td>
        <button onClick={() => removeOperation(operationIndex)}>Remover</button>
      </td>
      <td style={{ textAlign: "center" }}>{operationIndex + 1}</td>
      {props.fields.map((field) =>
        renderOperationFormField(
          props,
          operation,
          operationIndex,
          updateOperation,
          field
        )
      )}
    </tr>
  );
};

const renderOperationFormField = (
  props,
  operation,
  operationIndex,
  updateOperation,
  field
) => {
  const key = `${operationIndex}-${field.name}`;
  return (
    <td key={key}>
      {field.options ? (
        <select
          value={operation[field.name]}
          onChange={(e) =>
            updateOperation(props, operationIndex, field.name, e.target.value)
          }
        >
          {field.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.description}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          maxLength={field.maxLength}
          value={operation[field.name]}
          onChange={(e) =>
            updateOperation(props, operationIndex, field.name, e.target.value)
          }
        />
      )}
    </td>
  );
};

const createOperation = (
  props,
  operations,
  setOperations,
  setLargeCnabModeEnabled,
  count = 1,
  autoFill = true
) => {
  let newOperations = [];

  for (let i = 0; i < count; i++) {
    let newOperation = {};

    props.fields.forEach((field) => {
      newOperation[field.name] = autoFill
        ? typeof field.defaultValue === "function"
          ? field.defaultValue({ props: props, index: i })
          : field.defaultValue
        : undefined;
    });

    newOperations.push(newOperation);
  }

  setLargeCnabModeEnabled(count > 1000);
  setOperations([...operations, ...newOperations]);
};

const HEADER_FIELDS = [
  {
    name: "documentoFundo",
    description: "CNPJ do fundo",
    startIndex: 27,
    endIndex: 46,
    defaultValue: "02968340000489",
    maxLength: 14,
  },
];

const ACQUISITION_FIELDS = [
  {
    name: "numeroDocumentoRecebivel",
    description: "No de controle do participante",
    startIndex: 38,
    endIndex: 62,
    defaultValue: (_options) => faker.random.alphaNumeric(25),
    maxLength: 25,
  },
  {
    name: "cnpjCedente",
    description: "CNPJ do cedente",
    startIndex: 381,
    endIndex: 394,
    defaultValue: "47586383000438",
    maxLength: 14,
  },
  {
    name: "coObrigacao",
    description: "Co-obrigação",
    startIndex: 21,
    endIndex: 22,    
    defaultValue: "01",
    options: [
      {
        value: "01",
        description: "Com co-obrigação",
      },
      {
        value: "02",
        description: "Sem co-obrigação",
      }
    ],
    maxLength: 2,
  },
  {
    name: "tipoRecebivel",
    description: "Tipo do recebível",
    startIndex: 148,
    endIndex: 149,    
    defaultValue: "01",
    options: [
      {
        value: "01",
        description: "Duplicata",
      },
      {
        value: "51",
        description: "Cheque",
      },
      {
        value: "60",
        description: "Contrato",
      },
      {
        value: "30",
        description: "CCB",
      },
      {
        value: "02",
        description: "Nota promissória",
      },
      {
        value: "65",
        description: "Fatura",
      }
    ],
    maxLength: 2,
  },
  {
    name: "documentoSacado",
    description: "CPF/CNPJ do sacado",
    startIndex: 221,
    endIndex: 234,
    defaultValue: (_options) => generate(),
    maxLength: 14,
  },
  {
    name: "dataEmissao",
    description: "Data de emissão - dd/mm/yy",
    startIndex: 151,
    endIndex: 156,
    defaultValue: "010121",
    maxLength: 6,
  },
  {
    name: "dataVencimento",
    description: "Data de vencimento - dd/mm/yyy",
    startIndex: 121,
    endIndex: 126,
    defaultValue: "010122",
    maxLength: 6,
  },
  {
    name: "valorAquisicao",
    description: "Valor de aquisição",
    startIndex: 193,
    endIndex: 205,
    defaultValue: "90000",
    maxLength: 13,
  },
  {
    name: "valorNominal",
    description: "Valor nominal",
    startIndex: 127,
    endIndex: 139,
    defaultValue: "100000",
    maxLength: 13,
  },
  {
    name: "identificacaoOcorrencia",
    description: "Ocorrência",
    startIndex: 109,
    endIndex: 110,
    defaultValue: "01",
    maxLength: 2,
  },
];

const SETTLEMENT_FIELDS = [
  {
    name: "numeroDocumentoRecebivel",
    description: "No de controle do participante",
    startIndex: 38,
    endIndex: 62,
    defaultValue: (options) => {
      const matchingAcquisition = options.props.acquisitions[options.index];
      return matchingAcquisition
        ? matchingAcquisition.numeroDocumentoRecebivel
        : "";
    },
    maxLength: 25,
  },
  {
    name: "valorPago",
    description: "Valor pago",
    startIndex: 83,
    endIndex: 92,
    defaultValue: "100000",
    maxLength: 10,
  },
  {
    name: "valorAbatimento",
    description: "Valor de abatimento",
    startIndex: 206,
    endIndex: 218,
    defaultValue: "0",
    maxLength: 13,
  },
  {
    name: "identificacaoOcorrencia",
    description: "Ocorrência",
    startIndex: 109,
    endIndex: 110,
    defaultValue: "02",
    options: [
      {
        value: "02",
        description: "Baixa total",
      },
      {
        value: "14",
        description: "Baixa parcial",
      },
    ],
    maxLength: 2,
  },
];

const CHARGE_SETTLEMENT_FIELDS = [
  {
    name: "numeroDocumentoRecebivel",
    description: "No de controle do participante",
    startIndex: 38,
    endIndex: 62,
    defaultValue: (options) => {
      const matchingAcquisition = options.props.acquisitions[options.index];
      return matchingAcquisition
        ? matchingAcquisition.numeroDocumentoRecebivel
        : "";
    },
    maxLength: 25,
  },
  {
    name: "valorPago",
    description: "Valor pago",
    startIndex: 83,
    endIndex: 92,
    defaultValue: "100000",
    maxLength: 10,
  },
  {
    name: "valorAbatimento",
    description: "Valor de abatimento",
    startIndex: 206,
    endIndex: 218,
    defaultValue: "0",
    maxLength: 13,
  },
];

const REPURCHASE_FIELDS = [
  {
    name: "numeroDocumentoRecebivel",
    description: "No de controle do participante",
    startIndex: 38,
    endIndex: 62,
    defaultValue: (_options) => faker.random.alphaNumeric(25),
    maxLength: 25,
  },
  {
    name: "identificacaoOcorrencia",
    description: "Ocorrência",
    startIndex: 109,
    endIndex: 110,
    defaultValue: "84",
    options: [
      {
        value: "84",
        description: "Aquisição",
      },
      {
        value: "72",
        description: "Baixa parcial",
      },
      {
        value: "74",
        description: "Baixa total",
      },
    ],
    maxLength: 2,
  },
  {
    name: "cnpjCedente",
    description: "CNPJ do cedente",
    startIndex: 381,
    endIndex: 394,
    defaultValue: "47586383000438",
    maxLength: 14,
  },
  {
    name: "documentoSacado",
    description: "CPF/CNPJ do sacado",
    startIndex: 221,
    endIndex: 234,
    defaultValue: (_options) => generate(),
    maxLength: 14,
  },
  {
    name: "dataEmissao",
    description: "Data de emissão - dd/mm/yy",
    startIndex: 151,
    endIndex: 156,
    defaultValue: "010121",
    maxLength: 6,
  },
  {
    name: "dataVencimento",
    description: "Data de vencimento - dd/mm/yyy",
    startIndex: 121,
    endIndex: 126,
    defaultValue: "010122",
    maxLength: 6,
  },
  {
    name: "valorAquisicao",
    description: "Valor de aquisição",
    startIndex: 193,
    endIndex: 205,
    defaultValue: "0",
    maxLength: 13,
  },
  {
    name: "valorNominal",
    description: "Valor nominal",
    startIndex: 127,
    endIndex: 139,
    defaultValue: "0",
    maxLength: 13,
  },
  {
    name: "valorPago",
    description: "Valor pago",
    startIndex: 83,
    endIndex: 92,
    defaultValue: "0",
    maxLength: 10,
  },
  {
    name: "valorAbatimento",
    description: "Valor de abatimento",
    startIndex: 206,
    endIndex: 218,
    defaultValue: "0",
    maxLength: 13,
  },
];

const DEFAULT_HEADER_LINE_TEMPLATE =
  "01REMESSA01COBRANCA       00000002968340000489ATLANTA FUNDO INV EM DIR CRED 611PAULISTA S.A.  280420        MX0000030                                                                                                                                                                                                                                                                    00000000000000                                               000001";

// eslint-disable-next-line no-unused-vars
const CHARGE_HEADER_LINE_TEMPLATE =
  "02RETORNO01COBRANCA       00000002968340000489ATLANTA FUNDO DE INVESTIMENTO 237BRADESCO       2812200160000002657                                                                                                                                                                                                                                                                          291220         000001";

const ACQUISITION_BODY_LINE_TEMPLATE =
  "1                   01000301010101C 0226280/0009              0000000000000000000000004129490 280420     0  01006799300123053000000004224590000000001 23042000002            226280             000000001111100000000000000223045934000145VM PARRAS   ME                          RUA DO CACAU   225                      00006799300513454203INTERCOFFEE COM E IND LTDA                    4758638300043835200447586383000438550050000679931100064517000002";

const SETTLEMENT_BODY_LINE_TEMPLATE =
  "1                   01000301010101C 0226280/0009              0000000000000000000000004129490 280420     0  02006799300123053000000004224590000000001 23042000002            226280             000000001111100000000000000223045934000145VM PARRAS   ME                          RUA DO CACAU   225                      00006799300513454203INTERCOFFEE COM E IND LTDA                    4758638300043835200447586383000438550050000679931100064517000002";

const CHARGE_SETTLEMENT_BODY_LINE_TEMPLATE =
  "1                   01000301010101C 0226280/0009              0000000000000000000000004129490 280420     0  02006799300123053000000004224590000000001 23042000002            226280             000000001111100000000000000223045934000145VM PARRAS   ME                          RUA DO CACAU   225                      00006799300513454203INTERCOFFEE COM E IND LTDA                    47586383000438000002";

const REPURCHASE_BODY_LINE_TEMPLATE =
  "1                   01000301010101C 0226280/0009              0000000000000000000000004129490 280420     0  02006799300123053000000004224590000000001 23042000002            226280             000000001111100000000000000223045934000145VM PARRAS   ME                          RUA DO CACAU   225                      00006799300513454203INTERCOFFEE COM E IND LTDA                    47586383000438000002";

const DEFAULT_FOOTER_LINE_TEMPLATE =
  "9                                                                                                                                                                                                                                                                                                                                                                                                                                                     000018";

const ACQUISITION = "acquisition";

const SETTLEMENT = "settlement";

const CHARGE_SETTLEMENT = "chargeSettlement";

const REPURCHASE = "repurchase";

const translateOperationName = (operation) => {
	let nameDictionary = {}
  
  nameDictionary[ACQUISITION] = 'aquisição';
  nameDictionary[SETTLEMENT] = 'baixa';
  nameDictionary[CHARGE_SETTLEMENT] = 'baixa_por_cobrança';
  nameDictionary[REPURCHASE] = 'recompra';
  
  return nameDictionary[operation];
}

const downloadAsTxt = (props, text) => {
  const element = document.createElement("a");
	const operationName = translateOperationName(props.operationType)
  const fileName = `${new Date().getTime()} - cnab_${operationName} - ${props.operations.length} linhas.txt`

	element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

// eslint-disable-next-line no-extend-native
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

export default App