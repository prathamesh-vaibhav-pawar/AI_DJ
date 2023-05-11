song =""
RightWristX = 0
RightWristY = 0
leftWristX = 0
leftWristY = 0
ScoreLeftWrist = 0
ScoreRightWrist = 0
function setup(){
    canvas = createCanvas(500,500)
    canvas.center()
    
    video = createCapture(VIDEO)
    video.hide()

    pose = ml5.poseNet(video,ModelLoaded)
    pose.on('pose',GotResult)
}
function ModelLoaded(){
    console.log("model Loaded")
}
function preload(){
    song = loadSound("music.mp3")
}
function draw(){
    image(video,0,0,500,500)
    fill("#FF0000")
    stroke("#FF0000")
    if(ScoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20)
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("Speed").innerHTML = "Speed is 0.5x"
            song.rate(0.5)
        }
        if(RightWristY > 100 && RightWristY <= 200){
            document.getElementById("Speed").innerHTML = "Speed is 1x"
            song.rate(1)
        }
        if(RightWristY > 200 && RightWristY <= 300){
            document.getElementById("Speed").innerHTML = "Speed is 1.5x"
            song.rate(1.5)
        }
        if(RightWristY > 300 && RightWristY <= 400){
            document.getElementById("Speed").innerHTML = "Speed is 2x"
            song.rate(2)
        }
        if(RightWristY > 400){
            document.getElementById("Speed").innerHTML = "Speed is 2.5x"
            song.rate(2.5)
        }
    }
    if(ScoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20)
        Num1 = Number(leftWristY)
        Orig_num = Math.floor(Num1)
        Volume = Orig_num/500
        document.getElementById("volume").innerHTML = "Volume"+Volume
        song.setVolume(Volume)
    }
}
function PlaySound(){
    song.play()
    song.setVolume(1)
    song.rate(1)
    document.getElementById("btn").style.display = "none"
    document.getElementById("Stp_btn").style.display = "block"
}
function Stop_mus(){
    song.pause()
    document.getElementById("btn").style.display = "block"
    document.getElementById("Stp_btn").style.display = "none"
}
function GotResult(result){
    if(result.length > 0){
        console.log(result)
        RightWristX = result[0].pose.rightWrist.x
        RightWristY = result[0].pose.rightWrist.y 
        leftWristX = result[0].pose.leftWrist.x
        leftWristY = result[0].pose.leftWrist.y
        ScoreLeftWrist = result[0].pose.keypoints[9].score 
        ScoreRightWrist = result[0].pose.keypoints[10].score
    }
}