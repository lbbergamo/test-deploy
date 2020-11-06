"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Category {
  constructor(category) {
    this.description = category.description;
    this.name = category.name;
    this.cover = category.cover;
    this.notes = category.notes;
    return this;
  }

}

var _default = Category;
exports.default = _default;