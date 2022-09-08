song_0="";
song_1="";
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
song0_status = ""
song1_status = ""
 
scoreRightWrist = 0
scoreLeftWrist = 0
function preload(){
    song_0 = loadSound("music.mp3");
    song_1 = loadSound("Cradles.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

   video = createCapture(VIDEO);
   video.hide()

   poseNet = ml5.poseNet(video, modelLoaded)
   poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log(" PoseNet is Initialized")
}


function draw(){
    image(video, 0, 0, 600, 500);
    fill ("#4169e1")
    stroke ("#4169e1")
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY, 20)
       song_1.stop();
       if (song0_status==false){
           song_0.play();
           document.getElementById("music").innerHTML="Playing Non-lyrical"
       }

    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
       song_0.stop();
       if (song1_status==false){
        song_1.play();
        document.getElementById("music").innerHTML="Playing Lyrical (CRADLES)"
       }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function pause(){
    song.pause();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score

    }
}