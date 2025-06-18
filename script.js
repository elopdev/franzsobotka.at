// Loading Animation with slide transition
window.addEventListener('load', () => {
    // Ensure hero content is ready
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    // Initially hide hero text
    if (heroTitle) heroTitle.style.opacity = '0';
    if (heroSubtitle) heroSubtitle.style.opacity = '0';
    
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('slide-up');
        
        // Animate hero text as loader slides up
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.transition = 'opacity 0.8s ease';
                heroTitle.style.opacity = '1';
            }
            if (heroSubtitle) {
                heroSubtitle.style.transition = 'opacity 0.8s ease 0.2s';
                heroSubtitle.style.opacity = '1';
            }
        }, 400);
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 1500);
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Staggered animation for video items
            if (entry.target.classList.contains('archiv')) {
                const videos = entry.target.querySelectorAll('.video-item');
                videos.forEach((video, index) => {
                    setTimeout(() => {
                        video.style.opacity = '1';
                        video.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Apply fade-in effect to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Prepare video items for animation
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Ticket link is now active and points to Reservix

// About Section Height Matching
function matchAboutHeights() {
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');

    if (aboutImage && aboutText) {
        // Only run on desktop view
        if (window.innerWidth > 768) {
            // Reset height to auto to get the natural height of the text content
            aboutImage.style.height = 'auto';
            const textHeight = aboutText.offsetHeight;
            aboutImage.style.height = `${textHeight}px`;
        } else {
            // On mobile, let CSS handle the height
            aboutImage.style.height = ''; 
        }
    }
}

// Run the function on load and on resize
window.addEventListener('DOMContentLoaded', matchAboutHeights);
window.addEventListener('resize', matchAboutHeights);


// Countdown Timer
function updateCountdown() {
    // Get current date/time
    const now = new Date();
    
    // Radio Interview - 15. September 2025 12:00
    const radioDate = new Date('2025-09-15T12:00:00+02:00');
    
    // Saturday Event - 20. September 2025 19:30
    const eventDate = new Date('2025-09-20T19:30:00+02:00');
    
    // Sunday Event - 21. September 2025 18:00
    const sundayDate = new Date('2025-09-21T18:00:00+02:00');
    
    
    // Update Radio countdown
    const radioDifference = radioDate - now;
    if (radioDifference > 0) {
        const days = Math.floor(radioDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((radioDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((radioDifference % (1000 * 60 * 60)) / (1000 * 60));
        
        let countdownText = '';
        if (days > 0) {
            countdownText = `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
        } else if (hours > 0) {
            countdownText = `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
        } else {
            countdownText = `${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
        }
        
        const radioCountdownElement = document.getElementById('countdown-radio-time');
        if (radioCountdownElement) {
            radioCountdownElement.textContent = countdownText;
        }
    } else {
        const radioCountdownElement = document.getElementById('countdown-radio');
        if (radioCountdownElement) {
            radioCountdownElement.innerHTML = '<span class="countdown-label">Jetzt live!</span>';
        }
    }
    
    // Update Event countdown
    const eventDifference = eventDate - now;
    
    if (eventDifference > 0) {
        const days = Math.floor(eventDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((eventDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((eventDifference % (1000 * 60 * 60)) / (1000 * 60));
        
        
        let countdownText = '';
        if (days > 1) {
            // For more than 1 day, show days and hours if significant
            if (hours >= 12) {
                countdownText = `${days + 1} ${days + 1 === 1 ? 'Tag' : 'Tage'}`;
            } else {
                countdownText = `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
            }
        } else if (days === 1) {
            countdownText = `1 Tag`;
        } else if (hours > 0) {
            countdownText = `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
        } else {
            countdownText = `${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
        }
        
        const eventCountdownElement = document.getElementById('countdown-time');
        if (eventCountdownElement) {
            eventCountdownElement.textContent = countdownText;
        }
    } else {
        const eventCountdownElement = document.getElementById('countdown');
        if (eventCountdownElement) {
            eventCountdownElement.innerHTML = '<span class="countdown-label">Jetzt live!</span>';
        }
    }
    
    // Update Sunday countdown
    const sundayDifference = sundayDate - now;
    
    if (sundayDifference > 0) {
        const days = Math.floor(sundayDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((sundayDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((sundayDifference % (1000 * 60 * 60)) / (1000 * 60));
        
        
        let countdownText = '';
        if (days > 1) {
            // For more than 1 day, show days and hours if significant
            if (hours >= 12) {
                countdownText = `${days + 1} ${days + 1 === 1 ? 'Tag' : 'Tage'}`;
            } else {
                countdownText = `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
            }
        } else if (days === 1) {
            countdownText = `1 Tag`;
        } else if (hours > 0) {
            countdownText = `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
        } else {
            countdownText = `${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
        }
        
        const sundayCountdownElement = document.getElementById('countdown-sunday-time');
        if (sundayCountdownElement) {
            sundayCountdownElement.textContent = countdownText;
        }
    } else {
        const sundayCountdownElement = document.getElementById('countdown-sunday');
        if (sundayCountdownElement) {
            sundayCountdownElement.innerHTML = '<span class="countdown-label">Jetzt live!</span>';
        }
    }
}

// Update countdown immediately and then every minute
updateCountdown();
setInterval(updateCountdown, 60000);

// YouTube video integration
document.addEventListener('DOMContentLoaded', () => {
    const videoGrid = document.querySelector('.video-grid');
    const youtubeVideos = [
        {
            id: 'eyaxnPNV0ZI',
            title: 'GEMMA SINGEN SINGERS - FRANZ SOBOTKAs "DANKE ES GEHT MIR SEHR GUT"'
        },
        {
            id: 'ekxKhRWKi68',
            title: 'Mia san de neiche Generation'
        },
        {
            id: 'PMsHKUVhHMo',
            title: 'Lied für die Zukunftswerkstatt Schuhmacherhandwerk'
        },
        {
            id: 'sqDAWAeR_8o',
            title: 'Schuster bleib bei deinem Leisten'
        },
        {
            id: 'VZO0gfrGn5k',
            title: 'DIE OAGN - Musikkabarett'
        },
        {
            id: 'tCNw_R9J0Ck',
            title: 'DIE OAGN das Musikkabarett - Auszüge aus unserm Programm'
        }
    ];

    // Clear placeholder
    videoGrid.innerHTML = '';

    // Add YouTube videos with lazy loading
    youtubeVideos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <div class="video-wrapper">
                <iframe 
                    data-src="https://www.youtube.com/embed/${video.id}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                    loading="lazy">
                </iframe>
            </div>
            <h4 class="video-title">${video.title}</h4>
        `;
        videoGrid.appendChild(videoItem);
    });
    
    // Lazy load YouTube iframes when they come into view
    const videoIframes = document.querySelectorAll('iframe[data-src]');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
                videoObserver.unobserve(iframe);
            }
        });
    }, { threshold: 0.1 });
    
    videoIframes.forEach(iframe => {
        videoObserver.observe(iframe);
    });
});
