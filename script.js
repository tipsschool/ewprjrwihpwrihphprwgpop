let score = 0;
let total = 0;
let correct = 0;

let num1, num2;

function newPuzzle() {
    num1 = Math.floor(Math.random() * 50);
    num2 = Math.floor(Math.random() * 50);

    document.getElementById("question").innerText =
        `${num1} + ${num2} = ?`;
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById("answer").value);
    const realAnswer = num1 + num2;

    total++;

    if (userAnswer === realAnswer) {
        score += 10;
        correct++;
    }

    updateStats();
    updateLeaderboard();
    document.getElementById("answer").value = "";
    newPuzzle();
}

function updateStats() {
    let accuracy = total ? Math.round((correct / total) * 100) : 0;
    let performance = Math.min(100, Math.round(score / (total * 10) * 100));

    document.getElementById("score").innerText = score;
    document.getElementById("accuracy").innerText = accuracy + "%";
    document.getElementById("performance").innerText = performance + "%";
}

function updateLeaderboard() {
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
    board.push(score);
    board.sort((a,b)=>b-a);
    board = board.slice(0,5);

    localStorage.setItem("leaderboard", JSON.stringify(board));

    const list = document.getElementById("leaderboard");
    list.innerHTML = "";
    board.forEach(s=>{
        let li=document.createElement("li");
        li.textContent="Score: "+s;
        list.appendChild(li);
    });
}

newPuzzle();
