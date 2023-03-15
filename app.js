const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    const particlesLength = Math.floor(window.innerWidth / 10);

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144);

    particles.forEach((p, index) => {
        p.update();
        p.draw();
        //p.checkParticles(particles.slice(index));  // check particles from this particle onwards
    })
}

class Particle {
    constructor() {
        // position
        this.pos = createVector(random(width), random(height));
        // size
        this.size = 10;
        // velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
    }

    // update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // draw single particle
    draw() {
        noStroke();
        fill('rgba(255, 255, 255, 0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    // detect edges
    edges() {
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }

        if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    // connect particles
    checkParticles(particles) {
        particles.forEach(particle => {
            // get distance
            const d = dist(this.pos.x, this.pos.y, particle.pos, particle.pos.y);

            if(d < 120) {
                stroke('rgba(255, 255, 255, 0.1)');
                line(this.pos.x, this.pos.y, particle.pos, particle.pos.y);
            }
        });
    }
}