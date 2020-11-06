"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Localization {
  constructor(localization) {
    this.name = localization.name;
    this.description = localization.description;
    this.cover = localization.cover;
    this.notes = localization.notes;
    return this;
  }

}

var _default = Localization;
exports.default = _default;