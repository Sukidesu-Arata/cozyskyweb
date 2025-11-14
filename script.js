// ===== NAVIGATION ===== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== PARTICLES.JS =====
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#EDA700'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#EDA700',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ===== TYPED.JS =====
if (typeof Typed !== 'undefined') {
    new Typed('.typing-text', {
        strings: [
            'Minecraft Skyblock Server',
            'Minecraft SMP Server',
            'Cộng đồng thân thiện',
            'Server chất lượng cao'
        ],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2000,
        loop: true
    });
}

// ===== COPY IP FUNCTION =====
function copyIP() {
    const ip = 'cozysky.mcviet.top:25774';
    
    // Copy to clipboard
    navigator.clipboard.writeText(ip).then(() => {
        // Show notification
        const notification = document.getElementById('copy-notification');
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const notification = document.getElementById('copy-notification');
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        } catch (err) {
            console.error('Fallback: Failed to copy', err);
        }
        document.body.removeChild(textArea);
    });
}

// ===== COUNTER ANIMATION =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            
            if (target) {
                let count = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count) + '+';
                    }
                }, 20);
            }
            
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const counters = document.querySelectorAll('.stat-number[data-count]');
counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add CSS for AOS animation
const style = document.createElement('style');
style.textContent = `
    [data-aos] {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(50px);
    }
    
    [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-50px);
    }
    
    [data-aos="fade-right"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(50px);
    }
    
    [data-aos="fade-left"].aos-animate {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL =====
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

// ===== SERVER STATUS CHECK =====
function checkServerStatus() {
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.status-dot');
    
    // Simulated status check - In production, you would call an API
    // For now, we'll show it as online
    statusText.textContent = 'Server đang hoạt động';
    statusDot.style.background = '#00ff88';
    
    // You can implement real server status check with an API like:
    // fetch('https://api.mcsrvstat.us/2/cozysky.mcviet.top:25774')
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.online) {
    //             statusText.textContent = `Server online - ${data.players.online}/${data.players.max} người chơi`;
    //             statusDot.style.background = '#00ff88';
    //         } else {
    //             statusText.textContent = 'Server offline';
    //             statusDot.style.background = '#ff4444';
    //         }
    //     })
    //     .catch(() => {
    //         statusText.textContent = 'Không thể kiểm tra status';
    //         statusDot.style.background = '#ffaa00';
    //     });
}

// Check status on load and every 30 seconds
checkServerStatus();
setInterval(checkServerStatus, 30000);

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log('%c🎮 Welcome to Cozy Sky!', 'color: #EDA700; font-size: 20px; font-weight: bold;');
console.log('%cServer IP: cozysky.mcviet.top:25774', 'color: #FF8C00; font-size: 14px;');
console.log('%cJoin our Discord: dsc.gg/cozysky 🚀', 'color: #FFB347; font-size: 12px;');
