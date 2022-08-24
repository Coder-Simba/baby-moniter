song=""
objects=[]
status=""
function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
   video=createCapture(VIDEO);
   video.size(380, 380);
   video.hide()
   objectDetector=ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function preload(){
    song=loadSound("stranger_things.mp3");
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true;
    objectDetector.detect(video, gotResult);
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status !=""){
        r= random(255);
        g= random(225);
        b= random(225);
        objectDetector.detect(video, gotResult);
       for(i=0; i< objects.length; i++){
        document.getElementById("status").innerHTML="Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+objects.length
        fill(r,g,b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(results[i].label=="person"){
            document.getElementById("number_of_objects").innerHTML="Baby Found!" ;
            song.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML="Baby NOT Found...";
            song.play();
        }
       }
    }
}


function gotResult(error, results){
    if(error){
        console.log(error);

    }
    console.log(results);
    objects=results;
}