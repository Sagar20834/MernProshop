export const formatDateNepali = (dateString) => {
  const date = new Date(dateString);

  // Format date parts
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  // Format time parts
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = ("0" + (hours % 12 || 12)).slice(-2);

  // Combine formatted parts
  return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
};
