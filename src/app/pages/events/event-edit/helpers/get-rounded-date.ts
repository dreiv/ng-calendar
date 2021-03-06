export const getRoundedDate = (minutes: number, date = new Date()): Date => {
  const ms = 60000 * minutes; // convert minutes to ms
  const roundedDate = new Date(Math.ceil(date.getTime() / ms) * ms);

  return roundedDate;
};
