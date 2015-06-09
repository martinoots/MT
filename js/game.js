var game = new Phaser.Game(800, 480, Phaser.CANVAS, 'gameDiv');
var player;
game.global = {
	score: 0 ,
	countBack: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');