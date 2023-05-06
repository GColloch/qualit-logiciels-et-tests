export default (repository) => {
  const userRepo = repository.userRepo

  const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  const isValidPhoneNumber = (phoneNumber) => {
    return /^(\+|00)?(33|0)[1-9][0-9]{8}$/.test(phoneNumber);
  };

  const listUsers = (_,res) => {
    res.send({
      data:userRepo.listUsers()
    })
  }

  const createUser = (req,res) => {
    const { lastName, firstName, birthDate, address, phone, email } = req.body;
  
    // Vérifiez que la date de naissance est au format YYYY-MM-DD
    if (!isValidDateFormat(birthDate)) {
      return res.status(400).send({
        error: {
          message: "Invalid birth date format. Use 'YYYY-MM-DD' format.",
        },
      });
    }
  
    if (!isValidPhoneNumber(phone)) {
      return res.status(400).send({
        error: {
          message: "Invalid phone number. The phone number must start with '+33', '0033' or '0', followed by exactly 9 digits.",
        },
      });
    }
    const user = userRepo.createUser(req.body);
    res.status(201).send({
      data:user
    });
  }

  const deleteUser = (req, res) => {
    const { id } = req.params
    const deletedUser = userRepo.deleteUser(id)
    if (deletedUser) {
      res.status(200).send({
        message: 'L\'utilisateur a été supprimé avec succès',
        data: deletedUser[0]
      })
    } else {
      res.status(404).send({
        message: 'L\'utilisateur n\'a pas été trouvé'
      })
    }
  }

  const updateUser = (req,res) => {

    const { lastName, firstName, birthDate, address, phone, email } = req.body;

    // Vérifiez que la date de naissance est au format YYYY-MM-DD
    if (!isValidDateFormat(birthDate)) {
    return res.status(400).send({
      error: {
        message: "Invalid birth date format. Use 'YYYY-MM-DD' format.",
        },
      });
    }

    if (!isValidPhoneNumber(phone)) {
      return res.status(400).send({
        error: {
          message: "Invalid phone number. The phone number must start with '+33', '0033' or '0', followed by exactly 9 digits.",
        },
      });
    }

    const user = userRepo.updateUser(req.params.id,req.body)
    if(user){
      return res.send({
        data:user
      })
    }
    res.status(404).send({
      error:{
        message: `The user this id : ${req.params.id} is not found`
      }
    })
  }


  return {
    listUsers,
    createUser,
    deleteUser,
    updateUser
  }

}