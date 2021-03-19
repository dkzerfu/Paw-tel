# Paw-tel

## Description

Paw-tel is a full-stack application utiltizing MERN. In this application, users are able to create profiles for their pets, view housing options, and assign their pets in a "home-away-from-home" of their choosing.

## User Stories

* As a user (AAU) I want to be able to create, edit or delete a profile for my pet with their needs (medicines, care guidelines etc)
* (AAU) I want to be able to be able to find an appropriate “pet air bnb” for my pet. 
* (AAU) I want to be able to browse and favorite hotel profiles.
* (AAU) I want to be able to search by location and by air bnb specialty

## Group Roles

### Dagm

### Kathy

### Louisa

## Sprints

#### Friday 3/19/21
* Test APIs
* Complete ReadMe - Routes, schemas
* Assign roles

#### Monday 3/22/21

#### Tuesday

#### Wednesday

#### Thursday

#### Friday

## Routes
### User RESTful routing chart
| Method | URL | Functionality | view |
|--------|-----|---------------|------|
| GET | localhost:3000/api-v1/users | show all users | redirect to /users
| POST  | localhost:3000/api-v1/users/register | create new user |  redirect to '/'
| GET | localhost:3000/api-v1/users/login | show log in page | render to /user/login
| POST | localhost:3000/api-v1/users/login | login user | redirect to '/profile'


## Database Schema

## Technologies and APIs

#### Technologies

* Front-end: React
* Backend: Mongoose, MongoDB, Express, NodeJS, bcryptjs,jsonwebtoken

#### APIs
* https://thedogapi.com/ (10k requests/month)
* https://dog.ceo/api/breeds/list/all

## Stretch Goals

* Users can leave reviews
* A user can create a profile as a “hotel/airbnb”
* Include an API for actual pet hotels 
* Skeleton

## Resources