function statuss(value) {
    if (value <= 40) {
        return 'available';
    }
    if ((value > 40) && (value <= 50)) {
        return 'maintenance';
    }
    if (value > 50) {
        return 'occupied';
    }
    else {
        return 'transparent';
    }
}

function statusmic(value) {
    if (value >= 1) {
        return 'occupied';
    }
    else {
        return 'transparent';
    }
}

/* function updateRoomStatus(inputElement) {
    const value = parseInt(inputElement.value, 10);
    const group = inputElement.dataset.group;
    const status = group === 'room' ? statuss(value) : statusmic(value);
    const roomId = inputElement.dataset.roomId;
    const color = {
        'available': 'green',
        'maintenance': 'orange',
        'occupied': 'red'
    }[status] || 'transparent';

    // Update the table cell color
    const cell = inputElement.parentElement;
    cell.style.backgroundColor = color;

    // Update the map overlay color
    const mapArea = document.getElementById(roomId);
    if (mapArea) {
        mapArea.style.backgroundColor = color;
    } */


/* document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function () {
        updateRoomStatus(this);
    });
}); */

/* document.getElementById('roomForm').addEventListener('submit', function (event) {
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
}); */

function updateRoomColors(roomNumbers) {
    const mapContainer = document.querySelector('.map-container');
    const mapImage = document.querySelector('.building-map');


    // Ensure the image is fully loaded before processing
    mapImage.addEventListener('load', () => {
        const imageRect = mapImage.getBoundingClientRect();
        const naturalWidth = 1654; // Replace with your image's natural width
        const naturalHeight = 1140; // Replace with your image's natural height

        const rooms = [
            { id: "room1", coords: "3138,1427,3209,1503", shape: "rect", group: "room", status: "available" },
            { id: "room2", coords: "3133,2169,3214,2245", shape: "rect", group: "room", status: "available" },
            { id: "room3", coords: "5234,1417,5234,1610,4941,1610,4941,1867,4707,1867,4707,1604,3765,1606,3765,1402", shape: "poly", group: "room", status: "available" },
            { id: "room4", coords: "5245,2092,5239,2290,3754,2290,3754,2103,4719,2109,4719,1869,4941,1869,4941,2092", shape: "poly", group: "room", status: "available" },
            { id: "room5", coords: "3754,2099,3438,2099,3432,1842,2847,1836,2847,2088,2391,2088,2391,2298,3754,2292", shape: "poly", group: "room", status: "available" },
            { id: "room6", coords: "2391,2080,1572,2080,1572,1840,1349,1846,1349,2080,963,2080,963,2284,2391,2290", shape: "poly", group: "room", status: "available" },
            { id: "room7", coords: "963,1411,963,1604,1361,1604,1361,1832,1572,1832,1566,1598,2402,1593,2402,1400", shape: "poly", group: "room", status: "available" },
            { id: "room8", coords: "3759,1398,3759,1608,3438,1608,3432,1830,2847,1830,2841,1596,2408,1596,2408,1398", shape: "poly", group: "room", status: "available" }
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
            const areaDiv = document.createElement('div');;
            areaDiv.classList.add('map-area');
            areaDiv.classList.add(room.group);
            areaDiv.id = room.id;
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

            const textElement = document.createElement('div');
            textElement.id = `${room.id}-text`; // Assign an ID
            textElement.textContent = 0;
            areaDiv.appendChild(textElement);
        });
    });

};

// Add an event listener to ensure the DOM is fully loaded before processing
document.addEventListener('DOMContentLoaded', function () {
    const mapImage = document.querySelector('.building-map');
    if (mapImage.complete) {
        updateRoomColors({}); // Call function directly if image is already loaded
    } else {
        mapImage.addEventListener('load', () => {
            updateRoomColors({});
        });
    }
});