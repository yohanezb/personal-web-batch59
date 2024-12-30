const projects = [];

function addProject(event) {
  event.preventDefault();
  const inputProjectTitle = document.getElementById("input-project-title").value;
  const inputProjectDescription = document.getElementById("input-project-description").value;
  const inputProjectImage = document.getElementById("input-project-image").files;
  const inputStartDate = new Date(document.getElementById("input-project-start-date").value);
  const inputEndDate = new Date (document.getElementById("input-project-end-date").value);
 
  const selectedTechnologies = [];
  if (document.getElementById("node-js").checked) {
    selectedTechnologies.push("NODE-JS");
  }
  if (document.getElementById("next-js").checked) {
    selectedTechnologies.push("NEXT-JS");
  }
  if (document.getElementById("react-js").checked) {
    selectedTechnologies.push("REACT-JS");
  }
  if (document.getElementById("type-script").checked) {
    selectedTechnologies.push("TYPESCRIPT");
  }

  const duration = Math.floor((inputEndDate - inputStartDate) / (1000 * 60 * 60));

  
  const image = URL.createObjectURL(inputProjectImage[0]);

  const project = {
    title: inputProjectTitle,
    description: inputProjectDescription,
    createdAt: new Date(),
    image: image,
    duration : duration,
    technologies : selectedTechnologies,
    startDate : inputStartDate,
    endDate : inputEndDate, 
  };

  projects.unshift(project);
  renderProject();
}

function renderProject() {
  let html = ``;

  for (let index = 0; index < projects.length; index++) {
    html += `<div class="project-list-item card mb-3 p-3" style="width: 300px; border: 2px solid #343a40;">
          <div class="project-image">
          <a href="project-detail.html">
            <img src="{${projects[index].image}}" class="card-img-top" alt="" style="height: 200px; object-fit: cover;" />
          </a>
            </div>
          <div class="card-body d-flex flex-column p-0">
            <h2 class="card-title" style="margin: 0">
              <a href="project-detail.html" target="_blank" class="text-dark" style="text-decoration: none">${projects[index].title}</a>
            </h2>
            <div class="detail-project-description">
                ${getFullTime(projects[index].createdAt)} || Yohanes Budhy Andryanto
            </div>
            <div class="detail-project-description">
              ${getDistanceTime(projects[index].createdAt)}
            </div>
            <div class="detail-project-description">
              ${new Date(projects[index].startDate).toLocaleDateString()} - ${new Date(projects[index].endDate).toLocaleDateString()} (${projects[index].duration} days)
            </div>
            <div class="detail-project-description">
              <p><strong>Technologies:</strong> ${projects[index].technologies.join(', ')}</p>
            </div>
            <p class="card-text">
              ${projects[index].description}
            </p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between">
                <button class="btn btn-secondary" style="width: 48%; background-color: #343a40; border-color: #343a40;">Edit Post</button>
                <button class="btn btn-secondary" style="width: 48%; background-color: #343a40; border-color: #343a40;" onclick="deleteProject(${index})">Delete Post</button>
              </div>
            </div>
          </div>
        </div>`;
  }

  document.getElementById("descriptions").innerHTML = html;
}

function deleteProject(index) {
  projects.splice(index, 1);
  renderProject();
}

function getFullTime(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const tanggal = date.getDate();
  const bulan = months[date.getMonth()];
  const tahun = date.getFullYear();

  let jam = date.getHours();
  let menit = date.getMinutes();

  if (jam < 10) {
    jam = "0" + jam;
  }

  if (menit < 10) {
    menit = "0" + menit;
  }

  return `${tanggal} ${bulan} ${tahun} ${jam}:${menit} WIB`;
}

function getDistanceTime(timePost) {
  const timeNow = new Date();
  const distance = timeNow - timePost;

  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 60) {
    return `${hours} hours ago`;
  } else if (day < 24) {
    return `${day} day ago`;
  }
}

