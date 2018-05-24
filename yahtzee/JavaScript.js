var start = false;
var beurtAfgerond = false;
var geselecteerd = [];
var gegooid = [];
var worpen = 0;
var beurt = 1;

$(function () {
    $("img").click(function () {

        if (start) {
            if ($.inArray(this.id, geselecteerd) != -1) {
                $(this).css('border', "none");
                geselecteerd.splice($.inArray(this.id, geselecteerd), 1);
            } else {
                geselecteerd.push(this.id);
                $(this).css('border', "solid 2px blue");
            }
        }
    });
});

$(function () {
    $("input").click(function () {
        if (start) {

            var clickID = this.id;
            $('#scoreTable tbody tr').each(function () {
                $(this).find('td input').each(function () {
                    // Heeft de speler op een input geklikt in de score tabel?

                    if (this.id.toString() == clickID.toString()) {
                        // Heeft de speler op zijn eigen score colom geklikt?
                        if (this.id.toString().split("-").pop() == "sp" + beurt) {
                            $(this).attr('disabled', 'disabled');
                            $(this).css({ "color": "red" });
                            veranderBeurt();
                        }
                    }
                });
            });
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
    $('#scoreTable tbody tr').each(function () {
        $(this).find('td input').each(function () {

            if (!$(this).prop('disabled')) {
                switch (this.id.toString()) {
                    case "one-sp" + beurt:
                        $(this).val(ones);
                        break;
                    case "two-sp" + beurt:
                        $(this).val(twos);
                        break;
                    case "three-sp" + beurt:
                        $(this).val(threes);
                        break;
                    case "four-sp" + beurt:
                        $(this).val(fours);
                        break;
                    case "five-sp" + beurt:
                        $(this).val(fives);
                        break;
                    case "six-sp" + beurt:
                        $(this).val(sixes);
                        break;
                }
            }
        });
    });
}

function resetWaardes() {
    $('#scoreTable tbody tr').each(function () {
        $(this).find('td input').each(function () {
            if (!$(this).prop('disabled')) {
                $(this).val("");
            }
        });
    });
}
