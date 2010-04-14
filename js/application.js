(function(){

	if(!window.TMNT) {window.TMNT = {}}	//Create Namespace
	
})();
		
$(document).ready(function(){

	/*
	  This demo is only for educational purposes, the code is under MIT license.
	  Teenage Mutant Ninja Turtles © Mirage Publishing. Graphics by Konami.
	  Teenage Mutant Ninja Turtles and all related characters © their respective owners.
	  images source: http://scrollboss.illmosis.net/sprites.php?game=tmnt
	*/

	var game = {};
	var battlenum = 0;

	var goodguys = [
	  { 
	    "name" : "Leonardo",
	    "bio": "images/bio/leo.gif",
	    "stand": "images/stand/leo.png" 
	  },
	  { 
	    "name" : "Michaelangelo",
	    "bio": "images/bio/mike.gif",
	    "stand": "images/stand/mike.png" 
	  },
	  { 
	    "name" : "Donatello",
	    "bio": "images/bio/don.gif",
	    "stand": "images/stand/don.png" 
	  },
	  { 
	    "name" : "Raphael",
	    "bio": "images/bio/raph.gif",
	    "stand": "images/stand/raph.png" 
	  }
	];

	var badguys = [
	  { 
	    "name" : "Foot Soldier",
	    "stand": "images/stand/footsoldier.png" 
	  },
	  { 
	    "name" : "Rock Steady",
	    "stand": "images/stand/rocksteady.png" 
	  },
	  { 
	    "name" : "Bebop",
	    "stand": "images/stand/bebop.png" 
	  },
	  { 
	    "name" : "Lt Granitor",
	    "stand": "images/stand/ltgranitor.png" 
	  },
	  { 
	    "name" : "General Traag",
	    "stand": "images/stand/traag.png" 
	  },
	  { 
	    "name" : "Krang (in exosuit)",
	    "stand": "images/stand/exo.png" 
	  },
	  { 
	    "name" : "The Shredder",
	    "stand": "images/stand/shredder.png" 
	  }
	];

	jQuery(function($){

	  // characters
	  april = $('<img />', { "src": "images/apriltiedup.gif", "class": "april" });
	  enemy = $('<img />', { "src": badguys[0].stand, "class": "enemy" });
	  goodguy = $('<img />', { "class": "goodguy" });

	  // setup arena
	  arena = $("#arena")
	  .append(april)
	  .append(enemy)
	  .append(goodguy)
	  .droppable({
	    accept: ".bio",
	    drop: function(e, ui){
	      guy = $.grep(goodguys, function(guy){
	        return guy.name == $(ui.draggable).attr('alt');
	      })[0];
	      goodguy.attr('src', guy.stand);
	      $("#actions").show();
	    }
	  });

	  // setup chooser
	  bios = $("#chooser img")
	  .draggable({
	    helper: function(e, ui){
	      guy = $.grep(goodguys, function(guy){
	        return guy.name == $(e.target).attr('alt');
	      })[0];
	      return $('<img />', { "src": guy.stand });
	    },
	    cursorAt: { "right": 5, "top": 0 }
	  });

	  $("#actions button").button();

	  $("#actions .action-attack").click(function(){
	    if (game.action) return;
	    game.action = true;

	    goodguy
	      .animate({ left: 100 }, 700)
	      .effect('shake', { times: 3 }, 150, function(){
	        $(this).animate({ left: 20 }, 300);
	        badguydie();
	      });
	  });

	  function badguydie(){
	    ++battlenum;
	    enemy.hide('explode', {}, 500);
	    enemy.queue(function(){
	      if (badguys[battlenum] == undefined) return gameend();

	      $(this)
	      .css('right', 0)
	      .attr('src', badguys[battlenum].stand)
	      .delay(800)
	      .fadeIn('fast').animate({ right: 45 }, 300)
	      .queue(function(){
	        game.action = false;
	        $(this).dequeue();
	      });
	      $(this).dequeue();
	    });
	  }

	  function gameend(){
	    april.attr('src', 'images/aprilwave.gif');
	    setTimeout(function(){
	      $("<div />", {
	        title: "You win!",
	        html: "April is now safe, thanks to you." }).dialog({ modal: true });
	    }, 1000);
	  }

	});


});










