const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}

delay(2000).then(() => console.log('2 sec'))

//https://jsonplaceholder.typicode.com/ добный сервис для имитации REST API

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// function fetchToDos() {
//     console.log('Fetch todo started...')
//     return delay(2000)
//         .then(() => fetch(url))
//         .then(response => response.json())
// }
//
// fetchToDos()
//     .then((data) => {
//         console.log('Data', data)
//     })
//     .catch(err => console.log(err))

async function fetchAsyncToDos() {
    console.log('Fetch todo started...')
    try{
        await delay(2000);
        const response = await fetch(url);
        const data = await response.json();
        console.log('DATA', data);
    } catch (e) {
        console.log(e);
    } finally {
        console.log('FINALLY');
    }

}

fetchAsyncToDos().then()