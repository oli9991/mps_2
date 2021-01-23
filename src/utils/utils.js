import { getResource } from '../requests/function';

const checkIfOld = reservation => new Date(reservation.end) >= new Date();

const prettyDate = date => {
  if (date) {
    const obj = new Date(date);
    const month = getMonth(date);
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

export { checkIfOld, prettyDate, calculateNotifications, checkIfSubscribed };
