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
            context.fillStyle = 'rgba(0, 255, 0, 0.3)'; // Green with opacity
            context.fill(); // Fill the polygon
            context.strokeStyle = 'green';
            context.lineWidth = 2;
            context.stroke(); // Draw the outline
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById('image-map');
    const imageContainer = document.getElementById('image-map-container');
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;
    const naturalHeight=4678;
    const naturalWidth=6622;
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
            context.fillStyle = 'rgba(0, 255, 0, 0.3)'; // Green with opacity
            context.fill(); // Fill the polygon
            context.strokeStyle = 'green';
            context.lineWidth = 2;
            context.stroke(); // Draw the outline
        }
    });
}

    const rooms = [
        {id:'room1', coords: '3138,1427,3209,1503', shape: 'rect'},
        {id:'room2', coords: '3133,2169,3214,2245', shape: 'rect'},
        {id:'room3', coords: '5234,1417,5234,1610,4941,1610,4941,1867,4707,1867,4707,1604,3765,1606,3765,1402', shape: 'poly'},
        {id:'room4', coords: '5245,2092,5239,2290,3754,2290,3754,2103,4719,2109,4719,1869,4941,1869,4941,2092', shape: 'poly'},
        {id:'room5', coords: '3754,2099,3438,2099,3432,1842,2847,1836,2847,2088,2391,2088,2391,2298,3754,2292', shape: 'poly'},
        {id:'room6', coords: '2391,2080,1572,2080,1572,1840,1349,1846,1349,2080,963,2080,963,2284,2391,2290', shape: 'poly'},
        {id:'room7', coords: '963,1411,963,1604,1361,1604,1361,1832,1572,1832,1566,1598,2402,1593,2402,1400', shape: 'poly'},
        {id:'room8', coords: '3759,1398,3759,1608,3438,1608,3432,1830,2847,1830,2841,1596,2408,1596,2408,1398', shape: 'poly'}
    ];

    function convertToPixel(value, dimension) {
        return (value / dimension) * 100;
    }

    function drawRectangle(coords, id, imgWidth, imgHeight) {
        const rect = document.createElement('canvas');
        rect.className = 'highlight rectangle';
        rect.id = `highlight-${id}`;
    
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
        context.fill(); // No fill here, we use CSS for coloring
    
        // Optionally set stroke color and draw outline
        context.strokeStyle = 'green';
        context.lineWidth = 2;
        context.stroke(); // Draw the outline of the rectangle
    
        imageContainer.appendChild(rect);
        // Store reference to the canvas element
    }

    function drawPolygon(coords, id, imgWidth, imgHeight) {
        const poly = document.createElement('canvas');
        poly.className = 'highlight polygon';
        poly.id = `highlight-${id}`;
    
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
        context.clearRect(0, 0, poly.width, poly.height); // Clear any previous drawings
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
        
        // Optionally set stroke color and draw outline
        context.strokeStyle = 'green';
        context.lineWidth = 2;
        context.stroke(); // Draw the outline of the polygon
    
        imageContainer.appendChild(poly); 
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
    window.addEventListener('resize', updateOverlayPositions);
});
window.addEventListener('resize', updateOverlayPositions);