Chemini WebsiteThis repository contains the source code for the Chemini company website, a static site built with HTML, CSS, and JavaScript. The site showcases the company's technology, products, and partnership opportunities in the field of nanomaterials.Project StructureThe project follows a standard structure for simple web deployment:chemini-website/
├── index.html          # The main HTML file containing the page structure.
├── css/
│   └── styles.css      # Custom CSS for styling the website.
├── js/
│   └── main.js         # JavaScript for interactivity (header, tabs, chart, etc.).
├── assets/
│   └── images/         # Directory for local images (currently empty as images are remote).
├── README.md           # This documentation file.
└── .gitignore          # Specifies files for Git to ignore.
FeaturesResponsive Design: Built with Tailwind CSS for a mobile-first experience.Interactive Elements: Includes a sticky header, mobile menu, product dashboard with tabs, and an interactive particle background in the hero section.Dynamic Chart: Uses Chart.js to visualize product data.Backend Integration: The contact form is connected to a Supabase backend to handle submissions.How to UseClone the repository:git clone <repository-url>
Open index.html:You can open the index.html file directly in your web browser to view the site locally.DependenciesThis project relies on several external libraries delivered via CDN:Tailwind CSS: For styling and layout.Google Fonts (Inter): For typography.Chart.js: For the product comparison chart.tsParticles: For the animated hero background.Supabase.js: For the contact form backend.No local installation of these dependencies is required.