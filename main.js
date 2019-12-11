// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

const glyphStates = {
  "♡": "♥",
  "♥": "♡"
};

const colorStates = {
  red: "",
  "": "red"
};

const modal = document.getElementById("modal");

document.addEventListener("DOMContentLoaded", function() {
  clearError();
  addSomeEventListeners();
});

function addSomeEventListeners() {
  const likeGlyphsHTMLCollection = document.getElementsByClassName(
    "like-glyph"
  );
  const likeGlyphs = Array.from(likeGlyphsHTMLCollection);
  likeGlyphs.forEach(lg =>
    lg.addEventListener("click", () => clickLikeGlyph(event))
  );
}

function clickLikeGlyph(event) {
  const heart = event.target;
  mimicServerCall("fakeSite.com")
    .then(function(serverMessage) {
      if (heart.innerText === EMPTY_HEART) {
        heart.classList.add("activated-heart");
        heart.innerText = FULL_HEART;
      } else {
        heart.classList.remove("activated-heart");
        heart.innerText = EMPTY_HEART;
      }
    })
    .catch(function(error) {
      modal.classList.remove("hidden");
      modal.innerText = error;
      errorFunction();
    });
}

function errorFunction() {
  setTimeout(function() {
    clearError();
  }, 5000);
}

function clearError() {
  modal.classList.add("hidden");
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
