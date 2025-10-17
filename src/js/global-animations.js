import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function (rootEl) {
    if (rootEl.dataset.animation === "reveal-up") {
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
    }

    // ======================
  // Card Carousel Animation
  // ======================
  if (rootEl.classList.contains("js-card-stack")) {
    const cards = rootEl.querySelectorAll(".js-card");
    const nextBtn = document.getElementById("nextCard");
    const prevBtn = document.getElementById("prevCard");
    let current = 0;

    // Initial stacking
    cards.forEach((card, i) => {
      gsap.set(card, {
        y: i * 10,
        scale: 1 - i * 0.05,
        opacity: 1 - i * 0.3,
        zIndex: cards.length - i,
      });
    });

    const restack = () => {
      const visibleCards = rootEl.querySelectorAll(".js-card");
      visibleCards.forEach((card, i) => {
        gsap.to(card, {
          y: i * 10,
          scale: 1 - i * 0.05,
          opacity: 1 - i * 0.3,
          zIndex: visibleCards.length - i,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    const showNext = () => {
      if (current >= cards.length - 1) return;
      const card = cards[current];
      gsap.to(card, {
        y: -500,
        rotation: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          card.style.zIndex = 0;
          gsap.set(card, {
            y: (cards.length - 1) * 10,
            scale: 1 - (cards.length - 1) * 0.05,
          });
          rootEl.appendChild(card);
          current++;
          restack();
        },
      });
    };

    const showPrev = () => {
      if (current <= 0) return;
      current--;
      const card = cards[current];
      gsap.set(card, {
        y: -500,
        rotation: -15,
        opacity: 0,
        zIndex: cards.length,
      });
      gsap.to(card, {
        y: current * 10,
        rotation: 0,
        opacity: 1,
        scale: 1 - current * 0.05,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: restack,
      });
    };

    nextBtn?.addEventListener("click", showNext);
    prevBtn?.addEventListener("click", showPrev);
  }

}