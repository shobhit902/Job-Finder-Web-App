const search = document.getElementById("search-input");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading-spinner");

searchBtn.addEventListener("click", fetchJob);

async function fetchJob() {
  const input = search.value.trim().toLowerCase();

  if (input === "") {
    alert("Please enter a job category before searching.");
    return;
  }

  try {
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?search=${input}`
    );

    if (!response.ok) {
      throw new Error("Job Not Found");
    }
    const data = await response.json();
    console.log(data);

    const jobs = data.jobs;
    console.log(jobs);
    displayJobs(jobs);
  } catch (error) {
    console.log(error.message);
  }
}

function displayJobs(jobs) {
  const resultSection = document.getElementById("result-section");
  resultSection.innerHTML = "";

  if (jobs.length === 0) {
    resultSection.innerHTML = `<p>No matching jobs found</p>`;
    return;
  }
  jobs.forEach((job) => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
    <h3>${job.title}</h3>
    <p><strong>Company:</strong> ${job.company_name}</p>
    <p><strong>Location:</strong> ${job.candidate_required_location}</p>
    <a href="${job.url}" target="_blank">Apply</a>
    <button class = "saved-btn">Save Job</button>
    `;

    const saveBtn = card.querySelector(".saved-btn");
    saveBtn.addEventListener("click", () => {
      savedJobToLocalStorage(job);
      showToast();
    });
    resultSection.appendChild(card);
  });
}

function savedJobToLocalStorage(job) {
  let saved = JSON.parse(localStorage.getItem("savedjobs")) || [];
  saved.push(job);
  localStorage.setItem("savedjobs", JSON.stringify(saved));
  alert("Job saved!");
}

function showToast() {
  const show = document.getElementById("toast");
  show.style.display = "block";

  setTimeout(() => {
    show.style.display = "none";
  }, 2000);
}

function viewSavedJobs() {
  const collapsePanel = document.getElementById("collapse-panel");
  collapsePanel.innerHTML = "";

  const saved = JSON.parse(localStorage.getItem("savedjobs")) || [];

  if (saved.length === 0) {
    collapsePanel.innerHTML = "<p>No saved jobs yet.</p>";
    return;
  }
  saved.forEach((job, index) => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
      <div class = "header">
      <p class = "textcontent">Saved Job</p>
      <button class = "delete" > Remove Job </button>
      </div>
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company_name}</p>
      <p><strong>Location:</strong> ${job.candidate_required_location}</p>
      <a href="${job.url}" target="_blank">Apply</a>
    `;
    card.querySelector(".delete").addEventListener("click", () => {
      removeJob(index);
    });

    collapsePanel.appendChild(card);
  });
}
function removeJob(index) {
  let saved = JSON.parse(localStorage.getItem("savedjobs")) || [];
  saved.splice(index, 1);

  localStorage.setItem("savedjobs", JSON.stringify(saved));
  viewSavedJobs();
}
document.getElementById("view-btn").addEventListener("click", viewSavedJobs);
