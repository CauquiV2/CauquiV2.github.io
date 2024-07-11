document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.map-container');

    const rooms = [
        { id: 'room1', coords: '385,584,635,752', shape: 'rect', status: 'available' },
        { id: 'room2', coords: '733,585,1012,751', shape: 'rect', status: 'occupied' },
        { id: 'room3', coords: '496,262,681,349', shape: 'rect', status: 'maintenance' },
        { id: 'room4', coords: '683,260,848,348', shape: 'rect', status: 'available' },
        { id: 'room5', coords: '500,816,664,1015', shape: 'rect', status: 'occupied' },
        { id: 'room6', coords: '354,814,495,1012', shape: 'rect', status: 'maintenance' },
        { id: 'room7', coords: '363,450,465,577', shape: 'rect', status: 'available' },
        { id: 'room8', coords: '473,449,589,576', shape: 'rect', status: 'occupied' },
        { id: 'room9', coords: '597,444,712,578', shape: 'rect', status: 'maintenance' },
        { id: 'room10', coords: '714,450,832,577', shape: 'rect', status: 'available' },
        { id: 'room11', coords: '667,812,886,812,886,939,775,945,771,1014,670,1014', shape: 'poly', status: 'occupied' },
        { id: 'room12', coords: '1064,818,1062,1015,1406,1010,1407,815', shape: 'poly', status: 'maintenance' },
        { id: 'room13', coords: '267,404,321,654', shape: 'rect', status: 'available' },
        { id: 'room14', coords: '267,657,321,796', shape: 'rect', status: 'occupied' },
        { id: 'room4m1', coords: '754,604,14', shape: 'circle', status: 'maintenance' },
        { id: 'room4m2', coords: '1003,737,14', shape: 'circle', status: 'available' },
        { id: 'room4m3', coords: '998,597,14', shape: 'circle', status: 'occupied' },
        { id: 'room4m4', coords: '749,736,17', shape: 'circle', status: 'available' },
        { id: 'room3m1', coords: '461,594,10', shape: 'circle', status: 'maintenance' },
        { id: 'room3m2', coords: '560,591,13', shape: 'circle', status: 'available' },
        { id: 'room3m3', coords: '625,642,12', shape: 'circle', status: 'occupied' },
        { id: 'room3m4', coords: '625,708,12', shape: 'circle', status: 'maintenance' },
        { id: 'room3m5', coords: '557,740,10', shape: 'circle', status: 'available' },
        { id: 'room3m6', coords: '467,739,10', shape: 'circle', status: 'occupied' },
    ];

    rooms.forEach(room => {
        const coords = room.coords.split(',').map(Number);
        const areaDiv = document.createElement('div');
        areaDiv.classList.add('map-area');
        areaDiv.dataset.status = room.status;

        if (room.shape === 'rect') {
            const [left, top, right, bottom] = coords;
            areaDiv.style.left = `${left}px`;
            areaDiv.style.top = `${top}px`;
            areaDiv.style.width = `${right - left}px`;
            areaDiv.style.height = `${bottom - top}px`;
        } else if (room.shape === 'circle') {
            const [cx, cy, radius] = coords;
            areaDiv.style.left = `${cx - radius}px`;
            areaDiv.style.top = `${cy - radius}px`;
            areaDiv.style.width = `${2 * radius}px`;
            areaDiv.style.height = `${2 * radius}px`;
            areaDiv.style.borderRadius = '50%';
        } else if (room.shape === 'poly') {
            const points = coords;
            const minX = Math.min(...points.filter((_, index) => index % 2 === 0));
            const minY = Math.min(...points.filter((_, index) => index % 2 !== 0));
            const maxX = Math.max(...points.filter((_, index) => index % 2 === 0));
            const maxY = Math.max(...points.filter((_, index) => index % 2 !== 0));

            areaDiv.style.left = `${minX}px`;
            areaDiv.style.top = `${minY}px`;
            areaDiv.style.width = `${maxX - minX}px`;
            areaDiv.style.height = `${maxY - minY}px`;

            const polyPoints = coords.reduce((acc, curr, index) => {
                return acc + `${curr - (index % 2 === 0 ? minX : minY)},`;
            }, '');

            areaDiv.style.clipPath = `polygon(${polyPoints.slice(0, -1)})`;
        }

        areaDiv.title = room.id;  // Tooltip with room id
        areaDiv.style.pointerEvents = 'none';  // Make sure the div does not interfere with map clicks
        mapContainer.appendChild(areaDiv);
    });
});