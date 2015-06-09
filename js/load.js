var loadState = {

	preload: function () {
		var loadingLabel = game.add.text(game.world.centerX, 150, 'Cargando...', { font: '30px Verdana', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
		
			//MT
			game.load.spritesheet('background_playState','assets/MT/xnt9w1.png', 960, 640);
			game.load.spritesheet('enter','assets/MT/enter.png', 128, 128);
			//Play
			game.load.spritesheet('ballon', 'assets/MT/ballon.png', 41, 56);
			
			   
			//Bloks
			game.load.spritesheet("bloc1","assets/MT/1_98x270.png",98, 270);
			game.load.spritesheet("bloc2","assets/MT/2_127x270.png",127, 270);
			game.load.spritesheet("bloc3","assets/MT/3_74x270.png",74, 270);
			game.load.spritesheet("bloc4","assets/MT/4_187x270.png",187, 270);
			//bombs
			game.load.spritesheet("bombs_","assets/MT/explosion.png",32, 33);
			
			//audio
			game.load.audio('jump', 'assets/MT/jump.mp3');
			game.load.audio('lose', 'assets/MT/lose.mp3');
	},

	create: function() { 
		game.state.start('menu');
	}
};