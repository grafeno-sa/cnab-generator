const generateFormattedDate = ({ future = false, separator = '', fullYear = false }) => {
  const currentDate = new Date();
  let targetDate = new Date();

  if (future) {
    targetDate.setMonth(currentDate.getMonth() + 3);
  }

  const day = targetDate.getDate().toString().padStart(2, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  let year = targetDate.getFullYear().toString()
  if (!fullYear) year = year.slice(-2)
  const formattedDate = day + separator + month + separator + year;

  return formattedDate;
};

export default generateFormattedDate;