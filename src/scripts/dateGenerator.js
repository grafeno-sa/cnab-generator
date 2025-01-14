const generateFormattedDate = ({ future = false, separator = '' }) => {
  const currentDate = new Date();
  let targetDate = new Date();

  if (future) {
    targetDate.setMonth(currentDate.getMonth() + 3);
  }

  const day = targetDate.getDate().toString().padStart(2, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const year = targetDate.getFullYear().toString().slice(-2);
  const formattedDate = day + separator + separator + month + separator + year;

  return formattedDate;
};

export default generateFormattedDate;