var geselecteerd = [];
var gegooid = [];

$(function () {
    $("img").click(function () {

        if ($.inArray(this.id, geselecteerd) == geselecteerd.indexOf(this.id)) {
            geselecteerd = geselecteerd.splice(geselecteerd.indexOf(this.id), 1);
            $(this).css("border", "none");
        }else {
            geselecteerd.push(this.id);
            $(this).css('border', "solid 2px blue");
            alert(this.id);
        }
    });
});

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
        var random = Math.floor((Math.random() * 6) + 1);
        gegooid.push(random);
        $("#img" + i).attr('src', '../Images/' + random + '.png');
    }
}


