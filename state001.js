// defining a single global object (myPlate) and adding some functions in to its prototype (eg preload, create functions)
var myPlate = {};

myPlate.State001 = function (game) {

};

myPlate.State001.prototype = {

    preload: function () {


    },

    create: function () {

      this.game.state.start('State002');

    },

    update: function() {


    }

}