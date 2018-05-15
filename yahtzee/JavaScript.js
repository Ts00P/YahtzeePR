function startSpel() {
    var input1 = $("#usr1").val();
    var input2 = $("#usr2").val();

    $("#uitvoerNaam1").text(input1);
    $("#uitvoerNaam2").text(input2);

    
    $("#btn_Start").attr('value', (input1 + ' moet gooien'));

    $("#btn_Start").attr('value', (input2 + ' moet gooien'));
    dobbel();
}

function dobbel() {
    for (var i = 1; i < 7; i++) {
        var random = Math.floor((Math.random() * 5) + 1);
        $("#img" + i).attr('src', '../Images/' + random + '.png');
    }
}