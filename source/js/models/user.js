import * as Config from '../../../universal/config'
import * as Api from '../../../universal/services/api'

import getUrlParameter from '../services/getUrlParameter'

const user = {
  id: getUrlParameter('id')
}

const UserData = {
  getID() {
    return user.id
  },
  getProfilePic() {
    return user.profilepicurl
  },
  getFirstName() {
    return user.firstname
  }
}

const User = new Promise((resolve) => {
  Api({
    method: 'GET',
    baseURL: Config.api,
    url: `/backend/users/${user.id}`
  }).then((users) => {
    const [{
      profilepicurl,
      firstname,
      lastname
    }] = users
    user.profilepicurl = profilepicurl
    user.firstname = firstname
    user.lastName = lastname
    resolve(UserData)
  })
})

export default User
