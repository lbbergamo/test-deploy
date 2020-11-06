"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Category = _interopRequireDefault(require("../models/Category"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _helpers = _interopRequireDefault(require("../helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoryController {
  async save(req, res) {
    const category = new _Category.default(req.body);

    try {
      _helpers.default.existsOrError(category.name, 'Nome não informado');

      _helpers.default.existsOrError(category.description, 'Descrição não informado');
    } catch (msg) {
      return res.status(400).send({
        message: msg
      });
    }

    return (0, _connection.default)('category').insert(category).then(category => {
      return (0, _connection.default)('category').select('id', 'name', 'description', 'notes', 'cover').where({
        id: category
      }).first().then(category => res.json(category).status(201).send());
    }).catch(err => res.status(500).send(err));
  }

  async get(req, res) {
    return (0, _connection.default)('category').select('id', 'name', 'description', 'notes', 'cover').then(category => res.json(category).status(201).send()).catch(err => res.status(500).send(err));
  }

  async find(req, res) {
    return (0, _connection.default)('category').select('id', 'name', 'description', 'notes', 'cover').where({
      id: req.params.id
    }).then(category => res.json(category).status(201).send()).catch(err => res.status(500).send(err));
  }

  async update(req, res) {
    const category = new _Category.default(req.body);

    if (req.body.id == null) {
      return res.status(400).send({
        message: 'Favor informar o id'
      });
    }

    return (0, _connection.default)('category').update(category).where({
      id: req.body.id
    }).then(_ => res.status(200).json({
      message: 'Update success'
    }).send()).catch(err => res.status(500).send(err));
  }

  async delete(req, res) {
    if (req.body.id == null) return res.status(401).send({
      message: 'Falta o id'
    });
    return (0, _connection.default)('category').where({
      id: req.body.id
    }).del().then(_ => res.status(200).send()).catch(err => res.status(500).send(err));
  }

}

var _default = CategoryController;
exports.default = _default;