document.addEventListener('DOMContentLoaded', fixLayout());

window.onload = function () {
    shaveDivs();
    sanitizeEmbed();
    startClock();
};

function fixLayout() {
    var panesWidth = 500,       // standard width of various panes throughout the page (in px)
        minPanesWidth = 410,    // minimum allowed width for the panes (in px)
        navbar = document.getElementsByTagName('nav')[0];

    if (navbar) {
        var pageWidth = navbar.clientWidth;
        if (pageWidth < panesWidth && pageWidth > minPanesWidth) {
            var embed = document.querySelector('embed[src*=playlistd]');
            if (embed) {
                var embedParent = embed.parentNode;
                embed.remove();
                embed.setAttribute('width', pageWidth);
                embed.setAttribute('src', embed.getAttribute('src').replace(/&w=\d+/, '&w=' + pageWidth));

                var container = document.getElementById("main-container");
                if (container) {
                    container.setAttribute('style', 'width:' + pageWidth + 'px');
                    container && (container.style.width = pageWidth);
                }

                embedParent.appendChild(embed);
            } else {
                console.log('Required <embed> element cannot be found');
            }
        }
    }
}

function shaveDivs() {
    var shaveInput = document.getElementById('to-shave');
    if (shaveInput) {
        var selectorsAndHeights = shaveInput.value.split('|');
        for (var i = 0; i < selectorsAndHeights.length; i++) {
            var selectorHeightPair = selectorsAndHeights[i].split(';');
            shave(selectorHeightPair[0], selectorHeightPair[1]);
        }
    }
}

function sanitizeEmbed() {
    var aList = document.querySelectorAll('.embedplayer a');
    for (var i = 0; i < aList.length; i++) {
        var a = aList[i];
        var playlistdIdx = a.href.indexOf('playlistd.ru');
        if (playlistdIdx > 0) {
            a.href = a.href.substring(playlistdIdx, a.href.length);
        }
    }
}

function startClock() {
    var titleEl = document.getElementById('site-name'),
        currentHour = 4,
        currentMinutes = 20;

    titleEl.innerHTML = '<span id="h">' + currentHour + '</span><span id="sc">:</span><span id="m">' + currentMinutes + '</span>';
    var titleHourEl = document.getElementById('h'),
        titleSemicolonEl = document.getElementById('sc'),
        titleMinutesEl = document.getElementById('m');

    setInterval(function () {
        var hourChanged = false,
            currentMinutesStr;

        if (currentMinutes < 59) {
            currentMinutes++;
        } else {
            currentMinutes = 0;
            currentHour = currentHour < 23 ? currentHour + 1 : 0;
            hourChanged = true;
        }
        currentMinutesStr = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;

        if (hourChanged) {
            hourChanged = false;
            titleHourEl.firstChild.nodeValue = ''+currentHour;
        }
        titleMinutesEl.firstChild.nodeValue = currentMinutesStr;

    }, 1000*60);
}
