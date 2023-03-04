import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('Users', function () {
    it('GET /users should return a success response with all users', function (done) {
      chai.request(api)
      .get('/users')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              userId: '9782744005084',
              userLastName: 'COLLOC\'H',
              userfirstName: 'Guillaume',
              userBirthDate: '05/09/2001',
              userCountry: 'FR',
              userAddress: '8 rue saint-Joseph Nantes',
              userEmail: 'guillaumecolloch56@gmail.com'
            },
            {
              userId: '6374836256472',
              userLastName: 'SALAZAR',
              userfirstName: 'Antonio',
              userBirthDate: '11/02/2003',
              userCountry: 'ES',
              userAddress: '2 Gran Via Madrid',
              userEmail: 'antonioSalazar@gmail.com'
            }
          ]
        });
        done();
      });
    });
    it('POST /users should create the user and return a success response with the user', function (done) {
        const user = {
            userId: '6374836256472',
            userLastName: 'SALAZAR',
            userfirstName: 'Antonio',
            userBirthDate: '11/02/2003',
            userCountry: 'ES',
            userAddress: '2 Gran Via Madrid',
            userEmail: 'antonioSalazar@gmail.com'
        };
        chai.request(api)
        .post('/users')
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(201);
          chai.expect(res.body).to.deep.equal({
            data: user
          });
          done();
        });
      });
      it('POST /users should return a bad request if ID malformed');
  it('POST /users should return a bad request if price malformed');
  it('POST /users should return a bad request if lang code malformed');
  it('GET /users/:id should return a success response with found user', function (done) {
    chai.request(api)
    .get('/users/6374836256472')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
            userId: '6374836256472',
            userLastName: 'SALAZAR',
            userfirstName: 'Antonio',
            userBirthDate: '11/02/2003',
            userCountry: 'ES',
            userAddress: '2 Gran Via Madrid',
            userEmail: 'antonioSalazar@gmail.com'
        }
      });
      done();
    });
  });
  it('GET /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .get('/users/1234567899999')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 1234567899999 not found'
      });
      done();
    });
  });
  it('PUT /users/:id should return a success response with found user', function (done) {
    const user = {
        userId: '6374836256472',
        userLastName: 'SALAZAR',
        userfirstName: 'Antonio',
        userBirthDate: '11/02/2003',
        userCountry: 'ES',
        userAddress: '2 Gran Via Madrid',
        userEmail: 'antonioSalazar@gmail.com'
    };
    chai.request(api)
    .put('/users/6374836256472')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
            userId: '6374836256472',
            userLastName: 'SALAZAR',
            userfirstName: 'Antonio',
            userBirthDate: '11/02/2003',
            userCountry: 'ES',
            userAddress: '2 Gran Via Madrid',
            userEmail: 'antonioSalazar@gmail.com'
        }
      });
      done();
    });
  });
  it('PUT /users/:id should return not found response if the user does not exists', function (done) {
    const user = {
        userId: '9782744005084',
        userLastName: 'COLLOC\'H',
        userfirstName: 'Guillaume',
        userBirthDate: '05/09/2001',
        userCountry: 'FR',
        userAddress: '8 rue saint-Joseph Nantes',
        userEmail: 'guillaumecolloch56@gmail.com'
    };
    chai.request(api)
    .put('/users/9782744005084')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 9782744005084 not found'
      });
      done();
    });
  });
  it('PUT /users/:id should return a bad request if ISBN malformed');
  it('PUT /users/:id should return a bad request if price malformed');
  it('PUT /users/:id should return a bad request if lang code malformed');
  it('DELETE /users/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/users/6374836256472')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            userId: '6374836256472',
            userLastName: 'SALAZAR',
            userfirstName: 'Antonio',
            userBirthDate: '11/02/2003',
            userCountry: 'ES',
            userAddress: '2 Gran Via Madrid',
            userEmail: 'antonioSalazar@gmail.com'
          }
        }
      });
      done();
    });
  });
  it('DELETE /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .delete('/users/9782744005084')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 9782744005084 not found'
      });
      done();
    });
  });
});
