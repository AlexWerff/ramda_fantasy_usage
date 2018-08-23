const R = require('ramda');
const F = require('ramda-fantasy');
const U = require('./Utils');

exports.testFuture = function() {
    const a = R.compose(U.chain(transformTitle), U.map(getTitleFromFuture), getNewFuture)();

    a._fork(logError, (res) => {
        console.log(res);
    });
};

function logError(error) {
    console.log('ERROR:', error);
}


function getTitleFromFuture(obj) {
    return obj.title;
}

function getNewFuture() {
    return new F.Future(function (reject, resolve) {
        setTimeout(function () {
            resolve({id: 1, title: 'Nice Future that resolves after 2 sec' });
        }, 2000);
  });
}

function transformTitle(title) {
    return new F.Future(function (rej, res) {
        setTimeout(function () {
            rej('Transformed Title');
        }, 2000);
  });
}