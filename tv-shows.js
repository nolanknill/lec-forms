const tvShows = [
    {
        title: "Breaking Bad",
        genres: ["Drama", "Thriller"],
        cast: ["Aaron Paul", "Bryan Cranston"],
        "theme-song": "Let Them Cook",
        releaseYear: 2008,
        runLength: 45,
        rating: 10,
        imageSrc: "/assets/images/breaking-bad.jpeg"
    },
    {
        title: "House of the Dragon",
        genres: ["Fantasy", "Drama"],
        cast: ["Milly Alcock", "Emma D'Arcy", "Matt Smith"],
        "theme-song": "Game of Thrones (Original)",
        releaseYear: 2022,
        runLength: 50,
        rating: 10,
        imageSrc: "/assets/images/house-of-the-dragon.jpeg"
    },
    {
        title: "Squid Game",
        genres: ["Thriller", "Horror"],
        cast: ["HoYeon Jung", "Lee Jung-jae", "Gong Yoo"],
        "theme-song": "Squid Games (Original)",
        releaseYear: 2021,
        runLength: 50,
        rating: 10,
        imageSrc: "/assets/images/squid-game.jpeg"
    },
    {
        title: "True Detective",
        rating: 21,
        imageSrc: "/assets/images/true-detective.png"
    },
];

function displayAllShows() {
    /* Add all TV Shows to the tv-shows element */
    const tvShowsEl = document.getElementById("tv-shows");
    for (let i = 0; i <= tvShows.length - 1; i++) {
        const showEl = createTvShowElement(tvShows[i]);
        tvShowsEl.appendChild(showEl);
    }
}

displayAllShows();


/*
    Input: show will contain { Title, Rating, Image }
    
    Output: Element object that looks like:
*/
/*
    <article class="tv-show">
        <h2 class="tv-show__title">${show.title}</h2>
        <span class="tv-show__rating">Rating: ${show.rating}</span>
        <img class="tv-show__cover" src="${show.imageSrc}" alt="${show.title} Cover" />
    </article>
*/
function createTvShowElement(show) {
    const showEl = document.createElement("article");
    showEl.classList.add("tv-show");

    const titleEl = document.createElement("h2");
    titleEl.classList.add("tv-show__title");
    titleEl.innerText = show.title;

    const ratingEl = document.createElement("span");
    ratingEl.classList.add("tv-show__rating");
    ratingEl.innerText = "Rating: " + show.rating;
    
    const coverEl = document.createElement("img");
    coverEl.classList.add("tv-show__cover");
    coverEl.setAttribute("src", show.imageSrc);
    coverEl.setAttribute("alt", show.title + " Cover");
    
    showEl.appendChild(titleEl);
    showEl.appendChild(ratingEl);
    showEl.appendChild(coverEl);

    return showEl;
}


/* 
    1. Grab all elements: 
        const tvShows = querySelectorAll(".tv-show")
    2. Loop through tv shows
        3. On each tv show -> addEventListener("click")
        4. Event handler: add a class to the tv show we're currently looking at within the loop
            "tv-show--active"
*/
/*  When a tv-show is clicked, add a border to the element to show that it is featured */
const allShows = document.querySelectorAll(".tv-show");
for (let i = 0; i < allShows.length; i++) {
    const currentShowEl = allShows[i];

    currentShowEl.addEventListener("click", function(event) {
        const activeShow = document.querySelector(".tv-show--active");
        // activeShow will either be null (falsey) or an object (truthy)
        if (activeShow && currentShowEl !== activeShow) {
            activeShow.classList.remove("tv-show--active");
        }

        currentShowEl.classList.toggle("tv-show--active");
    });
}


const form = document.getElementById("add-show-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorEls = document.querySelectorAll(".add-show-form__error-message--show");
    for (let i = 0; i < errorEls.length; i++) {
        errorEls[i].classList.remove("add-show-form__error-message--show");
    }
    
    const title = event.target.title.value;
    const rating = event.target.rating.value;
    const imageSrc = event.target.imageSrc.value;
    
    let hasErrors = false;

    /* validation */
    if (title === "") {
        hasErrors = true;
        const titleErrorEl = document.querySelector(".add-show-form__error-message--title");
        titleErrorEl.classList.add("add-show-form__error-message--show");
    }

    if (rating === "" || isNaN(rating)) {
        hasErrors = true;
        const ratingErrorEl = document.querySelector(".add-show-form__error-message--rating");
        ratingErrorEl.classList.add("add-show-form__error-message--show");
    }

    if (imageSrc === "") {
        hasErrors = true;
        const imageSrcErrorEl = document.querySelector(".add-show-form__error-message--image-src");
        imageSrcErrorEl.classList.add("add-show-form__error-message--show");
    }

    if (hasErrors === true) {
        // we want to end the event handler
        return ;
    }

    // If we reach this point, there are no errors, validation has passed
    
    tvShows.unshift({
        title: title,
        rating: rating,
        imageSrc: imageSrc
    })

    const tvShowsEl = document.getElementById("tv-shows");
    tvShowsEl.innerHTML = "";

    displayAllShows();
    
    event.target.reset();
    /*
    const newTvShowEl = createTvShowElement({
        title: title,
        rating: rating,
        imageSrc: imageSrc
    });

    tvShowsEl.prepend(newTvShowEl);
    */

});