// Main site script for interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('bg-black/90', 'shadow-lg', 'backdrop-blur-lg');
        } else {
            header.classList.remove('bg-black/90', 'shadow-lg', 'backdrop-blur-lg');
        }
    });

    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });

    // Product Tabs functionality
    const sunanoTab = document.getElementById('sunano-tab');
    const ninanoTab = document.getElementById('ninano-tab');
    const ceranoxTab = document.getElementById('ceranox-tab');
    const sunanoTable = document.getElementById('sunano-table');
    const ninanoTable = document.getElementById('ninano-table');
    const ceranoxTable = document.getElementById('ceranox-table');

    function activateTab(activeTab, activeTabs, activeContent, inactiveContents) {
        // Reset all tabs
        [sunanoTab, ninanoTab, ceranoxTab].forEach(tab => {
            tab.classList.remove('border-chemini-yellow', 'text-chemini-yellow');
            tab.classList.add('border-transparent', 'text-gray-400', 'hover:text-white');
        });
        
        // Hide all content
        [sunanoTable, ninanoTable, ceranoxTable].forEach(content => {
            content.classList.add('hidden');
        });
        
        // Activate selected tab
        activeTab.classList.add('border-chemini-yellow', 'text-chemini-yellow');
        activeTab.classList.remove('border-transparent', 'text-gray-400', 'hover:text-white');
        
        // Show selected content
        activeContent.classList.remove('hidden');
    }

    sunanoTab.addEventListener('click', () => {
        activateTab(sunanoTab, [ninanoTab, ceranoxTab], sunanoTable, [ninanoTable, ceranoxTable]);
        updateChart('sunano');
    });

    ninanoTab.addEventListener('click', () => {
        activateTab(ninanoTab, [sunanoTab, ceranoxTab], ninanoTable, [sunanoTable, ceranoxTable]);
        updateChart('ninano');
    });

    ceranoxTab.addEventListener('click', () => {
        activateTab(ceranoxTab, [sunanoTab, ninanoTab], ceranoxTable, [sunanoTable, ninanoTable]);
        updateChart('ceranox');
    });

    // Chart.js functionality
    const ctx = document.getElementById('productChart').getContext('2d');
    let productChart;

    function updateChart(productType) {
        if (productChart) {
            productChart.destroy();
        }

        let labels, data;
        if (productType === 'sunano') {
            labels = ['SuNano15A', 'SuNano15B', 'SuNanoOL1', 'SuNanoOL2', 'SuNanoOL3', 'SuNanoDL1', 'SuNanoDL2'];
            data = [12.5, 25, 12.5, 12.5, 12.5, 12.5, 12.5]; // Average particle sizes in nm
        } else if (productType === 'ninano') {
            labels = ['NiNanoWater', 'NiNanoAlcohol'];
            data = [25, 25]; // Particle sizes in nm
        } else {
            labels = ['CeranoxNi', 'CeranoxSi', 'CeranoxSn'];
            data = [25, 25, 15]; // Average particle sizes in nm
        }

        productChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Particle Size (nm)',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 209, 0, 0.8)', 'rgba(255, 209, 0, 0.6)', 'rgba(255, 209, 0, 0.4)', 'rgba(255, 209, 0, 0.7)', 'rgba(255, 209, 0, 0.5)', 'rgba(255, 209, 0, 0.6)', 'rgba(255, 209, 0, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 209, 0, 1)', 'rgba(255, 209, 0, 0.8)', 'rgba(255, 209, 0, 0.6)', 'rgba(255, 209, 0, 0.9)', 'rgba(255, 209, 0, 0.7)', 'rgba(255, 209, 0, 0.8)', 'rgba(255, 209, 0, 0.9)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#F3F4F6' } },
                    x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#F3F4F6' } }
                },
                plugins: { legend: { labels: { color: '#F3F4F6' } } }
            }
        });
    }

    // Initial chart load
    updateChart('sunano');

    // tsParticles configuration and initialization
    const particlesConfig = {
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
                resize: true,
            },
            modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
            },
        },
        particles: {
            color: { value: "#FFD100" },
            links: { color: "#FFD100", distance: 150, enable: true, opacity: 0.5, width: 1 },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 2, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
    };

    // Initialize tsParticles and add IntersectionObserver
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", particlesConfig).then(particlesContainer => {
            const particlesElement = document.getElementById('tsparticles');
            const observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    particlesElement.style.visibility = 'visible';
                    particlesContainer?.play();
                } else {
                    particlesContainer?.pause();
                    particlesElement.style.visibility = 'hidden';
                }
            }, { threshold: 0.1 });
            const heroSection = document.getElementById('home');
            if (heroSection) { observer.observe(heroSection); }
        });
    }

    // --- Supabase Integration ---
    // IMPORTANT: Replace with your actual Supabase project URL and anon key
    const supabaseUrl = 'https://ytundmamsrgwubbnhrpn.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dW5kbWFtc3Jnd3ViYm5ocnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NzAxNzgsImV4cCI6MjA3NDE0NjE3OH0.bly1gna66OiKsq8uXvnmRFBmrhMgq0qFaOv5ROJdp3Q';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const challenge = document.getElementById('challengeInput').value;

        try {
            // NOTE: The database table 'challenges' has a unique constraint on the 'name' column (Primary Key).
            // Additionally, RLS policies prevent 'upsert' (UPDATE) operations for anonymous users.
            // To allow multiple submissions from the same user without changing the DB schema (which we cannot do),
            // we must make the 'name' unique for each insertion.
            // We append the current timestamp (ISO string for millisecond precision) to the name for the database entry.
            // The email notification will still use the original name entered by the user.
            const dbName = `${name} (${new Date().toISOString()})`;

            const { data, error } = await supabaseClient
                .from('challenges') // Assumes a table named 'challenges'
                .insert([
                    { name: dbName, email: email, challenge: challenge },
                ]);

            if (error) {
                throw error;
            }

            // Construct mailto link
            const subject = encodeURIComponent(`New Challenge from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nChallenge:\n${challenge}`);
            window.location.href = `mailto:office@chemini.pl?subject=${subject}&body=${body}`;
            
            submitButton.textContent = 'Submitted!';
            submitButton.style.backgroundColor = '#22C55E'; // Green
            contactForm.reset();

        } catch (error) {
            console.error('Error submitting to Supabase:', error.message);
            submitButton.textContent = 'Failed. Try Again.';
            submitButton.style.backgroundColor = '#EF4444'; // Red
        } finally {
             setTimeout(() => {
                submitButton.textContent = 'Submit Challenge';
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
             }, 3000);
        }
    });
});

