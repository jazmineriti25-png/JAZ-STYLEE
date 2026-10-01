document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los botones de filtro y las tarjetas
    const filterButtons = document.querySelectorAll('.filter-btn');
    const magazineCards = document.querySelectorAll('.card-magazine');

    // Función para filtrar por categorías (Todos, Vogue, Luxe, Y2K)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa a todos los botones y ponérsela al seleccionado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

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

    const moodboardGrid = document.querySelector('.moodboard-grid');
    moodboardGrid.replaceChildren();

    for (let imageNumber = 4; imageNumber <= 40; imageNumber += 1) {
        if (imageNumber === 20) {
            continue;
        }

        const paddedNumber = String(imageNumber).padStart(2, '0');
        const figure = document.createElement('figure');
        const trigger = document.createElement('button');
        const image = document.createElement('img');
        const caption = document.createElement('figcaption');
        const category = document.createElement('span');

        figure.className = 'moodboard-item';
        trigger.className = 'moodboard-trigger';
        trigger.type = 'button';
        trigger.setAttribute('aria-label', `Ampliar imagen editorial ${paddedNumber}`);
        image.src = `img/${imageNumber}m.jpeg`;
        image.alt = `Imagen editorial de moda ${paddedNumber}`;
        image.loading = 'lazy';
        category.textContent = `${paddedNumber} / EDITORIAL`;
        caption.append(category, 'Inspiración de temporada');
        trigger.append(image, caption);
        figure.append(trigger);
        moodboardGrid.append(figure);
    }

    const galleryTriggers = Array.from(document.querySelectorAll('.moodboard-trigger'));
    const lightbox = document.querySelector('#moodboard-lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    let activeImageIndex = 0;

    const showGalleryImage = index => {
        activeImageIndex = (index + galleryTriggers.length) % galleryTriggers.length;
        const trigger = galleryTriggers[activeImageIndex];
        const image = trigger.querySelector('img');

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = trigger.querySelector('figcaption').textContent.trim();
    };

    galleryTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            showGalleryImage(index);
            lightbox.showModal();
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
    lightbox.querySelector('[data-gallery-prev]').addEventListener('click', () => {
        showGalleryImage(activeImageIndex - 1);
    });
    lightbox.querySelector('[data-gallery-next]').addEventListener('click', () => {
        showGalleryImage(activeImageIndex + 1);
    });

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            lightbox.close();
        }
    });

    document.addEventListener('keydown', event => {
        if (!lightbox.open) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            showGalleryImage(activeImageIndex - 1);
        } else if (event.key === 'ArrowRight') {
            showGalleryImage(activeImageIndex + 1);
        }
    });

});