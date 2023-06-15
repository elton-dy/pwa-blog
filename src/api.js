const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_PER_PAGE = 10;
function displayPosts(data, page = 1) {
    const postsContainer = document.querySelector('#posts');
    postsContainer.innerHTML = '';


    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((post) => {
        const postCard = `
      <div class="p-9 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${post.body}</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>
    `;

        postsContainer.innerHTML += postCard;
    });
}

function displayPagination(data) {
    const totalPages = Math.ceil(data.length / POSTS_PER_PAGE);
    const paginationContainer = document.querySelector('nav ul');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const paginationElement = `
      <li>
        <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-page="${i}">${i}</a>
      </li>`;
        paginationContainer.innerHTML += paginationElement;
    }

    paginationContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if (target.tagName.toLowerCase() === 'a') {
            const pageNumber = parseInt(target.dataset.page, 10);
            displayPosts(data, pageNumber);
        }
    });
}

fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        displayPosts(data);
        displayPagination(data);
        localStorage.setItem('posts', JSON.stringify(data));
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        const cachedPosts = JSON.parse(localStorage.getItem('posts'));
        if (cachedPosts) {
            displayPosts(cachedPosts);
        }
    });

