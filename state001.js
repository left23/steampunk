// defining a single global object (myPlate) and adding some functions in to its prototype (eg preload, create functions)
var myPlate = {
}

myPlate.State001 = function (game) {
};

var lastPosition = 0;
console.log(lastPosition);

myPlate.State001.prototype = {

  preload: function () {
    this.load.image('bg', 'assets/rusty-bg-landscape.jpg');
    this.load.image('body', 'assets/rusty-bg-portrait.jpg');
    this.load.atlas('sprites', 'assets/sprites.png', 'assets/sprites.json');

    this.load.spritesheet('runner','assets/$Female_3_WS_Running_FullFrame.png', 70, 70, 32);
    this.load.spritesheet('mexican', 'assets/$Male_3_WS_Running_FullFrame.png', 70, 70, 32);

    this.load.spritesheet('platformTiles','assets/015_Zombie_A4b.png', 32, 32, 48);
    this.load.spritesheet('liftTiles','assets/011_Zombie_A4b.png', 32, 32, 48);

    this.load.image('gearsClock', 'assets/gears-with-clock.png');
    this.load.image('gear', 'assets/gear.png');

    this.load.image('gun', 'assets/gun.png');
    this.load.image('pump', 'assets/pump.png');
    this.load.image('weight', 'assets/weight.png');

    this.load.image('box', 'assets/box.png');
    this.load.image('lift', 'assets/lift.png');

  },

  create: function () {

    //console.log('create');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.BOX2D);

    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    bg = this.add.image(0, 0, 'bg');
    bg.height = game.height;
    bg.width = game.width;
    bg.alpha = 0.6;

    thingy = game.add.sprite(40, 40, 'sprites');
    thingy.frameName = 'thingy.png';
    thingy.scale.setTo(1.2);
    thingy.anchor.setTo(0,0);

    gearsClock = this.add.image(302, 140, 'gearsClock');
    gearsClock.anchor.setTo(0.5,0);

    cellPhone = game.add.sprite(104, 290, 'sprites');
    cellPhone.frameName = 'cell.png';
    cellPhone.inputEnabled = true;
    cellPhone.events.onInputDown.add(cellListener, this);

    /**
     * Creates the pump.
     */
    this.physics.box2d.debugDraw.joints = true;
    this.physics.box2d.gravity.y = 500;
    this.physics.box2d.restitution = 0.7;

    this.physics.box2d.setBoundsToWorld();

      //  Create a static rectangle body for the ground. This gives us something solid to attach our crank to
    this.ground = new Phaser.Physics.Box2D.Body(this, null, this.world.centerX, 470, 0);
      //setRectangle(width, height, offsetX, offsetY, rotation)
    this.ground.setRectangle(640, 20, 0, 0, 0);

      //  Tall skinny rectangle body for the crank
    this.crank = this.add.sprite(this.world.centerX, 310, 'gear');
    this.crank.anchor.setTo(0.5, 0.5);
    this.physics.box2d.enable(this.crank);
    this.crank.body.setCircle(this.crank.width / 2);
      //Revolute joint with motor enabled attaching the crank to the ground. This is where all the power for the slider crank comes from
    this.physics.box2d.revoluteJoint(this.ground, this.crank, 0, -80, 0, 0, 250, 50, true);

      //  Tall skinny rectangle body for the gun. Connects the crank to the piston
    this.gun = this.add.sprite(this.world.centerX, this.world.centerY, 'pump');
    this.physics.box2d.enable(this.gun);
    this.gun.body.setRectangle(10, 179, 0, 0, 0);
      //gun.anchor.setTo(0, 0.5);
      //revolute joint to attach the crank to the gun
    this.physics.box2d.revoluteJoint(this.crank, this.gun, 0, -10, 0, 60);

      //  Square body for the piston. This will be pushed up and down by the crank
    this.piston = this.add.sprite( 0, 310, 'gun');
    this.physics.box2d.enable(this.piston);
    this.piston.body.setRectangle(301, 112, 150, 0, 0);
    this.piston.anchor.setTo(0, 0.5);
      //revolute joint to join the gun and the piston
      // bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
    this.physics.box2d.revoluteJoint(this.gun, this.piston, 0, -112, 0, 0);
      //prismatic joint between the piston and the ground, this joints purpose is just to restrict the piston from moving on the x axis
    this.physics.box2d.prismaticJoint(this.ground, this.piston, 0, 1, 0, 0, 0, 0);


    /**
     * Creates the box obstacle.
     */

    //box = this.add.sprite(200, 250, 'box');
    //game.physics.arcade.enable(box);

    //box.body.collideWorldBounds = true;

    platformTile33a = this.add.sprite(232, 250, 'platformTiles');
    platformTile33a.frame = 33;
    platformTile33b = this.add.sprite(264, 250, 'platformTiles');
    platformTile33b.frame = 33;
    platformTile33c = this.add.sprite(296, 250, 'platformTiles');
    platformTile33c.frame = 33;
    platformTile33d = this.add.sprite(328, 250, 'platformTiles');
    platformTile33d.frame = 33;
    platformTile43 = this.add.sprite(200, 250, 'platformTiles');
    platformTile43.frame = 43;
    platformTile45 = this.add.sprite(360, 250, 'platformTiles');
    platformTile45.frame = 45;


    // new Group(game, parent, name, addToStage, enableBody, physicsBodyType)
    platform = this.add.group(null, 'platform', true, true, Phaser.Physics.ARCADE);

    platform.add(platformTile33a);
    platform.add(platformTile33b);
    platform.add(platformTile33c);
    platform.add(platformTile33d);
    platform.add(platformTile43);
    platform.add(platformTile45);

    platform.setAll('body.collideWorldBounds', true);


    /**
     * Creates the lift obstacle.
     */

    //lift = this.add.sprite(400, 250, 'lift');
    //game.physics.arcade.enable(lift);

    //lift.body.collideWorldBounds = true;

    liftTile33a = this.add.sprite(432, 250, 'liftTiles');
    liftTile33a.frame = 33;
    liftTile33b = this.add.sprite(464, 250, 'liftTiles');
    liftTile33b.frame = 33;
    liftTile33c = this.add.sprite(496, 250, 'liftTiles');
    liftTile33c.frame = 33;
    liftTile33d = this.add.sprite(528, 250, 'liftTiles');
    liftTile33d.frame = 33;
    liftTile43 = this.add.sprite(400, 250, 'liftTiles');
    liftTile43.frame = 43;
    liftTile45 = this.add.sprite(560, 250, 'liftTiles');
    liftTile45.frame = 45;


    // new Group(game, parent, name, addToStage, enableBody, physicsBodyType)
    lift = this.add.group(null, 'lift', true, true, Phaser.Physics.ARCADE);

    lift.add(liftTile33a);
    lift.add(liftTile33b);
    lift.add(liftTile33c);
    lift.add(liftTile33d);
    lift.add(liftTile43);
    lift.add(liftTile45);

    lift.setAll('body.collideWorldBounds', true);



    runner = this.add.sprite(500, 10, 'runner');
    runner.inputEnabled = true;
    this.physics.enable(runner, Phaser.Physics.ARCADE);
    runner.body.enable = true;


    runner.animations.add('down',[0,1,2,3,4,5,7], 8, true);
    runner.animations.add('left',[8,9,10,11,12,13,14,15], 8, true);
    runner.animations.add('right',[16,17,18,19,20,21,22,23], 8, true);
    runner.animations.add('up',[24,25,26,27,28,29,30,31], 8, true);


    game.physics.arcade.enable(runner);

    runner.body.gravity.set(0, 180);

    runner.body.collideWorldBounds = true;



    var offset = 10;

    cabinet = {
      width:   200,
      height:  game.world.height,
      x:  200,
      y:  0
    }

    mexican = this.add.sprite(200, 200, 'mexican');
    mexican.inputEnabled = true;
    this.physics.enable(mexican, Phaser.Physics.ARCADE);
    mexican.body.enable = true;

    mexican.animations.add('down',[0,1,2,3,4,5,7], 8, true);
    mexican.animations.add('left',[8,9,10,11,12,13,14,15], 8, true);
    mexican.animations.add('right',[16,17,18,19,20,21,22,23], 8, true);
    mexican.animations.add('up',[24,25,26,27,28,29,30,31], 8, true);

    //game.physics.arcade.enable(mexican);
    //mexican.body.gravity.set(0, 180);

    mexican.body.collideWorldBounds = true;
    cabinet.boundsX = cabinet.width + cabinet.x - mexican.width;
    cabinet.boundsY = cabinet.height + cabinet.y - mexican.height;
    mexican.body.gravity.y = 0;
  },

  update: function() {

    //console.dir(mexican);

    game.physics.arcade.collide(runner, platform);
    game.physics.arcade.collide(runner, lift);

    //var val = new Phaser.Point().copyFrom(mexican).dot(mexican);
    //var val = new Phaser.Point().copyFrom(mexican);

    console.log('mex x: ' + mexican.x);
    console.log('cab x: ' + cabinet.boundsX);

    if (mexican.x >= cabinet.x && mexican.x <= cabinet.boundsX && mexican.body.velocity.x <= 1) {


      var currentPosition = new Phaser.Point().copyFrom(mexican);
      //mexican.animations.play('right', 4, false);
      //mexican.x += 4;

      console.dir("Current position: " + currentPosition.x);
      console.dir("Last position: " + lastPosition.x);
      console.log("---break---");

      mexican.body.velocity.x = 50;

      mexican.animations.play('up', 4, false);

    } else if (mexican.x >= cabinet.boundsX && mexican.body.velocity.x >= 1) {
      mexican.body.velocity.x = -50;
    }


/*
      if (lastPosition.x >= currentPosition.x) {
        console.log("knob down");
        mexican.animations.play('left', 4, true);
        mexican.x -= 4;
      }


console.log(lastPosition);
console.log(lastPosition.toString());

    if (lastPosition === undefined) {
      console.log('this is null');
    }


      if (lastPosition.x < currentPosition.x) {
        console.log("knob up");
        mexican.animations.play('right', 4, true);
        mexican.x += 4;
      } else {
        console.log("knob down");
        mexican.animations.play('left', 4, true);
        mexican.x -= 4;
      }

      lastPosition = currentPosition;

    }

      //console.log('val x: ' + val.x);
      //console.log('mex x: ' + mexican.x);
      //console.log('cab x: ' + cabinet.boundsX);
/*
      if (mexican.x = val.x) {
        mexican.animations.play('right', 4, false);
        mexican.x += 4;
        console.log('case: 1');
      } else if (mexican.x < val.x) {
        mexican.animations.play('right', 4, true);
        mexican.x += 4;
        console.log('case: 2');
      } else if (mexican.x = cabinet.boundsX) {
        mexican.animations.play('left', 4, true);
        mexican.x -= 4;
        console.log('case: 3');
      } else {
        mexican.animations.play('left', 4, true);
        mexican.x -= 4;
        console.log('case: 4');
      }

 */

    if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

      if (runner.x <= game.world.width ) {
        runner.animations.play('right', 4, true);
        runner.x += 4;
        //console.log('runner: ' + runner.x, runner.y);
      } else {
        runner.animations.play('stop', 4, true);
      }

    } else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

      if (runner.x >= 0 ) {
        runner.animations.play('left', 4, true);
        runner.x -= 4;
        //console.log('runner: ' + runner.x, runner.y);
      } else {
        runner.animations.play('stop', 4, true);
      }

    } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

      if (runner.y <= game.world.height ) {
        runner.animations.play('down', 4, true);
        runner.y += 4;
        //console.log('runner: ' + runner.x, runner.y);
      } else {
        runner.animations.play('stop', 4, true);
      }

    } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {

      if (runner.y >= 0 ) {
        runner.animations.play('up', 4, true);
        runner.y -= 4;
        //console.log('runner: ' + runner.x, runner.y);
      } else {
        runner.animations.play('stop', 4, true);
      }
    } else {
      runner.animations.play('down', 4, true);
    }



  },

  render: function() {
    //game.debug.box2dWorld();

  }

}


function cellListener () {

  this.game.state.start('State002');

}