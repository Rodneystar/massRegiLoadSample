const request = require('http').request

function doReq(options, postData){

return new Promise(function( resolve, reject) {
    var req = request(options, (res) => {
        res.setEncoding('utf8')
        let data = ""
        res.on('data', (chunk) => {
            data += chunk
        })
        res.on('end', () => {
            resolve(data)
        })
    })
    req.on('error', (e) => {
        reject(`${e.message}`)
    })

    req.write(JSON.stringify(postData));
    req.end()
})
    
}

module.exports = doReq;