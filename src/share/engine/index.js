export const convertNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const randomNumber = (startNumber, endNumber) => Math.floor(Math.random()
* (endNumber - startNumber)) + startNumber;
