var score;
var lastLvl = 0;
var actPlatform = 0;

var playState = {



	
	create : function(){
			
			game.add.sprite(0, 0, 'background_playState');
		
		
			this.cursor = game.input.keyboard.createCursorKeys();
			game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
			this.wasd = {
				left: game.input.keyboard.addKey(Phaser.Keyboard.A),
				right: game.input.keyboard.addKey(Phaser.Keyboard.D)
			};
			this.jumpSound = game.add.audio('jump');
			this.loseSound = game.add.audio('lose');
			
			this.game.physics.startSystem(Phaser.Physics.P2JS);
			
			this.game.physics.startSystem(Phaser.Physics.ARCADE);


			score = 0;

			
			this.platformsSpeed = 175;
			this.bombsSpeed = 50;
			this.lastPlatform = 0;
			this.lastTime = 1200;
			this.timeTest = 0;

			this.player = game.add.sprite(game.world.centerX, 5, 'ballon');    
			this.player.animations.add('center', [0, 1, 2, 3, 4, 5], 50, true);



			
			this.player.anchor.setTo(.5,.5);
			this.game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

			this.player.body.gravity.y = 300;
			
			this.platforms = this.game.add.group();
			this.platforms.enableBody = true;
			this.platforms.physicsBodyType = Phaser.Physics.ARCADE;

			this.bombs = this.game.add.group();
			this.bombs.enableBody = true;
			this.bombs.physicsBodyType = Phaser.Physics.ARCADE;


			
			this.scoreText = this.game.add.text(0,0,"Score : "+ 0);
			this.bestScoreText = this.game.add.text(0,28,"Best Score : "+ localStorage.getItem('bestScore'));
			
		},
	
	update : function(){
		
			this.player.animations.play('center');
			
			game.physics.arcade.collide(this.player, this.platforms);
			game.physics.arcade.overlap(this.player, this.bombs, this.playerDie, null, this);
			

			if(this.player.body.touching.down){
				score = score + 1;
				this.scoreText.text = 'Score: ' + Math.round((score));
			}

			
			if(score > localStorage.getItem('bestScore')){
			localStorage.setItem('bestScore', score);
			this.bestScoreText = 'Best Score: ' + score;
			}

			this.jumpPlayer();
			this.movePlayer();
			
			if (!this.player.inWorld) {
			this.score = 0;
			this.playerDie();
			}

			var curTimeE = this.game.time.now;
			this.score = curTimeE / 60;
			var curTime = this.game.time.now;
			if (curTime - this.timeTest > 3000){
				if(actPlatform < 18){
				actPlatform = actPlatform + 1;
				lastLvl = lastLvl + 1;
				this.lastTime = this.lastTime + 5;
				this.platformsSpeed = this.platformsSpeed + 10;
				//console.log(' Lvl! ');
				this.timeTest = curTime;
				//console.log(lastLvl);
				}
			}
				if(curTimeE - this.lastPlatform > this.lastTime)
				{
					if(lastLvl > 5){
						this.generateBomb();
					}
					this.generatePlatforms();
					this.lastPlatform = curTimeE;
				}
		},

	render : function render() {

    
	},
	generateBomb : function(){
			var bomb = this.bombs.getFirstExists(false);

			if(bomb)
			{
				bomb.reset(Math.floor(Math.random()* 800) , 3 ,'bombs_');
				
			}
			else
			{
				bomb = this.bombs.create(Math.floor(Math.random()* 800) , 3 ,'bombs_' );

			}
			bomb.body.gravity.y = 200;
			
			bomb.outOfBoundsKill = true;
			bomb.checkWorldBounds = true;
			this.bombs.setAll('body.immovable', true);
		},



	generatePlatforms : function(){
			var platform = this.platforms.getFirstExists(false);

			if(platform)
			{
				platform.reset(800 - 30,Math.floor(Math.random()*(180-30) + 300),'bloc'+ (Math.floor(Math.random() * 4) + 1) );
				
			}
			else
			{
				platform = this.platforms.create(800 - 30,Math.floor(Math.random()*(180-30) + 300),'bloc'+ (Math.floor(Math.random() * 4) + 1) );

			}
			platform.body.velocity.x = -this.platformsSpeed;
			platform.outOfBoundsKill = true;
			platform.checkWorldBounds = true;
			this.platforms.setAll('body.immovable', true);
		},
		
	movePlayer: function() {

		if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
			this.player.body.velocity.x = -200;

			this.player.animations.play('center');

		}
		else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
			this.player.body.velocity.x = 200;

			this.player.animations.play('center');
		}
		else {
			this.player.body.velocity.x = 0;
	        this.player.frame = 0; 
		}

	},
	jumpPlayer: function() {
		if (this.player.body.touching.down) {
			this.jumpSound.play();
			this.player.body.velocity.y = -300;	
		}		
	},
	playerDie: function() {
		actPlatform = 0;
		this.platformsSpeed = 175;
		this.bombsSpeed = 50;
		this.lastPlatform = 0;
		this.lastTime = 1200;
		this.timeTest = 0;
		lastLvl = 0;
		this.loseSound.play();
		console.log(score);
		score = 0;
		console.log(score);
		this.player.kill();
		this.game.state.start('menu');
		
	},
	

};

