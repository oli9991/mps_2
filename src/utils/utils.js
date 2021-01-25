import moment from 'moment';

const checkIfOld = reservation => new Date(reservation.end) >= new Date();
const transformSeconds = seconds =>
  moment(seconds).utc().format('H [ore,] m [minute]');

const prettyDate = date => {
  if (date) {
    const obj = new Date(date.split(' ')[0]);
    const month = getMonth(date.split(' ')[0]);
    const day = obj.getDate();
    const year = obj.getFullYear();

    return day + ' ' + month + ' ' + year;
  } else {
    return 'unknown';
  }
};

const getMonth = date => {
  const monthNames = [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie'
  ];

  const d = new Date(date);
  return monthNames[d.getMonth()];
};

const calculateNotifications = () => null;

const checkIfSubscribed = (id, list) => list && list.find(e => e === id);

export {
  checkIfOld,
  prettyDate,
  calculateNotifications,
  checkIfSubscribed,
  transformSeconds
};
