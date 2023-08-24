# Welcome to Coffeebook!


<a href="https://coffeebook.onrender.com/" target="_blank">Visit the live site!</a>

## Introduction

Coffeebook is a fullstack clone of the popular social media website, Facebook. It's a platform for coffee lovers to connect and share their passion for all things related to coffee. Whether you're a casual drinker or a connoisseur, Coffeebook offers a space to express your love for coffee, discover new brews, and connect with a vibrant community of caffeine enthusiasts!

<img width="700" alt="Sign In Page" src="https://github.com/ashleyjek/Coffeebook/assets/132113558/e2fdd3e2-c57b-4474-bd8d-0e0110487e0b">

## Technology

* Languages: Javascript, Ruby, HTML, CSS
* Frontend and State management: React, React Redux
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)

## Features

### Login/Sign Up
Users cannot access the website and will be redirected to the login/sign up page unless logged in.

### Newsfeed, Navigation
Users can access all posts and comments on the newsfeed, along with a list of friends.

### Posts, Comments
Users have the ability to create, edit, and delete their own posts and comments. 
These options are exclusively available to the author of the respective post or comment. 

<img src="https://github.com/ashleyjek/Coffeebook/assets/132113558/0a68f155-35f2-4be1-9888-62ae79c5916e" width="700">


<img src="https://github.com/ashleyjek/Coffeebook/assets/132113558/be336c71-946a-4916-8898-573b8efb38fe" width="700">

### Likes
Users can like or unlike any post or comment regardless of the author.

<img src="https://github.com/ashleyjek/Coffeebook/assets/132113558/d30b07c3-aa16-49c6-9c79-fc5f55eb199c" width="700">

### Profiles
User show page contains posts authored by the profile owner and friends. 
Only friends may add new posts on the profile, while the profile owner retains the exclusive right to edit their bio, profile photo, and cover photo.

<img src="https://github.com/ashleyjek/Coffeebook/assets/132113558/99849b60-03ad-488e-8d90-265bd77c466b" width="700">

### Friends
Users can add or remove friends.

<img src="https://github.com/ashleyjek/Coffeebook/assets/132113558/b875d883-1443-4538-8058-13246ce9a116" width="700">

### Search 
Users can search for other users.

<img src="https://github.com/ashleyjek/Coffeebook/assets/132113558/4e9fcacb-cd0e-4f38-b317-528f8ae8e75d" width="700">

## Code Snippets

### Search Users

The search feature in the nav bar will search users by first or last name. A debounce function has been implemented to prevent the search from being processed until the user has ceased typing for 300ms.

The outsideAlerter function is being utilized to create a reference on the input to close the results dropdown when the user clicks outside of the input. Clicking on a search result in the dropdown will redirect the user to the selected user's profile.

<img width="700" alt="snap2" src="https://github.com/ashleyjek/Coffeebook/assets/132113558/325f6a50-4838-483e-9dd7-c609bed7a582">

<img width="700" alt="snap1" src="https://github.com/ashleyjek/Coffeebook/assets/132113558/d8d915f8-b012-4e95-a7d5-23fe426ec470">

### Future Implementation

* Friend requests and notifications
* Nested comments



