// Player Search — shared across all team pages
(function () {
    const TEAM_PAGE_MAP = {
        reds: 'reds.html',
        blacks: 'blacks.html',
        whites: 'whites.html',
        rangers: 'rangers.html',
    };

    let allPlayers = null; // lazy loaded once
    let activeIndex = -1;

    const input = document.getElementById('player-search-input');
    const dropdown = document.getElementById('search-dropdown');
    const clearBtn = document.getElementById('search-clear');

    if (!input || !dropdown || !clearBtn) return;

    async function ensurePlayers() {
        if (allPlayers !== null) return;
        try {
            const res = await fetch('data/players.json');
            const data = await res.json();
            allPlayers = [];
            if (data.teams) {
                Object.keys(data.teams).forEach(teamKey => {
                    const team = data.teams[teamKey];
                    (team.players || []).forEach(p => {
                        allPlayers.push({ ...p, teamKey, teamName: team.name });
                    });
                });
            }
        } catch (e) {
            allPlayers = [];
        }
    }

    function highlight(text, query) {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
    }

    function renderResults(query) {
        const q = query.trim().toLowerCase();
        dropdown.innerHTML = '';
        activeIndex = -1;

        if (!q) {
            dropdown.classList.remove('open');
            return;
        }

        const matches = allPlayers.filter(p => p.name.toLowerCase().includes(q)).slice(0, 12);

        if (matches.length === 0) {
            dropdown.innerHTML = '<li class="search-no-results">No players found</li>';
            dropdown.classList.add('open');
            return;
        }

        matches.forEach((player, i) => {
            const li = document.createElement('li');
            li.className = 'search-result-item';
            li.dataset.index = i;

            const dpSrc = player.dp || player.image || '';
            const avatarHtml = dpSrc
                ? `<img src="${dpSrc}" alt="${player.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <span class="search-result-avatar" style="display:none"><i class="fas fa-user"></i></span>`
                : `<span class="search-result-avatar"><i class="fas fa-user"></i></span>`;

            li.innerHTML = `
                ${avatarHtml}
                <div class="search-result-info">
                    <div class="search-result-name">${highlight(player.name, query.trim())}</div>
                    <span class="search-result-team ${player.teamKey}">${player.teamName}</span>
                </div>
            `;

            li.addEventListener('mousedown', (e) => {
                e.preventDefault(); // keep focus on input
                selectPlayer(player);
            });

            dropdown.appendChild(li);
        });

        dropdown.classList.add('open');
    }

    function selectPlayer(player) {
        // Try to open the modal if it exists on this page
        const modal = document.getElementById('player-modal');
        if (modal && typeof openPlayerModal === 'function') {
            openPlayerModal(player);
            closeDropdown();
            input.value = '';
            clearBtn.classList.remove('visible');
            return;
        }

        // Otherwise navigate to the team page, passing the player id via sessionStorage
        try {
            sessionStorage.setItem('svl_search_player_id', player.id);
        } catch (_) {}
        const page = TEAM_PAGE_MAP[player.teamKey] || (player.teamKey + '.html');
        window.location.href = page;
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        activeIndex = -1;
    }

    function updateActiveItem() {
        const items = dropdown.querySelectorAll('.search-result-item');
        items.forEach((el, i) => {
            el.classList.toggle('active', i === activeIndex);
        });
    }

    input.addEventListener('focus', async () => {
        await ensurePlayers();
        if (input.value.trim()) renderResults(input.value);
    });

    input.addEventListener('input', async () => {
        await ensurePlayers();
        clearBtn.classList.toggle('visible', input.value.length > 0);
        renderResults(input.value);
    });

    input.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.search-result-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
            updateActiveItem();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, -1);
            updateActiveItem();
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0 && items[activeIndex]) {
                items[activeIndex].dispatchEvent(new Event('mousedown'));
            }
        } else if (e.key === 'Escape') {
            closeDropdown();
            input.blur();
        }
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.classList.remove('visible');
        closeDropdown();
        input.focus();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#nav-search')) closeDropdown();
    });

    // Auto-open player if navigated from search
    document.addEventListener('DOMContentLoaded', () => {
        try {
            const pendingId = sessionStorage.getItem('svl_search_player_id');
            if (pendingId) {
                sessionStorage.removeItem('svl_search_player_id');
                // Wait for the page's own load function to finish (up to 2 s)
                const tryOpen = (attempts) => {
                    if (typeof openPlayerModal !== 'function' || attempts <= 0) return;
                    // Find the player in the page's global players array
                    const playersList = typeof players !== 'undefined' ? players : [];
                    const found = playersList.find(p => p.id === pendingId);
                    if (found) {
                        openPlayerModal(found);
                    } else {
                        setTimeout(() => tryOpen(attempts - 1), 200);
                    }
                };
                setTimeout(() => tryOpen(10), 300);
            }
        } catch (_) {}
    });
})();
