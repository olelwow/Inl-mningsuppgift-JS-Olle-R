const inputField = document.getElementsByClassName("container");

let removeDelay = () => {
    for (let i = 0; i < inputField.length; i++) {
        inputField[i].classList.remove("delay");
    }
}

let animateFormText = () => {

    inputField[0].classList.add("delay");
    inputField[1].classList.add("delay");
    inputField[2].classList.add("delay");

    for (let i = 0; i < inputField.length; i++) {
        
        inputField[i].classList.add("textDown");
    }

    setInterval(removeDelay, 1400);
}


for (let i = 0; i < inputField.length; i++) {
    inputField[i].addEventListener('mouseover', animateFormText);
    
}

// Kod som styr animation av placeholder text i formuläret.

const searchIcon = document.getElementById("searchIcon");
const searchBar = document.getElementById("searchBar");
const hideButton = document.getElementById("hideButton");

let executeSearch = () => {

}

let hiddenTimeout = null;

let hideSearchBar = () => {
    searchBar.classList.remove("expandSearchBar");
    searchBar.classList.add("hideSearchBar");

    hideButton.classList.remove("showXButton");
    hideButton.classList.add("hideXButton");

    clearTimeout(hiddenTimeout)
    hiddenTimeout = setTimeout(() => {
        searchBar.style.display = "none",
        hideButton.style.display = "none"}, 1400)
    }
    // Gömmer searchbar och krysset efter 1,4 sekunder.


let viewSearchBar = () => {
    searchBar.classList.remove("hideSearchBar");
    searchBar.style.display = "block";
    searchBar.classList.add("expandSearchBar");
    searchIcon.removeEventListener('click', viewSearchBar);
    // Tar bort viewSearchBar eftersom sök-ikonen nu ska användas för att söka
    hideButton.classList.remove("hideXButton");
    hideButton.style.display = "block";
    hideButton.classList.add("showXButton");
}

hideButton.addEventListener('click', hideSearchBar);
searchIcon.addEventListener('click', viewSearchBar);

setInterval(() => {
    if (searchBar.style.display == "none") {
        searchIcon.addEventListener('click', viewSearchBar);
    } else {
        console.log("skit");
    } 2000
});

// Lägger på event listener igen ifall man har stängt sökrutan.




// Lagrar TV-program

// Tar fram sökresultat