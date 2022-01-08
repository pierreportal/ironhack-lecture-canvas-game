const PLAYER_SPEED = 4;
const PLAYER_SIZE = 50;
const N_GHOST = 5;
const BUG_SIZE = 30;

let startGame = false;

class Scene {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.backgroundY = 0;
        this.backgroundSpeed = 1;
    }
    animateBackground() {
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'https://i.pinimg.com/originals/8d/bb/58/8dbb588536397d8571c934332ff1dffc.jpg';
        this.backgroundY += this.backgroundSpeed;
        this.backgroundSpeed %= this.canvas.width;
        this.ctx.drawImage(this.backgroundImage, 0, this.backgroundY % canvas.height, canvas.width, canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, (this.backgroundY % canvas.height) - this.canvas.height, canvas.width, canvas.height);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    score() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '50px monospace';
        this.ctx.fillText(`👻 ${ghosts.length}`, 50, 50);
        this.ctx.fillText(`🚀 ${player.actions}`, this.canvas.width - 150, 50);
    }
}

const distance = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

class Ghost {
    constructor(index) {
        this.id = index;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.image = new Image();
        this.image.src = 'https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif';
    }
    draw() {
        this.x += Math.random() * 10 - 5;
        this.y += Math.random() * 10 - 5;

        if (distance(this, player) < BUG_SIZE) {
            return remove(this.id);
        }
        scene.ctx.drawImage(this.image, this.x, this.y, BUG_SIZE, BUG_SIZE)

        if (this.x > canvas.width) {
            this.x = - BUG_SIZE;
        }
        if (this.x < - BUG_SIZE) {
            this.x = canvas.width;
        }
        if (this.y > canvas.height) {
            this.y = - BUG_SIZE;
        }
        if (this.y < -BUG_SIZE) {
            this.y = canvas.height;
        }
    }
}

class Hero {
    constructor() {
        this.x = canvas.width / 2 - PLAYER_SIZE / 2;
        this.y = canvas.height / 2 - PLAYER_SIZE / 2;
        this.speedX = 0;
        this.speedY = 0;
        this.actions = 0;
        this.image = new Image();
        this.image.src = 'https://media.giphy.com/media/xThtaaGyhb0kZ052A8/giphy.gif';
    }
    draw() {
        scene.ctx.drawImage(this.image, this.x, this.y, PLAYER_SIZE, PLAYER_SIZE)

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) {
            this.x = - PLAYER_SIZE
        }
        if (this.x < - PLAYER_SIZE) {
            this.x = canvas.width
        }
        if (this.y > canvas.height) {
            this.y = - PLAYER_SIZE
        }
        if (this.y < -PLAYER_SIZE) {
            this.y = canvas.height
        }
    }
    moveUp() {
        this.speedY = -PLAYER_SPEED;
        this.speedX = 0;
    }
    moveDown() {
        this.speedY = PLAYER_SPEED;
        this.speedX = 0;
    }
    moveRight() {
        this.speedX = PLAYER_SPEED;
        this.speedY = 0;

    }
    moveLeft() {
        this.speedX = -PLAYER_SPEED;
        this.speedY = 0;
    }
}

const scene = new Scene();

const player = new Hero();

let ghosts = new Array(N_GHOST).fill().map((_, index) => new Ghost(index));
/*
    Array(3).fill(getObj()) will fill your array with references to the same object,
    Array(3).fill(null).map(getObj) will create object per element.
*/

const remove = ghostId => ghosts = ghosts.filter(ghost => ghost.id !== ghostId)

document.addEventListener('keydown', (e) => {
    if (e.key === 's') {
        startGame = true;
        return;
    }
    player.actions += 1;
    switch (e.key) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case 'ArrowDown':
            player.moveDown();
            break;
        case 'ArrowUp':
            player.moveUp();
    }
})

function update() {
    scene.clear();
    scene.animateBackground();
    if (startGame) {
        ghosts.forEach(ghost => ghost.draw())
        player.draw();
    } else {
        scene.ctx.fillText(
            'Press "s" to start the game !',
            scene.canvas.width / 2 - 400,
            scene.canvas.height / 2
        );
    }
    scene.score();
    if (ghosts.length) {
        requestAnimationFrame(update)
    }
}

update()