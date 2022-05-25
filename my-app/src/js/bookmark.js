const { ipcRenderer } = require('electron');
const { json } = require('stream/consumers');
window.$ = window.jQuery = require("jquery");
require("select2")(jQuery);

var botRunning = false;

$(document).ready(function() {
    $(".select2").select2().prop("disabled", true);
    $('#covenantNumber').on('input',()=> {
        updateBookmarkNumber('covenant','Bookmarks',5);
    });
    $('#mysticNumber').on('input',()=> {
        updateBookmarkNumber('mystic','Medals',50);
    });
    $('#friendshipNumber').on('input',()=> {
        updateBookmarkNumber('friendship','Bookmarks',5);
    });
});

function getWindows() {
    $("#refreshWindows").prop("disabled", true);
    let results = new TextDecoder().decode(ipcRenderer.sendSync('getWindows'));
    results = JSON.parse(results);
    console.log(results);
    $("#emulatorWindow").empty();
    results.forEach(element => {
        $("#emulatorWindow").append("<option>"+element+"</option>")
    });
    $(".select2").select2().prop("disabled", false);
    $("#refreshWindows").prop("disabled", false);
    $("#btnStart").prop("disabled", false);
}

function updateBookmarkNumber(name,type,multiplier) {
    let covNumberVal =$('#'+name+'Number').val();
    $('#lbl'+name+'Check').text("("+covNumberVal*multiplier+" "+type+")");
}

function start(){
    let emulWnd = $('#emulatorWindow option:selected').text();

    let getBookmarks = {'covenant': $('#covenantCheck').is(':checked'),'mystic': $('#mysticCheck').is(':checked'),'friendship': $('#friendshipCheck').is(':checked')}
    let wantBookmarks = {'covenant': $('#covenantNumber').val(),'mystic': $('#mysticNumber').val(),'friendship': $('#friendshipNumber').val()}

    let args = {'getBookmarks':getBookmarks,'wantBookmarks':wantBookmarks}
    console.log(getBookmarks)

    ipcRenderer.send('startBot',[emulWnd,JSON.stringify(args)]);
    console.log('done');
}