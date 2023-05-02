
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/books', controlers.bookCtrl.createBook);
  app.get('/books/:id', controlers.bookCtrl.getBook);
  app.put('/books/:id', controlers.bookCtrl.updateBook);
  app.delete('/books/:id', controlers.bookCtrl.deleteBook);
  
  app.get('/bookings', controlers.booking.listBookings);
  app.post('/bookings', controlers.booking.createBooking);
  app.get('/bookings/:id', controlers.booking.getBooking);
  app.put('/bookings/:id', controlers.booking.updateBooking);
  app.delete('/bookings/:id', controlers.booking.deleteBooking);

  app.get('/users', controlers.users.listUsers);
  app.post('/users', controlers.users.createUser);
  app.get('/users/:id', controlers.users.getUser);
  app.put('/users/:id', controlers.users.updateUser);
  app.delete('/users/:id', controlers.users.deleteUser);
}
