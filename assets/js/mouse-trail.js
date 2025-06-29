document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mouseTrailCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = {
        x: undefined,
        y: undefined
    };

    // Set canvas size to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Update mouse coordinates
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        // Add a new particle at the mouse position
        for (let i = 0; i < 2; i++) { // Create multiple particles for a denser trail
            particles.push(new Particle(mouse.x, mouse.y));
        }
    });

    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1; // Random size between 1 and 6
            this.speedX = Math.random() * 2 - 1; // Random speed between -1 and 1
            this.speedY = Math.random() * 2 - 1;
            this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'; // Random vibrant color
            this.opacity = 1;
            this.life = 100; // Particle life in frames
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1; // Shrink over time
            if (this.opacity > 0.02) this.opacity -= 0.02; // Fade over time
            this.life--;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 165, 0, ${this.opacity})`; // Orange glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(255, 165, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for next draw
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            // Remove particles that are too small or have no life left
            if (particles[i].size <= 0.2 || particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
});
