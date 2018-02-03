// we create the global game object, an instance of Phaser.Game

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'world');

// the first parameter is the key you use to jump between state
// the key must be unique within the state manager
// the second parameter is the object that contains the state code
// these come from the js files we included in the head tag in the html file

var states = {
  'State001' : myPlate.State001,
  'State002' : myPlate.State002,
  'State003' : myPlate.State003
};

for(var state in states)
game.state.add(state, states[state]);
game.state.start('State001');