const F = require('ramda-fantasy');
const R = require('ramda');

exports.map = function (f) {
    return function(obj) {
        return obj.map(f);
    }
}

exports.chain = function(f) {
    return function(obj) {
        return obj.chain(f);
    }
}

exports.fork = function(res,rej) {
    return function(obj) {
        obj._fork(res,rej);
    }
}


exports.toMaybe = function(obj) {
    return obj ? F.Maybe.Just(obj) : F.Maybe.Nothing();
}
