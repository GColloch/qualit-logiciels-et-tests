import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'
import { v4 as uuidv4 } from 'uuid'

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})

chai.use(chaiHttp)

describe('Users', function () {
  it('GET /users : Get a user', function (done){
    chai.request(api)
    .get('/users')
    .end((_,res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data : [{
          id: 'q8Qk2TIWK7fi1o8LS1wuw9BLKFv3F8',
          lastName: 'Bar',
          firstName: 'Foo',
          birthDate: '1930-05-19',
          address: '11 Rue des pissenlit Nantes',
          phone: "+33164782195",
          email: 'foobar@gmail.com'
        },
        {
          id: 'jndRkqj0gQAU0F4tisxJ2RAkPEzpHi',
          lastName: 'Doe',
          firstName: 'John',
          birthDate: '1390-11-04',
          address: '45 Rue des coquelicots Paris',
          phone: '+33635931674',
          email: 'johndoe@gmail.com'
        }]
      })
      done()
    })
   })

   it('POST /users', function(done){
    const user = {
      id: uuidv4(),
      lastName: 'Macron',
      firstName: 'Emmanuel',
      birthDate: '1977-12-21',
      address: 'Amiens',
      phone: '+33753597482',
      email: 'president@gmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_,res) => {
      chai.expect(res.statusCode).to.equal(201)
      chai.expect(res.body).to.deep.equal({
        data:user
      })
      done()
    })
   })

   it('POST /users should return 400 if birthDate is not in format YYYY-MM-DD', function(done){
    const user = {
      id: uuidv4(),
      lastName: 'Macron',
      firstName: 'Emmanuel',
      birthDate: '21-12-1977', // date in incorrect format
      address: 'Amiens',
      phone: '0753597482',
      email: 'president@gmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_,res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: "Invalid birth date format. Use 'YYYY-MM-DD' format.",
        }
      })
      done()
    })
  })  

  it('POST /users should not allow creating a user with an invalid phone number format', function(done){
    const user = {
      id: uuidv4(),
      lastName: 'Macron',
      firstName: 'Emmanuel',
      birthDate: '1977-12-21',
      address: 'Amiens',
      phone: '0755982', // Format de téléphone invalide
      email: 'president@gmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_,res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: "Invalid phone number. The phone number must start with '+33', '0033' or '0', followed by exactly 9 digits.",
        },
      })
      done()
    })
  })
  

   it('DELETE /users/:id', function(done){
    const userId = 'q8Qk2TIWK7fi1o8LS1wuw9BLKFv3F8';
  
    chai.request(api)
    .delete('/users/' + userId)
    .end((_,res) => {
      chai.expect(res.statusCode).to.be.oneOf([200, 404])
      if (res.statusCode === 200) {
        chai.expect(res.body).to.deep.equal({
          message: 'L\'utilisateur a été supprimé avec succès',
          data: {
            id: 'q8Qk2TIWK7fi1o8LS1wuw9BLKFv3F8',
          lastName: 'Bar',
          firstName: 'Foo',
          birthDate: '1930-05-19',
          address: '11 Rue des pissenlit Nantes',
          phone: "+33164782195",
          email: 'foobar@gmail.com'
          }
        })
      } else {
        chai.expect(res.body).to.deep.equal({
          message: 'L\'utilisateur n\'a pas été trouvé'
        })
      }
      done()
    })
  })

  it('PUT /users/:id', function(done){
    const user = {
      id: 'yzdzq8Qk22TIWK7fi5331o8LS1wuwdsz9BLKFv3F8',
      lastName: 'Doe',
      firstName: 'Jane',
      birthDate: '1363-07-11',
      address: '3 Rue d\'eminem New-York',
      phone: '+33652886943',
      email: 'janedoe@gmail.com'
    }
    chai.request(api)
    .put('/users/yzdzq8Qk22TIWK7fi5331o8LS1wuwdsz9BLKFv3F8')
    .send(user)
    .end((_,res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data:user
      })
      done()
    })
   })

   it('PUT /users/:id should not allow updating birthdate with wrong format', function(done){
    const user = {
      id: 'yzdzq8Qk22TIWK7fi5331o8LS1wuwdsz9BLKFv3F8',
      lastName: 'Doe',
      firstName: 'Jane',
      birthDate: '11/07/1363',
      address: '3 Rue d\'eminem New-York',
      phone: '06586943' ,
      email: 'janedoe@gmail.com'
    }
    chai.request(api)
    .put('/users/yzdzq8Qk22TIWK7fi5331o8LS1wuwdsz9BLKFv3F8')
    .send(user)
    .end((_,res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: "Invalid birth date format. Use 'YYYY-MM-DD' format.",
        },
      })
      done()
    })
   })

   it('PUT /users/:id should not allow updating a user with an invalid phone number format', function(done) {
    const updatedUser = {
      lastName: 'Paul',
      firstName: 'Marcel',
      birthDate: '2013-12-26',
      address: '11 Rue de la chatterie Saint-Herblain',
      phone: '020608', // invalid phone number format
      email: 'marcelpaul@gmail.com'
    }
  
    chai.request(api)
      .put('/users/q8Qk2TIWK7fi1o8LS1wuw9BLKFv3F8')
      .send(updatedUser)
      .end(function (error, response) {
        chai.expect(response.statusCode).to.equal(400)
        chai.expect(response.body).to.deep.equal({
          error: {
            message: 'Invalid phone number. The phone number must start with \'+33\', \'0033\' or \'0\', followed by exactly 9 digits.',
          },
        })
        done()
      })
  })

})