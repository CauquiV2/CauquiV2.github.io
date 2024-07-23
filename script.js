document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const overlayBg = document.querySelector('.overlay-bg');
    const image = document.getElementById('background-image');
  
    function setOverlay(xPercent, yPercent, size, startAngle, endAngle) {
      const rect = image.getBoundingClientRect();
  
      // Calculate the actual position and size of the overlay relative to the image
      const imgWidth = rect.width;
      const imgHeight = rect.height;
      const xOffset = rect.left;
      const yOffset = rect.top;
  
      const radius = size / 2;
      overlay.style.width = `${size}px`;
      overlay.style.height = `${size}px`;
  
      // Calculate the position based on the percentage coordinates
      const left = xOffset + (xPercent / 100) * imgWidth - radius;
      const top = yOffset + (yPercent / 100) * imgHeight - radius;
  
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
  
    // Coordinates (xPercent, yPercent) as percentage of the image dimensions, size (diameter), startAngle, and endAngle
    const xPercent = 50;  // 50% from the left of the image
    const yPercent = 50;  // 50% from the top of the image
    const size = 300;
    const startAngle = 0;
    const endAngle = 90;
  
    // Initial setup
    setOverlay(xPercent, yPercent, size, startAngle, endAngle);
  
    // Reposition the overlay when the window is resized
    window.addEventListener('resize', () => setOverlay(xPercent, yPercent, size, startAngle, endAngle));
  });