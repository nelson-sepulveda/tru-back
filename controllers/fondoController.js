var Fondo = require('../models/fondo.js');
var Alcancia = require('../models/alcancia.js')
var mongoose = require("mongoose");

function FondoData(data) {
  this.id = data._id;
	this.monto = data.monto;
	this.tipo = data.tipo;
  this.fecha = data.fecha;
  this.autor = data.autor
  this.alcancia = data.alcancia
}

function validateRegister (data) {
  if (!data) {
    return {
      error: true,
      message: 'Request body',
      status: 404
    }
  } else if (!data.autor || data.autor === '') {
    return {
      error: true,
      message: 'Autor requerido',
      status: 404
    }
  } else if (!data.monto || data.monto === '') {
    return {
      error: true,
      message: 'Monto requerido',
      status: 404
    }
  } else if (!data.tipo || data.tipo === '') {
    return {
      error: true,
      message: 'Tipo requerido',
      status: 404
    }
  }
  return {
    error: false,
    message: '',
    status: 0
  }
}

exports.fondoCreate = [
  function (req, res) {
    try {
      const { error, message, status } = validateRegister(req.body)
      if (error) {
        res.status(status).send({data: {}, message: message})
      } else {
        let objectFondo = {
          monto: req.body.monto,
          tipo: req.body.tipo,
          fecha: new Date(req.body.fecha),
          autor: req.body.autor,
          alcancia: req.body.alcancia
        }
        var fondo = new Fondo(objectFondo);
        fondo.save(function (err, data) {
          if (!err) {
            Fondo.findById({_id: data._id},"_id autor alcancia monto fecha tipo createdAt").then((fondoResponse) => {
              if(fondoResponse !== null) {
                let createFondo = new FondoData(fondoResponse);
                Alcancia.findById({_id: req.body.alcancia }, "_id total").then((responseAlcancia) => {
                  let totalSuma = parseInt(responseAlcancia.total) + parseInt(req.body.monto)
                  console.log(typeof totalSuma, '70')
                  Alcancia.findOneAndUpdate({ _id: req.body.alcancia }, { total: totalSuma }).then((responseUpdate) => {})
                })
                res.send({data: createFondo, message: 'Creación Exitosa de fondo'});
              } else {
                res.status(500).json({data: 'error'})
              }
            });
          } else {
            res.send(err)
          }
        });
      }
    } catch (error) {
      return res.json(error)
    }
  }
]