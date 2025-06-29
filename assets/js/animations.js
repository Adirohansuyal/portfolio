// GSAP Animations

gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -20 });
gsap.from(".navbar a", { opacity: 0, duration: 1, delay: 0.8, y: -20, stagger: 0.2 });
gsap.from(".social-icons a", { opacity: 0, duration: 1, delay: 1.5, x: -20, stagger: 0.2 });
gsap.from(".home .content h2", { opacity: 0, duration: 1, delay: 1, y: 20 });
gsap.from(".home .content p", { opacity: 0, duration: 1, delay: 1.2, y: 20 });
gsap.from(".home .btn", { opacity: 0, duration: 1, delay: 1.5, y: 20 });
gsap.from(".home .image", { opacity: 0, duration: 1, delay: 1.8, x: 20 });

ScrollTrigger.batch(".about .row, .skills .container, .education .box-container, .work .box-container, .experience .timeline, .contact .container", {
  onEnter: batch => gsap.from(batch, { opacity: 0, y: 50, stagger: 0.2, duration: 1 }),
});

// Mouse following spark animation
document.addEventListener('mousemove', function(e) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);

    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';

    const size = Math.random() * 5 + 5; // Random size between 5 and 10
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';

    const duration = Math.random() * 0.5 + 0.5; // Random duration between 0.5 and 1 second
    const delay = Math.random() * 0.1; // Small random delay

    gsap.to(spark, {
        opacity: 0,
        scale: 0,
        x: 'random(-20, 20)',
        y: 'random(-20, 20)',
        duration: duration,
        delay: delay,
        ease: 'power1.out',
        onComplete: () => spark.remove()
    });
});