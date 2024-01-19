const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");

const gitrepo = document.querySelector("#gitrepo");

const searchBox = document.querySelector("#search");
const loader = document.querySelector("#loader");

const getUser = async (username) => {
    showUserLoader();
    try {
        const response = await fetch(APIURL + username);
        const data = await response.json();
        const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <a href="${data.html_url}" style="color:#01fbff;" target="_blank">GitHub Profile</a>
            </div>
        </div>
    `

    const gitrep = `
        <div id="repos" style="margin-left: 10rem; margin-right: 10rem; justify-content: center">
             
        </div>
    `

    main.innerHTML = card;
    gitrepo.innerHTML = gitrep;
    getRepos(username)
        
    } finally {
        hideUserLoader();
    }
};


// init call
// getUser("Aditya6112")

// const getRepos = async (username) => {
//     const repos = document.querySelector("#repos")
//     const response = await fetch(APIURL + username + "/repos")
//     const data = await response.json();
//     data.forEach(
//         (item) => {

//             const elem = document.createElement("a")
//             elem.classList.add("repo")
//             elem.href = item.html_url
//             elem.innerHTML = `<h3>${item.name}</h3>
//             <p>Description:- ${item.description}</p>
//             <div style="margin-top:1rem;">
//             <p style="display:inline;padding:4px;color:red; border: 1px solid red;">${item.language}</p>
            
//             </div>`
//             elem.target = "_blank"
//             repos.appendChild(elem)
//         }
//     )
// }

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}


searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit()
    }
)

let currentPage = 1;
let itemsPerPage = 10;

const changePerPage = () => {
    const perPageSelect = document.getElementById("perPage");
    itemsPerPage = parseInt(perPageSelect.value);
    currentPage = 1; 
    getRepos("Aditya6112", currentPage);
};

const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        getRepos("Aditya6112", currentPage);
    }
};

const nextPage = () => {
    currentPage++;
    getRepos("Aditya6112", currentPage);
};

const getRepos = async (username, page) => {
    const repos = document.querySelector("#repos");

    // Show loader
    loader.style.display = "inline-block";

    try {
        const response = await fetch(`${APIURL}${username}/repos?page=${page}&per_page=${itemsPerPage}`);
        const data = await response.json();

        // Clear previous content
        repos.innerHTML = "";

        data.forEach((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerHTML = `<h3>${item.name}</h3>
                <p>Description: ${item.description}</p>
                <div style="margin-top:1rem;">
                    <p style="display:inline;padding:4px;color:red; border: 1px solid red;">${item.language}</p>
                </div>`;
            elem.target = "_blank";
            repos.appendChild(elem);
        });
    } finally {
        // Hide loader regardless of success or failure
        loader.style.display = "none";
    }
};

// show the loader during getUser API call
const showUserLoader = () => {
    loader.style.display = "inline-block";
};

// hide the loader after getUser API call
const hideUserLoader = () => {
    loader.style.display = "none";
};

// initial call
getRepos("Aditya6112", currentPage);