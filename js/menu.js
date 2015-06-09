var menuState = {
	preload : function(){
			
		},
	create : function(){
			game.add.sprite(0, 0, 'background_playState');
			if (!localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', 0);
			}
			game.add.sprite(game.world.centerX - 64, game.world.centerY + 20, 'enter');
			var style = { font: "48px Verdana", fill: "#DE5F3D", align: "center" };
			this.title = this.game.add.text(250,170,"MT",style);

			var style2 = { font: "28px Verdana", fill: "#DE5F3D", align: "center" };
			this.enterToPlay = this.game.add.text(250,230,"ENTER TO PLAY",style2);
			this.bestScoreText = this.game.add.text(0,28,"Best Score : " + localStorage.getItem('bestScore'));
			
		},

	update : function(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
				this.game.state.start('play');
		}
	
};


