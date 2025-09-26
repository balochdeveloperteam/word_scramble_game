const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elephant",
  "flamingo",
  "grape",
  "honeydew",
  "iguana",
  "jaguar",
  "kangaroo",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "umbrella",
  "violet",
  "watermelon",
  "xenon",
  "yacht",
  "zebra",
];
const wordMeanings = {
  apple: "A round fruit with red, yellow, or green skin and firm white flesh.",
  banana: "A long, curved fruit with a yellow skin and soft, sweet flesh.",
  cherry: "A small, round stone fruit that is typically bright red.",
  date: "The edible fruit of the date palm tree, often dried.",
  elephant: "A large mammal with a trunk, native to Africa and Asia.",
  flamingo: "A tall wading bird with pink or reddish plumage.",
  grape:
    "A small, round or oval fruit, typically growing in clusters, eaten fresh or used to make wine.",
  honeydew: "A type of melon with sweet, pale green flesh.",
  iguana:
    "A large, herbivorous lizard native to tropical parts of Central and South America.",
  jaguar:
    "A large, heavily built cat that lives in forests in South and Central America.",
  kangaroo: "A large marsupial with a pouch, found only in Australia.",
  lemon: "A yellow, oval citrus fruit with acidic juice.",
  mango: "A fleshy, oval tropical fruit with a sweet, yellowish-red pulp.",
  nectarine: "A variety of peach with smooth skin.",
  orange:
    "A round citrus fruit with a reddish-yellow peel and sweet, juicy pulp.",
  papaya: "A large, oval tropical fruit with orange flesh and black seeds.",
  quince: "A hard, yellowish fruit used to make jam or jelly.",
  raspberry: "A small, red, soft fruit with a slightly tart taste.",
  strawberry:
    "A sweet, red, heart-shaped fruit with small seeds on its surface.",
  tangerine: "A small, orange-colored citrus fruit with a loose skin.",
  umbrella:
    "A device used for protection against rain or sun, consisting of a cloth canopy mounted on a folding frame supported by a central rod.",
  violet: "A small plant with purple, blue, or white flowers.",
  watermelon:
    "A large, roundish fruit with a green rind and sweet, red, pulpy flesh.",
  xenon: "A colorless, odorless noble gas.",
  yacht: "A medium-sized sailing vessel used for pleasure cruising or racing.",
  zebra: "An African wild horse with black and white stripes.",
};

let score = 0;
let totalQuestions = 0;
let currentWord;
let scrambledWord;
let gameActive = true;
let consecutiveCorrect = 0;

const scrambledWordDisplay = document.getElementById("scrambled-word");
const userInput = document.getElementById("user-guess");
const checkAnswerButton = document.getElementById("check-answer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score-display");
const gameOverDisplay = document.getElementById("game-over");
const playAgainButton = document.getElementById("play-again");
const showHintButton = document.getElementById("show-hint");

function startGame() {
  if (words.length === 0) {
    scrambledWordDisplay.textContent = "No words available!";
    userInput.disabled = true;
    checkAnswerButton.disabled = true;
    return;
  }
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord = scrambleWord(currentWord);
  scrambledWordDisplay.textContent = scrambledWord;
  userInput.value = "";
  userInput.disabled = false;
  checkAnswerButton.disabled = false;
  feedback.textContent = "";
  gameOverDisplay.classList.add("hidden");
  playAgainButton.classList.add("hidden");
  showHintButton.classList.remove("hidden"); //show hint
  gameActive = true;
  consecutiveCorrect = 0;
}

function scrambleWord(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

function checkAnswer() {
  if (!gameActive) return;

  const userAnswer = userInput.value.trim().toLowerCase();

  if (userAnswer === currentWord.toLowerCase()) {
    feedback.textContent = "Correct!";
    feedback.className = "correct";
    score++;
    totalQuestions++;
    scoreDisplay.textContent = score;
    consecutiveCorrect++;
    if (consecutiveCorrect > 2) {
      score += consecutiveCorrect;
      scoreDisplay.textContent = score;
      feedback.textContent += ` Bonus! +${consecutiveCorrect} points for consecutive correct answers!`;
    }
    startGame();
  } else {
    feedback.textContent = "Wrong! Try again.";
    feedback.className = "incorrect";
    totalQuestions++;
    consecutiveCorrect = 0;
  }

  userInput.value = "";
  userInput.focus();
}

function showHint() {
  if (!gameActive) return;
  const hint = wordMeanings[currentWord.toLowerCase()];
  if (hint) {
    feedback.textContent = `Hint: ${hint}`;
    feedback.className = "incorrect"; //make hint text red
  } else {
    feedback.textContent = "No hint available for this word.";
    feedback.className = "incorrect";
  }
}

function endGame() {
  gameActive = false;
  userInput.disabled = true;
  checkAnswerButton.disabled = true;
  gameOverDisplay.textContent = `Game Over! Your final score is ${score}/${totalQuestions}.`;
  gameOverDisplay.className = "game-over";
  gameOverDisplay.classList.remove("hidden");
  playAgainButton.classList.remove("hidden");
  showHintButton.classList.add("hidden"); //hide hint
}

checkAnswerButton.addEventListener("click", checkAnswer);
playAgainButton.addEventListener("click", startGame);
showHintButton.addEventListener("click", showHint);

startGame();
