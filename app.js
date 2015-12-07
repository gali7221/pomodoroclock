// Steps
/*
	1.  
*/

// Global Default TImes
var breakTime = 5;
var sessionTime = 25;
var timerHandler;
// Instance of HTML5 Class Audio. 
var audio = new Audio('http://www.gravomaster.com/alarm/sounds/chime-mid.mp3'); 
var mode = '';
var active = false;
var currentTime;

$(document).ready(function(){
	$("#break-time").empty().append(breakTime);
	$("#work-time").empty().append(sessionTime);
	$("#count-down").empty().append(sessionTime);
	$("#session-name").empty().append("Start!");
});

	// Decrease Break Time
	$('#minusBreak').click(function(){
		clearInterval(timerHandler);
		mode = '';
		breakTime--;
		if(breakTime <= 1){
			breakTime = 1;
		}
		updateTimer();
	});

	// Increase Break Time
	$('#plusBreak').click(function(){
		clearInterval(timerHandler);
		mode = '';
		breakTime++;
		updateTimer();
	});

	// Decrease Session Time
	$('#minusWork').click(function(){
		clearInterval(timerHandler);
		mode = '';
		sessionTime--;

		if(sessionTime <= 1){
			sessionTime = 1;
		}
		updateTimer();
	});

	// Increase Session Time
	$("#plusWork").click(function(){
		clearInterval(timerHandler);
		mode = '';
		sessionTime++;
		updateTimer();
	});


	function updateTimer(){
		$('#break-time').empty().append(breakTime);
		$('#work-time').empty().append(sessionTime);
		$('#count-down').empty().append(sessionTime);
	}

	$('.circle').on("click", function(){
		// Toggle true and false
		active = !active;

		// Disable incrementors/decrementors while working. 
		// active has been toggled to true
		$('#plusWork').prop('disabled', active);
		$('#minusWork').prop('disabled', active);
		$('#plusBreak').prop('disabled', active);
		$('#minusBreak').prop('disabled', active);



		if(mode == ''){
			// Change to 
			mode = "work";
			// Session Time * 60 will create 25:00 minutes
			var sessionDuration = sessionTime * 60;
			// Start CountDown
			timerTrigger.start(sessionDuration);
		}
		else if(mode != ''){
			timerTrigger.start(currentTime);
		}
		else {
			timerTrigger.pause();
		}

	});

	var timerTrigger = {
		start: function(duration){
			var timer = duration, minutes, seconds;
			clearInterval(timerHandler);
			
			timerHandler = setInterval(function(){
				minutes = parseInt(timer / 60, 10);
				seconds = parseInt(timer % 60, 10);
				// if minutes is less than 10, 
				minutes = minutes < 10 ? "0" + minutes : minutes; // minutes = "0"+minutes or minutes
				// if seconds is less than 10
				seconds = seconds < 10 ? "0" + seconds : seconds; // seconds = "0"+seconds or seconds

				if(mode == 'work'){
					$("#session-name").empty().append("Work");
				}
				else if(mode == "break"){
					$("#session-name").empty().append("Break");
				}

				$('#count-down').empty().append(minutes + " : " + seconds + "");
				
				currentTime = timer;
				
				if(--timer < 0){
					timer = duration;
				}
				else if(timer == 0 && mode == "work"){
					audio.play();
					timerTrigger.break();
				}
				else if(timer == 0 && mode == "break"){
					audio.play();
					mode = "Work";
					var sessionDuration = sessionTime * 60;
					timerTrigger.start(sessionDuration);
				}
			}, 1000);
		}, 

		break: function(){
			mode = 'session'; 
			// Create this bullshit
			var breakDuration = breakTime * 60;
			// Start this bullshit
			timerTrigger.start(breakDuration);
		}, 

		pause: function(){
			clearInterval(timerHandler);
		}
	}


