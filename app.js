const inquirer = require('inquirer');

const promptUser = () => {
return inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        }
        else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your Github (Required)');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    }
  ]);
};

const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
  =================
  Add a New Project
  =================
  `)
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (required)',
      validate: projectName => {
        if (projectName) {
          return true;
        } else {
          console.log('Please enter a project name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Please enter a project description');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: projectLink => {
        if (projectLink) {
          return true;
        } else {
          console.log('Please enter a project link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  })
};

promptUser()
// .then(answers => console.log(answers))
.then(promptProject)
.then(projectAnswers => console.log(projectAnswers));
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', generatePage(name,github), err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out the index.html file to see the output!');
// });