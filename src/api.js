const API_URL = 'https://jsonplaceholder.typicode.com/posts';

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    let stringifiedData = JSON.stringify(data);
    document.querySelector('#posts').innerHTML = stringifiedData;
    localStorage.setItem('posts', stringifiedData);
  });
