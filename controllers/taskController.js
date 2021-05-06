//File: routes/tvshows.js
var Task = require('../models/task.js');
var mongoose = require("mongoose");

function TaskData(data) {
  this.id = data._id;
	this.nombre= data.nombre;
	this.prioridad = data.prioridad;
  this.fecha = data.fecha;
  this.autor = data.autor
}

/**
 * Carga las tareas registradas por un usuario
 */
exports.listTasks = [
  function (req, res) {
		Task.find({autor: req.params.autor}, function (err, foundTasks) {
      if(foundTasks === null) {
        return res.send("Task not exists with this id");
      } else {
        if (foundTasks.length > 0) {
          res.status(200).send({data: foundTasks, message: ''})
        } else {
          res.status(200).send({data: [], message: ''})
        }
      }
    });
	}
];


exports.createTask = [
  function (req, res) {
    try {
      const { error, message, status } = validateRegisterTask(req.body)
      if (error) {
        res.status(status).send({data: {}, message: message})
      } else {
        let objectTask = {
          nombre: req.body.nombre,
          prioridad: req.body.prioridad,
          fecha: new Date(req.body.fecha),
          autor: req.body.autor,
          completed: false
        }
        var createTarea = new Task(objectTask);
        Task.findOne({nombre : req.body.nombre}).then( (task) => {
          if (task) {
            res.status(400).send({data: {}, message: "Ya existe una tarea con el nombre " + req.body.nombre})
          } else {
            createTarea.save(function (err, data) {
              if (!err) {
                Task.findById({_id: data._id},"_id nombre prioridad fecha autor createdAt").then((taskResponse) => {
                  if(taskResponse !== null) {
                    let createTask = new TaskData(taskResponse);
                    res.send({data: createTask, message: "Creación Exitosa de Tarea"});
                  } else {
                    res.status(500).json({data: 'error'})
                  }
                });
              } else {
                res.send({data: err})
              }
            })
          }
        })
      }
    } catch (error) {
      return res.json(error)
    }
  }
];

exports.updateTask = [
  (req, res) => {
    const { error, message, status } = validateRegisterTask(req.body)
    if (error) {
      res.status(status).send({data: {}, message: message})
    } else {
      try {
        let updateTaskObject = {
          nombre: req.body.nombre,
          prioridad: req.body.prioridad,
          fecha: new Date(req.body.fecha),
          completed: req.body.completed
        }
          if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return req.send("Invalid IDE")
          } else {
            Task.findById(req.params.id, function (err, foundTask) {
              if(foundTask === null){
                return res.status(404).send({message: "La tarea no existe"});
              } else {
                Task.findByIdAndUpdate(req.params.id, updateTaskObject, {new: true},function (err, data) {
                  if (err) {
                    return res.send(err);
                  } else {
                    let updateTaskSuccess = new TaskData(data);
                    return res.status(200).send({data: updateTaskSuccess, message: "Actualización Exitosa de Tarea"});
                  }
                });
              }
            });
          }
      } catch (err) {
        return res.send(err);
      }
    }
	}
];

exports.deleteTask = [
  function (req, res) {
    const { error, message, status } = validateParamsDeleteTask(req.params, req.body)
    if (error) {
      res.status(status).send({data: {}, message: message})
    } else {
      try {
        Task.findById(req.params.id, function (err, foundTask) {
          if(foundTask === null) {
            return res.send("Tarea no existe con ese ID");
          } else {
            Task.findByIdAndRemove(req.params.id, function (err, data) {
              if (err) {
                return res.send(err);
              } else {
                return res.send({data: data, message: "Eliminación Exitosa de Tarea"});
              }
            });
          }
        });
      } catch (err) {
        return res.send(err)
      }
    }
	}
];

/**
 * Validacion de eliminación
 * @param {*} params 
 * @param {*} body 
 */
function validateParamsDeleteTask(params) {
  if (!params) {
    return {
      error: true,
      message: 'No request params',
      status: 404
    }
  } else if (!params.id || params.id === "") {
    return {
      error: true,
      message: 'ID no valido para eliminación',
      status: 404
    }
  }
  return {
    error: false,
    message: '',
    status: 0
  }
}

/**
 * Function de validación para la creación y actualización de una tarea
 * @param {*} task 
 */
function validateRegisterTask (task) {
  if (!task) {
    return {
      error: true,
      message: 'No request body',
      status: 404
    }
  } else if (!task.nombre || task.nombre === "") {
    return {
      error: true,
      message: 'Campo Nombre Requerido',
      status: 404
    }
  } else if (!task.prioridad || task.prioridad === "") {
    return {
      error: true,
      message: 'Campo Prioridad Requerido',
      status: 404
    }
  } else if (!task.fecha || task.fecha === "") {
    return {
      error: true,
      message: 'Campo Fecha Requerido',
      status: 404
    }
  } else if (!task.autor || task.autor === "") {
    return {
      error: true,
      message: 'Autor no registrado',
      status: 404
    }
  }
  return {
    error: false,
    message: '',
    status: 0
  }
}
