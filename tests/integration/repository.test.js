/* eslint-disable */

require('dotenv').config()

const chai = require('chai')
const sinon = require('sinon')
const database = require('../../db')

// unit under test
const repository = require('../../app/repository')

const expect = chai.expect

function createStubDeps () {
  return {
    mongodb: require('mongodb'),
    config: require('../../config/testing')
  }
}

describe('repository', function () {
  let sandbox
  let repo
  let insertedForTest

  before(async function () {
    sandbox = sinon.createSandbox()
    let deps = createStubDeps()
    let db = database(deps)
    repo = repository(deps, db)
  })

  beforeEach(async function () {
    insertedForTest = await repo.insertOne('notes', { title: 'Testing title', description: 'Testing desc' })
    await repo.insertOne('notes', { title: 'Testing title', description: 'Testing desc' })
    await repo.insertOne('notes', { title: 'Testing title', description: 'Testing desc' })
  })

  afterEach(async function () {
    await repo.deleteAll('notes')
    sandbox.restore()
  })

  describe('insertOne', function () {
    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'xx'
      const data = { a: 1 }

      let spy = sandbox.spy(repo, 'insertOne')

      // call
      await repo.insertOne(collectionName, data)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName and data', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'xx'
      const data = { a: 1 }

      let spy = sandbox.spy(repo, 'insertOne')

      await repo.insertOne(collectionName, data)

      expect(spy.calledWithExactly(collectionName, data)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.insertOne()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('inserts and returns inserted object with timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'
      let data = {
        title: 'Testing title',
        description: 'Testing desc'
      }

      let result = await repo.insertOne(collectionName, data)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.keys('createdAt', 'title', 'description', '_id')
    })

    it('inserts and returns inserted object without timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'
      let data = {
        title: 'Testing title',
        description: 'Testing desc'
      }
      let timestamp = false

      let result = await repo.insertOne(collectionName, data, timestamp)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.keys('title', 'description', '_id')
      expect(result).to.not.have.keys('createdAt')
    })
  })

  describe('insertMany', function () {
    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'xx'
      const data = [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }]

      let spy = sandbox.spy(repo, 'insertMany')

      // call
      await repo.insertMany(collectionName, data)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName and data', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'xx'
      const data = [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }]

      let spy = sandbox.spy(repo, 'insertMany')

      await repo.insertMany(collectionName, data)

      expect(spy.calledWithExactly(collectionName, data)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.insertMany()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('inserts and returns inserted object with timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'
      let data = [{
        title: 'Testing title',
        description: 'Testing desc'
      }, {
        title: 'Testing title',
        description: 'Testing desc'
      }, {
        title: 'Testing title',
        description: 'Testing desc'
      }]

      let result = await repo.insertMany(collectionName, data)

      expect(result).to.exist
      expect(result).to.be.a('Array')
      expect(result[0]).to.have.keys('createdAt', 'title', 'description', '_id')
    })

    it('inserts and returns inserted object without timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'
      let data = [{
        title: 'Testing title',
        description: 'Testing desc'
      }, {
        title: 'Testing title',
        description: 'Testing desc'
      }, {
        title: 'Testing title',
        description: 'Testing desc'
      }]
      let timestamp = false

      let result = await repo.insertMany(collectionName, data, timestamp)

      expect(result).to.exist
      expect(result).to.be.a('Array')
      expect(result[0]).to.have.keys('title', 'description', '_id')
      expect(result[0]).to.not.have.keys('createdAt')
    })
  })

  describe('findOne', function () {
    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id

      let spy = sandbox.spy(repo, 'findOne')

      // call
      await repo.findOne(collectionName, id)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName and id', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id

      let spy = sandbox.spy(repo, 'findOne')

      await repo.findOne(collectionName, id)

      expect(spy.calledWithExactly(collectionName, id)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.findOne()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('finds and returns the object', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'
      const id = insertedForTest._id

      let result = await repo.findOne(collectionName, id)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.keys('createdAt', 'title', 'description', '_id')
      expect(result).to.include({ title: 'Testing title', description: 'Testing desc' })
    })
  })

  describe('findOneIncludeOnlyFields', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id
      const includeFields = { title: 1 }

      let spy = sandbox.spy(repo, 'findOneIncludeOnlyFields')

      // call
      await repo.findOneIncludeOnlyFields(collectionName, id, includeFields)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName, id and fields to include', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id
      const includeFields = { title: 1 }

      let spy = sandbox.spy(repo, 'findOneIncludeOnlyFields')

      await repo.findOneIncludeOnlyFields(collectionName, id, includeFields)

      expect(spy.calledWithExactly(collectionName, id, includeFields)).to.be.true

    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.findOneIncludeOnlyFields()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('finds and returns the object', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'
      const id = insertedForTest._id
      const includeFields = { title: 1 }

      let result = await repo.findOneIncludeOnlyFields(collectionName, id, includeFields)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.keys('title', '_id')
      expect(result).to.include({ title: 'Testing title' })
    })
  })

  describe('findAll', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'

      let spy = sandbox.spy(repo, 'findAll')

      // call
      await repo.findAll(collectionName)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'

      let spy = sandbox.spy(repo, 'findAll')

      await repo.findAll(collectionName)

      expect(spy.calledWithExactly(collectionName)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.findAll()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('finds and returns the objects', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      let collectionName = 'notes'

      let result = await repo.findAll(collectionName)

      expect(result).to.exist
      expect(result).to.be.a('Array')
      expect(result[0]).to.have.any.keys('title', '_id', 'description')
      expect(result[1]).to.have.any.keys('title', '_id', 'description')
      expect(result[2]).to.have.any.keys('title', '_id', 'description')
      expect(result[0]).to.include({ title: 'Testing title', description: 'Testing desc' })
      expect(result[1]).to.include({ title: 'Testing title', description: 'Testing desc' })
      expect(result[2]).to.include({ title: 'Testing title', description: 'Testing desc' })
    })
  })

  describe('findAllWithLimit', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const limit = 3

      let spy = sandbox.spy(repo, 'findAllWithLimit')

      // call
      await repo.findAllWithLimit(collectionName, limit)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName and limit', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const limit = 3

      let spy = sandbox.spy(repo, 'findAllWithLimit')

      await repo.findAllWithLimit(collectionName, limit)

      expect(spy.calledWithExactly(collectionName, limit)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.findAllWithLimit()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('finds and returns 3 objects', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const limit = 3

      let result = await repo.findAllWithLimit(collectionName, limit)

      expect(result).to.exist
      expect(result).to.be.a('Array')
      expect(result).to.have.length(3)
      expect(result[0]).to.have.any.keys('title', '_id', 'description')
      expect(result[1]).to.have.any.keys('title', '_id', 'description')
      expect(result[2]).to.have.any.keys('title', '_id', 'description')
      expect(result[0]).to.include({ title: 'Testing title', description: 'Testing desc' })
      expect(result[1]).to.include({ title: 'Testing title', description: 'Testing desc' })
      expect(result[2]).to.include({ title: 'Testing title', description: 'Testing desc' })
    })
  })

  describe('updateOneAndGet', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id
      const data = { title: 'Updated title' }

      let spy = sandbox.spy(repo, 'updateOneAndGet')

      // call
      await repo.updateOneAndGet(collectionName, id, data)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName, id and data', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id
      const data = { title: 'Updated title' }

      let spy = sandbox.spy(repo, 'updateOneAndGet')

      await repo.updateOneAndGet(collectionName, id, data)

      expect(spy.calledWithExactly(collectionName, id, data)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.updateOneAndGet()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('updates and returns the updated document with timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id
      const data = { title: 'Updated title' }

      let result = await repo.updateOneAndGet(collectionName, id, data)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.keys('title', '_id', 'description', 'updatedAt', 'createdAt')
      expect(result).to.include({ title: 'Updated title', description: 'Testing desc' })
    })

    it('updates and returns the updated document without timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id
      const data = { title: 'Updated title' }
      const timestamp = false

      let result = await repo.updateOneAndGet(collectionName, id, data, timestamp)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.keys('title', '_id', 'description', 'createdAt')
      expect(result).to.include({ title: 'Updated title', description: 'Testing desc' })
    })
  })

  describe('updateMany', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }
      const data = { title: 'Updated many title' }

      let spy = sandbox.spy(repo, 'updateMany')

      // call
      await repo.updateMany(collectionName, criteria, data)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName, criteria and data', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }
      const data = { title: 'Updated many title' }

      let spy = sandbox.spy(repo, 'updateMany')

      await repo.updateMany(collectionName, criteria, data)

      expect(spy.calledWithExactly(collectionName, criteria, data)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.updateMany()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('updates documents and returns ok with timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }
      const data = { title: 'Updated many title' }

      let result = await repo.updateMany(collectionName, criteria, data)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result.n).to.equal(result.nModified)
      expect(result).to.have.any.keys('n', 'nModified', 'ok')
      expect(result.ok).to.equal(1)
    })

    it('updates documents and returns ok without timestamp', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }
      const data = { title: 'Updated many title' }
      const timestamp = false

      let result = await repo.updateMany(collectionName, criteria, data, timestamp)

      expect(result).to.exist
      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result.n).to.equal(result.nModified)
      expect(result).to.have.any.keys('n', 'nModified', 'ok')
      expect(result.ok).to.equal(1)
    })
  })

  describe('deleteOne', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id

      let spy = sandbox.spy(repo, 'deleteOne')

      // call
      await repo.deleteOne(collectionName, id)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName and id', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id

      let spy = sandbox.spy(repo, 'deleteOne')

      await repo.deleteOne(collectionName, id)

      expect(spy.calledWithExactly(collectionName, id)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.deleteOne()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('deletes and returns the deleted document', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const id = insertedForTest._id

      let result = await repo.deleteOne(collectionName, id)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.any.keys('title', '_id', 'description')
    })
  })

  describe('deleteMany', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }

      let spy = sandbox.spy(repo, 'deleteMany')

      // call
      await repo.deleteMany(collectionName, criteria)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName and criteria', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }

      let spy = sandbox.spy(repo, 'deleteMany')

      await repo.deleteMany(collectionName, criteria)

      expect(spy.calledWithExactly(collectionName, criteria)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object
      try {
        await repo.deleteMany()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('deletes and returns ok', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'
      const criteria = { title: insertedForTest.title }

      let result = await repo.deleteMany(collectionName, criteria)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.any.keys('n', 'ok')
      expect(result.ok).to.equal(1)
    })
  })

  describe('deleteAll', function () {

    it('is called', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'

      let spy = sandbox.spy(repo, 'deleteAll')

      // call
      await repo.deleteAll(collectionName)

      // verify
      expect(spy.callCount).to.equal(1)
    })

    it('is called with collectionName', async function () {
      const collectionName = 'notes'

      let spy = sandbox.spy(repo, 'deleteAll')

      await repo.deleteAll(collectionName)

      expect(spy.calledWithExactly(collectionName)).to.be.true
    })

    it('throws error when arguments missing', async function () {
      try {
        await repo.deleteAll()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('deletes and returns ok', async function () {
      // inputs: collectionName, data
      // output: inserted object/document
      // behavior: inserts an object to the specified collection and returns the inserted object

      const collectionName = 'notes'

      let result = await repo.deleteAll(collectionName)

      expect(result).to.exist
      expect(result).to.be.a('Object')
      expect(result).to.have.any.keys('n', 'ok')
      expect(result.ok).to.equal(1)
    })
  })
})
