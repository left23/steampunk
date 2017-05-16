// We don't need to create the myPlate object again, because we already did this in State001
// Instead all we do is create a new function on it called StateB and then set-up a single create function on its prototype

myPlate.State002 = function(game) {
}

myPlate.State002.prototype = {

  preload: function () {
    this.load.image('bg', 'assets/rusty-bg-landscape.jpg');
    this.load.image('body', 'assets/rusty-bg-portrait.jpg');
    this.load.image('arm', 'assets/arm.png');
    this.load.atlas('sprites', 'assets/sprites.png', 'assets/sprites.json');

  },

  create: function () {

    bg = this.add.image(0, 0, 'bg');
    bg.height = game.height;
    bg.width = game.width;
    bg.alpha = 0.6;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.BOX2D);

    //  This is just a visual debug grid, it's not needed for the actual Group.align to work
    game.add.sprite(0, 0, game.create.grid('grid', 160 * 5, 160 * 3, 160, 160, 'rgba(0, 250, 0, 1)'));

    // make the robot group
    robot = game.add.group();
    //robot.scale.set(0.5, 0.5);

    // create the body object, on the group, using an image object from preload
    //robot.create(170, 0, 'body');

    robot.createMultiple(3, 'sprites', ['arm.png', 'cell.png'], true);


    robot.align(3, 0, 160, 160, Phaser.TOP_LEFT);

    //  Make them all input enabled
    robot.setAll('inputEnabled', true);

    //  And allow them all to be dragged
    robot.callAll('input.enableDrag', 'input');
    //robot.setAll('anchor.x', 0.5);
    //robot.setAll('anchor.y', 0.5);
    robot.setAll('pivot.x', 0);
    robot.setAll('pivot.y', 0);

    //game.add.tween(robot.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


  },

  update: function() {

    //robot.rotation += 0.02;

    robot.forEach(function(item) {
        //item.rotation += 0.02;
    })

  }

}