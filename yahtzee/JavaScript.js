var start = false;
var beurtAfgerond = false;
var geselecteerd = [];
var gegooid = [];
var worpen = 0;
var beurt = 1;

$(function () {
    $("img").click(function () {

        if (start != true) {
            return;
        }

        if ($.inArray(this.id, geselecteerd) != -1) {
            $(this).css('border', "none");
            geselecteerd.splice($.inArray(this.id, geselecteerd), 1);
        } else {
            geselecteerd.push(this.id);
            $(this).css('border', "solid 2px blue");
        }
    });
});

$(function () {
    $("input").click(function () {
        if (start) {
            if (zoekID(this.id) == true) {
                $(this).attr('disabled', 'disabled');
                $(this).css({ "color": "white" });
                veranderBeurt();
            }
        }
    });
});

function startSpel() {

    if (start == false) {
        var input1 = $("#usr1").val();
        var input2 = $("#usr2").val();

        $("#uitvoerNaam1").text(input1);
        $("#uitvoerNaam2").text(input2);

        veranderBeurt();
        start = true;
    } else {
        dobbel();
    }
}




function dobbel() {
    updateWorpen();

    for (var i = 1; i < 6; i++) {
        var random = Math.floor((Math.random() * 6) + 1);

        if ($.inArray("img" + i, geselecteerd) == -1) {
            gegooid[i - 1] = random;
            $("#img" + i).attr('src', '../Images/' + random + '.png');
        }
    }
    berekenSimpeleWaardes();

    if (worpen >= 3) {
        if (beurtAfgerond == false) {
            $("#btn_Start").attr('disabled', 'disabled');
        }
    }

}

function updateWorpen() {
    worpen++;
    $("#beurten").text($("#usr" + beurt).val() + " heeft " + (3 - worpen) + " over");
}

function veranderBeurt() {
    resetWaardes();
    beurt++;
    $("#btn_Start").removeAttr('disabled');
    worpen = 0;

    if (beurt > 2) {
        beurt = 1;
    }

    $("#btn_Start").attr('value', ($("#usr" + beurt).val() + ' moet gooien'));
}

function berekenSimpeleWaardes() {
    var ones = 0;
    var twos = 0;
    var threes = 0;
    var fours = 0;
    var fives = 0;
    var sixes = 0;

    for (var i = 0; i < gegooid.length; i++) {
        var gooiWaarde = gegooid[i];

        switch (gooiWaarde) {
            case 1:
                ones++;
                break;
            case 2:
                twos += 2;
                break;
            case 3:
                threes += 3;
                break;
            case 4:
                fours += 4;
                break;
            case 5:
                fives += 5;
                break;
            case 6:
                sixes += 6;
                break;
        }
    }
    zetSimpeleWaardes(ones, twos, threes, fours, fives, sixes);
}

function zetSimpeleWaardes(ones, twos, threes, fours, fives, sixes) {
    $("#one-sp" + beurt).val(ones);
    $("#two-sp" + beurt).val(twos);
    $("#three-sp" + beurt).val(threes);
    $("#four-sp" + beurt).val(fours);
    $("#five-sp" + beurt).val(fives);
    $("#six-sp" + beurt).val(sixes);
}

function resetWaardes() {

    $("#one-sp" + beurt).val("");
    $("#two-sp" + beurt).val("");
    $("#three-sp" + beurt).val("");
    $("#four-sp" + beurt).val("");
    $("#five-sp" + beurt).val("");
    $("#six-sp" + beurt).val("");
}

function zoekID(theid) {
    switch (theid) {
        case "one-sp" + beurt:
            return true;
            break;
        case "two-sp" + beurt:
            return true;
            break;
        case "three-sp" + beurt:
            return true;
            break
        default:
            return false;
    }
}
