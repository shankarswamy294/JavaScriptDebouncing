import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Debouncing!</h1>
<div>
  <input id="search" type="text" placeholder="search...."/>
  <div class="details"></div>
</div>
`;

let data;

const fetchMovies = async (search) => {
  await fetch(`https://www.omdbapi.com/?apikey=3ccb2a6c&s=${search}`)
    .then((response) => response.json())
    .then((data) => {
      appendData(data);
    })
    .catch((err) => {
      console.log({ err });
    });
};

const appendData = (data) => {
  let details = document.querySelector(".details");
  details.innerHTML = "";
  let ul = document.createElement("UL");
  data &&
    data.Search &&
    data.Search.map((movie) => {
      let li = document.createElement("LI");
      li.innerHTML = movie.Title;
      ul.appendChild(li);
    });
  details.appendChild(ul);
};

const debounce = (func, limit) => {
  let timmer;
  return function () {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      fetchMovies(searchbox.value);
    }, limit);
  };
};

let searchbox = document.getElementById("search");
searchbox.style.padding = "5px";
searchbox.addEventListener("keydown", debounce(fetchMovies, 300));
