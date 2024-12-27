import { last as arrayLast, isEmpty } from 'lodash'

const LineGenerationValidator = () => {
  const essentialType = 'registro1'
  const cannotBeEmpty = ['registro2', 'registro3', 'registro7']

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

  const validate = ({ generatedLines, type }) => {
    if (isEmpty(generatedLines)) {
      return emptyValidation({ type })
    } else {
      return typeValidation({ generatedLines, type })
    }
  }

  return { validate }
}

export default LineGenerationValidator;