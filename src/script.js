const QuoteText = document.querySelector(".quote");
quoteBtn = document.querySelector("button");
authorName = document.querySelector(".author .name");
refno = document.querySelector(".author .refno");
soundBtn = document.querySelector(".sound");
copyBtn = document.querySelector(".copy");
shareBtn = document.querySelector(".share");


async function randomQuote() {
  try {
      quoteBtn.classList.add("loading");
       quoteBtn.innerHTML = "Loading..."
    const response = await fetch('https://random-hadith-generator.vercel.app/bukhari/');
      const data = await response.json();
      console.log(data)
    QuoteText.innerText = data.data.hadith_english;
      authorName.innerText = data.data.header;
      refno.innerHTML = data.data.refno;
      quoteBtn.classList.remove("loading");
       quoteBtn.innerHTML = "Next";
  } catch (error) {
    console.error('Error fetching Hadith:', error);
   
  }
}



quoteBtn.addEventListener("click", randomQuote)


// share button
shareBtn.addEventListener("click", event =>{
    // To check if browser support native share api
    if (navigator.share) {
        navigator.share({
            title: 'hadith',
            text: QuoteText.innerText + '--' + authorName.innerText,
        }).then(()=>console.log("successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
    // fallback
    else{
        alert("The current Browser does not support the share function. please, share link manually")
    }
});

// audio reading

soundBtn.addEventListener("click", () =>{
    let utterance = new SpeechSynthesisUtterance(QuoteText.innerText + 'reference' + authorName.innerText);
    speechSynthesis.speak(utterance);
    // Remove the event listener after it's clicked once
    soundBtn.removeEventListener("click", readOnce);
});

// copy btn

copyBtn.addEventListener("click", () =>{
    navigator.clipboard.writeText(QuoteText.innerText + ' __ ' + authorName.innerText)

    alert("Hadith copied to clipboard.")
});