import CSV_LINE_FIELDS from './lineFields';

const ContentFormatter = () => {
  const format = (generatedLines) => {
    const header = formatHeader()
    const data = formatData(generatedLines);
    const content = [header, ...data]

    return content.join('\n')
  }

  const formatHeader = () => {
    return CSV_LINE_FIELDS.map(field => field.name).join(';')
  }

  const formatData = (generatedLines) => {
    return generatedLines.map(line => Object.values(line.data).join(';'))
  }

  return { format }
}

export default ContentFormatter;