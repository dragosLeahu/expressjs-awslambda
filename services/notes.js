const NotesRepository = require('../repositories/notes')

let responseError = (statusCode, headers, body) => {
  return {
    statusCode: statusCode,
    headers: headers,
    body: body
  }
}

let responseSuccess = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body
  }
}

module.exports.createNote = (req, callback) => {
  NotesRepository
    .create(req, (err, response) => {
      if (err) {
        callback(responseError(err.statusCode || 500, {
          'Content-Type': 'text/plain'
        }, 'Could not create the note.'), null)
      } else {
        callback(null, responseSuccess(200, response))
      }
    })
}

module.exports.getAllNotes = (callback) => {
  NotesRepository
    .getAll((err, response) => {
      if (err) {
        callback(responseError(err.statusCode || 500, {
          'Content-Type': 'text/plain'
        }, 'Could not fetch the note.'), null)
      } else {
        callback(null, responseSuccess(200, response))
      }
    })
}

module.exports.getNoteById = (req, callback) => {
  NotesRepository
    .getOne(req, (err, response) => {
      if (err) {
        callback(responseError(err.statusCode || 500, {
          'Content-Type': 'text/plain'
        }, 'Could not fetch the note.'), null)
      } else {
        callback(null, responseSuccess(200, response))
      }
    })
}

module.exports.updateNoteById = (req, callback) => {
  NotesRepository
    .update(req, (err, response) => {
      if (err) {
        callback(responseError(err.statusCode || 500, {
          'Content-Type': 'text/plain'
        }, 'Could not fetch the note.'), null)
      } else {
        callback(null, responseSuccess(200, response.value))
      }
    })
}

module.exports.deleteNoteById = (req, callback) => {
  NotesRepository
    .delete(req, (err, response) => {
      if (err) {
        callback(responseError(err.statusCode || 500, {
          'Content-Type': 'text/plain'
        }, 'Could not fetch the note.'), null)
      } else {
        callback(null, responseSuccess(200, response.value))
      }
    })
}
