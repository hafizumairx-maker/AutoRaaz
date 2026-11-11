# AutoRaaz

A Marketplace Front-End Prototype for buying and selling cars in Pakistan.

Version 2: Local Storage keys are now `autoraaz_*` (accounts, favourites,
ads, recently viewed, theme). Data saved by version 1 is not carried over,
so accounts and favourites saved in v1 need registering again.
The layout is also fixed for small phones, tablets and laptops.

This is a front-end demo only. There is no real marketplace and no backend.
All data is stored in the browser with Local Storage: user accounts,
favourites, recently viewed cars and ads you post are saved on your own
computer only.

## Run it locally

Open `index.html` in a browser, or run a small local server from this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## What it has

- Search and filters: city, price, fuel, transmission, year, and sort
- Featured Used Cars, New Cars, Bikes, Auto Store, Videos and Blog
- Car detail view with gallery, favourites and compare (up to 3 cars)
- Login and register, saved in Local Storage
- Post an Ad / Sell Your Car form, with edit and delete for your own ads
- Dark theme and a mobile menu

## Project structure

```
AutoRaaz/
  index.html       - all pages and views
  css/style.css    - all styles
  js/data.js       - car, bike, store, video and blog data
  js/app.js        - login, filters, favourites, compare, sell form
```

## Upload it to GitHub

1. Create a new repository on GitHub, for example `autoraaz`.
2. In this folder, run:

```
git init
git add .
git commit -m "Add AutoRaaz front-end prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/autoraaz.git
git push -u origin main
```

3. To publish it free with GitHub Pages, go to the repository
Settings > Pages, choose "Deploy from a branch", pick `main` and
the `/ (root)` folder, then save. The site will be live at
`https://<your-username>.github.io/autoraaz/`.

Note: the car photos and brand logos are loaded from external sites
(Unsplash, Wikimedia and brand logo sites), so the page needs an
internet connection to show all images.
