import moment from "moment";

export const getDateFormat = (date) => {
  // Convert Unix timestamp to local time and format it
  return moment(date).format("MM-DD-YYYY");
};
