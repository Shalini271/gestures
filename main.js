prediction="";


Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 Webcam.attach( '#camera' );



function snapshot(){
    Webcam.snap( function(data_uri) {
        // display results in page
        document.getElementById('result').innerHTML = 
         '<img id="photo" src="'+data_uri+'"/>';
    } );
}

console.log( "ml5 version:" + ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0nNGuBLof/model.json",modelReady);

function modelReady(){
    console.log("success");
}
 
function speak(){
    synthesis=window.speechSynthesis;
    sentence="the gesture is" + prediction;
    speak_obj=new SpeechSynthesisUtterance(sentence);
    synthesis.speak(speak_obj);
}

function predict(){
    photo=document.getElementById("photo");
    classifier.classify(photo,gotResults);
}

function gotResults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    prediction=results[0].label;
    document.getElementById("result_gesture_name").innerHTML=prediction;
    
    if(prediction=="hang-10"){
     document.getElementById("update_emoji").innerHTML="&#129305";   
    }
    if(prediction=="wave"){
        document.getElementById("update_emoji").innerHTML="&#129306";   
       }
    if(prediction=="fist"){
        document.getElementById("update_emoji").innerHTML="&#129308";   
       }
       if(prediction=="fingers crossed"){
        document.getElementById("update_emoji").innerHTML="&#129310";   
       }
       if(prediction=="rock-on!"){
        document.getElementById("update_emoji").innerHTML="&#129304";   
       }
        speak();
}
}