import { gsap } from 'gsap';
import { generalAnimations } from './js/general-animations.js';
import { typeWriterAnimation } from './js/typewriter.js';

document.addEventListener('DOMContentLoaded', () => {
    const correctPassword = "030825";
    const arrowImage = document.getElementById("longDownArrow");
    const passwordInput = document.getElementById("password");

    // Lock scroll initially
    document.body.classList.add("lock-scroll");

    // Hide arrow initially
    gsap.set(arrowImage, { opacity: 0, y: -20 });

    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value.trim();

        if (value.length === 6) {
            if (value === correctPassword) {
                unlockPage();
            } else {
                wrongPasswordShake();
            }
        }
    });

    function unlockPage() {
        // Unlock scrolling
        document.body.classList.remove("lock-scroll");

        // Show + animate arrow
        gsap.to(arrowImage, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            onComplete: () => arrowBounce()
        });
        arrowImage.classList.remove("pointer-events-none");

        // Scroll on arrow click
        arrowImage.addEventListener("click", () => {
          const target = document.getElementById("first-day");
          if (target) {
              gsap.to(window, {
                  scrollTo: target,  // scroll to the element
                  duration: 1,
                  ease: "power2.inOut"
              });
          }
      });
    }

    function arrowBounce() {
        gsap.to(arrowImage, {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 0.7
        });
    }

    function wrongPasswordShake() {
        gsap.fromTo(passwordInput,
            { x: -10 },
            { x: 10, repeat: 3, yoyo: true, duration: 0.1, ease: "power1.inOut" }
        );
    }

    document.querySelectorAll('.js-gsap').forEach(rootEl => {
        const animationType = rootEl.dataset.animation;

        // Handle different animation types
        switch (animationType) {
            case "reveal-up":
                gsap.fromTo(rootEl,
                    {
                        y: 50,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: rootEl,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                break;

            case "reveal-left":
                gsap.fromTo(rootEl,
                    {
                        x: -50,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: rootEl,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                break;

            case "reveal-right":
                gsap.fromTo(rootEl,
                    {
                        x: 50,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: rootEl,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                break;

            // Add more animation types here as needed
            default:
                console.warn(`Unknown animation type: ${animationType}`);
        }   

        const startFloating = (el, direction = 'y') => {
            const prop = direction === 'x' ? 'x' : 'y';
            gsap.to(el, {
                [prop]: direction === 'x' ? '+=15' : '+=15', // movement amount
                duration: 2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true
            });
        };

        // REVEAL UP + FLOAT
        if (animationType === "reveal-up-float") {
            gsap.fromTo(rootEl,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: rootEl,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        onEnter: () => startFloating(rootEl, 'y')
                    }
                }
            );
        }

        // REVEAL LEFT + FLOAT
        else if (animationType === "reveal-left-float") {
            gsap.fromTo(rootEl,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: rootEl,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        onEnter: () => startFloating(rootEl, 'y') // still float vertically
                    }
                }
            );
        }

        // REVEAL RIGHT + FLOAT
        else if (animationType === "reveal-right-float") {
            gsap.fromTo(rootEl,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: rootEl,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        onEnter: () => startFloating(rootEl, 'y') // or 'x' if you want side-to-side float
                    }
                }
            );
        }
        
        













    });
    

    // Init animations
    typeWriterAnimation();
    generalAnimations();
});