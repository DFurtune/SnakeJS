const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

let box = 20;

let snake = [];
snake[0] = {
    x: 12 * box,
    y: 7 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 65 && dir != "right")
        dir = "left";
    else if(event.keyCode == 68 && dir != "left")
        dir = "right"
    else if(event.keyCode == 83 && dir != "up")
        dir = "down";
    else if(event.keyCode == 87 && dir != "down")
        dir = "up";
}


function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            alert("Вы съели себя! Для начала новой игры обновите страницу!")
            return
        }
    }
}


function drawGame() {
    ctx.drawImage(ground, 0, 0);

    for(let  i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    snake.pop();

    if (snakeX < 0 || snakeX > box * 23 || snakeY < 0 || snakeY > box * 15) {
        alert("Вы проиграли! Для начала новой игры обновите страницу!")
        clearInterval(game);
    }

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);