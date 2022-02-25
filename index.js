import Phaser from 'phaser';

let game = new Phaser.Game(config);

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}



function preload() {
    this.load.image('background', 'img/background.png');
}

function create() {
}

function update() {
}