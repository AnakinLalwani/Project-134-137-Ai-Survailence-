var objects = [];
var status1 = "";
submitted = "";

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video, 0, 0, 500, 400);
    if (status1 != "") {
        objectDetector.detect(video, gotResults);
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Object Detected!"
            document.getElementById("objectsdetected").innerHTML = objects.length + " " + "Objects Detected!"
            if(objects[i].label == submitted) {
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");
    status1 = "true";
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    status1 = "Detecting Objects..."
    document.getElementById("status").innerHTML = "Status: " + status1;
    submitted = document.getElementById("inputag").value;
    console.log(submitted);
}
