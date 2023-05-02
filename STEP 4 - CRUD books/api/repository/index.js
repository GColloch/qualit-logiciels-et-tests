import bookRepo from './bookRepo.js';
import bookingRepo from './bookingRepo.js';
import userRepo from './userRepo.js';

export default (model) => ({
  bookRepo: bookRepo(model.Book),
  bookingRepo: bookingRepo(model.booking),
  userRepo: userRepo(model.user)
});
