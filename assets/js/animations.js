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
