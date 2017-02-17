
/**
 * 
 */

module.exports = function () {
    console.log("setting up tmp");
    var mkdirp = require('mkdirp');
    console.log(mkdirp);
    mkdirp('tmp/thumbnail', function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    })

    mkdirp('tmp/small', function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    })

    mkdirp('tmp/medium', function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    })

    mkdirp('tmp/large', function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    })

}
