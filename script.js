var choosing = false; //if it is choosing a number
var number;
var dice4;
var dice6;
var dice8;
var diceX;
var interval = 75; //in milliseconds
var randomNumber;
var activeDice;
var shakeThreshold = 20;
var mobile = false;

function selectCSS(){
	console.log("selectCSS");
	
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");

	if (WURFL.is_mobile === true) { //WURFL.is_mobile === true && WURFL.form_factor === "Smartphone"
		fileref.setAttribute("href", "mobile_style.css");
		diceX = document.getElementById("diceX");
		mobile = true;
	} else {
		fileref.setAttribute("href", "style.css");
		dice4 = document.getElementById("dice4");
		dice6 = document.getElementById("dice6");
		dice8 = document.getElementById("dice8");
		diceX = document.getElementById("diceX");
	}
	
	document.getElementsByTagName("head")[0].appendChild(fileref);

}

window.ondevicemotion = function(event){

	if(Math.sqrt(event.acceleration.x*event.acceleration.x + event.acceleration.y*event.acceleration.y + event.acceleration.z*event.acceleration.z)>shakeThreshold){
		//activeDice = document.getElementById("slider").value;
		//chooseFreeDice(activeDice);
		chooseNew('6');
	}
};

function onSliderUpdate(){
	var value = document.getElementById("slider").value;
	diceX.innerHTML = value;
}

function stopThrowing(){
	choosing = false;
	clearInterval(randomNumber);
}



function onClickStart(id){
	/*
	if(!WURFL.is_mobile){
		
	
	*/
	if(!mobile) {

        if (choosing) {
            stopThrowing();
            document.getElementById("start").innerHTML = "Start";
        } else {
            switch (id) {
                case "start":
                    choosing = true;
                    document.getElementById("start").innerHTML = "Stop";
                    randomNumber = setInterval(setAll, interval);
                    break;
                case 'X':
                    choosing = true;
                    activeDice = document.getElementById("slider").value; //X
                    randomNumber = setInterval(chooseFreeDice, interval);

                    break;
                default:
                    choosing = true;
                    activeDice = id;
                    randomNumber = setInterval(chooseNew, interval);

                    break;
            }
        }
    }
}

function setAll(){
	chooseNew('4');
	chooseNew('6');
	chooseNew('8');
	activeDice = document.getElementById("slider").value;
	chooseFreeDice();
}

function chooseFreeDice(){
	number = Math.floor(Math.random() * 100)%activeDice + 1;
	diceX.innerHTML = number;
}

function chooseNew(max){
	var i = max||activeDice;
	
			number = Math.floor(Math.random() * 100)%i + 1;
			switch(i){
				case '4': dice4.innerHTML = number;
						break;
				case '6': dice6.innerHTML = number;
                    alert("choosen " + number + " max " + max);
                    break;
				case '8': dice8.innerHTML = number;
						break;
				default:
						break;
			}
	
}