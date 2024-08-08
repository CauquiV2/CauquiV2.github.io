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
        context.fillStyle='rgb(0,254,0.95)';
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
    let colors=[0,0,0];
    var maxvalue=0;
    let colors2=[0,0,0];
    var maxvalue2=0;
    var value=0;
    window.addEventListener('resize', updateOverlayPositions2);
    uibuilder.onChange('msg', (msg) => {
    if (msg.topic == "cambioLvlSala") {
        var color = msg.lvlSala == 1 ? "rgb(0,254,0,0.2)" : msg.lvlSala == 2 ? 'rgb(254,254,0,0.2)' : 'rgb(254,0,0,0.2)';
        var room = msg.Room_ID == 1 ? 'room1' : msg.Room_ID == 2 ? 'room2' : msg.Room_ID == 3 ? 'room3' : msg.Room_ID == 4 ? 'room4' : msg.Room_ID == 5 ? 'room5' : msg.Room_ID == 6 ? 'room6' : msg.Room_ID== 7? 'room7':msg.Room_ID==8?'room8':0;
        const polygon=document.getElementById(room);
        
        updatePolygonColor(room,color);
        if (msg.Room_ID==4||msg.Room_ID==5||msg.Room_ID==6){
            maxvalue2=0;
            value=0;
            var roomss2 = msg.Room_ID == 4 ? 0 : msg.Room_ID == 5 ? 1 : msg.Room_ID == 6 ? 2 : 0;
            colors2[roomss2] = msg.lvlSala;


            for (let i=0;i<3;i++){
                value=colors2[i];
                if (value>maxvalue2){
                    maxvalue2=value;
                }
            }
            updateRectangleColor('room2',maxvalue2 == 1 ? "rgb(0,254,0,0.95)" : maxvalue2 == 2 ? 'rgb(254,254,0,0.95)' : 'rgb(254,0,0,0.95)');


        }
        if (msg.Room_ID==3||msg.Room_ID==7||msg.Room_ID==8){
            maxvalue = 0;
            value=0;
            var roomss = msg.Room_ID == 3 ? 0 : msg.Room_ID == 7 ? 1 : msg.Room_ID == 8 ? 2 : 0;
            colors[roomss] = msg.lvlSala;

            for (let i = 0; i < 3; i++) {
                value = colors[i];
                if (value > maxvalue) {
                    maxvalue = value;
                }
            }
            updateRectangleColor('room1', maxvalue == 1 ? "rgb(0,254,0,0.95)" : maxvalue == 2 ? 'rgb(254,254,0,0.95)' : 'rgb(254,0,0,0.95)');
            

            
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
});
