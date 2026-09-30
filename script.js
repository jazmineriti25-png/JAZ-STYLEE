document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los botones de filtro y las tarjetas
    const filterButtons = document.querySelectorAll('.filter-btn');
    const magazineCards = document.querySelectorAll('.card-magazine');

    // Función para filtrar por categorías (Todos, Vogue, Luxe, Y2K)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa a todos los botones y ponérsela al seleccionado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Mostrar u ocultar tarjetas según la categoría
            magazineCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

});