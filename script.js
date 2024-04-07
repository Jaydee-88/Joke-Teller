const button = document.getElementById("button");
const audioElement = document.getElementById("audio");



// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  // console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "49db63967371480882bc50dd599ef78a",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Jokes API
async function getJokes() {
  let joke = "";
  const apiUrl = `https://v2.jokeapi.dev/joke/Programming,Dark`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-To-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (err) {
    // Catch Error
    console.error("Whoops, Something is wrong:", err);
    // console.error("Whoops, ", err);
  }
}

// Event Listners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
