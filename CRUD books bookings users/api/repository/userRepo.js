export default (User) => {

  const users = [
    new User('q8Qk2TIWK7fi1o8LS1wuw9BLKFv3F8', 'Bar', 'Foo', '1930-05-19', '11 Rue des pissenlit Nantes','+33164782195','foobar@gmail.com'),
    new User('jndRkqj0gQAU0F4tisxJ2RAkPEzpHi', 'Doe', 'John', '1390-11-04', '45 Rue des coquelicots Paris','+33635931674','johndoe@gmail.com')
  ]

  const listUsers = () => {
    return users;
  }

  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };
  

  const createUser = (user) => {
    users.push(user)
    return user
  }

  const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
      return users.splice(index, 1)
    }
    return null
  }

  const updateUser = (userId, userData) => {
    let foundUserIndex = -1
    users.forEach((user,index) => {
      if(user.id === userId){
        foundUserIndex = index
      }
    })
    if(foundUserIndex > -1){
      users[foundUserIndex] = userData
      return users[foundUserIndex]
    }
  
    return null
  }

  return {
    listUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById
  }
}