var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/MT/progressBar.png');
	},

	create: function() { 
		game.stage.backgroundColor = '#000000';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('load');
	}
};