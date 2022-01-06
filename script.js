const PLAYER_SPEED = 4;
const PLAYER_SIZE = 50;
const N_BUGS = 5;
const BUG_SIZE = 30;


class Scene {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.backgroundY = 0;
        this.backgroundSpeed = 1;
    }
    animateBackGround() {
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
        this.ctx.fillText(`👻 ${bugs.length}`, 50, 50);
        this.ctx.fillText(`🚀 ${player.actions}`, this.canvas.width - 150, 50);
    }
}

const distance = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

class Bug {
    constructor(index) {
        this.id = index;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }
    draw() {
        this.x += Math.random() * 10 - 5;
        this.y += Math.random() * 10 - 5;

        if (distance(this, player) < BUG_SIZE) {
            return remove(this.id);
        }
        const ghost = new Image();
        ghost.src = 'https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif';
        scene.ctx.drawImage(ghost, this.x, this.y, BUG_SIZE, BUG_SIZE)

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
    }
    draw() {
        const burger = new Image();
        burger.src = 'https://media.giphy.com/media/xThtaaGyhb0kZ052A8/giphy.gif'
        scene.ctx.drawImage(burger, this.x, this.y, PLAYER_SIZE, PLAYER_SIZE)

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

let bugs = new Array(N_BUGS).fill().map((_, index) => new Bug(index));
/*
    Array(3).fill(getObj()) will fill your array with references to the same object,
    Array(3).fill(null).map(getObj) will create object per element.
*/

const remove = bugId => bugs = bugs.filter(bug => bug.id !== bugId)

document.addEventListener('keydown', (e) => {
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
    scene.animateBackGround();
    bugs.forEach(bug => bug.draw())
    player.draw();
    scene.score();
    if (bugs.length) {
        requestAnimationFrame(update)
    }
}

update()