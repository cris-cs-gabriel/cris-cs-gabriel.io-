# Sprint 1 - Basic Controls and Obstacles
[Priority]:
 Create a running game where the player can run, jump over obstacles, and take damage
[Estimate]:
 About 1 week
[User Story]
[As a] gamer,
[I want to] control a cube that can run, jump, take damage, and die,
[so that I can] survive as long as possible while trying to achieve a high score.
[Acceptance Criteria]
[Given that] the game is running,
[when] the player presses the Spacebar or Up Arrow key,
[then] the cube should jump over obstacles successfully.

[Given that] the player hits an obstacle,
[when] a collision with the obstacle occurs,
[then] the player should take damage and lose the game.


# Sprint 2 - Score counter, Time counter, and Death screen.
 [Priority]:
 Add a score counter, time counter, and ending screen to make the game feel more complete and rewarding.
[Estimate]:
 About 1 week
[User Story]
[As a] gamer,
[I want to] see my score and survival time while playing,
[so that I can] track my progress and try to beat my highest score.
[I also want to] see an ending screen when the game is over,
[so that I can] know my final score and restart the game easily.
[Acceptance Criteria]
[Given that] the player is surviving in the game,
[when] time passes or obstacles are avoided,
[then] the score and timer should increase and appear on the screen.
[Given that] the player loses by hitting an obstacle,
[when] the game ends,
[then] an ending screen should appear showing the final score and an option to restart the game.



# Sprint 3 - Floating Obstacles, Duck Mechanic, and Visual Improvements
[Priority]:
 Add floating obstacles, a duck/crouch mechanic, and improved visuals to make the gameplay more challenging and visually appealing.
[Estimate]:
 About 1 week
[User Story]
[As a] gamer,
[I want to] avoid both ground and floating obstacles using jumping and ducking mechanics,
[so that I can] experience more challenging and skill-based gameplay.
[I also want to] see improved graphics, backgrounds, and animations,
[so that I can] enjoy a more polished and immersive game experience.

[Acceptance Criteria]
[Given that] the game is running,
 [when] a floating obstacle appears,
 [then] the player should avoid it by ducking underneath it successfully.

[Given that] the player presses the Down Arrow key
 [when] the player is on the ground,
 [then] the cube should duck/crouch until the key is released.
[Given that] the player collides with either a ground obstacle or floating obstacle,
 [when] the collision occurs,
 [then] the player should take damage and lose the game.
[Given that] the game is being played,
 [when] the player views the environment and character,
 [then] improved visuals such as updated backgrounds, smoother animations, better obstacle designs, and cleaner UI should be displayed.

## Workflow 

Use Incremental Test Driven Development (TDD)
Create smallest testable feature then report changes