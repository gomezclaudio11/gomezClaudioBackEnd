import { userDAO } from '../daos/index.js'
import serviceFactory from './serviceFactory.js'

export default class UserService extends serviceFactory {

  constructor() {
    super()
    this.dao = userDAO
  }

  async createUser(user) {
    return await this.dao.save(user)
  }
  
  async deleteUserById(id) {
    return await this.dao.deleteById(id)
  }

  async getUserByUsername(username) {
    return await this.dao.getByField("username", username)
  }

  async getUserById(id) {
    return await this.dao.getById(id)
  }

}