var arr = [1, 1, 1, 1, 1, 1, 1];
var filter = [100, 100, 100];
var spiritItems = [
    [100, 100, 72, 86, 93, 100, 107, 114, 121, 128, 135, 142], // normal
    [100, 100, 81, 97, 105, 113, 122, 130, 138, 146, 154, 162], // mots
    [100, 100, 63, 75, 81, 87, 92, 98, 104, 110, 116, 122] //
];
var teamSpirit = 2;
var teamSpiritNew = 2;
var negaresh = 1;

$(document).ready(function() {
    for (var i = skillEng.length - 1; i >= 0; i--) {
        $('#ldSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
        $('#cdSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
        $('#rdSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
        $('#mSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
        $('#laSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
        $('#caSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
        $('#raSelect').append('<option value=' + skillNumber[i] + '>' + skillEng[i] + '</option>');
    }
    for (var i = 2; i < teamSpirits.length; i++) {
        $('#teamSpirit').append('<option value=' + i + '>' + teamSpirits[i] + '</option>');
        $('#teamSpiritNew').append('<option value=' + i + '>' + teamSpirits[i] + '</option>');
    }
});

window.radioClick = function(type, value) {
    if (type == 1) {
        switch (value) {
            case 1:
                changeNegaresh(1);
                break;
            case 2:
                changeNegaresh(2);
                break;
            case 3:
                changeNegaresh(3);
                break;
        }
    } else if (type == 2) {
        switch (value) {
            case 1:
                filter[1] = 100;
                break;
            case 2:
                filter[1] = 119.892;
                break;
            case 3:
                filter[1] = 111.493;
                break;
        }
    } else if (type == 3) {
        switch (value) {
            case 1:
                filter[2] = 100;
                break;
            case 2:
                filter[2] = 93;
                break;
        }
    }
    calculateRating();
}

changeNegaresh = function(value) {
    negaresh = value;    
    let temp = spiritItems[value - 1][teamSpiritNew] - spiritItems[0][teamSpirit];    
    filter[0] = 100 + temp;
}

window.inputChange = function (pos, value) {
    if (value < 0 || value > 20) value = 0;
    var intValue = Math.floor(value);
    var floatValue = value - intValue;
    floatValue = floatValue * 4;
    intValue = intValue * 4 - 3 + floatValue
    switch (pos) {
        case 'LD':
            arr[0] = intValue;
            $('#ldInput').val(value);
            $('#ldSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
        case 'CD':
            arr[1] = intValue;
            $('#cdInput').val(value);
            $('#cdSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
        case 'RD':
            arr[2] = intValue;
            $('#rdInput').val(value);
            $('#rdSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
        case 'M':
            arr[3] = intValue;
            $('#mInput').val(value);
            $('#mSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
        case 'LA':
            arr[4] = intValue;
            $('#laInput').val(value);
            $('#laSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
        case 'CA':
            arr[5] = intValue;
            $('#caInput').val(value);
            $('#caSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
        case 'RA':
            arr[6] = intValue;
            $('#raInput').val(value);
            $('#raSelect option[value="' + value + '"]').attr("selected", "selected");
            break;
    }
    $('#ld').html('[' + arr[0] + ']');
    $('#cd').html('[' + arr[1] + ']');
    $('#rd').html('[' + arr[2] + ']');
    $('#m').html('[' + arr[3] + ']');
    $('#la').html('[' + arr[4] + ']');
    $('#ca').html('[' + arr[5] + ']');
    $('#ra').html('[' + arr[6] + ']');

    calculateRating();
}

window.calculateRating = function () {
    // Rating
    var def = (arr[0] + arr[1] + arr[2]);
    $('#def').html('Defence: ' + def);
    var mid = (arr[3] * 3);
    var midDefualt = mid;
    mid = mid * filter[0] / 100;
    mid = mid * filter[1] / 100;
    mid = mid * filter[2] / 100;
    mid = Math.floor(mid);
    midDefualt -= mid;
    midDefualt *= -1;
    var myClass = 'black';
    if (midDefualt > 0) myClass = 'green';
    if (midDefualt < 0) myClass = 'red';
    $('#mid').html('Midfield: ' + mid + ' <b class="' + myClass +'">[' + midDefualt + ']</b>');
    var att = (arr[4] + arr[5] + arr[6]);
    $('#att').html('Attack: ' + att);
    $('#total_rating').html('Total: ' + (def + mid + att));

    var arr3 = Math.round(mid / 3);
    var newArr3 = Math.floor((arr3 + 3) / 4);
    var floatArr3 = ((arr3 + 3) / 4) - newArr3;
    $('#m').text('[' + arr[3] + '] => [' + (arr3) + ']');
    var color = 'black';
    if (arr[3] < arr3) color = 'green';
    if (arr[3] > arr3) color = 'red';
    $('#mDiff').val(newArr3 + floatArr3);
    $('#mDiff').css('color', color);

    // Average Rating
    $('#ave_def').html('Ave Defence: ' + Math.round(def / 3));
    $('#ave_mid').html('Ave Midfield: ' + Math.round(mid / 3));
    $('#ave_att').html('Ave Attack: ' + Math.round(att / 3));
    $('#ave_total').html('Ave Total: ' + Math.round((def / 3 + mid / 3 + att / 3) / 3));
}

window.spiritChange = function(value) {
    teamSpirit = value;
    changeNegaresh(negaresh);
    calculateRating();
}

window.spiritChangeNew = function(value) {
    teamSpiritNew = value;
    changeNegaresh(negaresh);
    calculateRating();
}