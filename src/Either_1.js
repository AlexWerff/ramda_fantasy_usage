const R = require('ramda');
const F = require('ramda-fantasy');
const _ = require('./Utils');

exports.testEither = function() {
    const index = 3;
    const f = R.compose(_.map(prettyPrintUser), _.chain(findUserByUsername), getUsernameForIndex);
    const result = f(index);
    result.either(console.log, console.log);
}

function prettyPrintUser(user) {
    return `user: ${user.username} has the age of ${user.age} and works here as a ${user.position}`;
}

function findUserByUsername(username) {
    if (username === 'Test1') { //Only if in here -> just simulation!
        return F.Either.Right({
            username: username,
            age: 25,
            position: 'developer'
        })
    } else {
        return F.Either.Left(`User for username: ${username} not found.`);
    }
}

function getUsernameForIndex(i) {
    const availableUsernames = ['Test1', 'Test2', 'Test3'];
    if(i >= availableUsernames.length) {
        return F.Either.Left('Index out of Range.');
    } else if(i < 0) {
        return F.Either.Left('Index lower than 0.');
    } else {
        return F.Either.Right(availableUsernames[i]);
    }
}