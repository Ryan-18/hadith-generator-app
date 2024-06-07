let header = document.querySelector('#header');
let hadith = document.querySelector('#hadith-text');
let book = document.querySelector('#book');
let button = document.querySelector('button');
let cl = document.getElementById('cont');
let searchInput = document.getElementById('search');
// Load Hadith Data from external JSON file 
async function loadHadith() {
    try {
        let value = parseInt(document.getElementById('search').value); // Retrieve the value inside the event listener and parse it as an integer
        if (value < 1 || value > 7563 || isNaN(value)) {
            hadith.innerHTML = "Please enter a valid value between 1 and 7563.";
            return; // Exit the function if the value is not valid
        }

        hadith.innerHTML = "";
        header.innerHTML = "";
        book.innerHTML = "";
        hadith.innerHTML = "Loading..";
        cl.classList.add("content");

        const response = await fetch(`https://random-hadith-generator.vercel.app/bukhari/${value}`);
        const data = await response.json();
        console.log(data);
        hadith.innerHTML = data.data.hadith_english;
        header.innerHTML = data.data.header;
        book.innerHTML = data.data.refno;
    } catch (error) {
        console.error('Error fetching Hadith:', error);
    }
}


button.addEventListener('click', loadHadith);
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    loadHadith();
  }
});
