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
