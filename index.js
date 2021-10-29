     //grab the elements from the DOM
     const canvas = document.querySelector("#draw");
     const ctx = canvas.getContext("2d");

     //set canvas size
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     //set line styles
     ctx.strokeStyle = "#bada55"; //the color
     ctx.lineCap = "round";
     ctx.lineJoin = "round";
     ctx.lineWidth = 30; //thickness of the line drawn

     //create some dummy variable to know when you're drawing
     let isDrawing = false;
     let lastX = 0;
     let lastY = 0;
     let hue = 0;
     let direction = true;
     //create a function for drawing
     function draw(e) {
         if (!isDrawing) return; //stop fn from running if not mouse down

         ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
         //begins the drawing path
         ctx.beginPath();

         //start from point
         ctx.moveTo(lastX, lastY);

         //go to point
         ctx.lineTo(e.offsetX, e.offsetY);

         //applies the stroke for the drawing
         ctx.stroke();

         //updates lastX and lastY to wherever you start to draw
         [lastX, lastY] = [e.offsetX, e.offsetY];

         hue++;
         if (hue >= 360) {
             hue = 0;
         }

         if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
             //flip the direction of the lineWidth getting bigger to smaller
             direction = !direction;
         }
         if (direction) {
             //increase linewidth 0-100
             ctx.lineWidth++;
         } else {
             //decrese width 100-0
             ctx.lineWidth--;
         }
     }

     //add event listeners
     canvas.addEventListener("mousedown", e => {
         isDrawing = true;
         [lastX, lastY] = [e.offsetX, e.offsetY];
     });
     canvas.addEventListener("mousemove", draw);
     canvas.addEventListener("mouseup", () => (isDrawing = false));
     canvas.addEventListener("mouseout", () => (isDrawing = false));