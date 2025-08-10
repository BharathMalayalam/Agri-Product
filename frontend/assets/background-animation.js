class BackgroundAnimation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="gradient-sphere sphere-1"></div>
            <div class="gradient-sphere sphere-2"></div>
            <div class="gradient-sphere sphere-3"></div>
            <div id="particles-container"></div>
        `;

        const container = this.querySelector('#particles-container');
        const count = 80;

        for (let i = 0; i < count; i++) {
            this.createParticle(container);
        }

        document.addEventListener('mousemove', (e) => {
            this.mouseParticle(e, container);
            this.moveSpheres(e);
        });
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        this.resetParticle(particle);
        container.appendChild(particle);
        this.animateParticle(particle, container);
    }

    resetParticle(particle) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.opacity = '0';
        return { x, y };
    }

    animateParticle(particle, container) {
        const pos = this.resetParticle(particle);
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30;
            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;

            setTimeout(() => this.animateParticle(particle, container), duration * 1000);
        }, delay * 1000);
    }

    mouseParticle(e, container) {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';
        container.appendChild(particle);

        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 2000);
        }, 10);
    }

    moveSpheres(e) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
        this.querySelectorAll('.gradient-sphere').forEach(sphere => {
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
}

customElements.define('background-animation', BackgroundAnimation);
