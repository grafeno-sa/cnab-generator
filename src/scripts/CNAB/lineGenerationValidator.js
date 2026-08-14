import { last as arrayLast, isEmpty } from 'lodash'

const LineGenerationValidator = () => {
  const essentialType = 'registro1'
  const cannotBeEmpty = ['registro2', 'registro3', 'registro7']
  const singleOccurrenceTypes = ['header', 'trailer']

  const emptyValidation = ({ type }) => {
    const isValid = !cannotBeEmpty.includes(type)
    return { valid: isValid, message: 'É necessário adicionar ao menos um registro do tipo 1' }
  }

  const typeValidation = ({ generatedLines, type }) => {
    const isEssencialType = arrayLast(generatedLines).type === essentialType
    const notSameTypeAsLastLine = arrayLast(generatedLines).type !== type
    const isValid = isEssencialType || notSameTypeAsLastLine

    return { valid: isValid, message: 'Não pode ser o mesmo tipo de registro que o último adicionado' }
  }

  // O arquivo CNAB só pode ter uma linha de header e uma de trailer;
  // ContentFormatter já assume isso (só gera header/trailer automaticamente
  // quando nenhum existe). Sem essa checagem dava pra gerar um segundo
  // header/trailer intercalando com registro1.
  const singleOccurrenceValidation = ({ generatedLines, type }) => {
    const alreadyExists = generatedLines.some((line) => line.type === type)
    return { valid: !alreadyExists, message: `O arquivo já possui uma linha de ${type}` }
  }

  const validate = ({ generatedLines, type }) => {
    if (singleOccurrenceTypes.includes(type)) {
      const singleOccurrence = singleOccurrenceValidation({ generatedLines, type })
      if (!singleOccurrence.valid) return singleOccurrence
    }

    if (isEmpty(generatedLines)) {
      return emptyValidation({ type })
    } else {
      return typeValidation({ generatedLines, type })
    }
  }

  return { validate }
}

export default LineGenerationValidator;