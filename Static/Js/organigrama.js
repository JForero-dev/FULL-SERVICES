document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const filterWrapper = document.querySelector('.filter-content-wrapper');

    if (menuToggle && filterWrapper) {
        menuToggle.addEventListener('click', () => {
            // Alternar la clase 'open' para mostrar/ocultar el menú (manejo CSS con max-height)
            filterWrapper.classList.toggle('open');
            
            // Cambiar el icono de la hamburguesa a la X y viceversa (Font Awesome)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (filterWrapper.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times'); // Icono X
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars'); // Icono Hamburguesa
                }
            }
        });
    }

    const filterMenu = document.querySelector('.filter-menu');
    const employeeCards = document.querySelectorAll('.employee-card');
    const searchInput = document.getElementById('searchInput');

    /**
     * Función para manejar la apertura y cierre del acordeón con animación.
     * @param {HTMLElement} groupHeader - El elemento de la cabecera del grupo clicado.
     */
    const toggleAccordion = (groupHeader) => {
        const subList = groupHeader.nextElementSibling;

        if (!subList || !subList.classList.contains('sub-list')) return;

        // Determinar si está abierto 
        const isCurrentlyOpen = groupHeader.classList.contains('open');

        // Cerrar todos los demás grupos
        document.querySelectorAll('.group-header.open').forEach(header => {
            const otherSub = header.nextElementSibling;
            if (header !== groupHeader) {
                header.classList.remove('open');
                if (otherSub && otherSub.classList.contains('sub-list')) {
                    otherSub.style.maxHeight = '0';
                }
            }
        });

        // Abrir/Cerrar el grupo actual
        if (isCurrentlyOpen) {
            // Cerrar suavemente
            groupHeader.classList.remove('open');
            subList.style.maxHeight = '0'; 
        } else {
            // Abrir suavemente
            groupHeader.classList.add('open');
            // Usamos un pequeño timeout para asegurar que la transición funcione
            setTimeout(() => {
                subList.style.maxHeight = subList.scrollHeight + 'px';
            }, 10);
        }
    };

    /**
     * Función de filtrado centralizada.
     * @param {string} filterKey - El valor principal del filtro (e.g., 'rrhh', 'ventas', 'todos').
     * @param {string|null} subFilterKey - El valor del subfiltro (e.g., 'tesoreria') o null.
     * @param {HTMLElement} clickedElement - El enlace clicado para marcar como activo.
     */
    const handleFilter = (filterKey, subFilterKey, clickedElement) => {
        // 1. Manejo de Clases 'active'
        document.querySelectorAll('.filter-menu a').forEach(a => a.classList.remove('active'));
        if (clickedElement) {
            clickedElement.classList.add('active');
        }

        // 2. Filtrado de Tarjetas
        employeeCards.forEach(card => {
            const cardCargoFilter = card.dataset.cargo ? card.dataset.cargo.toLowerCase() : '';
            const cardSubCargoFilter = card.dataset.subcargo ? card.dataset.subcargo.toLowerCase() : ''; 
            let shouldShow = false;

            if (filterKey === 'todos') {
                shouldShow = true;
            } else if (subFilterKey) {
                // Filtro por sub-cargo
                shouldShow = (cardSubCargoFilter === subFilterKey);
            } else {
                // Filtro por cargo principal
                shouldShow = cardCargoFilter === filterKey;
            }
            
            card.style.display = shouldShow ? 'flex' : 'none';
        });
        
        // 3. Limpiar búsqueda si se usa el filtro de menú
        if (searchInput.value !== '') {
            searchInput.value = '';
        }
    };

    filterMenu.addEventListener('click', (e) => {
        const clickedLink = e.target.closest('a');
        if (!clickedLink) return;

        // Prevenir navegación si es un enlace de acción
        if (clickedLink.getAttribute('href') === '#') {
            e.preventDefault();
        }

        // --- Clic en una CABECERA de grupo (ACORDEÓN) ---
        if (clickedLink.classList.contains('group-header')) {
            
            const filter = clickedLink.dataset.filter.toLowerCase();
            const willBeOpen = !clickedLink.classList.contains('open'); // Comprobamos si se va a abrir

            // 1. Aplicar filtro
            if (willBeOpen) {
                 // Si se va a abrir, aplicamos el filtro del grupo
                handleFilter(filter, null, clickedLink);
            } else {
                 // Si se va a cerrar, volvemos a 'Todos'
                const todosLink = document.querySelector('.filter-menu ul li a[data-filter="todos"]');
                handleFilter('todos', null, todosLink);
            }
            
            // 2. Abrir/Cerrar Acordeón
            toggleAccordion(clickedLink);

        // --- Clic en un enlace INDIVIDUAL (Sub-cargo o 'Todos') ---
        } else {
            const filter = clickedLink.dataset.filter.toLowerCase();
            const subFilter = clickedLink.dataset.subcargo ? clickedLink.dataset.subcargo.toLowerCase() : null; 

            handleFilter(filter, subFilter, clickedLink);
            
            // Si es un sub-cargo y el acordeón padre está cerrado, lo abrimos
            const parentGroupItem = clickedLink.closest('.group-item');
            if(parentGroupItem && subFilter) { 
                const groupHeader = parentGroupItem.querySelector('.group-header');
                if (groupHeader && !groupHeader.classList.contains('open')) {
                    toggleAccordion(groupHeader);
                }
            }

            // Si es 'Todos', aseguramos el cierre de cualquier acordeón abierto
            if (filter === 'todos') {
                document.querySelectorAll('.group-header.open').forEach(header => {
                    header.classList.remove('open');
                    const sub = header.nextElementSibling;
                    if (sub) sub.style.maxHeight = '0';
                });
            }
        }
    });

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // 1. Limpiar filtros activos y cerrar acordeones
        document.querySelectorAll('.filter-menu a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.group-header.open').forEach(header => {
            header.classList.remove('open');
            const sub = header.nextElementSibling;
            if (sub) sub.style.maxHeight = '0';
        });
        
        // 2. Ejecutar la búsqueda
        employeeCards.forEach(card => {
            const name = card.dataset.name ? card.dataset.name.toLowerCase() : '';
            const cargo = card.dataset.cargo ? card.dataset.cargo.toLowerCase() : '';
            const subcargo = card.dataset.subcargo ? card.dataset.subcargo.toLowerCase() : '';
            const cargoLabel = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

            // Búsqueda amplia
            const matches = name.includes(searchTerm) || 
                            cargo.includes(searchTerm) || 
                            subcargo.includes(searchTerm) || 
                            cargoLabel.includes(searchTerm);

            card.style.display = matches ? 'flex' : 'none';
        });
    };

    searchInput.addEventListener('input', performSearch); 
    
    // Reseteo al vaciar el input: Si el input se vacía, volvemos a 'Todos'
    searchInput.addEventListener('keyup', () => {
        if (searchInput.value.trim() === '') {
            const todosLink = document.querySelector('.filter-menu ul li a[data-filter="todos"]');
            if (todosLink) {
                handleFilter('todos', null, todosLink);
            }
        }
    });

    // 4. Inicialización: Aplicar filtro 'TODOS' al cargar la página
    const todosLink = document.querySelector('.filter-menu ul li a[data-filter="todos"]');
    if (todosLink) {
        handleFilter('todos', null, todosLink); 
    }
});