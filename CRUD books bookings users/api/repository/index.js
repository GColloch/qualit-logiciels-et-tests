import bookRepo from './bookRepo.js';
import bookingRepo from './bookingRepo.js';
import userRepo from './userRepo.js';

export default (model) => ({
  bookRepo: bookRepo(model.Book),
  bookingRepo: bookingRepo(model.Booking),
  userRepo: userRepo(model.User)
});
