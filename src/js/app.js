// Constants
const API_KEY = "AIzaSyDF6jv_sduRNfgj7Jpoq0hPDcIWeIMjuj8";
const RANDOM_VIDEO_KEYWORD = "programing";

// Function to fetch random videos
function fetchRandomVideos() {
  var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${RANDOM_VIDEO_KEYWORD}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var videos = data.items;
      displayVideos(videos);
    })
    .catch(function (error) {
      console.log("Error fetching random videos:", error);
    });
}

// Function to handle search
function handleSearch() {
  var searchInput = document.getElementById("search_box");
  var searchQuery = searchInput.value.trim();

  if (searchQuery !== "") {
    var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${searchQuery}`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var videos = data.items;
        displayVideos(videos);
      })
      .catch(function (error) {
        console.log("Error fetching videos:", error);
      });
  } else {
    fetchRandomVideos();
  }
}

// Call the fetchRandomVideos function initially to display random videos
fetchRandomVideos();

document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("search_btn");

  searchButton.addEventListener("click", function () {
    var searchTerm = document.getElementById("search_box").value;
    searchYouTubeVideos(searchTerm);
  });
});

function searchYouTubeVideos(searchTerm) {
  // Make an API request to the YouTube Data API

  // Sample request using Fetch API
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyDqmAtlUcgRZ_ejX71ofIhDCy2taxpJaTA`
  )
    .then((response) => response.json())
    .then((data) => {
      displayVideos(data.items);
      updateURL(searchTerm);
    })
    .catch((error) => console.log(error));
}
function displayVideos(videos) {
  var videoList = document.getElementById("video_list");
  videoList.innerHTML = "";

  if (Array.isArray(videos)) {
    videos.forEach(function (video) {
      var videoTitle = video.snippet.title;
      var videoId = video.id.videoId;

      var videoCard = document.createElement("div");
      videoCard.classList.add("col-md-6");
      videoCard.innerHTML = `
          <div class="video-card">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <h4>${videoTitle}</h4>
          </div>
        `;

      videoList.appendChild(videoCard);
    });
  } else {
    videoList.innerHTML = "<p>No videos found.</p>";
  }
}

function updateURL(searchTerm) {
  var encodedSearchTerm = encodeURIComponent(searchTerm);
  var newURL =
    window.location.origin +
    window.location.pathname +
    "?search=" +
    encodedSearchTerm;

  window.history.pushState({ path: newURL }, "", newURL);
}
