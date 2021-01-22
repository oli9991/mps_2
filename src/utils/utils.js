const checkIfOld = reservation => new Date(reservation.end) >= new Date();

export { checkIfOld };
