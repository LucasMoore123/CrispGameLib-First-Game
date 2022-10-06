// Took inspiration for hitbox detection from: https://github.com/OfficialThomas/crisp-thomas-first-game
// Took starter code from: https://github.com/JunoNgx/crisp-game-lib-tutorial#step-02-input-and-control-player
// Altered that tutorial code to fit my own game.
// The title of the game to be displayed on the title screen
title = "Meteor Dodge";

// The description, which is also displayed on the title screen
description = `Press Space to go Up
`;

// The array of custom sprites
characters = [
`
  rrr
rrrr
  rrr
`
];

// Game design variable container
const G = {
	WIDTH: 150,
	HEIGHT: 100,

    STAR_SPEED_MIN: 0.4,
	STAR_SPEED_MAX: 1.2
};

// Game runtime options
// Refer to the official documentation for all available options
options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2
};

// JSDoc comments for typing
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star
 */

/**
 * @type { Star [] }
 */
let stars;

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        // A CrispGameLib function
        // First argument (number): number of times to run the second argument
        // Second argument (function): a function that returns an object. This
        // object is then added to an array. This array will eventually be
        // returned as output of the times() function.
		stars = times(15, (s) => {
            // Random number generator function
            // rnd( min, max )
            const posX = 0;
            const posY = rnd(G.WIDTH, 0);
            // An object of type Star with appropriate properties
            return {
                // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
            };
        });


        player = {
            pos: vec(G.WIDTH * 0.95, G.HEIGHT * 0.5)
        };
	}
	
	if(!input.isPressed){
		player.pos.y += 0.9;
	} else {
		player.pos.y -= 0.9;
	}
    // Update for Star
    stars.forEach((s) => {
        // Move the star sideways
        s.pos.x += s.speed;
        // Bring the star back to top once it's past the bottom of the screen
        if (s.pos.x > G.WIDTH){
			s.pos.x = 0;
			s.pos.y = rnd(G.HEIGHT,0);
			addScore(1);
		}

        // Choose a color to draw
        color("blue");
        // Draw the star as a square of size 8
        box(s.pos, 8);
		if (s.pos.y >= player.pos.y - 4 && s.pos.y <= player.pos.y + 4) {
			if (s.pos.x >= player.pos.x - 4 && s.pos.x <= player.pos.x + 4) {
			  end();
			}
		}
    });

    
    player.pos.clamp(0, G.WIDTH, 2, G.HEIGHT-2);

    color ("black");
    char("a", player.pos);
}