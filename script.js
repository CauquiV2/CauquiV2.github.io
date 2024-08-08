
function SendFecha() {
    const selecteddesde = document.getElementById("desde").value;
    const selectedhasta = document.getElementById("hasta").value;
    const selectedinterval=document.getElementById("key").value;
    var msg = {};
    msg.desde = selecteddesde;
    msg.hasta = selectedhasta;
    msg.topic='cambioFecha';
    msg.intervalo=selectedinterval;
    uibuilder.send(msg);
}
const intervalo = {
    "15 min": "15m",
    "1h": "1h",
    "2h": "2h",
    "12h": "12h",
    "1 día": "1d",
    "1 semana": "1s",
};

function displayValue() {
    const selectedKey = document.getElementById("key").value;
    

    // Clear previous value
    

    // Get value corresponding to selected key
    const selectedValue = intervalo[selectedKey];

    // Display value
    
}
document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById('image-map');
    const imageContainer = document.getElementById('image-map-container');
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;
    const naturalHeight = 4678;
    const naturalWidth = 6622;
    

    function updateOverlayPositions() {
        const imgWidth = image.clientWidth;
        const imgHeight = image.clientHeight;

        overlays.forEach(poly => {
            const id = poly.id.replace('highlight-', '');
            const room = rooms.find(r => r.id === id);
            if (room) {
                const coords = room.coords.split(',').map(Number);
                // Recalculate position and size
                const minX = Math.min(...coords.filter((_, i) => i % 2 === 0));
                const minY = Math.min(...coords.filter((_, i) => i % 2 !== 0));
                const maxX = Math.max(...coords.filter((_, i) => i % 2 === 0));
                const maxY = Math.max(...coords.filter((_, i) => i % 2 !== 0));

                poly.style.left = `${(minX / naturalWidth) * imgWidth}px`;
                poly.style.top = `${(minY / naturalHeight) * imgHeight}px`;
                poly.width = (maxX - minX) / naturalWidth * imgWidth;
                poly.height = (maxY - minY) / naturalHeight * imgHeight;

                const context = poly.getContext('2d');
                context.clearRect(0, 0, poly.width, poly.height);
                context.beginPath();
                context.moveTo(
                    (coords[0] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
                    (coords[1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
                );
                for (let i = 2; i < coords.length; i += 2) {
                    context.lineTo(
                        (coords[i] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
                        (coords[i + 1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
                    );
                }
                context.closePath();
                context.fillStyle = 'rgba(0, 255, 0, 0.2)'; // Green with opacity
                context.fill(); // Fill the polygon
                context.strokeStyle = 'transparent';
                context.lineWidth = 2;
                context.stroke(); // Draw the outline
            }
        });
    }



    function updateOverlayPositions2() {
        const imgWidth = image.clientWidth;
        const imgHeight = image.clientHeight;

        overlays.forEach(poly => {
            const id = poly.id.replace('highlight-', '');
            const room = rooms.find(r => r.id === id);
            if (room) {
                const coords = room.coords.split(',').map(Number);
                const shape = room.shape;

                if (shape === 'poly') {
                    // Recalculate position and size for polygons
                    const minX = Math.min(...coords.filter((_, i) => i % 2 === 0));
                    const minY = Math.min(...coords.filter((_, i) => i % 2 !== 0));
                    const maxX = Math.max(...coords.filter((_, i) => i % 2 === 0));
                    const maxY = Math.max(...coords.filter((_, i) => i % 2 !== 0));

                    poly.style.left = `${(minX / naturalWidth) * imgWidth}px`;
                    poly.style.top = `${(minY / naturalHeight) * imgHeight}px`;
                    poly.width = (maxX - minX) / naturalWidth * imgWidth;
                    poly.height = (maxY - minY) / naturalHeight * imgHeight;

                    const context = poly.getContext('2d');
                    context.clearRect(0, 0, poly.width, poly.height);
                    context.beginPath();
                    context.moveTo(
                        (coords[0] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
                        (coords[1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
                    );
                    for (let i = 2; i < coords.length; i += 2) {
                        context.lineTo(
                            (coords[i] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
                            (coords[i + 1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
                        );
                    }
                    context.closePath();
                    context.fillStyle = polygonColors[id] || 'rgba(0, 255, 0, 0.2)'; // Use stored color or default green with opacity
                    context.fill(); // Fill the polygon
                    context.strokeStyle = 'transparent';
                    context.lineWidth = 2;
                    context.stroke(); // Draw the outline
                } else if (shape === 'rect') {
                    // Recalculate position and size for rectangles
                    const [left, top, right, bottom] = coords;

                    poly.style.left = `${(left / naturalWidth) * imgWidth}px`;
                    poly.style.top = `${(top / naturalHeight) * imgHeight}px`;
                    poly.width = (right - left) / naturalWidth * imgWidth;
                    poly.height = (bottom - top) / naturalHeight * imgHeight;

                    const context = poly.getContext('2d');
                    context.clearRect(0, 0, poly.width, poly.height);
                    context.fillStyle = rectangleColors[id] || 'rgba(0, 255, 0, 0.95)'; // Use stored color or default green with opacity
                    context.fillRect(0, 0, poly.width, poly.height);
                    context.strokeStyle = 'green';
                    context.lineWidth = 2;
                    context.strokeRect(0, 0, poly.width, poly.height);
                }
            }
        });
    }

    const rooms = [
        { id: 'room1', coords: '3138,1427,3209,1503', shape: 'rect' },
        { id: 'room2', coords: '3133,2169,3214,2245', shape: 'rect' },
        { id: 'room3', coords: '5234,1417,5234,1610,4941,1610,4941,1867,4707,1867,4707,1604,3765,1606,3765,1402', shape: 'poly' },
        { id: 'room4', coords: '5245,2092,5239,2290,3754,2290,3754,2103,4719,2109,4719,1869,4941,1869,4941,2092', shape: 'poly' },
        { id: 'room5', coords: '3754,2099,3438,2099,3432,1842,2847,1836,2847,2088,2391,2088,2391,2298,3754,2292', shape: 'poly' },
        { id: 'room6', coords: '2391,2080,1572,2080,1572,1840,1349,1846,1349,2080,963,2080,963,2284,2391,2290', shape: 'poly' },
        { id: 'room7', coords: '963,1411,963,1604,1361,1604,1361,1832,1572,1832,1566,1598,2402,1593,2402,1400', shape: 'poly' },
        { id: 'room8', coords: '3759,1398,3759,1608,3438,1608,3432,1830,2847,1830,2841,1596,2408,1596,2408,1398', shape: 'poly' }
    ];

    function convertToPixel(value, dimension) {
        return (value / dimension) * 100;
    }

    function drawRectangle(coords, id, imgWidth, imgHeight) {
        const rect = document.createElement('canvas');
        rect.setAttribute('data-coords', JSON.stringify(coords));
        rect.className = 'highlight rectangle';
        rect.id = `${id}`;

        const [left, top, right, bottom] = coords;

        rect.style.position = 'absolute';
        rect.style.left = `${(left / naturalWidth) * imgWidth}px`;
        rect.style.top = `${(top / naturalHeight) * imgHeight}px`;
        rect.width = (right - left) / naturalWidth * imgWidth;
        rect.height = (bottom - top) / naturalHeight * imgHeight;

        const context = rect.getContext('2d');
        context.beginPath();
        context.rect(0, 0, rect.width, rect.height);
        context.closePath();
        context.fillStyle = 'rgb(0,254,0.95)';
        context.fill(); // No fill here, we use CSS for coloring

        // Optionally set stroke color and draw outline
        context.strokeStyle = 'transparent';
        context.lineWidth = 2;
        context.stroke(); // Draw the outline of the rectangle

        imageContainer.appendChild(rect);
        overlays.push(rect);
        // Store reference to the canvas element
    }

    let overlays = []; // To store references to the canvas elements
    let polygonColors = {}; // To store colors for polygons
    let rectangleColors = {};

    function drawPolygon(coords, id, imgWidth, imgHeight, color = 'rgba(0, 255, 0, 0.2)') {
        const poly = document.createElement('canvas');
        poly.setAttribute('data-coords', JSON.stringify(coords));
        poly.className = 'highlight';
        poly.id = `${id}`;

        // Calculate the bounding box for positioning the canvas
        const minX = Math.min(...coords.filter((_, i) => i % 2 === 0));
        const minY = Math.min(...coords.filter((_, i) => i % 2 !== 0));
        const maxX = Math.max(...coords.filter((_, i) => i % 2 === 0));
        const maxY = Math.max(...coords.filter((_, i) => i % 2 !== 0));

        poly.style.position = 'absolute';
        poly.style.left = `${(minX / naturalWidth) * imgWidth}px`;
        poly.style.top = `${(minY / naturalHeight) * imgHeight}px`;
        poly.width = (maxX - minX) / naturalWidth * imgWidth;
        poly.height = (maxY - minY) / naturalHeight * imgHeight;

        const context = poly.getContext('2d');
        context.beginPath();
        context.moveTo(
            (coords[0] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
            (coords[1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
        );
        for (let i = 2; i < coords.length; i += 2) {
            context.lineTo(
                (coords[i] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
                (coords[i + 1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
            );
        }
        context.closePath();

        // Set fill color and stroke
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = 'transparent';
        context.lineWidth = 2;
        context.stroke();

        // Store the canvas and color
        imageContainer.appendChild(poly);
        overlays.push(poly);
        polygonColors[id] = color; // Save color for later updates
    }
    function updatePolygonColor(id, newColor) {
        const poly = document.getElementById(`${id}`);
        if (!poly) return;

        const coords = JSON.parse(poly.getAttribute('data-coords'));
        const imgWidth = image.clientWidth;
        const imgHeight = image.clientHeight;
        const context = poly.getContext('2d');

        // Clear the existing polygon
        context.clearRect(0, 0, poly.width, poly.height);

        // Redraw with new color
        context.beginPath();
        context.moveTo(
            (coords[0] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
            (coords[1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
        );
        for (let i = 2; i < coords.length; i += 2) {
            context.lineTo(
                (coords[i] / naturalWidth) * imgWidth - parseFloat(poly.style.left),
                (coords[i + 1] / naturalHeight) * imgHeight - parseFloat(poly.style.top)
            );
        }
        context.closePath();
        context.fillStyle = newColor;
        context.fill();
        context.strokeStyle = 'transparent';
        context.lineWidth = 2;
        context.stroke();

        // Update color map
        polygonColors[id] = newColor;
    }
    function updateRectangleColor(id, newColor) {
        const rect = document.getElementById(`${id}`);
        if (!rect) {
            console.error(`Rectangle with id ${id} not found.`);
            return;
        }

        const coords = JSON.parse(rect.getAttribute('data-coords'));
        if (!coords || coords.length !== 4) {
            console.error(`Invalid coordinates for rectangle with id ${id}`);
            return;
        }

        const [left, top, right, bottom] = coords;
        const imgWidth = image.clientWidth;
        const imgHeight = image.clientHeight;
        const context = rect.getContext('2d');

        // Clear the existing rectangle
        context.clearRect(0, 0, rect.width, rect.height);

        // Redraw with new color
        context.fillStyle = newColor;
        context.fillRect(0, 0, rect.width, rect.height);
        context.strokeStyle = 'green';
        context.lineWidth = 2;
        context.strokeRect(0, 0, rect.width, rect.height);

        // Update color map
        rectangleColors[id] = newColor;
    }
    function SendFecha(){
        const selecteddesde= document.getElementById("desde").value;
        const selectedhasta=document.getElementById("hasta").value;
        var msg={};
        msg.desde=selecteddesde;
        msg.hasta=selectedhasta;
        global.desde=selecteddesde;
        global.hasta=selectedhasta;
        msg.topic="cambioFecha";
        uibuilder.send(msg);
    }


    rooms.forEach(room => {
        const coords = room.coords.split(',').map(Number);
        const shape = room.shape;
        const id = room.id;

        if (shape === 'rect') {
            drawRectangle(coords, id, imageWidth, imageHeight);
        } else if (shape === 'poly') {
            drawPolygon(coords, id, imageWidth, imageHeight);
        }
    });
    const selectElement = document.getElementById("key");

    // Add options for each key in JSON data
    for (const key in intervalo) {
        const option = document.createElement("option");
        option.text = key;
        option.value = key;
        selectElement.add(option);
    }

    // Display value for the default selected key
    displayValue();
    let colors = [0, 0, 0];
    var maxvalue = 0;
    let colors2 = [0, 0, 0];
    var maxvalue2 = 0;
    var value = 0;
    window.addEventListener('resize', updateOverlayPositions2);
    uibuilder.onChange('msg', (msg) => {
        if (msg.topic == "cambioLvlSala") {
            if (msg.roomval){
                var array=msg.roomval;
            
            for (let i =0;i<array.length;i++){
                var roomn=array[i][0];
                var room = roomn == 1 ? 'room1' : roomn == 2 ? 'room2' : roomn == 3 ? 'room3' : roomn == 4 ? 'room4' : roomn == 5 ? 'room5' : roomn == 6 ? 'room6' : roomn == 7 ? 'room7' : roomn == 8 ? 'room8' : 0;
                var state=array[i][1];
                var color = state == 1 ? "rgb(0,254,0,0.2)" : state == 2 ? 'rgb(254,254,0,0.2)' : 'rgb(254,0,0,0.2)';
                const polygon = document.getElementById(room);
                updatePolygonColor(room, color);
                if (roomn == 4 || roomn == 5 || roomn == 6) {
                    maxvalue2 = 0;
                    value = 0;
                    var roomss2 = roomn == 4 ? 0 : roomn == 5 ? 1 : roomn == 6 ? 2 : 0;
                    colors2[roomss2] = state;


                    for (let i = 0; i < 3; i++) {
                        value = colors2[i];
                        if (value > maxvalue2) {
                            maxvalue2 = value;
                        }
                    }
                    updateRectangleColor('room2', maxvalue2 == 1 ? "rgb(0,254,0,0.95)" : maxvalue2 == 2 ? 'rgb(254,254,0,0.95)' : 'rgb(254,0,0,0.95)');


                }
                if (roomn == 3 || roomn == 7 || roomn == 8) {
                    maxvalue = 0;
                    value = 0;
                    var roomss = roomn == 3 ? 0 : roomn == 7 ? 1 : roomn == 8 ? 2 : 0;
                    colors[roomss] = state;

                    for (let i = 0; i < 3; i++) {
                        value = colors[i];
                        if (value > maxvalue) {
                            maxvalue = value;
                        }
                    }
                    updateRectangleColor('room1', maxvalue == 1 ? "rgb(0,254,0,0.95)" : maxvalue == 2 ? 'rgb(254,254,0,0.95)' : 'rgb(254,0,0,0.95)');



                }

            }
            }
            
            
        }
        if (msg.topic='cambioFecha'){
            msg.topic='';
            var intervalostring= msg.intervalo;
            let res = intervalostring.charAt(intervalostring.length - 1);
            if (res=="h"){
                intervalostring=intervalostring.slice(0,-1);
                var intervalominutes=parseInt(intervalostring)*60;
                sliderupload(msg.desde, msg.hasta,intervalominutes);
            }
            if (res=="m"){
                var intervalominutesm=intervalostring.slice(0,-1);
                intervalominutesm=parseInt(intervalominutesm);
                sliderupload(msg.desde, msg.hasta,intervalominutesm);
            }
        }
    });
    function generateTimeArray(startDate, endDate, intervalMinutes) {
    const hoursArray = [];

    // Helper function to format date to YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Helper function to format time to HH:MM
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0');
    }

    const totalMinutesInDay = 24 * 60;
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setDate(endDateObj.getDate() - 1); // Set endDate to the day before

    while (currentDate <= endDateObj) {
        for (let minutes = 0; minutes < totalMinutesInDay; minutes += intervalMinutes) {
            const formattedTime = formatTime(minutes);
            const formattedDate = formatDate(currentDate);
            hoursArray.push(`${formattedDate} ${formattedTime}`);
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return hoursArray;
}

    function sliderupload(startDate, endDate,Interval){
        const array = generateTimeArray(startDate, endDate,Interval);
        const slider = document.getElementById('arraySlider');
        const sliderValue = document.getElementById('sliderValue');

        // Initialize the display with the first value in the array
        sliderValue.textContent = array[slider.value];
        slider.min=0;
        slider.max=array.length;
        if (slider.value < 0) {
            slider.value = 0;
        } else if (slider.value > array.length) {
            slider.value = array.length;
        }

        slider.addEventListener('input', function () {
            // Update the displayed value based on the slider position
            sliderValue.textContent = array[slider.value];
            var msg = {};
            msg.slidervalue = slider.value;
            msg.topic='cambioLvlSala';
            uibuilder.send(msg);
        });

    }
    const array = ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"];
    const slider = document.getElementById('arraySlider');
    const sliderValue = document.getElementById('sliderValue');

    // Initialize the display with the first value in the array
    sliderValue.textContent = array[slider.value];

    slider.addEventListener('input', function () {
        // Update the displayed value based on the slider position
        sliderValue.textContent = array[slider.value];
        var msg={};
        msg.slidervalue=slider.value;
        msg.topic='cambioLvlSala';
        uibuilder.send(msg);
    });
});