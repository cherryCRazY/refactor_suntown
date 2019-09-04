export const parseDate = initialDate => {
  const dateAndTime = initialDate.split('T');
  let date = dateAndTime[0];
  let time = dateAndTime[1];

  date = date.split('-').reverse().join('.');

  time = time.slice(0, 5)

  return {time, date}
}