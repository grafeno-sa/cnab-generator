import getLineFields from "./lineFields";

const generateLine = ({ type, generatedLines, settings }) => {
  let newLine = { type };
  const fields = getLineFields(type);

  fields.forEach((field) => {
    newLine[field.name] = field.defaultValue({ generatedLines, newLine, settings });
    newLine.index = generatedLines.length
  });

  return newLine;
}

export default generateLine;