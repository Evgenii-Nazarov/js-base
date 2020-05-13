console.log('Start');

console.log('Start 2');

function time2sec () {
    console.log('timeout2sec')
}

window.setTimeout(function () {
    console.log('Inside timeout')
}, 2000)

window.setTimeout(function () {
    console.log('Inside timeout')
}, 0) //все равно идет в Callback Queue

setTimeout(time2sec, 2000)

console.log('End')