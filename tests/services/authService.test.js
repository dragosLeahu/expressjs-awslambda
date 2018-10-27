/* eslint-disable */

require('dotenv').config()

const chai = require('chai')
const sinon = require('sinon')

// unit under test
const authService = require('../../app/services/authService')

const expect = chai.expect

function createStubDeps (sandbox) {
  return {
    config: require('../../config/testing'),
    bcrypt: {
      hash: sandbox.stub(),
      compare: sandbox.stub()
    },
    repo: {
      insertOne: sandbox.stub(),
      findOne: sandbox.stub()
    },
    constants: {
      dbCollections: {
        USERS: sandbox.stub()
      }
    },
    jwt: {
      sign: sandbox.stub()
    }
  }
}

describe('authService', function () {
  let sandbox
  let deps
  let aService

  before(async function () {
    sandbox = sinon.createSandbox()
    deps = createStubDeps(sandbox)
    aService = authService(deps, deps.repo)
  })

  beforeEach(async function () {
  })

  afterEach(async function () {
    sandbox.restore()
    deps = createStubDeps(sandbox)
    aService = authService(deps, deps.repo)
  })

  after(function () {

  })

  describe('registerUser', function () {
    it('is called', async function () {
      //inputs: email, pass, passConfirm
      //output: succesfully registered message + (send verify email)
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdf'

      let spy = sandbox.spy(aService, 'registerUser')

      await aService.registerUser(email, password, passwordConfirm)

      expect(spy.callCount).to.equal(1)

    })

    it('is called with right arguments', async function () {
      //inputs: email, pass, passConfirm
      //output: succesfully registered message + (send verify email)
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdf'

      let spy = sandbox.spy(aService, 'registerUser')

      await aService.registerUser(email, password, passwordConfirm)

      expect(spy.calledWithExactly(email, password, passwordConfirm)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      let err
      try {
        await aService.registerUser()
      } catch (error) {
        err = error
        expect(error).to.exist
        expect(error.message).to.equal('Missing params')
      }
      expect(err).to.not.undefined
    })

    it('throws error when password and password confirmations does not match', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdfg'
      let err

      try {
        await aService.registerUser(email, password, passwordConfirm)
      } catch (error) {
        err = error
        expect(error).to.exist
        expect(error.message).to.equal('Passwords does not match')
      }

      expect(err).to.not.undefined
    })

    it('bcrypt hash is called', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdf'

      await aService.registerUser(email, password, passwordConfirm)

      expect(deps.bcrypt.hash.callCount).to.equal(1)
    })

    it('repo insert is called', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdf'

      await aService.registerUser(email, password, passwordConfirm)

      expect(deps.repo.insertOne.callCount).to.equal(1)
    })

    it('returns user data object', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdf'

      deps.repo.findOne.returns(undefined)
      deps.repo.insertOne.returns({ email: 'some@email.com', roles: [] })

      let result = await aService.registerUser(email, password, passwordConfirm)

      expect(result).to.exist
      expect(result).to.be.a.string
    })

    it('throws error when the email already exists', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let passwordConfirm = 'asdf'
      let err

      deps.repo.findOne.returns({ email: 'some@email.com' })

      try {
        await aService.registerUser(email, password, passwordConfirm)
      } catch (error) {
        err = error
        expect(error).to.exist
        expect(error.message).to.equal('Another account registered with this email')
      }

      expect(err).to.not.undefined
    })

  })

  describe('loginUser', function () {
    it('is called', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let user = {
        email: 'a@gmail.com',
        password: 'asdf',
        roles: [
          'niceguy'
        ]
      }
      const payload = {
        id: 1,
        email: user.email,
        roles: user.roles
      }

      deps.repo.findOne.returns(user)
      deps.bcrypt.compare.returns(true)
      deps.jwt.sign.withArgs(payload)

      let spy = sandbox.spy(aService, 'loginUser')

      await aService.loginUser(email, password)

      expect(spy.callCount).to.equal(1)
    })

    it('is called with right arguments', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let user = {
        email: 'a@gmail.com',
        password: 'asdf',
        roles: [
          'niceguy'
        ]
      }
      const payload = {
        id: 1,
        email: user.email,
        roles: user.roles
      }

      deps.repo.findOne.returns(user)
      deps.bcrypt.compare.returns(true)
      deps.jwt.sign.withArgs(payload)

      let spy = sandbox.spy(aService, 'loginUser')

      await aService.loginUser(email, password)

      expect(spy.calledWithExactly(email, password)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      let err
      try {
        await aService.loginUser()
      } catch (error) {
        err = error
        expect(error).to.exist
        expect(error.message).to.equal('Missing params')
      }
      expect(err).to.not.undefined
    })

    it('throws wrong email error when user is not found by email', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let err

      try {
        await aService.loginUser(email, password)
      } catch (error) {
        err = error
        expect(error).to.exist
        expect(error.message).to.equal('Wrong email')
      }
      expect(err).to.not.undefined
    })

    it('throws wrong password error when hashes does not match', async function () {
      let email = 'a@gmail.com'
      let password = 'asdf'
      let user = {
        email: 'a@gmail.com',
        password: 'asdf',
        roles: [
          'niceguy'
        ]
      }
      let err

      deps.repo.findOne.returns(user)

      try {
        await aService.loginUser(email, password)
      } catch (error) {
        err = error
        expect(error).to.exist
        expect(error.message).to.equal('Wrong password')
      }
      expect(err).to.not.undefined
    })
  })
})
