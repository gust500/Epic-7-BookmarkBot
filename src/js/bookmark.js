const { ipcRenderer } = require('electron');
const { json } = require('stream/consumers');
let {PythonShell} = require('python-shell');
const path = require('path');

window.$ = window.jQuery = require("jquery");
require("select2")(jQuery);

var covNeeded = 0;
var mysticNeeded = 0;
var friendNeeded = 0;
var covGot = 0;
var mysticGot = 0;
var friendGot = 0;
var goldSpent = 0;
var gemsSpent = 0;
var shopRefresh = 0;
var refreshSinceGot = 0;
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

async function getWindows() {
    $("#refreshWindows").prop("disabled", true);
    let options = {
        mode: 'json',
        pythonPath: 'py',
        scriptPath: path.join(__dirname,"python")
      };
    
    let results = await new Promise(resolve => {
        PythonShell.run('getWindows.py', options,function (err, results) {
        if (err) throw err;
        resolve(results[0])
        })
    })
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

async function start(){
    let emulWnd = $('#emulatorWindow option:selected').text();

    let getBookmarks = {'covenant': $('#covenantCheck').is(':checked'),'mystic': $('#mysticCheck').is(':checked'),'friendship': $('#friendshipCheck').is(':checked')}

    covNeeded = $('#covenantNumber').val()
    mysticNeeded = $('#mysticNumber').val()
    friendNeeded = $('#friendshipNumber').val()
    covGot = 0;
    mysticGot = 0;
    friendGot = 0;
    goldSpent = 0;
    gemsSpent = 0;
    shopRefresh = 0;
    refreshSinceGot = 0;

    $('History').empty();

    $('#MoneyStats').text("Money Spent : "+goldSpent);
    $('#GemsStats').text("Gems Spent : "+gemsSpent);
    $('#ShopStats').text("Shop Refreshes : "+shopRefresh);

    let wantBookmarks = {'covenant': covNeeded,'mystic': mysticNeeded,'friendship': friendNeeded}

    let args = {'getBookmarks':getBookmarks,'wantBookmarks':wantBookmarks}

    getBookmarks['covenant'] ? $('#CovenantStats').text("Covenant's Got : "+covGot*5+"/"+covNeeded*5) : $('#CovenantStats').text("Covenant's Got : 0/0");
    getBookmarks['mystic'] ? $('#MysticStats').text("Mystic's Got : "+mysticGot*50+"/"+mysticNeeded*50) : $('#MysticStats').text("Mystic's Got : 0/0");
    getBookmarks['friendship'] ? $('#FriendStats').text("Friendship's Got : "+friendGot+"/"+friendNeeded*5) : $('#FriendStats').text("Friendship's Got : 0/0");

    botPID = await startBot(emulWnd,JSON.stringify(args));
    ipcRenderer.send('startBot',[botPID]);
    $("#btnStart").prop("disabled", true);

    console.log('Bot Started');
}

async function startBot(window,args) {
    //Resize and Move window

  let optionsResize = {
    mode: 'text',
    pythonPath: 'py',
    scriptPath: path.join(__dirname,"python"),
    args: [window]
  };

  let result = await new Promise(resolve => {
    PythonShell.run('resizeWindow.py', optionsResize,function (err, results) {
      if (err) throw err;
      resolve()
    })
  })
  
  //Bookmark Bot
  
  let optionsBot = {
    mode: 'text',
    pythonPath: 'py',
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname,"python"),
    args: [args,path.join(__dirname,"python/")]
  };

  

  bot = PythonShell.run('bot.py', optionsBot,function (err, results) {
    if (err) throw err;
  })

  bot.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    updateStats(message)
  });

  bot.on('close',(code) => {
    ipcRenderer.send('stoppedBot');
    $("#btnStart").prop("disabled", false);
  });
  
  console.log(bot['childProcess'].pid)
  return bot['childProcess'].pid
}

function updateStats(message) {
    if(message == 'covenant'){

        covGot += 1
        goldSpent += 184000

        $('#MoneyStats').text("Money Spent : "+goldSpent)
        $('#CovenantStats').text("Covenant's Got : "+covGot*5+"/"+covNeeded*5)
        $('#History').append('&#10;Bought Covenant ( '+refreshSinceGot+' refresh/es )')

        refreshSinceGot = 0;

    }else if(message == 'mystic'){

        mysticGot += 1
        goldSpent += 280000

        $('#MoneyStats').text("Money Spent : "+goldSpent)
        $('#MysticStats').text("Mystic's Got : "+mysticGot*50+"/"+mysticNeeded*50)
        $('#History').append('&#10;Bought Mystic ( '+refreshSinceGot+' refresh/es )')

    }else if(message == 'friendship'){

        friendGot += 1
        goldSpent += 18000

        $('#MoneyStats').text("Money Spent : "+goldSpent)
        $('#FriendStats').text("Friendship's Got : "+friendGot+"/"+friendNeeded*5)
        $('#History').append('&#10;Bought Friendship ( '+refreshSinceGot+' refresh/es )')

    }else if(message == 'refresh'){

        refreshSinceGot += 1;
        gemsSpent += 3
        shopRefresh += 1

        $('#GemsStats').text("Gems Spent : "+gemsSpent)
        $('#ShopStats').text("Shop Refreshes : "+shopRefresh)

    }
}