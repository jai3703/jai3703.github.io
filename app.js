document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scrolling & Active State
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Sticky navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuBtn) {
        // Create menu button structure if not present in HTML
        if (!menuBtn.querySelector('.menu-btn__burger')) {
            menuBtn.innerHTML = '<div class="menu-btn__burger"></div><div class="menu-btn__burger"></div><div class="menu-btn__burger"></div>';
        }
        
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Skills animation on scroll
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateSkills = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        skillLevels.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            
            if (skillTop < triggerBottom) {
                skill.style.width = skill.style.width; // This triggers the transition
            } else {
                skill.style.width = '0';
            }
        });
    };
    
    // Initial animation check
    animateSkills();
    
    // Animate skills on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Project Modal
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalSkills = document.getElementById('modalSkills');
    const closeModal = document.querySelector('.close-modal');
    
    // Project data mapping
    const projectData = {
        'supplier-risk': {
            title: 'Supplier Quality Risk Management',
            description: `
                <p>Developed a comprehensive predictive analytics system to forecast supplier quality risks using ARIMA and Exponential Smoothing time series models.</p>
                <p>The primary challenge was identifying early indicators of supplier quality issues before they manifested in product defects or supply disruptions.</p>
                <p>Key achievements:</p>
                <ul>
                    <li>Created a risk categorization framework that was accepted globally across the organization</li>
                    <li>Developed a semantic data model that integrated internal quality metrics with external risk factors</li>
                    <li>Implemented a 6-month rolling forecast with 85% accuracy for high-risk suppliers</li>
                    <li>Reduced quality incidents by 23% through proactive intervention based on model predictions</li>
                </ul>
            `,
            skills: ['Predictive Analytics', 'Time Series Analysis', 'Power BI', 'Risk Management', 'ARIMA', 'Exponential Smoothing']
        },
        'manufacturing-simulation': {
            title: 'Manufacturing System Simulation',
            description: `
                <p>Built a discrete event simulation model using SimPy to accurately simulate production line failures and optimize maintenance schedules.</p>
                <p>The manufacturing lines experienced unpredictable failures that were causing significant downtime and production losses. Traditional scheduling methods were inadequate for the complex system interactions.</p>
                <p>Key achievements:</p>
                <ul>
                    <li>Integrated Monte Carlo methods to improve prediction accuracy by modeling stochastic failure patterns</li>
                    <li>Simulated over 500 production scenarios to identify optimal maintenance scheduling</li>
                    <li>Reduced unplanned downtime by 17% by implementing the optimized maintenance schedule</li>
                    <li>Developed a Plotly Dash application allowing line managers to run their own scenario tests</li>
                </ul>
            `,
            skills: ['SimPy', 'Discrete Event Simulation', 'Monte Carlo', 'Plotly Dash', 'Python', 'Maintenance Optimization']
        },
        'waste-reduction': {
            title: 'Waste Reduction using IoT data',
            description: `
                <p>Applied advanced survival analysis techniques to identify critical factors affecting manufacturing line reliability using data collected from IoT sensors throughout the production environment.</p>
                <p>The manufacturing facilities were experiencing variable reliability issues, with unclear root causes and significant product waste.</p>
                <p>Key achievements:</p>
                <ul>
                    <li>Used Box Cox Proportional hazard models to identify leading indicators of line reliability issues</li>
                    <li>Built efficient data pipelines using DuckDB, Ibis, and Polars for 10x faster analysis from SQL Server and Oracle databases</li>
                    <li>Developed interactive Power BI dashboards allowing engineers to test what-if scenarios</li>
                    <li>Reduced waste by 15% and improved line reliability by 22% based on model insights</li>
                </ul>
            `,
            skills: ['Survival Analysis', 'DuckDB', 'Polars', 'Power BI', 'IoT Analytics', 'Python']
        },
        'machine-parameters': {
            title: 'Optimal Machine Parameters',
            description: `
                <p>Developed sophisticated Machine Learning and Deep Learning models to correlate machine parameter settings with product rejection rates in a manufacturing environment.</p>
                <p>The production lines were experiencing high rejection rates, but the complex interactions between dozens of machine parameters made manual optimization impossible.</p>
                <p>Key achievements:</p>
                <ul>
                    <li>Extracted and aligned temporal data from Historian systems to ensure consistency across parameters</li>
                    <li>Implemented ensemble models including Random Forest, bagging, and boosting techniques</li>
                    <li>Used SHAP values to provide interpretable results to manufacturing engineers</li>
                    <li>Achieved a 20% reduction in product rejection rates based on model recommendations</li>
                </ul>
            `,
            skills: ['Random Forest', 'Boosting', 'SHAP', 'Deep Learning', 'Parameter Optimization', 'Python']
        },
        'fault-classification': {
            title: 'Fault Group Classification Model',
            description: `
                <p>Created a sophisticated multi-class text classification model to automatically group manufacturing faults, eliminating the need for manual categorization.</p>
                <p>Engineers were spending over 100 hours monthly manually categorizing fault descriptions from production logs, delaying analysis and improvement efforts.</p>
                <p>Key achievements:</p>
                <ul>
                    <li>Processed unstructured text data from maintenance logs using NLP techniques</li>
                    <li>Achieved 92% classification accuracy for fault categories</li>
                    <li>Built an interactive Plotly dashboard for fault trend analysis</li>
                    <li>Deployed the solution using Docker containers for easy maintenance and updates</li>
                    <li>Saved over 100 hours of manual work monthly</li>
                </ul>
            `,
            skills: ['NLP', 'Text Classification', 'Plotly', 'Docker', 'Python', 'Machine Learning']
        },
        'cost-optimization': {
            title: 'Total Delivered Cost Optimization',
            description: `
                <p>Implemented a Mixed Integer Linear Programming optimization model combined with Monte Carlo simulation to optimize complex supply chain networks.</p>
                <p>The company's supply chain was facing increasing costs and inefficiencies due to sub-optimal routing and production allocation across multiple facilities.</p>
                <p>Key achievements:</p>
                <ul>
                    <li>Modeled the entire North American supply chain network with over 20 plants and 50 distribution centers</li>
                    <li>Incorporated uncertainty using Monte Carlo methods to create robust optimization</li>
                    <li>Identified optimal production allocation and distribution routes</li>
                    <li>Achieved approximately $10M in annual cost savings through implementation</li>
                </ul>
            `,
            skills: ['MILP', 'Optimization', 'Monte Carlo', 'Supply Chain', 'Python', 'Operations Research']
        }
    };
    
    // Open modal when clicking on project card
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalDescription.innerHTML = project.description;
                
                // Clear and populate skills
                modalSkills.innerHTML = '';
                project.skills.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    skillTag.textContent = skill;
                    modalSkills.appendChild(skillTag);
                });
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            const fields = [nameField, emailField, subjectField, messageField];
            
            fields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-error)';
                } else {
                    field.style.borderColor = 'var(--color-border)';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
                isValid = false;
                emailField.style.borderColor = 'var(--color-error)';
            }
            
            if (isValid) {
                // Normally would send this data to a server
                // But for this demo, just show a success message
                alert(`Thank you for your message, ${nameField.value}! Your message has been sent.`);
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
        
        // Reset validation styling on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = 'var(--color-border)';
            });
        });
    }
});