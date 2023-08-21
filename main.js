window.onload = function( ){
    var canvas = document.getElementById("canvas"),
        image = document.getElementById("layer1"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    ship = particle.create(50,50, 1.5 , 0, 9),
    thrust = vector.create(0,0);
    angle = 0;

    
    //to rotate the ship 3 variables are used
    turningLeft = false;
    turningRight = false;
    thrusting = false;


    update();

    document.body.addEventListener("keydown", function(event) {
        switch(event.key) {

            case "ArrowUp": //up
            thrusting =true;
            break;

            case "ArrowLeft": //left
                turningLeft = true;
                break;

            case "ArrowRight": //right
                turningRight = true;
                break;

            default:
                    break;
        }
    });

        document.body.addEventListener("keyup", function(event) {
            switch(event.key) {

            case "ArrowUp": //up
                thrusting =false;
                break;

            case "ArrowLeft": //left
                    turningLeft = false;
                    break;

            case "ArrowRight": //right
                    turningRight = false;
                    break;
    
            default:
                        break;
            }
        });

    function update() {
        context.clearRect(0,0,width, height);

        if(turningLeft) {
            angle -= 0.05;
        }
        if(turningRight) {
            angle += 0.05;
        }

        thrust.setAngle(angle);

        if(thrusting) {
            thrust.setLength(-0.01);
        }
        else {
            thrust.setLength(0);
        }

        ship.accelerate(thrust);
        ship.update();

        // save , translate and rotate the context to angle 
        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        // draw the ship

 //info on flag center

        context.beginPath();
        context.arc(0,0,30,1.4*Math.PI, 0.6*Math.PI,1);
        context.moveTo(-9.270,-28.5310);
        context.strokeStyle='white';
        context.lineTo(30,-40);
        context.lineTo(30,40);
        context.lineTo(-9.27,28.531);
        context.lineTo(-9.27,-28.531);
        context.fillStyle = "blue";
        context.fillRect(30,30,10,10);
        context.fillRect(30,-40,10,10);
        context.fillStyle = "green";
        context.fillRect(25,15,-7,-30);
        context.fillStyle = "white";
        context.fillRect(18,15,-7,-30);
        context.fillStyle = "#F4C430";
        context.fillRect(11,15,-7,-30);

        context.closePath();
        context.stroke();



        // //visual indication for thrusting
        if(thrusting){
            context.moveTo(30,0);
            context.lineTo(45,0);
        }
        context.stroke();

        if(turningRight){
            context.moveTo(9.27,-35.531);
            context.strokeStyle = 'orange';
            context.lineTo(5,-50);

        }
        context.stroke();

        if(turningLeft){
            context.moveTo(9.27,35.531);
            context.strokeStyle = 'orange';
            context.lineTo(5,50);

        }
        context.stroke();

        context.restore();

        if(ship.position.getX() > 990) {
            ship.position.setX(0); 
            ship.position.setY(50); 

        }
        // if(ship.position.getX() < 0 ) {
        //     ship.position.setX(width); 
        // }
        if(ship.position.getY() > 500) {
            cancelAnimationFrame(myreq); 
            // ship.position.setY(10); 
            // ship.position.setX(0);

        }
        //moon surface
        context.beginPath();
        context.moveTo(0,550);
        context.fillStyle = "grey";
        context.fillRect(0,550,1024,50);
        context.moveTo(0,550);
        context.lineTo(1024,550);
        context.stroke();

        //orbit path of moon-lander
        context.beginPath();
        context.setLineDash([5,15]);
        context.moveTo(0,50);
        context.strokeStyle = "orange";
        context.lineTo(950,50);
        context.font = "24px Airal";
        context.fillText("100x30 km orbit", 850,50);
        context.stroke();


        //desecent path for lander
        context.beginPath();
        context.setLineDash([5,10]);
        context.moveTo(0,50);
        context.strokeStyle = "yellow";
        context.lineTo(550,100);
        context.lineTo(800,300);
        context.lineTo(900,400);
        context.lineTo(900,550);
        context.font = "24px Airal";
        context.fillText("Descent path", 150,100);

        //info on keyboard operation
        context.font = "20px Airal";
        context.fillText("↑ - Deboost", 150,200);
        context.fillText("← - turn left", 150,250);
        context.fillText("→ - turn right", 150,300);
        context.stroke();

        context.setLineDash([0]);

       


        const myreq = requestAnimationFrame(update);
    }
};