// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form handling with Formspree submission
async function handleFormSubmit(form, successElement) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.classList.add('submitted');
            successElement.classList.add('active');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.disabled = false;
        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 3000);
    }
}

document.getElementById('beta-form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(this, document.getElementById('beta-success'));
});

document.getElementById('investor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(this, document.getElementById('investor-success'));
});

// Intersection Observer for fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .comparison-col, .philosophy-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(el);
});

// Waitlist counter animation
function animateCount(element, target, duration = 1500) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// Avatar stagger animation
function animateAvatars() {
    const avatars = document.querySelectorAll('.waitlist-avatar');
    avatars.forEach((avatar, i) => {
        avatar.style.opacity = '0';
        avatar.style.transform = 'scale(0.5) translateX(-10px)';
        setTimeout(() => {
            avatar.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            avatar.style.opacity = '1';
            avatar.style.transform = 'scale(1) translateX(0)';
        }, 800 + (i * 100));
    });
}

// Trigger waitlist animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const countElement = document.querySelector('.count-number');
    if (countElement) {
        const target = parseInt(countElement.dataset.target, 10);
        setTimeout(() => animateCount(countElement, target), 1000);
    }
    animateAvatars();
});
