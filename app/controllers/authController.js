const authController = (deps, authService) => {
  async function register (email, password, passwordConfirm, headers) {
    let registered = await authService.registerUser(email, password, passwordConfirm, headers)
    return registered
  }

  async function login (email, password) {
    let token = await authService.loginUser(email, password)
    return token
  }

  return {
    register,
    login
  }
}

module.exports = authController
