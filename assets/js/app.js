$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBejq_6bnzho-sxoafltRrY35LWDorvUDI",
        authDomain: "time-train-bc236.firebaseapp.com",
        databaseURL: "https://time-train-bc236.firebaseio.com",
        projectId: "time-train-bc236",
        storageBucket: "time-train-bc236.appspot.com",
        messagingSenderId: "969612648383"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();


        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainTime = moment($("#trainTimeInput").val(), "HH:mm").subtract(10, "years").format("X");
        var trainFrequency = $("#frequency-input").val().trim();


        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency
        };


        database.ref().push(newTrain);


        alert("Train successfully added");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");
    });


    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;



        var trainTimeInput = childSnapshot.val().name;
        var destinationInput = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().time;
        var frequencyInput = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % frequencyInput;
        var minutes = frequencyInput - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");


        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td><td>");
    });


}); 