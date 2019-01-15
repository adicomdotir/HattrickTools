var arr = [1, 1, 1, 1, 1, 1, 1];
var filter = [100, 100, 100];

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
});

window.radioClick = function(type, value) {
    if (type == 1) {
        switch (value) {
            case 1:
                filter[0] = 100;
                break;
            case 2:
                filter[0] = 111.49;
                break;
            case 3:
                filter[0] = 83.945;
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

    // Average Rating
    $('#ave_def').html('Ave Defence: ' + Math.round(def / 3));
    $('#ave_mid').html('Ave Midfield: ' + Math.round(mid / 3));
    $('#ave_att').html('Ave Attack: ' + Math.round(att / 3));
    $('#ave_total').html('Ave Total: ' + Math.round((def / 3 + mid / 3 + att / 3) / 3));
}

var skillIran = [
    'کهکشانی ',
    'آرمانی ',
    'جادویی ',
    'افسانه ای ',
    'خارق العاده ',
    'استثنایی ',
    'فوق العاده ',
    'بین المللی ',
    'باشکوه ',
    'درخشان ',
    'برجسته ',
    'توانمند ',
    'عالی ',
    'خوب ',
    'قابل قبول ',
    'ناکافى ',
    'ضعیف ',
    'ناچیز ',
    'اسفبار ',
    'افتضاح ',
    'بدون مهارت '
];

var skillEng = [
    'divine very high',
    'divine high',
    'divine low',
    'divine very low',
    'utopian very high',
    'utopian high',
    'utopian low',
    'utopian very low',
    'magical very high',
    'magical high',
    'magical low',
    'magical very low',
    'mythical very high',
    'mythical high',
    'mythical low',
    'mythical very low',
    'extra-terrestrial very high',
    'extra-terrestrial high',
    'extra-terrestrial low',
    'extra-terrestrial very low',
    'titanic very high',
    'titanic high',
    'titanic low',
    'titanic very low',
    'supernatural very high',
    'supernatural high',
    'supernatural low',
    'supernatural very low',
    'worldclass very high',
    'worldclass high',
    'worldclass low',
    'worldclass very low',
    'magnificent very high',
    'magnificent high',
    'magnificent low',
    'magnificent very low',
    'brilliant very high',
    'brilliant high',
    'brilliant low',
    'brilliant very low',
    'outstanding very high',
    'outstanding high',
    'outstanding low',
    'outstanding very low',
    'formidable very high',
    'formidable high',
    'formidable low',
    'formidable very low',
    'excellent very high',
    'excellent high',
    'excellent low',
    'excellent very low',
    'solid very high',
    'solid high',
    'solid low',
    'solid very low',
    'passable very high',
    'passable high',
    'passable low',
    'passable very low',
    'inadequate very high',
    'inadequate high',
    'inadequate low',
    'inadequate very low',
    'weak very high',
    'weak high',
    'weak low',
    'weak very low',
    'poor very high',
    'poor high',
    'poor low',
    'poor very low',
    'wretched very high',
    'wretched high',
    'wretched low',
    'wretched very low',
    'disastrous very high',
    'disastrous high',
    'disastrous low',
    'disastrous very low'
];

var skillNumber = [
    20.75, 20.5, 20.25, 20,
    19.75, 19.5, 19.25, 19,
    18.75, 18.5, 18.25, 18,
    17.75, 17.5, 17.25, 17,
    16.75, 16.5, 16.25, 16,
    15.75, 15.5, 15.25, 15,
    14.75, 14.5, 14.25, 14,
    13.75, 13.5, 13.25, 13,
    12.75, 12.5, 12.25, 12,
    11.75, 11.5, 11.25, 11,
    10.75, 10.5, 10.25, 10,
    9.75, 9.5, 9.25, 9,
    8.75, 8.5, 8.25, 8,
    7.75, 7.5, 7.25, 7,
    6.75, 6.5, 6.25, 6,
    5.75, 5.5, 5.25, 5,
    4.75, 4.5, 4.25, 4,
    3.75, 3.5, 3.25, 3,
    2.75, 2.5, 2.25, 2,
    1.75, 1.5, 1.25, 1

];
