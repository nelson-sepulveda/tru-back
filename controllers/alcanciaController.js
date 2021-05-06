var Alcancia = require('../models/alcancia.js');

function AlcanciaData(data) {
  this.id = data._id;
	this.autor = data.autor;
  this.tipo = data.tipo;
  this.total = data.total
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

exports.alcanciaCreate = [
  function (req, res) {
    try {
      const { error, message, status } = validateRegister(req.body)
      if (error) {
        res.status(status).send({data: {}, message: message})
      } else {
        let objectAlcancia = {
          total: 0,
          tipo: req.body.tipo,
          autor: req.body.autor
        }
        var alcancia = new Alcancia(objectAlcancia);
        alcancia.save(function (err, data) {
          if (!err) {
            Alcancia.findById({_id: data._id},"_id autor total tipo createdAt").then((alcanciaResponse) => {
              if(alcanciaResponse !== null) {
                let createAlcancia = new AlcanciaData(alcanciaResponse);
                res.send({data: createAlcancia, message: 'Creación Exitosa de fondo'});
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

exports.alcanciasListar = [
  function (req, res) {
		Alcancia.find({autor: req.params.autor}, function (err, foundAlcancias) {
      if(foundAlcancias === null) {
        return res.send("Alcancia not exists with this id");
      } else {
        if (foundAlcancias.length > 0) {
          res.status(200).send({data: foundAlcancias, message: ''})
        } else {
          res.status(200).send({data: [], message: ''})
        }
      }
    });
	}
]

exports.retirarFondos = [
  function (req, res) {
    console.log(req.body.monto, '89')
    console.log(req.params.id, '90')
    if (!req.body.monto) {
      return res.status(404).json({ data: 'Monto requerido' })
    } else {
      Alcancia.findById({_id: req.params.id}, function (err, foundAlcancias) {
        console.log(foundAlcancias, '94')
        if (foundAlcancias === null || !foundAlcancias) {
          return res.send("Alcancia not exists with this autor")
        } else {
          console.log(typeof foundAlcancias.total, '96')
          console.log(typeof req.body.monto, '97')
          console.log(req.body.monto, '98')
          let nuevoTotal = parseInt(foundAlcancias.total) - parseInt(req.body.monto)
          Alcancia.findOneAndUpdate({ _id: foundAlcancias._id }, { total: nuevoTotal }).then((responseUpdate) => {
            res.send({data: responseUpdate, message: 'Actualización exitosa de billetera'})
          })
        }
      })
    }
	}
]