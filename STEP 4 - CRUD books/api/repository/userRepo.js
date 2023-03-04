
export default (User) => {
    const users = [
      new User('9782744005084', 'COLLOC\'H', 'Guillaume', '05/09/2001', 'FR', '8 rue saint-Joseph Nantes','guillaumecolloch56@gmail.com'),
      new User('6374836256472', 'SALAZAR', 'Antonio', '11/02/2003', 'ES', '2 Gran Via Madrid','antonioSalazar@gmail.com'),
    ];
  
    const listUsers = () => {
      return users;
    };
  
    const createUser = (user) => {
        users.push(new User(
          user.id,
          user.lastName,
          user.firstName,
          user.birthDate,
          user.country,
          user.address,
          user.email,
        ));
        return user;
      }
  
    const findUser = (id) => {
      return user.find((user) => user.id === id);
    }
  
    const updateUser = (id, user) => {
      let foundUserIdx = 0;
      users.forEach((user, idx) => {
        if (user.id === id) {
          foundUserIdx = idx;
        }
      });
      
      if (foundUserIdx > 0) {
        users[foundUserIdx] = new User(
            user.id,
            user.lastName,
            user.firstName,
            user.birthDate,
            user.country,
            user.phone,
            user.email,
        );
        return user;
      }
  
      return null;
    }
  
    const deleteUser = (id) => {
      let deleteUser = null;
      users.forEach((user, idx) => {
        if (user.id === id) {
            deleteUser = Object.assign({}, user);
            users.splice(idx, 1);
        }
      });
  
      return deleteUser;
    }
  
    return {
      listUsers,
      createUser,
      findUser,
      updateUser,
      deleteUser
    };
  };
  