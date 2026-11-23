
const quotes = [
    "Greatness begins when you refuse to give up.",
    "Your future is created by what you do today.",
    "Be stronger than your excuses.",
    "A champion is built through discipline and consistency.",
    "Dream big, start small, but never stop.",
    "Your mistakes are lessons. Learn and rise again.",
    "Believe in yourself even when nobody else does.",
    "Hard work beats talent when talent doesn't work hard.",
    "You don't have to be perfect. Just keep improving.",
    "Be the reason someone believes in goodness.",
    "Real strength is choosing to do what is right.",
    "Success starts with courage and one small step."
];

const challenges = [
    "Read something educational for at least 20 minutes.",
    "Complete a physical activity today.",
    "Help someone without expecting anything in return.",
    "Learn a new skill that could help your future.",
    "Spend 30 minutes working on your biggest goal.",
    "Clean and organize your room or study space.",
    "Stay away from distractions while completing a task.",
    "Tell someone you appreciate them.",
    "Write down three things you are grateful for.",
    "Do something today that your future self will thank you for.",
    "Practice a skill you want to become excellent at.",
    "Complete a task you have been procrastinating on.",
    "Learn a new fact about science or technology.",
    "Take a break from your phone and focus on your studies.",
    "Write down a goal for the next 30 days."
];

// =============================
// MOTIVATIONAL QUOTES
// =============================
function newQuote() {
    const quoteElement = document.getElementById("quote");

    if (!quoteElement) return;

    const random = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = `"${quotes[random]}"`;
}

// =============================
// DAILY CHALLENGES
// =============================
function newChallenge() {
    const challengeElement = document.getElementById("challenge");

    if (!challengeElement) return;

    const random = Math.floor(Math.random() * challenges.length);
    challengeElement.textContent = challenges[random];
}

// =============================
// START JOURNEY
// =============================
function startJourney() {
    window.location.href = "goals.html";
}

// =============================
// GOALS SYSTEM
// =============================
let goals = [];

try {
    goals = JSON.parse(localStorage.getItem("boysGreatGoals")) || [];
} catch (error) {
    goals = [];
}

function saveGoals() {
    localStorage.setItem("boysGreatGoals", JSON.stringify(goals));
}

function addGoal() {
    const input = document.getElementById("goalInput");

    if (!input) return;

    const goalText = input.value.trim();

    if (!goalText) {
        alert("Please enter a goal first!");
        return;
    }

    goals.push({
        text: goalText,
        completed: false
    });

    saveGoals();
    input.value = "";
    renderGoals();
}

function toggleGoal(index) {
    if (!goals[index]) return;

    goals[index].completed = !goals[index].completed;

    saveGoals();
    renderGoals();
}

function deleteGoal(index) {
    goals.splice(index, 1);

    saveGoals();
    renderGoals();
}

// =============================
// DISPLAY GOALS
// =============================
function renderGoals() {
    const goalList = document.getElementById("goalList");

    // Stop if this is not the goals page
    if (!goalList) return;

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {
        const item = document.createElement("div");
        item.className = "goal-item";

        if (goal.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;
        checkbox.addEventListener("change", () => toggleGoal(index));

        const label = document.createElement("label");
        label.textContent = goal.text;

        label.addEventListener("click", () => {
            toggleGoal(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";

        deleteButton.addEventListener("click", () => {
            deleteGoal(index);
        });

        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(deleteButton);

        goalList.appendChild(item);
    });

    updateProgress();
}

// =============================
// PROGRESS BAR
// =============================
function updateProgress() {
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    if (!progressFill || !progressText) return;

    const total = goals.length;
    const completed = goals.filter(goal => goal.completed).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    progressFill.style.width = percentage + "%";

    progressText.textContent =
        `${percentage}% completed (${completed}/${total} goals)`;
}

// =============================
// ENTER KEY SUPPORT
// =============================
const goalInput = document.getElementById("goalInput");

if (goalInput) {
    goalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addGoal();
        }
    });
}

// =============================
// INITIALIZATION
// =============================
renderGoals();
newQuote();
newChallenge();
