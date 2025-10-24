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
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    if (mobileMenu) {
        const mobileLinks = mobileMenu.getElementsByTagName('a');
        for (let link of mobileLinks) {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        }
    }


    // Product Tabs functionality
    const sunanoTab = document.getElementById('sunano-tab');
    const ninanoTab = document.getElementById('ninano-tab');
    const ceranoxTab = document.getElementById('ceranox-tab');
    const sunanoTable = document.getElementById('sunano-table');
    const ninanoTable = document.getElementById('ninano-table');
    const ceranoxTable = document.getElementById('ceranox-table');
    const productChartElement = document.getElementById('productChart');

    // Check if we are on a page with the product tabs
    if (sunanoTab && productChartElement) {
        
        const allTabs = [sunanoTab, ninanoTab, ceranoxTab];
        const allTables = [sunanoTable, ninanoTable, ceranoxTable];

        function activateTab(activeTab, activeTable) {
            // Reset all tabs
            allTabs.forEach(tab => {
                if(tab) {
                    tab.classList.remove('border-chemini-yellow', 'text-chemini-yellow');
                    tab.classList.add('border-transparent', 'text-gray-400', 'hover:text-white');
                }
            });
            
            // Reset all tables
            allTables.forEach(table => {
                if(table) table.classList.add('hidden');
            });

            // Activate the selected tab and table
            if(activeTab) {
                activeTab.classList.add('border-chemini-yellow', 'text-chemini-yellow');
                activeTab.classList.remove('border-transparent', 'text-gray-400');
            }
            if(activeTable) {
                activeTable.classList.remove('hidden');
            }
        }

        // Chart.js data
        const chartData = {
            labels: ['SuNano15A', 'SuNano15B', 'SuNanoOL1', 'NiNanoWater', 'CeranoxNi', 'CeranoxSi', 'CeranoxSn'],
            datasets: [
                {
                    label: 'SuNano Series',
                    data: [12, 22, 12, null, null, null, null],
                    backgroundColor: 'rgba(255, 209, 0, 0.6)', // Chemini Yellow
                    borderColor: 'rgba(255, 209, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'NiNano Series',
                    data: [null, null, null, 25, null, null, null],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)', // Blue
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                },
                 {
                    label: 'Ceranox Series',
                    data: [null, null, null, null, 28, 27, 18],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)', // Red
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1
                }
            ]
        };

        // Chart.js config
        const chartConfig = {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#d1d5db' // text-gray-300
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#d1d5db' // text-gray-300
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#d1d5db' // text-gray-300
                        }
                    }
                }
            }
        };
        
        // Init Chart
        const productChart = new Chart(productChartElement.getContext('2d'), chartConfig);

        // Tab event listeners
        sunanoTab.addEventListener('click', () => {
            activateTab(sunanoTab, sunanoTable);
            productChart.data.datasets[0].data = [12, 22, 12, null, null, null, null]; // SuNano
            productChart.data.datasets[1].data = [null, null, null, null, null, null, null]; // Clear NiNano
            productChart.data.datasets[2].data = [null, null, null, null, null, null, null]; // Clear Ceranox
            productChart.update();
        });

        ninanoTab.addEventListener('click', () => {
            activateTab(ninanoTab, ninanoTable);
            productChart.data.datasets[0].data = [null, null, null, null, null, null, null]; // Clear SuNano
            productChart.data.datasets[1].data = [null, null, null, 25, null, null, null]; // NiNano
            productChart.data.datasets[2].data = [null, null, null, null, null, null, null]; // Clear Ceranox
            productChart.update();
        });

        ceranoxTab.addEventListener('click', () => {
            activateTab(ceranoxTab, ceranoxTable);
            productChart.data.datasets[0].data = [null, null, null, null, null, null, null]; // Clear SuNano
            productChart.data.datasets[1].data = [null, null, null, null, null, null, null]; // Clear NiNano
            productChart.data.datasets[2].data = [null, null, null, null, 28, 27, 18]; // Ceranox
            productChart.update();
        });
    }

    // tsParticles animation for Hero
    const particlesElement = document.getElementById('tsparticles');
    if (particlesElement) {
        // REVERTED: Restored your original particle settings
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.5,
                    random: true,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    out_mode: "out",
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
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
            retina_detect: true,
        });
    }

    // Supabase setup (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm && typeof supabase !== 'undefined') {
        // DO NOT HARDCODE. In a real app, use environment variables.
        // These are placeholder keys.
        const SUPABASE_URL = 'https://ajwheffiundfbrrfnmte.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIZ1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqd2hlZmZpdW5kZmJycmZubXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMDM1MzIsImV4cCI6MjAzMzY3OTUzMn0.rJd5mMYvNpGCtA3iWo7q-v2t21iOTT2kYv0R26-s-FM';
        
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // Contact Form submission
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const challenge = document.getElementById('challenge').value;

            try {
                const { data, error } = await supabaseClient
                    .from('challenges') // Assumes a table named 'challenges'
                    .insert([
                        { name: name, email: email, challenge: challenge },
                    ]);

                if (error) {
                    throw error;
                }
                
                submitButton.textContent = 'Submitted!';
                submitButton.style.backgroundColor = '#22C55E'; // Green
                contactForm.reset();

            } catch (error) {
                console.error('Error submitting to Supabase:', error.message);
                submitButton.textContent = 'Failed. Try Again.';
                submitButton.style.backgroundColor = '#EF4444'; // Red
            } finally {
                 setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                 }, 3000);
            }
        });
    }
});

