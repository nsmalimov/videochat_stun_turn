var userName = "";

var serverHostName = window.location.hostname;

var serverProtocolName = window.location.protocol;

var portName = window.location.port;

if (portName.length == 0) {
    portName = "80";
}
var serverPath = serverProtocolName + "//" + serverHostName + ":" + portName;

function serverConnectFunc(serverUrl, jsonData) {
    $.ajax({
        url: serverUrl + "/autorization",
        type: 'POST',
        data: jsonData,

        dataType: 'json',
        async: true,

        success: function (event) {
            //парсинг ответов сервера
            switch (event["answer"]) {
                case "ok":
                    userName = event['name'];
                    $("#NewKeyInput").val(userName);
                    $('#your_name').text(userName);

                    $('#myModal1').modal('hide');
                    $("head").append('<script type="text/javascript" src="js/video.js"></script>');
                    break;

                case "name":
                    $('#myModal1').modal('show');
                    $("#keyInputerClass1").hide();
                    $("#keyInputerClass2").hide();
                    $("#keyInputerClass3").hide();

                    //TODO rewrite
                    $("#NameInput").val("Руслан");

                    $("#registerButton").hide();

                    break;

                case "ip":
                    $('#myModal1').modal('show');

                    $("#nameButton").hide();

                    //TODO rewrite
                    $("#NameInput").val("Руслан");
                    $("#KeyInput").val("9YQH-E8CI-N2XJ-2YV");

                    break;

                case "wrong":
                    alert("Key not correct or already used");
                    break;
            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

function createJsonRegistration() {
    var json_create = new Object();
    json_create.name = $("#NameInput").val();

    json_create.keyGen = $("#KeyInput").val();
    json_create.command = "1";
    json_create.ip = "0";

    return JSON.stringify(json_create);
}

function createJsonAutorization() {

    var json_create = new Object();

    json_create.command = "0";

    var latitude_var = null;
    var longitude_var = null;

    json_create.ip = "0";

    return JSON.stringify(json_create);
}

function autorizeFunc() {
    $("#btn-chat").prop('disabled', true);

    $('#text_input').prop('disabled', true);

    $('#text_input').val("");

    var jsonData = createJsonAutorization();
    serverConnectFunc(serverPath, jsonData);
}

function sentRegistrationData() {
    var jsonData = createJsonRegistration();
    serverConnectFunc(serverPath, jsonData);
}

//TODO
//сделать прозрачным экран ожидания
function waitingWindowStart() {
    $('#demo-content').show();
    componentPropetrOff();

    $("#startButton").prop('disabled', true);
}

function waitingWindowStop() {
    $('#demo-content').hide();
    var loader = $('#element').data('introLoader');
}

function inviteFreind() {
    $('#invite_friend').modal('show');
}


function myProfile() {
    $('#my_profile').modal('show');
}

function componentPropetrOn() {
    $("#stopButton").prop('disabled', false);
    $("#newButton").prop('disabled', false);
    $("#startButton").prop('disabled', true);

    $("#btn-chat").prop('disabled', false);

    $('#text_input').prop('disabled', false);
}

function componentPropetrOff() {
    $("#stopButton").prop('disabled', true);
    $("#newButton").prop('disabled', true);
    $("#startButton").prop('disabled', false);

    $('#myModal2').modal('hide');
}

function sentName() {
    var jsonData = new Object();
    jsonData.command = 2;
    jsonData.name = $("#NameInput").val();
    jsonData.ip = "0";

    serverConnectFunc(serverPath, JSON.stringify(jsonData));
}

window.onload = function () {
    //Документ и все ресурсы загружены

    $('#myModal1').keydown(function (e) {
        if (e.keyCode == 13) {
            sentRegistrationData();
        }
    });

    $('#myModal2').keydown(function (e) {
        if (e.keyCode == 13) {
            sentRegistrationData();
        }
    });

    $('#invite_friend').keydown(function (e) {
        if (e.keyCode == 13) {
            sentRegistrationData();
        }
    });

    $('#my_profile').keydown(function (e) {
        if (e.keyCode == 13) {
            sentRegistrationData();
        }
    });

    autorizeFunc();

    componentPropetrOff();

    $('#text_input').keydown(function (e) {
        if (e.keyCode == 13) {
            sentMessages();
        }
    });

    $('#demo-content').hide();

};