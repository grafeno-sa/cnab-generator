import { CSV_LINE_FIELDS } from './lineFields';

const generateLine = ({ generatedLines}) => {
  let newLine = {};

  CSV_LINE_FIELDS.forEach((field) => {
    newLine['data'][field.name] = field.defaultValue();
    newLine.index = generatedLines.length
  });

  return newLine;
}

export default generateLine;