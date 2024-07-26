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
            { id: 'room1', coords: '385,584,635,752', shape: 'rect', group: 'room', status: 'available' },
            { id: 'room2', coords: '733,585,1012,751', shape: 'rect', group: 'room', status: 'occupied' },
            { id: 'room3', coords: '496,262,681,349', shape: 'rect', group: 'room', status: 'maintenance' },
            { id: 'room4', coords: '683,260,848,348', shape: 'rect', group: 'room', status: 'available' },
            { id: 'room5', coords: '500,816,664,1015', shape: 'rect', group: 'room', status: 'occupied' },
            { id: 'room6', coords: '354,814,495,1012', shape: 'rect', group: 'room', status: 'maintenance' },
            { id: 'room7', coords: '363,450,465,577', shape: 'rect', group: 'room', status: 'available' },
            { id: 'room8', coords: '473,449,589,576', shape: 'rect', group: 'room', status: 'occupied' },
            { id: 'room9', coords: '597,444,712,578', shape: 'rect', group: 'room', status: 'maintenance' },
            { id: 'room10', coords: '714,450,832,577', shape: 'rect', group: 'room', status: 'available' },
            { id: 'room11', coords: '667,812,886,812,886,939,775,945,771,1014,670,1014', shape: 'poly', group: 'room', status: 'occupied' },
            { id: 'room12', coords: '1064,818,1062,1015,1406,1010,1407,815', shape: 'poly', group: 'room', status: 'maintenance' },
            { id: 'room13', coords: '267,404,321,654', shape: 'rect', group: 'room', status: 'available' },
            { id: 'room14', coords: '267,657,321,796', shape: 'rect', group: 'room', status: 'occupied' },
            /* { id: 'room1m1', coords: '389,586,509,661', shape: 'rect', group: 'mic', status: 'occupied' },
            { id: 'room1m2', coords: '518,659,638,585', shape: 'rect', group: 'mic', status: 'occupied' },
            { id: 'room4m3', coords: '391,748,512,671', shape: 'rect', group: 'mic', status: 'occupied' },
            { id: 'room4m4', coords: '639,750,521,666', shape: 'rect', group: 'mic', status: 'occupied' },
            { id: 'room3m1', coords: '790,625,61', shape: 'circle', group: 'mic', status: 'occupied' },
            { id: 'room3m2', coords: '994,598,64', shape: 'circle', group: 'mic', status: 'occupied' },
            { id: 'room3m3', coords: '789,710,62', shape: 'circle', group: 'mic', status: 'occupied' },
            { id: 'room3m4', coords: '1005,741,62', shape: 'circle', group: 'mic', status: 'occupied' }, */

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
uibuilder.onChange('msg', (msg) => {
    if (msg.topic=="cambioLvlSala"){
        var color=msg.lvlSala==1? "green":msg.lvlSala==2?'yellow':'red';
        var room=msg.Room_ID==1?'room1':msg.Room_ID==2?'room2':msg.Room_ID==3?'room3':msg.Room_ID==4?'room4':0;
        const mapArea = document.getElementById(room);
        const textroom = msg.Room_ID == 1 ? 'room1-text' : msg.Room_ID == 2 ? 'room2-text' : msg.Room_ID == 3 ? 'room3-text' : msg.Room_ID == 4 ? 'room4-text' : 0;
        var roomtext= document.getElementById(textroom);
        roomtext.textContent=msg.dB;
        if (mapArea) {
            mapArea.style.backgroundColor = color;
        }
        /* if (msg.Room_ID==1){
            const mapArea = document.getElementById('room1');
            if (mapArea) {
                    mapArea.style.backgroundColor = color;
                }
        }
        if (msg.Room_ID==2){
            const mapArea = document.getElementById('room2');
            if (mapArea) {
                    mapArea.style.backgroundColor = color;
                }
        } */
    }
})
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