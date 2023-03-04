import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('Bookings', function () {
  it('GET /bookings should return a success response with all bookings', function (done) {
    chai.request(api)
    .get('/bookings')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            BookingId: '5934768367231',
            rentDate: '23/10/2012',
            returnDate: '03/12/2012',
            genre: 'Thriller',
            userId: '9782744005084',
          },
          {
            BookingId: '1643220957488',
            rentDate: '02/04/2015',
            returnDate: '06/05/2015',
            genre: 'Horror',
            userId: '6374836256472',
          }
        ]
      });
      done();
    });
  });
  it('POST /bookings should create the booking and return a success response with the booking', function (done) {
    const booking = {
        BookingId: '1643220957488',
        rentDate: '02/04/2015',
        returnDate: '06/05/2015',
        genre: 'Horror',
        userId: '6374836256472',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: booking
      });
      done();
    });
  });

  it('GET /bookings/:id should return a success response with found booking', function (done) {
    chai.request(api)
    .get('/bookings/9782319035966')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
            BookingId: '5934768367231',
            rentDate: '23/10/2012',
            returnDate: '03/12/2012',
            genre: 'Thriller',
            userId: '9782744005084',
        }
      });
      done();
    });
  });
  it('GET /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .get('/bookings/5934768358331')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 5934768358331 not found'
      });
      done();
    });
  });
  it('PUT /bookings/:id should return a success response with found booking', function (done) {
    const booking = {
        BookingId: '1643220957488',
        rentDate: '02/04/2015',
        returnDate: '06/05/2015',
        genre: 'Horror',
        userId: '6374836256472',
    };
    chai.request(api)
    .put('/bookings/1643220957488')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
            BookingId: '1643220957488',
            rentDate: '02/04/2015',
            returnDate: '06/05/2015',
            genre: 'Horror',
            userId: '6374836256472',
        }
      });
      done();
    });
  });
  it('PUT /bookings/:id should return not found response if the booking does not exists', function (done) {
    const booking = {
        BookingId: '2333220957488',
        rentDate: '02/04/2015',
        returnDate: '06/05/2015',
        genre: 'Horror',
        userId: '6374836256472',
    };
    chai.request(api)
    .put('/bookings/2333220957488')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 2333220957488 not found'
      });
      done();
    });
  });

  it('DELETE /bookings/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/bookings/5934768367231')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            BookingId: '5934768367231',
            rentDate: '23/10/2012',
            returnDate: '03/12/2012',
            genre: 'Thriller',
            userId: '9782744005084',
          }
        }
      });
      done();
    });
  });
  it('DELETE /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .delete('/bookings/5934768358331')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 5934768358331 not found'
      });
      done();
    });
  });
});
