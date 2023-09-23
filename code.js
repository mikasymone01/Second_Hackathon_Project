function dummyData() {
  localStorage.clear;
  //localStorage.setItem("userMajor", "Computer Science");
  localStorage.setItem("userLocation", "Virginia");
  getRecommendedJobs();
}

function setSearchVars(jobText, locationText) {
  console.log("storing values");
  localStorage.setItem("jobText", jobText);
  localStorage.setItem("locationText", locationText);
}

function checkSearchVars() {
  console.log("checking values");
  let jobName = localStorage.getItem("jobText");
  let locationName = localStorage.getItem("locationText");
  if (jobName != null) {
    loadAPI(jobName, locationName, false);
    localStorage.clear();
  }
}

//Checks local storage for user data and gives reccommendations based off of that
function getRecommendedJobs() {
  let keyword = localStorage.getItem("userMajor");
  let location = localStorage.getItem("userLocation");
  if (keyword == null) {
    let container = document.getElementById("recommendedJobs");
    var logInForRecs = document.createElement("h4");
    logInForRecs.textContent = "Login to get Suggested Jobs ";
    logInForRecs.style.color = "#eebbc3";
    container.appendChild(logInForRecs);
  } else {
    loadAPI(keyword, location, true);
  }
  console.log("getting recs");
}

function loadAPI(jobName, location, recommend) {
  var url = "https://jooble.org/api/";
  var key = "d0ce48e2-4576-4a34-8ddc-f2f824cdb301";
  var params = "{ keywords: '" + jobName + "', location: '" + location + "'}";
  var jsonData;

  //create xmlHttpRequest object
  var http = new XMLHttpRequest();
  //open connection. true - asynchronous, false - synchronous
  http.open("POST", url + key, true);

  //Send the proper header information
  http.setRequestHeader("Content-type", "application/json");

  //Callback when the state changes
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log(http.responseText);
      jsonData = JSON.parse(http.responseText);
      if (recommend) {
        loadRecommended(jsonData);
      } else {
        loadTables(jsonData);
        console.log(jsonData);
      }
    }
  };
  //Send request to the server
  http.send(params);
}
function loadRecommended(jobData) {
  let container = document.getElementById("recommendedJobs");
  if (container.childElementCount > 0) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  var count;
  console.log(jobData);
  if (jobData.jobs.length < 5) {
    count = jobData.jobs.length;
  } else {
    count = 5;
  }
  for (var i = 0; i < count; i++) {
    console.log(jobData.jobs[i]);
    var jobs = jobData.jobs[i];
    let card = document.createElement("div");

    card.className = "rec-card";

    let card_body = document.createElement("div");
    card_body.className = "rec-card-body";

    let card_title = document.createElement("h3");
    card_title.className = "rec-card-title";

    let card_subtitle = document.createElement("h4");
    card_subtitle.className = "card-subtitle";

    let link = document.createElement("a");

    let card_company = document.createElement("h4");
    card_company.className = "card-company";
    card_company.style.fontSize = "20px";

    let vals = Object.values(jobs);
    vals[5] = "dIN";
    vals[8] = "dIN";
    vals[9] = "dIN";
    console.log("printing vals");
    console.log(vals);

    vals.forEach((elem) => {
      if (elem != "dIN") {
        if (elem == vals[0]) {
          card_title.textContent = elem;
        }
        if (elem == vals[1]) {
          card_subtitle.textContent = elem;
        }
        if (elem == vals[6]) {
          link.setAttribute("href", elem);
          link.setAttribute("target", "_blank");
        }
        if (elem == vals[7]) {
          card_company.textContent = elem;
        }
        card_body.appendChild(card_title);
        card_body.appendChild(card_company);
        card_body.appendChild(card_subtitle);
        link.appendChild(card_body);

        card.appendChild(link);
        container.appendChild(card);
      }
    });
  }
}

function loadTables(jobData) {
  let container = document.getElementById("container1");
  if (container.childElementCount > 0) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  jobData.jobs.forEach((item) => {
    let card = document.createElement("div");

    card.className = "my-card";

    let card_body = document.createElement("div");
    card_body.className = "my-card-body";

    let card_title = document.createElement("h3");
    card_title.className = "my-card-title";
    let card_subtitle = document.createElement("h4");
    card_subtitle.className = "my-card-subtitle";

    let card_text = document.createElement("p");
    card_text.className = "my-card-text";
    let link = document.createElement("a");

    let card_company = document.createElement("h4");
    card_company.className = "my-card-company";
    card_company.style.fontSize = "20px";

    let vals = Object.values(item);
    vals[5] = "dIN";
    vals[8] = "dIN";
    vals[9] = "dIN";
    console.log("printing vals");
    console.log(vals);

    vals.forEach((elem) => {
      if (elem != "dIN") {
        if (elem == vals[0]) {
          card_title.textContent = elem;
        }
        if (elem == vals[1]) {
          card_subtitle.textContent = elem;
        }
        if (elem == vals[2]) {
          card_text.innerHTML = elem;
        }
        if (elem == vals[6]) {
          link.setAttribute("href", elem);
          link.setAttribute("target", "_blank");
        }
        if (elem == vals[7]) {
          card_company.textContent = elem;
        }
        card_body.appendChild(card_title);
        card_body.appendChild(card_company);
        card_body.appendChild(card_subtitle);
        card_body.appendChild(card_text);
        link.appendChild(card_body);

        card.appendChild(link);
        container.appendChild(card);
      }
    });
  });
}
