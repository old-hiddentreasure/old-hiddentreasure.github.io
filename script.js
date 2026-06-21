document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME SWITCHING (DARK / LIGHT)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const bodyElement = document.body;
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');

    // Retrieve saved theme preference, or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
        themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    } else {
        bodyElement.classList.add('dark-theme');
        bodyElement.classList.remove('light-theme');
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-theme')) {
            // Switch to Light
            bodyElement.classList.replace('dark-theme', 'light-theme');
            themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            // Switch to Dark
            bodyElement.classList.replace('light-theme', 'dark-theme');
            themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    /* ==========================================================================
       2. MOBILE MENU NAVIGATION
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleIcon = mobileNavToggle.querySelector('i');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle mobile icon list/x
        if (navMenu.classList.contains('active')) {
            toggleIcon.classList.replace('bi-list', 'bi-x-lg');
        } else {
            toggleIcon.classList.replace('bi-x-lg', 'bi-list');
        }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.classList.replace('bi-x-lg', 'bi-list');
        });
    });

    /* ==========================================================================
       3. NAVBAR SCROLL EFFECT & ACTIVE SECTION LINK TRACKING
       ========================================================================== */
    const navbarHeader = document.getElementById('navbarHeader');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky/shrink Nav
        if (window.scrollY > 50) {
            navbarHeader.classList.add('scrolled');
        } else {
            navbarHeader.classList.remove('scrolled');
        }

        // Section Active Tracking
        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset navbar height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial scroll layout check

    /* ==========================================================================
       4. TYPEWRITER EFFECT IN HERO BANNER
       ========================================================================== */
    const typewriterText = document.getElementById('typewriterText');
    const roles = [
        "徘迴於古寺華樓",
        "徘迴於廟堂草澤",
        "徘迴於朧煙細雨",
        "徘迴於天上人間"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    const runTypewriter = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 60; // Faster deleting
        } else {
            typewriterText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Full string typed, pause before deleting
            typingSpeed = 2200; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next role
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing next word
        }

        setTimeout(runTypewriter, typingSpeed);
    };

    // Start typing animation
    runTypewriter();

    /* ==========================================================================
       5. PHILOSOPHY QUOTE SLIDER (YOGACARA & ZEN)
       ========================================================================== */
    const quotes = [
        {
            text: "你只要把這個自性清淨心找出來了，自然就可以看見是由祂含藏著我們，原來我們五陰都是在祂裡面，不曾離開過祂；我們五陰從來不曾在祂的外面運作，一直都在祂裡面；但是祂配合我們在運作時都是清淨的，而祂出生了的我們卻是染污的。",
            author: "──平實導師《勝鬘經講記》第六輯，頁208。"
        },
        {
            text: "理性的數據丈量生命的長度，感性的詩意照亮心靈的深度。在生醫科技與金融分析之間，我以哲學為渡船。",
            author: "— 哲學詩人 古藏寶"
        },
        {
            text: "市場是人性的投射，也是最真實的唯識道場。在恐懼與貪婪交織的起伏中，澄淨意識，方能做出智慧抉擇。",
            author: "— 證券分析與心靈澄淨"
        }
    ];

    let currentQuoteIndex = 0;
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const prevQuoteBtn = document.getElementById('prevQuote');
    const nextQuoteBtn = document.getElementById('nextQuote');
    const dotsContainer = document.getElementById('quoteDots');
    
    // Create navigation dots dynamically
    dotsContainer.innerHTML = '';
    quotes.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showQuote(i));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');

    const showQuote = (index) => {
        // Handle boundary wrap-around
        if (index < 0) {
            currentQuoteIndex = quotes.length - 1;
        } else if (index >= quotes.length) {
            currentQuoteIndex = 0;
        } else {
            currentQuoteIndex = index;
        }

        // Apply smooth transition opacity fade out
        quoteText.style.opacity = 0;
        quoteAuthor.style.opacity = 0;

        setTimeout(() => {
            quoteText.textContent = quotes[currentQuoteIndex].text;
            quoteAuthor.textContent = quotes[currentQuoteIndex].author;
            
            // Fade in
            quoteText.style.opacity = 1;
            quoteAuthor.style.opacity = 1;

            // Update active dot indicator
            dots.forEach((dot, idx) => {
                dot.classList.remove('active');
                if (idx === currentQuoteIndex) dot.classList.add('active');
            });
        }, 300);
    };

    // Event Listeners for quote slider buttons
    prevQuoteBtn.addEventListener('click', () => {
        showQuote(currentQuoteIndex - 1);
    });

    nextQuoteBtn.addEventListener('click', () => {
        showQuote(currentQuoteIndex + 1);
    });

    // Auto rotate quotes every 10 seconds
    setInterval(() => {
        showQuote(currentQuoteIndex + 1);
    }, 10000);

    /* ==========================================================================
       6. SOCIAL MEDIA SHARING FUNCTIONALITY
       ========================================================================== */
    const shareToggleBtn = document.getElementById('shareToggleBtn');
    const shareDropdownMenu = document.getElementById('shareDropdownMenu');
    
    if (shareToggleBtn && shareDropdownMenu) {
        const shareNative = document.getElementById('shareNative');
        const shareFB = document.getElementById('shareFB');
        const shareLINE = document.getElementById('shareLINE');
        const shareCopy = document.getElementById('shareCopy');

        const currentUrl = window.location.href;
        const currentUrlEncoded = encodeURIComponent(currentUrl);

        // Check if Web Share API is supported (e.g. mobile devices)
        if (navigator.share) {
            if (shareNative) shareNative.style.display = 'flex';
            if (shareFB) shareFB.style.display = 'none';
            if (shareLINE) shareLINE.style.display = 'none';

            shareNative.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.share({
                    title: document.title,
                    url: currentUrl
                }).catch(err => console.log('Share canceled or failed:', err));
                shareDropdownMenu.classList.remove('show');
            });
        } else {
            if (shareNative) shareNative.style.display = 'none';
            if (shareFB) {
                shareFB.style.display = 'flex';
                shareFB.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrlEncoded}`;
            }
            if (shareLINE) {
                shareLINE.style.display = 'flex';
                shareLINE.href = `https://social-plugins.line.me/lineit/share?url=${currentUrlEncoded}`;
            }
        }

        // Toggle dropdown open/close
        shareToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareDropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareDropdownMenu.contains(e.target) && e.target !== shareToggleBtn) {
                shareDropdownMenu.classList.remove('show');
            }
        });

        // Copy Page Link
        if (shareCopy) {
            shareCopy.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(currentUrl)
                    .then(() => {
                        const originalText = shareCopy.innerHTML;
                        shareCopy.innerHTML = `<i class="bi bi-clipboard-check"></i> 已複製連結！`;
                        shareCopy.style.color = '#10b981'; // Turn green momentarily
                        
                        setTimeout(() => {
                            shareCopy.innerHTML = originalText;
                            shareCopy.style.color = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('複製失敗:', err);
                        alert('複製連結失敗，請手動複製網址。');
                    });
            });
        }
    }

});
