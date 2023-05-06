import statusCheck from './statusCheck.js';
import bookCtrl from './bookCtrl.js';
import booking from './booking.js';
import users from './users.js';

export default (repository) => ({
  statusCheck,
  bookCtrl: bookCtrl(repository.bookRepo),
  booking: booking(repository.bookingRepo),
  users: users(repository)
});
