const authController = (deps, authService) => {
  async function register (email, password, passwordConfirm, roles) {
    let registered = await authService.registerUser(email, password, passwordConfirm, roles)
    return registered
  }

  async function login (email, password) {
    let token = await authService.loginUser(email, password)
    return token
  }

  async function verify (email, verifyCode) {
    let result = await authService.verifyUser(email, verifyCode)
    return result
  }

  return {
    register,
    login,
    verify
  }
}

module.exports = authController
