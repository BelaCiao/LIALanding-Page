import React, { useRef, useEffect } from 'react';

interface ParticleBackgroundProps {
    particleColor?: string;
    lineColor?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
    particleColor = 'rgba(255, 255, 255, 0.5)',
    lineColor = 'rgba(255, 255, 255, 0.2)'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas.clientWidth;
                this.y = Math.random() * canvas.clientHeight;
                this.size = Math.random() * 1.5 + 1; // Finer particles
                this.speedX = Math.random() * 0.4 - 0.2; // Slower movement
                this.speedY = Math.random() * 0.4 - 0.2;
            }

            update() {
                if (this.x > canvas.clientWidth || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.clientHeight || this.y < 0) this.speedY *= -1;
                this.x += this.speedX;
                this.y += this.speedY;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const init = () => {
            particles = [];
            // Use clientWidth/clientHeight for calculation, which corresponds to CSS pixels
            const particleCount = Math.floor((canvas.clientWidth * canvas.clientHeight) / 15000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };


        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            // Set the canvas buffer size to match the device's pixel ratio
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            // Scale the context to ensure drawings are done in CSS pixels
            ctx.scale(dpr, dpr);
            
            // Re-initialize particles for the new canvas size
            init();
        };
        
        const connect = () => {
            if (!ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 100; // Reduced distance for a subtler effect
                    if (distance < maxDistance) {
                        opacityValue = 1 - (distance / maxDistance);
                        const lc = lineColor.replace(/[^,]+(?=\))/, opacityValue.toString());
                        ctx.strokeStyle = lc;
                        ctx.lineWidth = 0.5; // Finer lines for a sharper look
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        const animate = () => {
            // Clear using CSS dimensions as the context is scaled
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial setup
        animate(); // Start the animation

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColor, lineColor]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default ParticleBackground;