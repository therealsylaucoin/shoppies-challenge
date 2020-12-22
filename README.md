# Shoppie Awards

Summer 2021 Front End Web Developer Intern Challenge

## Motivation
I recently finished the Web Development bootcamp at Juno College. I'm excited to keep learnign and growing, and finding the right role to do so is a priority for me. I want to be surrounded with people that I can learn from and that are excited to answer questions and share their knowledge.
As a former Shopifolk (Culinary Partnerships, laid off after Covid), I feel confident that an intership at Shopify can offer me the proper mentorship to grow exponentially into my new career path as a Web Developer. 

## About this project
This is my third app built in React, and my first one using Hooks with function components (rather that class components).
Web Development is still quite new to me, by I love trying new things and learnign from them. I took this challenge as a great opportunity to learn something new. 

Uses: Sass, React, OMDB REST api, Firebase RealTime Database

## Challenges:
The OMDB api returns "Error response: Too many results" (and undefined result) when the user has types only a few letters. 
The documentation for the api provides no parameter to limit the results. 
I tried using the page parameter, but that did not solve the error. 
After contacting a few folks on gitHub, it seems that this is simply the way the API returns results. At this time, I haven't found a solution/workaround, other than displaying the message to the user.

## Things to know:
The Submission functionality is not included in this project. Therefor, clicking on the submit button will have no effect on the data in firebase/on the page. The buttons are currently there for presentation/placeholders, and for hiding the banner.
    
## How does it work?
The user enters characters into the search input. On change, the input is saved and used to make an API call to OMDB. 
  
Results are rendered on the page. 
  
The user can click a "nominate" button to add the movie to their nominations. 
  
When the "nominate" button is slciked, that movie is pushed into a firebase database. 
  
Based on a comparison between the search result array, and the nominations array (firebase reference), a different button is rendered in the search results - Nominate (active) OR Added (disabled).
  
Once the user has chosen five nominations, the search field disapears and banner thanks the user for their nominations. 
  




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


