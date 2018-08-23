const R = require('ramda');
const F = require('ramda-fantasy');
const _ = require('./Utils');

// chain == flatMap
exports.testMaybe = function() {
    const index = 100;
    const f = R.compose(_.map(prettyPrintUser), _.chain(findUserByUsername), getUsernameForIndex);



    const result = f(index); //Maybe
    console.log(result.getOrElse(`We dont have an employee for the index ${index}`));
}

function prettyPrintUser(user) {
    return `user: ${user.username} has the age of ${user.age} and works here as a ${user.position}`;
}

function findUserByUsername(username) {
    if (username === 'Test1') { //Only if in here -> just simulation!
        return F.Maybe.Just({
            username: username,
            age: 25,
            position: 'developer'
        })
    } else {
        return F.Maybe.Nothing();
    }
}

function getUsernameForIndex(i) {
    const availableUsernames = ['Test1', 'Test2', 'Test3'];
    return _.toMaybe(availableUsernames[i]);   
}