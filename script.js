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
            { id: "room1", coords: "3224,1469,3133,1560", shape: "rect", group: "room", status: "available" },
            { id: "room2", coords: "3224,2159,3133,2254", shape: "rect", group: "room", status: "available" },
            { id: "room3", coords: "5242,1420,5246,1618,4948,1614,4948,1858,4721,1858,4725,1622,3902,1626,3902,1420", shape: "poly", group: "room", status: "available" },
            { id: "room4", coords: "4940,1866,4716,1862,4717,2106,3915,2106,3915,2325,5241,2329,5241,2101,4944,2106", shape: "poly", group: "room", status: "available" },
            { id: "room5", coords: "3898,1424,3894,1622,3443,1618,3441,1866,2844,1858,2852,1601,2315,1605,2311,1415", shape: "poly", group: "room", status: "available" },
            { id: "room6", coords: "3441,2106,3441,1874,2856,1866,2852,2097,2315,2101,2311,2304,3915,2325,3910,2110", shape: "poly", group: "room", status: "available" },
            { id: "room7", coords: "2310,1411,2311,1605,1583,1601,1583,1849,1364,1849,1360,1593,963,1593,963,1407", shape: "poly", group: "room", status: "available" },
            { id: "room8", coords: "2311,2097,2311,2308,963,2287,959,2101,1356,2097,1360,1853,1575,1853,1571,2089", shape: "poly", group: "room", status: "available" }
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