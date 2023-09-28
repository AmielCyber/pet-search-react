# Pet Search
A website to search available pets for adaption within a given zip code. Users can enter a zipcode or share their 
location with the browser to locate their zipcode. 

Website was made with React and ASP.NET Web Api. React application hosted at Netlify and ASP.NET Web API hosted at
Microsoft Azure. 

[Pet Search ASP.NET Application GitHub Repository](https://github.com/AmielCyber/PetSearch)

## Live Demo
**Note:** 
Pet list or zipcode retrieval may take around 10 seconds during a 
[cold start](https://azure.microsoft.com/en-us/blog/understanding-serverless-cold-start/cold) when the server is 
reactivated after 10 minutes of inactivity. I'm considering upgrading the server to 'always on' on Microsoft Azure in 
the future.

[React Application Live Demo](https://pet-search-react.netlify.app)

[ASP.NET Swagger UI](https://pet-search.azurewebsites.net/swagger/index.html)

## Preview
![Desktop Preview](/Assets/DesktopPreview.gif)

![Mobile Preview](/Assets/MobilePreview.gif)

## Technology Stack
<div style="display: flex; flex-wrap: wrap; gap: 5px">
    <img alt="React" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>
    <img alt="TypeScript" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"/>
    <img alt="Jest" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"/>
    <img alt="HTML" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"/>
    <img alt="CSS" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"/>
    <img alt="JavaScript" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
    <img alt="C Sharp" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"/>
    <img alt="Dotnet Core" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"/>
    <img alt="Azure" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"/>
    <img alt="MySQL" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"/>
</div>

### Frontend Application
* [React](https://react.dev) with TypeScript and [Vite](https://vitejs.dev)
* Tested with ViTest/Jest and React Testing Library
* React Router
* Material UI
* Netlify Deployment

### Backend Application
* C# and [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) Web API
* Tested with Xunit
* Microsoft Azure Web App Deployment
* MySQL
* OpenApi/Swagger
* PetFinder API
* MapBox Geolocation API

## Local Development Set Up

### Required Dependencies

* [Node.js](https://nodejs.org/en)


### Running the Production Build
1. Clone this repository: 
```bash
git clone https://github.com/AmielCyber/pet-search-react
```
2. After cloning this repository, go to the repository directory:
```bash
cd pet-search-react
```

#### ASP.NET Setup
Instructions can be found in the repository for the ASP.NET application:
https://github.com/AmielCyber/PetSearch

### Running in Development

#### Setup React

1. Go to the frontend application or the React project: 
```bash
cd pet-search-react
```
2. Install npm dependencies: 
```bash
npm install
```
3. Test the application: 
```bash
npm run test
```
4. Build the application:
```bash
npm run build
```

#### Configure React
1. Go to the React application directory: 
```bash
cd /pet-search-react
```
2. Change the port inside the file: `.env.development` to the port that **your** ASP.NET application is using or your
server of your choice.

#### Run the React Application
```bash
npm run dev
```
