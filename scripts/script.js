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
const notFound = document.getElementById("notFound");
// Ruta för sökresultat.

const form = document.getElementsByTagName("form");
// Formulär

let displayNewInfoAndHidePreviousInfo = (value) => {
    if (value === "showSearchResults") {
        searchBar.classList.remove("hideSearchBar");
        searchBar.style.display = "block";
        searchBar.classList.add("expandSearchBar");

        hideButton.classList.remove("hideXButton");
        hideButton.style.display = "block";
        hideButton.classList.add("showXButton");

        searchResults.classList.add("fadeIn");
        searchResults.classList.remove("fadeOut");
    
        form[0].classList.add("fadeOut");
        form[0].classList.remove("fadeIn");

    
        searchResults.style.display = "flex";
        form[0].style.display = "none";
    } 
    else if (value === "showInputForm") {
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
        // Gömmer searchbar och bakåtknappen efter 1,4 sekunder.
        // Tar fram formuläret och gömmer sökresultaten.
        // Utan delay kommer formuläret inte i mitten eftersom sökresultaten inte har gömts ännu.
    }
}
// Funktion som styr hur saker ska bete sig när sökbaren tas fram/göms.
// Styrs av variabeln value som antingen kan ha värdet showSearchResults eller showInputForm.

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
// Prövade att deklarera en optional variabel som skulle styra sökningen men det pajade hela funktionen.

let clearTable = () => {
    while (table.children.length != 1) {
        table.children[1].remove();
    }
}
// Rensar tabellen så att korrekt antal objekt kan läggas till. Funktion för att undvika upprepning.
// Gör även så att man endast ser det objekt man sökt efter vid sökning på specifika titlar.

let sendFormData = () => {

    let existingEntries = JSON.parse(localStorage.getItem('shows')) || [];
    // Läser in objekt som redan existerar, ifall inget objekt finns skapas en ny array.

    const title = textFields[0].value;
    const desc = textFields[1].value;
    let age; 
    let textFieldEntries = {};
    // Sparar undan värden från input-rutorna i formuläret.

    !isNaN(textFields[2].value) ?
    age = textFields[2].value :
    textFields[2].value = "", textFields[2].placeholder = "Ange åldergräns i siffror.";
    // Kontrollerar att man endast skriver in siffror i rutan för åldersgräns.
    
    if ((title != "" && title != undefined) && (desc != "" && desc != undefined) && (age != "" && age != undefined)) 
    {
        console.log(title);
        console.log(desc);
        console.log(age);
    textFieldEntries = {0: title, 
                        1: desc,
                        2: age,};
    // Lägger in värden i nytt objekt.
    existingEntries.push(textFieldEntries);
    // Lägger endast objektet i arrayen existingEntries ifall alla fält har fått in ett värde.
    localStorage.setItem('shows', JSON.stringify(existingEntries));
    // Sparar undan alla objekt som strängar i localStorage på platsen 'shows'
    // eftersom localStorage inte hanterar objekt.
    }
    else {
        return "";
    }
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
            notFound.style.display = "none";
            searchBar.placeholder = "Sök efter TV-program med titel eller * för att se alla titlar";
            return "";
        } 
        else if (searchValue == "*") {
            notFound.style.display = "none";
            displayAllData();
        }
        else {
            searchBar.value = "";
            searchBar.classList.add("badSearchValue");
            searchBar.placeholder = searchValue + " finns inte i databasen.";
            notFound.style.display = "block";
            // Ifall sökordet inte finns får man en error text samt färgen ändras till röd på placeholder.
        }
    }
}

let hiddenTimeout = null;

let hideSearchBar = () => {
    displayNewInfoAndHidePreviousInfo("showInputForm");

    searchIcon.removeEventListener('click', searchData);
    // Tar bort event som aktiverar searchData() eftersom sök-ikonen nu öppnar sökrutan.
}

let viewSearchBar = () => {
    displayNewInfoAndHidePreviousInfo("showSearchResults");
    searchIcon.addEventListener('click', searchData);
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

        clearTable();
        // Tar bort allt i listan förutom table header som ligger på plats 0.
        localStorage.clear();
        dataRensadStyle();

        
    } else {
        localStorage.clear();
        dataRensadStyle();
        console.log("Empty table");
    }
}

let dataRensadStyle = () => {
    deleteButton.innerHTML = "Data rensad."
    deleteButton.style.transition = "all 1s ease";
    deleteButton.style.color = 'white';
    deleteButton.style.background = 'black';
}

deleteButton.addEventListener('click', clearStorage);

// Lägger på event listener igen ifall man har stängt sökrutan.

