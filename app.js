require("dotenv").config();
require("./libs/hbs-helper");
const { Sequelize, QueryTypes, Model } = require("sequelize");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const config = require("./config/config");
const environment = process.env.NODE_ENV;
const sequelize = new Sequelize(config[environment]);

app.set("view engine", "hbs")


//publication
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/views", express.static("views"));
app.use(express.urlencoded({ extended: true }));



// routing page
app.get("/", home);
app.get("/myProject", project);
app.get("/project-detail", projectDetail);
app.get("/testimonial", testimonial);
app.get("/contact", contact);
app.get("/edit-project/:index", editProject);
app.get("/project-detail/:index", projectDetail);




//project
app.post("/myProject", postProject);
app.post("/delete-project/:index", deleteProject);
app.post("/edit-project/:index", postEditedProject);


const projects = [];


async function postProject(req, res) {
  const { title, description, startDate, endDate, technologies } = req.body;
  let errors = [];

  if (!title) errors.push("Title is required.");
  if (!description) errors.push("Description is required.");
  if (!startDate) errors.push("Start date is required.");
  if (!endDate) errors.push("End date is required.");
  if (!technologies) errors.push("At least one technology must be selected.");
  
  if (errors.length > 0) {
    res.render("myProject", { errors, projects});
  } else {


  const dummyImage = "https://picsum.photos/200/300"
  const selectedTechnologies = Array.isArray(technologies) ? technologies : [technologies]
  const query = `INSERT INTO projects(title, description, image, technologies, start_date, end_date) VALUES('${title}', '${description}', '${dummyImage}', '${selectedTechnologies}', '${startDate}', '${endDate}') RETURNING *`;
  const [addedData] = await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect(`/project-detail/${addedData[0].id}`);

}
}

//for delete
async function deleteProject(req, res) {
  const {index} = req.params;

  const query = `DELETE FROM projects WHERE id = '${index}'`;
  const [executeQuery] = await sequelize.query(query)
  const data = formatProjectData(executeQuery)[0]
  projects.splice(data, 1);

  res.redirect("/myProject");
}
//for edit
async function editProject(req, res) {
  const {index} = req.params;
  const query = `SELECT * FROM projects WHERE id = '${index}'`;
  const [executeQuery] = await sequelize.query(query)
  const data = formatProjectData(executeQuery)[0]
  res.render("edit-project", data);
}

//for post edited project
async function postEditedProject(req, res) {

  const {index} = req.params;
  const {title, description, startDate, endDate, technologies} = req.body;



  const dummyImage = "https://picsum.photos/200/300"
 const selectedTechnologies = Array.isArray(technologies) ? technologies.join(", ") : technologies;
  const query = `
  UPDATE projects SET
  title = :title, 
  description = :description, 
  technologies = :technologies, 
  start_date = :start_date, 
  end_date = :end_date 
  WHERE id = :id
  `;

  await sequelize.query(query, {
    replacements: {
      title,
      description,
      image: dummyImage,
      technologies: selectedTechnologies,
      start_date: startDate,
      end_date: endDate,
      id: index
    }
  });

  console.log("Updated project data:", {
    title,
    description,
    image: dummyImage,
    technologies: selectedTechnologies,
    start_date: startDate,
    end_date: endDate
  });

  res.redirect("/myProject")
}

//for rendering
async function home(req, res) {
  const query = `SELECT * FROM projects`;
  const [executeQuery] = await sequelize.query(query)
  const data = formatProjectData(executeQuery)  
  res.render("index", {data});
}

function formatProjectData(projects) {
  return projects.map(project => ({
    ...project,
    technologies: project.technologies.split(',').map(tech => tech.trim()),
  }));
}

async function project(req, res) {
  const query = `SELECT * FROM projects`;
  const [executeQuery] = await sequelize.query(query)
  const data = formatProjectData(executeQuery)

  res.render("myProject", {data});
}
async function projectDetail(req, res) {
  const {index} = req.params;

  const query = `SELECT * FROM projects WHERE id = '${index}'`;
  const [executeQuery] = await sequelize.query(query)
  const data = formatProjectData(executeQuery)[0]

  if (!data) {
    return res.status(404).send("Project not Found");
  }
  res.render("project-detail", data);
}

function testimonial(req, res) {
  res.render("testimonial");
}
function contact(req, res) {
  res.render("contact");
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});