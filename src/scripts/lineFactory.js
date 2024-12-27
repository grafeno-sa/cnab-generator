import getLineFields from "./lineFields";

const generateLine = ({ type, generatedLines}) => {
  let newLine = { type };
  const fields = getLineFields(type);

  fields.forEach((field) => {
    newLine[field.name] = field.defaultValue({generatedLines});
    newLine.index = generatedLines.length
  });

  return newLine;
}

export default generateLine;