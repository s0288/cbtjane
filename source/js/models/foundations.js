import * as Config from '../../../universal/config'
import * as Api from '../../../universal/services/api'
import User from './user'
import Template from './template'

let foundations = []

const foundation = {
  getAll() {
    return foundations
  }
}

const Foundation = new Promise((resolve) => {
  User.then((user) => {
    const foundationRequest = Api({
      method: 'GET',
      baseURL: Config.api,
      url: `/backend/foundation_1/${user.getID()}`
    })

    Promise.all([Template, foundationRequest]).then(([, requestedFoundation]) => {
      foundations = requestedFoundation
      console.log(foundations)
      resolve(foundation)
    })
  })
})

export default Foundation
