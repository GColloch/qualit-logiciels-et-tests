
export default (Booking) => {
  const bookings = [
    new Booking('5934768367231', '23/10/2012', '03/12/2012', 'Thriller', '9782744005084'),
    new Booking('1643220957488', '02/04/2015', '06/05/2015', 'Horror', '6374836256472')
  ];

  const listBookings = () => {
    return bookings;
  };

  const createBooking = (booking) => {
    bookings.push(new Booking(
      booking.id,
      booking.rentDate,
      booking.returnDate,
      booking.genre,
      booking.userId,
    ));
    return booking;
  }

  const findBooking = (id) => {
    return bookings.find((booking) => booking.id === id);
  }

  const updateBooking = (id, booking) => {
    let foundBookingIdx = 0;
    bookings.forEach((booking, idx) => {
      if (booking.id === id) {
        foundBookingIdx = idx;
      }
    });
    
    if (foundBookingIdx > 0) {
      bookings[foundBookingIdx] = new Booking(
        booking.id,
        booking.rentDate,
        booking.returnDate,
        booking.book,
        booking.userId,
      );
      return booking;
    }

    return null;
  }

  const deleteBooking = (id) => {
    let deletedBooking = null;
    bookings.forEach((booking, idx) => {
      if (booking.id === id) {
        deletedBooking = Object.assign({}, booking);
        bookings.splice(idx, 1);
      }
    });

    return deletedBooking;
  }

  return {
    listBookings,
    createBooking,
    findBooking,
    updateBooking,
    deleteBooking
  };
};
