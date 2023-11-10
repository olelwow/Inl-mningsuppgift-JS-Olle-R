

let textFields = document.querySelectorAll(".textField");
const sendButton = document.getElementById("sendData");
// Text inputs i formuläret samt skicka data knapp.

const table = document.getElementById("displayResults").firstElementChild;
const deleteButton = document.getElementById("removeData");
// Tabell samt knapp för att rensa data.

const searchIcon = document.getElementById("searchIcon");
const searchBar = document.getElementById("searchBar");
const hideButton = document.getElementById("hideButton");
// Sökknapp, sökfält, ikon för göm sökfält

const searchResults = document.getElementById("searchResults");
// Ruta för sökresultat.

const form = document.getElementsByTagName("form");
// Formulär

let createTableRowsAndDisplayData = (items) => {

    for (let i = 0; i < items.length; i++) {

        let row = table.appendChild(document.createElement("tr"));
        // Skapar ny tabellrad
        for (let j = 0; j < 3; j++) {
            let data = row.appendChild(document.createElement("td"));
            data.innerHTML = items[i][j];
            // Inre for loop som skapar tre td taggar för tabelldata. 
            // Lägger in objektens olika värden på varsin plats i tabellen.
        }
    }
}

// ^ Försökte få denna funktion att fungera både på displayAllData samt searchData men utan framgång.

let clearTable = () => {
    while (table.children.length != 1) {
        table.children[1].remove();
    }
}
// Rensar tabellen så att korrekt antal objekt kan läggas till. Funktion för att undvika upprepning. 

let sendFormData = () => {

    let existingEntries = JSON.parse(localStorage.getItem('shows')) || [];
    // Läser in objekt som redan existerar, ifall inget objekt finns skapas en ny array.

    const title = textFields[0].value;
    const desc = textFields[1].value;
    let age; 
    // Sparar undan värden från input-rutorna i formuläret.

    !isNaN(textFields[2].value) ?
    age = textFields[2].value :
    textFields[2].value = "", textFields[2].placeholder = "Ange åldergräns i siffror.";
    // Kontrollerar att man endast skriver in siffror i rutan för åldersgräns.
    
    

    let textFieldEntries = {0: title, 
                            1: desc,
                            2: age,};
    // Lägger in värden i nytt objekt.

    existingEntries.push(textFieldEntries);
    // Lägger in objektet i arrayen existingEntries

    localStorage.setItem('shows', JSON.stringify(existingEntries));
    // Sparar undan alla objekt som strängar i localStorage på platsen 'shows'
    // eftersom localStorage inte hanterar objekt.
    
}
sendButton.addEventListener('click', sendFormData);

let displayAllData = () => {

    clearTable();
    // Rensar tabellen så att korrekt antal objekt kan läggas till.

    const items = JSON.parse(localStorage.getItem('shows'));
    // Ny array där objekt sparas, eftersom JSON.stringify sparade undan tidigare objekt som strängar
    // använder jag parse för att göra om dem till objekt igen.

    if (table.children[1] === undefined) {
    // Kontrollerar att tidigare element har rensats bort.
        createTableRowsAndDisplayData(items);
    } 
    else 
    {
        return "";
        // Ifall man redan har lagt till sin data så kan man inte lägga till mer.
        // Detta förhindrar att dubletter skapas.
    }
}

let searchData = () => {
   
    const searchValue = searchBar.value;
    const items = JSON.parse(localStorage.getItem('shows'));
    // Tar in det som finns i localStorage samt sparar det man skrivit i sökrutan i variabeln searchValue

    if (table.children.length > 1) {
        clearTable();
    }
    // Rensar innehållet i table så att endast sökresultatet ska visas.

    for (let i = 0; i < items.length; i++) {
        if (items[i][0] === searchValue) {
        // Kontrollerar ifall någon data i localStorage stämmer överens med sökordet.
            
            let row = table.appendChild(document.createElement("tr"));

            for (let j = 0; j < 3; j++) {
                let data = row.appendChild(document.createElement("td"));
                data.innerHTML = items[i][j];
            }

            // Ifall sökordet finns skapas en ny tabellrad upp på samma sätt som när man hämtar all data.
            
            searchBar.classList.remove("badSearchValue");
            searchBar.placeholder = "Sök efter TV-program med titel eller * för att se alla titlar";
            return "";
        } 
        else if (searchValue == "*") {
            displayAllData();
        }
        else {
            searchBar.value = "";
            searchBar.classList.add("badSearchValue");
            searchBar.placeholder = searchValue + " finns inte i databasen.";
            // Ifall sökordet inte finns får man en error text samt färgen ändras till röd på placeholder.
        }
    }

}

let hiddenTimeout = null;

let hideSearchBar = () => {
    searchBar.classList.remove("expandSearchBar");
    searchBar.classList.add("hideSearchBar");

    hideButton.classList.remove("showXButton");
    hideButton.classList.add("hideXButton");

    searchResults.classList.remove("fadeIn");
    searchResults.classList.add("fadeOut");
    
    form[0].classList.remove("fadeOut");
    form[0].classList.add("fadeIn");

    clearTimeout(hiddenTimeout)
    hiddenTimeout = setTimeout(() => {
        searchBar.style.display = "none",
        hideButton.style.display = "none",
        searchResults.style.display = "none",
        form[0].style.display = "flex"}
        , 1400)

    }
    // Gömmer searchbar och krysset efter 1,4 sekunder.
    // Tar fram formuläret och gömmer sökresultaten.

let viewSearchBar = () => {
    searchBar.classList.remove("hideSearchBar");
    searchBar.style.display = "block";
    searchBar.classList.add("expandSearchBar");
    searchIcon.removeEventListener('click', viewSearchBar);
    // Tar bort viewSearchBar eftersom sök-ikonen nu ska användas för att söka

    hideButton.classList.remove("hideXButton");
    hideButton.style.display = "block";
    hideButton.classList.add("showXButton");

    searchResults.classList.add("fadeIn");
    searchResults.classList.remove("fadeOut");
    
    form[0].classList.add("fadeOut");
    form[0].classList.remove("fadeIn");

    searchIcon.addEventListener('click', searchData);
    searchResults.style.display = "flex";
    form[0].style.display = "none";
    // Visar tabellen, gömmer input formuläret.
}

hideButton.addEventListener('click', hideSearchBar);
searchIcon.addEventListener('click', viewSearchBar);

setInterval(() => {
    if (searchBar.style.display == "none") {
        searchIcon.addEventListener('click', viewSearchBar);
    } else {
        return "";
    } 2000
});
// Lägger på eventlistener på searchIcon två sekunder efter man har stängt searchBar.

let clearStorage = () => {
    let table = document.getElementById('displayResults').firstElementChild;

    console.log(table.children);

    if (table.children.length > 1) {
        while (table.children.length != 1) {
            table.children[1].remove();
            // Tar bort allt i listan förutom table header som ligger på plats 0.
            localStorage.clear();
        }
        deleteButton.innerHTML = "Data rensad."
        deleteButton.style.color = 'white';
        deleteButton.style.background = 'black';

        
    } else {
        console.log("Empty table");
    }
}

deleteButton.addEventListener('click', clearStorage);

// Lägger på event listener igen ifall man har stängt sökrutan.

