const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Initial eraser size (default 20px)
let eraserSize = 20;

// Get the slider element and the span to display the value
const eraserSlider = document.getElementById('eraserSize');
const sizeValueDisplay = document.getElementById('sizeValue');

// Update the eraser size whenever the slider value changes
eraserSlider.addEventListener('input', (e) => {
  eraserSize = e.target.value;
  sizeValueDisplay.textContent = eraserSize; // Update the displayed size value
});

// Draw the rainbow gradient background
function drawRainbowBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0); // Horizontal gradient
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];

  // Add the colors to the gradient
  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the gradient
}

// Cover the canvas with a black rectangle (simulating the scratch layer)
function coverWithBlack() {
  ctx.globalCompositeOperation = 'source-over'; // Reset the composite mode
  ctx.fillStyle = '#000'; // Black color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with black
}

// Scratch effect to "erase" parts of the canvas
let isDrawing = false;

// Start drawing when mouse is pressed
canvas.addEventListener('mousedown', () => isDrawing = true);

// Stop drawing when mouse is released
canvas.addEventListener('mouseup', () => isDrawing = false);

// Track the mouse movement and scratch (erase)
canvas.addEventListener('mousemove', scratch);

// Stop drawing when the mouse leaves the canvas
canvas.addEventListener('mouseleave', () => isDrawing = false);

function scratch(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = 'destination-out'; // Set to erase the drawing
  ctx.beginPath();
  ctx.arc(x, y, eraserSize, 0, Math.PI * 2); // Erase with a circular path based on eraser size
  ctx.fill();
}

// Reset the canvas to its initial state (rainbow background and black cover)
function resetCanvas() {
  ctx.globalCompositeOperation = 'source-over'; // Reset the composite operation
  drawRainbowBackground(); // Redraw the rainbow background
  coverWithBlack(); // Apply the black scratch layer
}

// Initialize the canvas when the page loads
resetCanvas();