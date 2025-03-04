import kaplay from "kaplay";

// Initialize Kaplay
kaplay({
    global: true, // Make Kaboom functions globally available
    width: 200,   // Game width
    height: 200,  // Game height
    canvas: document.querySelector('#game-container'), // Attach to the container
    background: [0, 0, 255]
});

// Load a sprite
loadSprite('trex', '../assets/sprites/trex.jpg');

// Add a player character
const player = add([
    sprite('trex'),
    pos(100, 100),
]);

// Simple movement
onKeyPress('space', () => {
    player.jump();
});

onKeyDown('left', () => {
    player.move(-20, 0);
});

onKeyDown('right', () => {
    player.move(20, 0);
});