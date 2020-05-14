console.log('Request data');

// setTimeout(() => {
//     console.log('Preparing data');
//
//     const backendData = {
//         server: 'aws',
//         port: 2000,
//         status: 'working'
//     };
//
//     setTimeout(() => {
//         backendData.modified = true;
//         console.log('Data received', backendData)
//     }, 2000)
// }, 2000)

// const p = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         console.log('Preparing data...');
//         const backendData = {
//             server: 'aws',
//             port: 2000,
//             status: 'working'
//         };
//         resolve(backendData)
//     }, 2000);
// });
//
// p.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             data.modified = true;
//             resolve(data)
//             // reject(data) //обработка ошибки
//         }, 2000)
//     });
//
//     // p2.then(finalData => console.log('Data received', finalData))
// }).then(finalData => { //chain promises
//     finalData.fromPromise = true;
//     return finalData
// }).then((changedData) => {
//     console.log('Modified', changedData)
// }).catch(err => console.error('Error: ', err))
//     .finally(() => {
//         console.log('Finally')
//     });


const sleep = ms => new Promise(resolve => setTimeout(() => {
    console.log(ms);
    resolve()
}, ms));

// sleep(2000).then(() => console.log('After 2 sec'));
// sleep(3000).then(() => console.log('After 3 sec'));

Promise.all([sleep(2000), sleep(5000)]).then(() => {
    console.log('All promises')
});

Promise.race([sleep(2000), sleep(5000)]).then(() => {
    console.log('Race promises')
}); //рабатывает по самому первому resolve