# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 1 `npm install`

Install all the necessary libraries

## Available Scripts

In the project directory, you can run:

### 2 `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### 3 Redux Setup
This Project is using latest version of redux and reduxjs/toolkit

reduxjs/toolkit comes with all the neccessary libaries to create a reducer in a simple way and easy to maintainance

Redux state is used for authorization, Loading, Book and user management screens.
Redux state for each function are listed under src/data-manage/feautres

This project is using Typescript so we will not be feeding unwanted data into the redux store

Store is initialized in App Component

### 4 Project Structure
src/components - consits of small ui resuable components
src/datamanage - includes redux store, models (Interfaces and types) and main store function
src/services - fetching data from json file and formating data for the graphs
src/utils - customtheme for the project and event types and constants
src/views - analytics page
src/views/book - book management page
src/views/login - login page
src/view/user - user page
src/index - for main inital design page and routing
src/layout - for child routed components and layout
public/data - this folder contains initail json data which will be used to serve the data for books and users from bookdata.json and userdata.json respectively

### 5 Implementation

- This project uses Material UI component, Redux, Router, react-chartjs-2 as main libraries and all the components are build on Typescript
- For user and book management i have implemented sorting, pagination and editing
- For Deleting it is inline action and for adding new user or book or editing the them is done throug Dialog or we call modal popup
- While editing or Creating new record basic validation with approriate error message to the users have been implemented
- This project also supports authorized and authorization based on user role and name.
- Routes has also been configured based on authorization
- Public access, Authorized/Authorization redirect to Login page if user in not logged in
- Main App Bar has all the required links for navigation and under user icon

### 6 Scalability

- Since whole app is build on Typescript there are very minimal chance of breaking the app based on data. However few functional logics are missing from required.
- This App helps to add/remove any new data to users or books and it can be done by very few lines of code


#### a Layout



