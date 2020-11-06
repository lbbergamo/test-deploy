"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Localization = _interopRequireDefault(require("../models/Localization"));

var _helpers = _interopRequireDefault(require("../helpers"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocalizationController {
  async save(req, res) {
    const localization = new _Localization.default(req.body);

    try {
      _helpers.default.existsOrError(localization.name, 'Nome da localização não informado');

      _helpers.default.existsOrError(localization.description, 'Descrição não informado');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (req.body.id) {
      return res.status(401).send({
        message: 'Utilize o update'
      });
    }

    return (0, _connection.default)('localization').insert(localization).then(localization => {
      return (0, _connection.default)('localization').select('id', 'name', 'cover', 'description', 'notes').where({
        id: localization
      }).first().then(localization => res.json(localization).status(201).send());
    }).catch(err => res.status(500).send(err));
  }

  async get(req, res) {
    return (0, _connection.default)('localization').select('id', 'name', 'cover', 'description', 'notes').then(localization => res.json(localization)).catch(err => res.status(500).send(err));
  }

  async find(req, res) {
    return (0, _connection.default)('localization').select('id', 'name', 'cover', 'description', 'notes').where({
      id: req.params.id
    }).first().then(localization => res.json(localization).send()).catch(err => res.status(500).send(err));
  }

  async update(req, res) {
    const localization = new _Localization.default(req.body);
    return (0, _connection.default)('localization').update(localization).where({
      id: req.body.id
    }).then(localization => res.status(200).send()).catch(err => res.status(500).send(err));
  }

  async delete(req, res) {
    if (req.body.id == null) return res.status(401).send({
      message: 'Falta o id'
    });
    return (0, _connection.default)('localization').where({
      id: req.body.id
    }).del().then(localization => res.status(200).send()).catch(err => res.status(500).send(err));
  }

}

var _default = LocalizationController;
exports.default = _default;