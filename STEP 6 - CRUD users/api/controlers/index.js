import statusCheck from './statusCheck.js';
import bookCtrl from './bookCtrl.js';
import users from './users.js';

export default (repository) => ({
  statusCheck,
  bookCtrl: bookCtrl(repository.bookRepo),
  users: users(repository.userRepo)
  
});
