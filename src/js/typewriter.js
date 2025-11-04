import { gsap} from 'gsap/all';

export function typeWriterAnimation() { 
    const heading = document.querySelector(".js-heading-text");
    const text = "Enter the 6 digit password.";

    if (!heading) return;

    // Step 1: Hide initially
    heading.style.opacity = 0;

    // Step 2: Split text into spans (preserve spaces)
    heading.innerHTML = text
        .split("")
        .map(char => {
            if (char === " ") char = "&nbsp;"; // preserve space
            return `<span class="inline-block opacity-0">${char}</span>`;
        })
        .join("");

    const letters = heading.querySelectorAll("span");

    gsap.timeline({ delay: 1 })
        .set(heading, { opacity: 1 })
        .to(letters, {
            opacity: 1,
            duration: 0.1,
            stagger: 0.10,
            ease: "power1.inOut"
        });
}