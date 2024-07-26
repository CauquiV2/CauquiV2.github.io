document.addEventListener("DOMContentLoaded", function () {
    const areas = document.querySelectorAll("area");

    areas.forEach(area => {
        const coords = area.coords.split(',').map(Number);
        const shape = area.shape;
        const id = area.id;

        if (shape === "rect") {
            drawRectangle(coords, id);
        } else if (shape === "poly") {
            drawPolygon(coords, id);
        }
    });
});

function drawRectangle(coords, id) {
    const [x1, y1, x2, y2] = coords;
    const rect = document.createElement('div');
    rect.className = 'highlight';
    rect.style.left = `${x1}px`;
    rect.style.top = `${y1}px`;
    rect.style.width = `${x2 - x1}px`;
    rect.style.height = `${y2 - y1}px`;
    rect.id = `highlight-${id}`;
    document.getElementById('image-map-container').appendChild(rect);
}

function drawPolygon(coords, id) {
    const poly = document.createElement('div');
    poly.className = 'highlight';
    poly.id = `highlight-${id}`;

    const minX = Math.min(...coords.filter((_, i) => i % 2 === 0));
    const minY = Math.min(...coords.filter((_, i) => i % 2 !== 0));

    poly.style.left = `${minX}px`;
    poly.style.top = `${minY}px`;

    // Create a canvas to draw the polygon
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const maxX = Math.max(...coords.filter((_, i) => i % 2 === 0));
    const maxY = Math.max(...coords.filter((_, i) => i % 2 !== 0));
    canvas.width = maxX - minX;
    canvas.height = maxY - minY;

    context.beginPath();
    context.moveTo(coords[0] - minX, coords[1] - minY);

    for (let i = 2; i < coords.length; i += 2) {
        context.lineTo(coords[i] - minX, coords[i + 1] - minY);
    }

    context.closePath();
    context.fillStyle = 'rgba(255, 0, 0, 0.3)';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.stroke();

    poly.appendChild(canvas);
    document.getElementById('image-map-container').appendChild(poly);
}