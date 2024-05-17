const jokeBtn = document.getElementById("button");
const audioElement = document.getElementById("audio");

// disable/enable button
function toggleBtn() {
  jokeBtn.disabled = !jokeBtn.disabled;
}

// passing joke to VoiceRSS API
function tellMe(joke) {
  console.log(joke);
  VoiceRSS.speech({
    key: "10be71079c3e4eaf9f222c8efa7ae2a5",
    src: joke,
    hl: "en-gb",
    v: "Amy",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//get jokes from API
async function fetchJoke() {
  let joke = "";
  const apiUrl = `https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
  try {
    const Response = await fetch(apiUrl);
    const data = await Response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text-speech
    tellMe(joke);

    // disable button
    toggleBtn();
  } catch (err) {
    console.log("Error occured", err);
  }
}

// event listeners
jokeBtn.addEventListener("click", fetchJoke);
audioElement.addEventListener("ended", toggleBtn);
