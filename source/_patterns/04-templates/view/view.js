import User from '../../../js/models/user'

User.then((user) => {
  console.log(user.getID())
})

