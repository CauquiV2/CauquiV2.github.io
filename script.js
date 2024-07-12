function statuss(value) {
    if (value <= 40) {
        return 'available';
    }
    if (value > 40 && value < 50) {
        return 'maintenance';
    }
    if (value > 50) {
        return 'occupied';
    }
}

function updateRoomStatus(inputElement) {
    const value = parseInt(inputElement.value, 10);
    const status = statuss(value);
    const cell = inputElement.parentElement;
    const color = {
        'available': 'green',
        'maintenance': 'orange',
        'occupied': 'red'
    }[status] || 'transparent';
    cell.style.backgroundColor = color;
}

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        updateRoomStatus(this);
    });
});

document.getElementById('roomForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    const formData = new FormData(event.target);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h2>Entered Room Numbers</h2>';
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const roomNumbers = {};

    thead.innerHTML = `
        <tr>
            <th>Room</th>
            <th>Number</th>
        </tr>
    `;
    table.appendChild(thead);

    formData.forEach((value, key) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        cell1.textContent = key.replace('room', 'Room ');
        cell2.textContent = value;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
        roomNumbers[key] = value;
    });

    table.appendChild(tbody);
    outputDiv.appendChild(table);
});

document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.map-container');
    const mapImage = document.querySelector('.building-map');

    // Ensure the image is fully loaded before processing
    mapImage.addEventListener('load', () => {
        const imageRect = mapImage.getBoundingClientRect();

        const naturalWidth = 1654; // Replace with your image's natural width
        const naturalHeight = 2339; // Replace with your image's natural height

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
            { id: 'room4m1', coords: '754,604,14', shape: 'circle', status: 'occupied' },
            { id: 'room4m2', coords: '1003,737,14', shape: 'circle', status: 'occupied' },
            { id: 'room4m3', coords: '998,597,14', shape: 'circle', status: 'occupied' },
            { id: 'room4m4', coords: '749,736,17', shape: 'circle', status: 'occupied' },
            { id: 'room3m1', coords: '461,594,10', shape: 'circle', status: 'occupied' },
            { id: 'room3m2', coords: '560,591,13', shape: 'circle', status: 'occupied' },
            { id: 'room3m3', coords: '625,642,12', shape: 'circle', status: 'occupied' },
            { id: 'room3m4', coords: '625,708,12', shape: 'circle', status: 'occupied' },
            { id: 'room3m5', coords: '557,740,10', shape: 'circle', status: 'occupied' },
            { id: 'room3m6', coords: '467,739,10', shape: 'circle', status: 'occupied' },
        ];

        const convertToPercentage = (pixelValue, dimension) => (pixelValue / dimension) * 100;

        rooms.forEach(room => {
            const coords = room.coords.split(',').map(Number);
            if (room.shape === 'rect') {
                const [left, top, right, bottom] = coords;
                room.coords = [
                    convertToPercentage(left, naturalWidth),
                    convertToPercentage(top, naturalHeight),
                    convertToPercentage(right, naturalWidth),
                    convertToPercentage(bottom, naturalHeight)
                ].join(',');
            } else if (room.shape === 'circle') {
                const [cx, cy, radius] = coords;
                room.coords = [
                    convertToPercentage(cx, naturalWidth),
                    convertToPercentage(cy, naturalHeight),
                    convertToPercentage(radius, Math.max(naturalWidth, naturalHeight)) // Assuming radius scales with the larger dimension
                ].join(',');
            } else if (room.shape === 'poly') {
                room.coords = coords.map((value, index) =>
                    convertToPercentage(value, index % 2 === 0 ? naturalWidth : naturalHeight)
                ).join(',');
            }
        });

        rooms.forEach(room => {
            const coords = room.coords.split(',').map(Number);
            const areaDiv = document.createElement('div');
            areaDiv.classList.add('map-area');
            areaDiv.style.backgroundColor = {
                'available': 'green',
                'occupied': 'red',
                'maintenance': 'orange'
            }[room.status] || 'transparent';

            if (room.shape === 'rect') {
                const [leftPercent, topPercent, rightPercent, bottomPercent] = coords;
                areaDiv.style.left = `${leftPercent}%`;
                areaDiv.style.top = `${topPercent}%`;
                areaDiv.style.width = `${rightPercent - leftPercent}%`;
                areaDiv.style.height = `${bottomPercent - topPercent}%`;
            } else if (room.shape === 'circle') {
                const [cxPercent, cyPercent, radiusPercent] = coords;
                areaDiv.style.left = `${cxPercent - radiusPercent}%`;
                areaDiv.style.top = `${cyPercent - radiusPercent}%`;
                areaDiv.style.width = `${2 * radiusPercent}%`;
                areaDiv.style.height = `${2 * radiusPercent}%`;
                areaDiv.style.borderRadius = '50%';
            } else if (room.shape === 'poly') {
                const points = coords;
                const minX = Math.min(...points.filter((_, index) => index % 2 === 0));
                const minY = Math.min(...points.filter((_, index) => index % 2 !== 0));
                const maxX = Math.max(...points.filter((_, index) => index % 2 === 0));
                const maxY = Math.max(...points.filter((_, index) => index % 2 !== 0));

                areaDiv.style.left = `${minX}%`;
                areaDiv.style.top = `${minY}%`;
                areaDiv.style.width = `${maxX - minX}%`;
                areaDiv.style.height = `${maxY - minY}%`;

                const polyPoints = points.reduce((acc, curr, index) => {
                    return acc + `${curr - (index % 2 === 0 ? minX : minY)}%,`;
                }, '');

                areaDiv.style.clipPath = `polygon(${polyPoints.slice(0, -1)})`;
            }

            areaDiv.title = room.id;  // Tooltip with room id
            areaDiv.style.pointerEvents = 'none';  // Make sure the div does not interfere with map clicks
            mapContainer.appendChild(areaDiv);
        });
    });
});