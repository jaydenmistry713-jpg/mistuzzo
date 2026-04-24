// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Info Dropdown Toggle
function toggleInfoDropdown(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');
    
    // Toggle current dropdown
    if (isActive) {
        header.classList.remove('active');
        content.classList.remove('active');
    } else {
        header.classList.add('active');
        content.classList.add('active');
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form Submission Handler
const enquiryForm = document.getElementById('enquiryForm');
const successMessage = document.getElementById('successMessage');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(enquiryForm);
        
        try {
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                // Show success message
                successMessage.classList.add('show');
                enquiryForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // Store in localStorage for admin panel
                const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
                enquiries.push({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    business: formData.get('business'),
                    service: formData.get('service'),
                    message: formData.get('message'),
                    date: new Date().toISOString()
                });
                localStorage.setItem('enquiries', JSON.stringify(enquiries));
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your enquiry. Please try again or contact us directly via email.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
