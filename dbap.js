//
// An attempt at recreating the Tim Place's dbap Max object
// 
var speakerArray = [];
var studio;
var sumOfSquares;
var blurSourceIndex;
var blurArray = [];
var blurAll = .001;
var a = .5; // distance attenuation in free-field

function clear()    {
    speakerArray = [];
}

// load speaker positions from .json file
function loadSpeakers()   {
    speakerArray = [];
    var d = new Dict;
	d.import_json("speakers.json");
    studio = d.get("Studio_A");
    for (i = 0; i < studio.length - 1; i++) {
        speakerArray.push(studio[i].get("position"));
    }
};

// load speaker positions from Max messages
function dst_position() {
    var a = arrayfromargs(arguments);
    var speakerNumber = a.shift();
    speakerArray[speakerNumber - 1] = a;    // array index starts at zero, i.e. speaker 1 is [0]
    blurArray[speakerNumber - 1] = .001;
}

function showSpeakerArray() {
    for (m = 0; m < speakerArray.length; m = m + 1) {
        post("speakerArray", m + 1, speakerArray[m])
        post();
    }
}

function blur() {
    blurSourceIndex = arrayfromargs(arguments)[0] - 1;
    blurArray[blurSourceIndex] = arrayfromargs(arguments)[1] * 20 + .001;  //  naïve scaling?
}

function rolloff()  {   // distance attenuation: -6dB in free-field, -3dB in closed room
    a = Math.pow(10, -(arrayfromargs(arguments)[0])/20);
}

//
// Algorithm adpated from:
// Lossius, Baltazar, de la Hogue, "DBAP - Distance-Based Amplitude Panning"
//
function src_position()  {
    var distanceArray = [];
    var k;
    var sourcePosition = arrayfromargs(arguments);
    var sourceNumber = sourcePosition.shift();

    // calculate distance from source to each speaker
    for (var i = 0; i < speakerArray.length; i = i + 1)   { 
        sumOfSquares = 0;
        for (var j = 0; j < 3; j = j + 1)  {
            sumOfSquares = sumOfSquares + Math.pow((speakerArray[i][j] - sourcePosition[j]), 2);
        };
        // to do: scale blur to room size
        distanceToSpeaker = Math.sqrt(sumOfSquares + Math.pow(blurArray[sourceNumber - 1], 2));
        distanceArray.push(distanceToSpeaker);
    };



    // calculate sum inside radix
    var bottomSum = 0;
    for (var i = 0; i < speakerArray.length; i = i + 1)   {
        bottomSum = bottomSum + (2 * a)/(Math.pow(distanceArray[i], 2)); 
;    }
   
    k = 1/Math.sqrt(bottomSum);

    // calculate amplitude at each speaker
    var speakerAmplitudeArray = [];
    for (var i = 0; i < speakerArray.length; i = i + 1)   {
        speakerAmplitudeArray[i] = k/(2 * distanceArray[i] * a) 
        outlet(0, (sourceNumber - 1), i, speakerAmplitudeArray[i] );
    };
    }    
