"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidateMessage = void 0;
const schemaValidateMessage = (error) => {
    const errors = {};
    for (var key in error.errors)
        errors[key] = error.errors[key].message;
    return errors;
};
exports.schemaValidateMessage = schemaValidateMessage;
