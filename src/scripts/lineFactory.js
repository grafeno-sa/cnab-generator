import getLineFields from "./lineFields";

const generateLine = ({ type, generatedLines, wallet}) => {
  let newLine = { type };
  const fields = getLineFields(type);

  fields.forEach((field) => {
    newLine[field.name] = field.defaultValue({generatedLines, wallet});
    newLine.index = generatedLines.length
  });

  return newLine;
}

export default generateLine;