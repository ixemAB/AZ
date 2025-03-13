const regions = document.querySelectorAll('.region');
const infoBox = document.getElementById('info-box');
const regionsUl = document.getElementById('regions-ul');

// Заполняем список регионов
regions.forEach(region => {
    const title = region.getAttribute('title');
    const id = region.getAttribute('id');
    const li = document.createElement('li');
    li.textContent = title;
    li.setAttribute('data-region-id', id);
    regionsUl.appendChild(li);
});

const regionListItems = document.querySelectorAll('#regions-ul li');

// Обработчики событий для регионов карты
regions.forEach(region => {
    region.addEventListener('mouseover', (event) => {
        const title = region.getAttribute('title');
        infoBox.textContent = title;
        infoBox.style.display = 'block';
        infoBox.style.left = event.pageX + 10 + 'px';
        infoBox.style.top = event.pageY + 10 + 'px';
        region.style.fill = '#51f5f2';
        region.style.cursor = 'pointer';
        region.style.transform = 'scale(1)';
        region.style.transition = 'transform 0.9s ease';
        // Подсветка элемента списка
        const regionId = region.getAttribute('id');
        regionListItems.forEach(item => {
            if (item.getAttribute('data-region-id') === regionId) {
                item.classList.add('highlight');
            }
        });
    });

    region.addEventListener('mouseout', () => {
        infoBox.style.display = 'none';
        region.style.fill = '';
        region.style.cursor = '';
        region.style.transform = 'scale(1)';
        region.style.transition = 'transform 0.9s ease';
        // Снятие подсветки с элемента списка
        regionListItems.forEach(item => {
            item.classList.remove('highlight');
        });
    });
});

// Обработчики событий для элементов списка
regionListItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        const regionId = item.getAttribute('data-region-id');
        const region = document.getElementById(regionId);
        region.dispatchEvent(new Event('mouseover'));
        item.classList.add('highlight');
    });

    item.addEventListener('mouseout', () => {
        const regionId = item.getAttribute('data-region-id');
        const region = document.getElementById(regionId);
        region.dispatchEvent(new Event('mouseout'));
        item.classList.remove('highlight');
    });
});

// ... (ваш существующий JavaScript-код) ...

// Инициализация скроллбара
const ps = new PerfectScrollbar('#regions-ul', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
});
