document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const overlayBg = document.querySelector('.overlay-bg');
    const image = document.getElementById('background-image');
  
    function setOverlay(x, y, size, startAngle, endAngle) {
      const rect = image.getBoundingClientRect();
  
      // Calculate the actual position and size of the overlay relative to the image
      const imgWidth = rect.width;
      const imgHeight = rect.height;
      const xOffset = rect.left;
      const yOffset = rect.top;
  
      const radius = size / 2;
      overlay.style.width = `${size}px`;
      overlay.style.height = `${size}px`;
  
      const left = xOffset + (x / 100) * imgWidth - radius;
      const top = yOffset + (y / 100) * imgHeight - radius;
  
      overlay.style.left = `${left}px`;
      overlay.style.top = `${top}px`;
  
      const start = polarToCartesian(radius, startAngle);
      const end = polarToCartesian(radius, endAngle);
  
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      const pathData = [
        "M", radius, radius,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
        "Z"
      ].join(" ");
  
      overlay.style.clipPath = `path('${pathData}')`;
    }
  
    function polarToCartesian(radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: radius + (radius * Math.cos(angleInRadians)),
        y: radius + (radius * Math.sin(angleInRadians))
      };
    }
  
    // Example usage:
    // Coordinates (x, y) as percentage of the image dimensions, size (diameter), startAngle, and endAngle
    const x = 50;  // 50% from the left of the image
    const y = 50;  // 50% from the top of the image
    const size = 300;
    const startAngle = 0;
    const endAngle = 90;
  
    setOverlay(x, y, size, startAngle, endAngle);
  
    // Reposition the overlay when the window is resized
    window.addEventListener('resize', () => setOverlay(x, y, size, startAngle, endAngle));
  });