const uuidGenerator = require('uuid/v4');
const fs = require('fs');

const todos = [];
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (!(params.hasOwnProperty('name') && params.name.length > 4)) return false;
  // console.log('params given', params)
  params._id = uuidGenerator();
  // console.log('params now', params)
  if (!params.hasOwnProperty('description')) params.description = 'default';
  if (!params.hasOwnProperty('completed')) params.completed = false;
  todos.push(params);
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos;
}
function show (id) {
  var obj = null;

  todos.forEach( function (item) {
    if (item._id === id) obj = item;
  })

  return obj;
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length < 5) return false;
  params._id = id;
  todos.forEach( function (item, index, array) {
    if (item._id === id) {
      for (var key in array[index]) {
        if(item[key] !== params[key] && params[key] !== undefined) array[index][key] = params[key];
      }
      // array[index] = params;
    }
  })
  return true;
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
};
