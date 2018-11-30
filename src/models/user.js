import baseModel from './base'

let user = baseModel()

let userModel = (baseModel) => {
  baseModel.login = () => {}
  baseModel.logout = () => {}
  return baseModel
}

export default userModel
