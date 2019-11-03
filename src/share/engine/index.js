export const convertNumberWithCommas = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const randomNumber = (startNumber, endNumber) => {
  return Math.floor(Math.random() * (endNumber-startNumber)) + startNumber ;
};
