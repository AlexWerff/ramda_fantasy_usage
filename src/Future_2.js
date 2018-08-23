const R = require('ramda');
const F = require('ramda-fantasy');
const U = require('./Utils');



// Hacky usually that does not work without MonadTransformers.
exports.testFuture2 = function(req, res) {
    const f = R.compose(
        U.chain(getCustomer),
        U.map(getCustomerId), // Maybe()
        U.chain(getStock), // Future()
        getBrandIdFromRequest // Maybe()
    )(req);


    f._fork(console.log, console.log);

    //f._fork(res.status(500).end, res.status(200).end);
}

function getCustomerId (stock){
    return U.toMaybe(stock.customerId);
}

function getBrandIdFromRequest(req) {
    return U.toMaybe(req.brandId);
}

function getStock(brandId) {
    return F.Future(function(reject,resolve) {
        setTimeout(function () {
            resolve({id: 1, amount: 50, customerId: 10 });
        }, 2000);
    });
}

function getCustomer(customerId) {
    return F.Future(function(reject,resolve) {
        setTimeout(function () {
            resolve({id: 10, name: 'Customer XYZ' });
        }, 2000);
    });
}

