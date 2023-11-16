const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function animateFirstPage() {
    const tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    })
    .to(".boundingpart", {
        y: 0,
        duration: 2,
        delay: -1,
        ease: "expo.out",
        stagger: 0.2
    })
    .from("#Hero-Foot", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.out"
    });
}

let circleX = 0;
let circleY = 0;

function updateCirclePosition(x, y) {
    gsap.to("#Minicircle", {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out"
    });
}

function handleMouseMovement(event) {
    const x = event.clientX;
    const y = event.clientY;
    const xOffset = -10;
    const yOffset = -10;

    circleX = x + xOffset;
    circleY = y + yOffset;

    updateCirclePosition(circleX, circleY);
}

window.addEventListener("mousemove", handleMouseMovement);

function startPageAnimation() {
    animateFirstPage();
}

startPageAnimation();

document.querySelectorAll(".part").forEach((part) => {
    let rotate = 0;
    let diffrot = 0;
    let img = part.querySelector("img");

    part.addEventListener("mousemove", function (dets) {
        const diffY = dets.clientY - part.getBoundingClientRect().top - 5;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(img, {
            opacity: 1,
            ease: Power3.ease,
            y: diffY,
            x: dets.clientX,
            rotation: gsap.utils.clamp(-20, 20, diffrot * 0.2)
        });
    });

    part.addEventListener("mouseleave", function () {
        gsap.to(img, {
            opacity: 0,
            ease: Power3.ease,
            duration: 0.6
        });
    });
});
