const search = document.getElementById("search-input");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", fetchJob);

async function fetchJob() {
  const input = search.value.trim().toLowerCase(); // normalize input
  try {
    const response = await fetch(" https://remotive.com/");

    if (!response.ok) {
      throw new Error("Job Not Found");
    }

    const data = await response.json();
    console.log(data);
    
    const jobs = data.data;

  } catch (error) {
    console.log(error.message);
  }
}

