const R = require('ramda');
const F = require('ramda-fantasy');
const _ = require('./Utils');
const fs = require('fs');

exports.testIO = function() {
    const fRead = R.compose(_.map(JSON.parse), readContactsIO);
    
    console.log("Available Contacts:");
    R.compose(_.chain(logIO), fRead)().runIO();


    const fAddFullname = R.compose(_.map(addFullname),fRead);
    console.log('Added fullnames:');
    R.compose(_.chain(logIO), fAddFullname)().runIO();


    console.log('Now lets remove the address:');
    const fRemoveAddress = R.compose(_.map(removeAddress),fAddFullname);
    R.compose(_.chain(logIO), fRemoveAddress)().runIO();
}


function readContactsIO(filename) {
    return F.IO(() => {
        return fs.readFileSync('sample-files/contacts.json', 'utf8');
    });
}

function removeAddress(contact) {
    return R.omit(['address'], contact);
}

function addFullname(contact) {
    return R.merge(contact, { fullname: contact.firstname + ' ' + contact.lastname});
}

function logIO (data){
    return F.IO(() => {
        console.log(data);
    });
}
