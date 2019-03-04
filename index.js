const doRequest = require('./client')
const { fromEvent } = require('rxjs')
const { flatMap, map } = require('rxjs/operators')
const fs = require('fs')
const lineReader = require('readline')


const reqOptions = {
    host: "localhost",
    port: "8080",
    method: "POST",
    path: "/"
}
function observeFile(name) {
    let lr = lineReader.createInterface( {
        input: fs.createReadStream(name)
    })
    return fromEvent(lr, 'line')
}

observeFile('./names')
        .pipe(
            map( line => {
                var [name, role] = line.split(',')
                return  { name, role }
            }),
            flatMap( obj => doRequest(reqOptions, obj))
        )
        .subscribe((theThing) => {
        console.log(JSON.parse(theThing))
    })
