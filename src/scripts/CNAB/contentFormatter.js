import getLineTemplate from "./lineTemplate";
import getLineFields from "./lineFields";
import generateLine from "./lineFactory";
import { replaceSubstring } from "../replaceSubstring";

const ContentFormatter = () => {
  const format = (generatedLines) => {
    // Check if header and trailer already exist in the loaded lines
    const hasHeader = generatedLines.some(line => line.type === 'header');
    const hasTrailer = generatedLines.some(line => line.type === 'trailer');
    
    // Only generate header/trailer if they don't exist
    const header = hasHeader ? null : generateLine({ type: 'header', generatedLines });
    const trailer = hasTrailer ? null : generateLine({type: 'trailer', generatedLines });
    
    // Build content array, filtering out null values
    const content = [header, ...generatedLines, trailer].filter(line => line !== null);
    
    const formattedLines = content.map(generatedLine => formatLine(generatedLine))

    return formattedLines.join('\n')
  };

  const formatLine = (generatedLine) => {
    const templateLine = getLineTemplate(generatedLine.type);
    const fields = getLineFields(generatedLine.type);
    let formattedLine = templateLine;
    fields.forEach((field) => {
      formattedLine = formatField(field, generatedLine, formattedLine)
    })

    return formattedLine
  }
  
  const formatField = (field, generatedLine, formattedLine) => {
    try{
      const fieldSize = field.endIndex - field.startIndex + 1
      const valueToFormat = generatedLine[field.name].toString() || ""
      const paddingType = field.paddingType || '0'
      const formattedValue = valueToFormat.padStart(fieldSize, paddingType)
      return replaceSubstring(formattedLine, field.startIndex, field.endIndex, formattedValue)
    }
    catch (error){
      console.error(error)
    }
  }

  return { format }
}

export default ContentFormatter;