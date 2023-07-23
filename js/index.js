//Headers Accept: application/vnd.github.v3+json

const baseUrl = "https://api.github.com/users";
const ghForm = document.getElementById("github-form");
const searchInputElement = document.getElementById("search");
const ghContainer = document.getElementById("github-container");
const ghUserList = document.getElementById("user-list");
const ghNameLi = document.createElement("li");
const ghUrlLi = document.createElement("li");
const ghImgElem = document.createElement("img");
const reposList = document.getElementById("repos-list");
let repoTitle = document.createElement("h4");
let gitHubName;
//data:
//avatar_url, url, name, blog, email

addGetUserByGitNameListener();
addRepoListener();

function addRepoListener() {
  ghImgElem.addEventListener("click", () => {
    fetch(`${baseUrl}/${gitHubName}/repos`)
      .then((res) => res.json())
      .then((data) => renderRepos(data));
  });
}

function renderRepos(repoRes) {
  if (repoTitle.innerText === "User Repositories") {
    repoTitle.innerText = "User Repositories:";
    ghUserList.after(repoTitle);
  }
  for (let item in repoRes) {
    let repoLi = document.createElement("li");
    repoLi.innerText = repoRes[item]["name"];
    reposList.appendChild(repoLi);
  }
}

function addGetUserByGitNameListener() {
  ghForm.addEventListener("submit", (e) => {
    e.preventDefault();
    gitHubName = searchInputElement.value.toLowerCase();
    fetch(`${baseUrl}/${gitHubName}`)
      .then((res) => res.json())
      .then((data) => renderGitUser(data));
  });
}

function renderGitUser(data) {
  ghImgElem.src = data["avatar_url"];
  ghNameLi.innerText = `GitHub Name: ${data["name"]}`;
  ghUrlLi.innerText = `GitHub Link: ${data["url"]}`;
  ghContainer.parentElement.append(ghImgElem);
  ghUserList.appendChild(ghNameLi);
  ghUserList.appendChild(ghUrlLi);
}
