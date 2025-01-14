const generateFormattedDate = (future = false) => {
  const currentDate = new Date();
  let targetDate = new Date();

  if (future) {
    targetDate.setMonth(currentDate.getMonth() + 3);
  }

  const day = targetDate.getDate().toString().padStart(2, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const year = targetDate.getFullYear().toString().slice(-2);
  const formattedDate = day + month + year;

  return formattedDate;
};

export default generateFormattedDate;