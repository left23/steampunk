// We don't need to create the myPlate object again, because we already did this in State001
// Instead all we do is create a new function on it called StateB and then set-up a single create function on its prototype

myPlate.State003 = function(game) {
}

myPlate.State003.prototype = {

  preload: function () {
    this.load.image('bg', 'assets/rusty-bg-landscape.jpg');
    this.load.atlas('sprites', 'assets/sprites.png', 'assets/sprites.json');
  },

  create: function () {

    bg = this.add.image(0, 0, 'bg');
    bg.height = game.height;
    bg.width = game.width;
    bg.alpha = 0.6;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.BOX2D);


    may = game.add.sprite(this.world.centerX, this.world.centerY, 'sprites');
    may.frameName = 'dali-may-west.png';
    may.anchor.setTo(0.5, 0.5);

    laptop = game.add.sprite(785, 15, 'sprites');
    laptop.frameName = 'laptop.png';
    laptop.anchor.setTo(1, 0);
    laptop.scale.setTo(0.7, 0.7);

    clock = game.add.sprite(420, 100, 'sprites');
    clock.frameName = 'clock.png';
    clock.anchor.setTo(0.5, 0.5);
    clock.scale.setTo(0.4, 0.4);
    clock.inputEnabled = true;
    clock.events.onInputDown.add(clockListener, this);
    clock.alpha = 1;

    fishProfile = game.add.sprite(640,270, 'sprites');
    fishProfile.frameName = 'fish-profile.png';
    fishProfile.anchor.setTo(0.5, 0.5);
    fishProfile.scale.setTo(0.5, 0.5);

    fish = game.add.sprite(200, 350, 'sprites');
    fish.frameName = 'fish.png';
    fish.anchor.setTo(0.5, 0.5);
    fish.scale.setTo(0.5, 0.5);

  },

  update: function() {

    clock.rotation += 0.02;

  }

}


function clockListener () {

  game.add.tween(clock.scale).to( {x: 1.0, y: 1.0}, 1000, Phaser.Easing.Back.Linear, true);
  game.add.tween(clock).to({ alpha: 0.2 }, 2400, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);

}