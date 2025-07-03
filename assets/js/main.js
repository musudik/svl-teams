// Modern SVL Cricket Club JavaScript
class SVLCricketClub {
    constructor() {
        this.players = [];
        this.currentTeam = null;
        this.isLoading = false;
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.loadPlayers();
            this.setupEventListeners();
            this.renderAllTeams();
            this.updateHeroStats();
            this.hideLoading();
            this.animateOnScroll();
        } catch (error) {
            console.error('Error initializing SVL Cricket Club:', error);
            this.hideLoading();
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }

    async loadPlayers() {
        try {
            const response = await fetch('data/players.json');
            if (!response.ok) {
                throw new Error('Failed to load players data');
            }
            const data = await response.json();
            
            // Convert the nested team structure to a flat array
            this.players = [];
            if (data.teams) {
                Object.keys(data.teams).forEach(teamKey => {
                    const team = data.teams[teamKey];
                    if (team.players) {
                        team.players.forEach(player => {
                            this.players.push({
                                ...player,
                                team: team.name
                            });
                        });
                    }
                });
            }
            
            if (this.players.length === 0) {
                console.warn('No players found in the data');
            }
        } catch (error) {
            console.error('Error loading players:', error);
            this.players = [];
            
            // Show error message to user
            this.showError('Failed to load player data. Please refresh the page.');
        }
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('href');
                if (target && target.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(target);
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            });
        });

        // Player card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.player-card')) {
                const playerCard = e.target.closest('.player-card');
                const playerId = playerCard.dataset.playerId;
                if (playerId) {
                    this.openPlayerModal(playerId);
                }
            }
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    renderAllTeams() {
        this.renderTeam('reds');
        this.renderTeam('blacks');
        this.renderTeam('whites');
    }

    renderTeam(teamName) {
        const teamPlayers = this.players.filter(player => 
            player.team.toLowerCase() === teamName.toLowerCase()
        );

        // Sort players alphabetically by name
        teamPlayers.sort((a, b) => a.name.localeCompare(b.name));

        const gridContainer = document.getElementById(`${teamName}-grid`);
        const countElement = document.getElementById(`${teamName}-count`);

        if (!gridContainer) {
            console.error(`Grid container not found for team: ${teamName}`);
            return;
        }

        // Update team count
        if (countElement) {
            countElement.textContent = teamPlayers.length;
        }

        // Clear existing content
        gridContainer.innerHTML = '';

        // Render player cards
        teamPlayers.forEach(player => {
            const playerCard = this.createPlayerCard(player);
            gridContainer.appendChild(playerCard);
        });
    }

    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.dataset.playerId = player.id || player.name;

        // Use the image path from JSON if available, otherwise generate it
        const imagePath = player.image || this.getPlayerImagePath(player.name);
        const teamClass = player.team.toLowerCase();

        card.innerHTML = `
            <div class="player-image">
                <img src="${imagePath}" alt="${player.name}" 
                     onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #2a2a2a, #444)'; this.parentElement.innerHTML='<i class=\\'fas fa-user\\' style=\\'font-size: 3rem; color: #666; display: flex; align-items: center; justify-content: center; height: 100%;\\></i>';">
            </div>
            <div class="player-info">
                <h3 class="player-name">${player.name}</h3>
                <p class="player-dcb">DCB ID: ${player.dcbId || 'N/A'}</p>
                <span class="player-team ${teamClass}">${player.team}</span>
            </div>
        `;

        return card;
    }

    getPlayerImagePath(playerName) {
        // Convert player name to filename format
        const filename = playerName.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
        return `assets/images/players/${filename}.jpg`;
    }

    openPlayerModal(playerId) {
        const player = this.players.find(p => 
            (p.id && p.id === playerId) || p.name === playerId
        );

        if (!player) return;

        const modal = document.getElementById('player-modal');
        const modalImage = document.getElementById('modal-player-image');
        const modalName = document.getElementById('modal-player-name');
        const modalDcb = document.getElementById('modal-player-dcb');
        const modalTeam = document.getElementById('modal-player-team');
        const modalStatus = document.getElementById('modal-player-status');
        const modalDcbLink = document.getElementById('modal-dcb-link');

        if (!modal) return;

        // Populate modal content
        if (modalImage) {
            modalImage.src = this.getPlayerImagePath(player.name);
            modalImage.alt = player.name;
        }

        if (modalName) modalName.textContent = player.name;
        if (modalDcb) modalDcb.textContent = player.dcbId || 'N/A';
        if (modalTeam) modalTeam.textContent = player.team;
        if (modalStatus) {
            modalStatus.textContent = this.getPlayerStatus(player);
            modalStatus.className = `value ${this.getPlayerStatus(player).toLowerCase() === 'active' ? 'status-active' : ''}`;
        }

        // Set DCB link - this is the key functionality for QR code redirection
        if (modalDcbLink && player.dcbProfileUrl) {
            modalDcbLink.href = player.dcbProfileUrl;
            modalDcbLink.style.display = 'inline-flex';
        } else if (modalDcbLink) {
            modalDcbLink.style.display = 'none';
        }

        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    getPlayerStatus(player) {
        // Check if player has valid dates
        if (player.validFrom && player.validTo) {
            const now = new Date();
            const validFrom = new Date(player.validFrom);
            const validTo = new Date(player.validTo);
            
            if (now >= validFrom && now <= validTo) {
                return 'Active';
            }
        }
        return 'Inactive';
    }

    updateHeroStats() {
        const totalPlayersElement = document.getElementById('total-players');
        if (totalPlayersElement) {
            totalPlayersElement.textContent = this.players.length;
        }
    }

    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe team sections
        document.querySelectorAll('.team-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });

        // Observe player cards with staggered animation
        document.querySelectorAll('.player-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.4s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }

    showError(message) {
        // Create or update error message
        let errorDiv = document.getElementById('error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #dc2626, #b91c1c);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                font-family: var(--font-secondary);
                max-width: 300px;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Global functions for HTML event handlers
function scrollToTeams() {
    const teamsSection = document.getElementById('teams-section');
    if (teamsSection) {
        const offsetTop = teamsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function closePlayerModal() {
    const modal = document.getElementById('player-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.svlApp = new SVLCricketClub();
});

// Additional smooth scrolling and animations
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePlayerModal();
        }
    });

    // Add typing effect to hero title
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 200 + (index * 400));
    });
});

// Utility functions
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const step = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVLCricketClub;
}
