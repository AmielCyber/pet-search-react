# Pet Search
A website to find available pets for adaption within a zip code.
Website was made with React and ASP.NET Web Api. 

React application deployed at Netlify and server deployed on Azure.

## Live Demo
**Note:** Website may take ~5 seconds on initial load. Long initial loading time is due to
a [cold start](https://azure.microsoft.com/en-us/blog/understanding-serverless-cold-start/)
where the server and the database are being instantiated after being inactive for more than 10 minutes.
I may upgrade in the future to have the server "always on" at Azure.

[React Application Live Demo](https://pet-search-react.netlify.app)

[ASP.NET Swagger UI](https://pet-search.azurewebsites.net/swagger/index.html)

## Preview
![Desktop Preview](/Assets/DesktopPreview.gif)

![Mobile Preview](/Assets/MobilePreview.gif)

## Technology Stack
* C# and [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet)
* Typescript and [React](https://react.dev) with [Vite](https://vitejs.dev)
* Entity Framework
* MySQL
* Azure Web App deployment
* OpenApi/Swagger
* React Router
* Material UI

## Local Development Set Up

### Required Dependencies

* [Node.js](https://nodejs.org/en)


### Running the Production Build
1. Clone this repository: 
```bash
git clone https://github.com/AmielCyber/pet-search-react
```
2. After cloning this repository, go to the repository directory:
```
cd pet-search-react
```

#### ASP.NET Setup
Instructions can be found in the repository for the ASP.NET application:
https://github.com/AmielCyber/PetSearch

### Running in Development

#### Setup React

1. Go to the frontend application or the React project: 
```
cd pet-search-react
```
2. Install npm dependencies: 
```
npm install
```
3. Test the application: 
```
npm run test
```
4. Build the application:
```
npm run build
```

#### Configure React
1. Go to the React application directory: 
```
cd /pet-search-react
```
2. Change the port inside the file: `.env.development` to the port that **your** ASP.NET application is using.

#### Run the React Application
`npm run dev`
