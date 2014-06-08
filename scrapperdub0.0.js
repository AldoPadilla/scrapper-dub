// Working file for multiple Weeks... //

var fs = require('fs');
var request = require ('request'),
    cheerio = require('cheerio'),
    chart = [];    

weeks = {
"8-Feb-14":41679,
"1-Feb-14":41672,
"25-Jan-14":41665,
"18-Jan-14":41658,
"11-Jan-14":41651,
"4-Jan-14":41644,
"28-Dec-13":41637,
"21-Dec-13":41630,
"14-Dec-13":41623,
"7-Dec-13":41616,
"30-Nov-13":41609,
"23-Nov-13":41602,
"16-Nov-13":41595,
"9-Nov-13":41588,
"2-Nov-13":41581,
"26-Oct-13":41574
};



for (week in weeks) {
    var url = 'http://www.vgchartz.com/weekly/' + weeks[week];

request(url, (function(week) { return function(err, resp, body){
    if(!err && resp.statusCode == 200){
        $ = cheerio.load(body);
        $('table.chart tr', '#chart_body').each(function(){
              var rank = $(this).text().trim().replace(/\s\s+/g, ';').replace("Shooter","; Shooter").replace("Sports","; Sports").replace("Action","; Action").replace("Role-Playing","; Role-Playing").replace("Racing","; Racing").replace("Platform","; Platform").replace("Misc","; Misc").replace("Adventure","; Adventure").replace("Simulation","; Simulation").replace("Puzzle","; Puzzle").replace("Strategy","; Strategy").replace("Fighting","; Fighting").replace("(DS)",";DS;").replace("(3DS)",";3DS;").replace("(PS3)",";PS3;").replace("(PS4)",";PS4;").replace("(PSP)",";PSP;").replace("(PSV)",";PSV;").replace("(Wii)",";Wii;").replace("(WiiU)",";WiiU;").replace("(X360)",";X360;").replace("(XOne)",";XOne;").replace("(PC)",";PC;");
                          chart.push(week + ';' +rank);

        fs.writeFile('output.txt', JSON.stringify(chart, null, 4), function(){

        console.log(chart);

        });


        });
    }
};
})(week));


}


//remove parentheses with: .replace(/\(|\)/g, '; ')