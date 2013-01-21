function computeFile()
{
    if(validData())
    {
        var string = "Windows Registry Editor Version 5.00\n\n[HKEY_CURRENT_USER\\Control Panel\\Mouse]\n";
        string = string + "\"SmoothMouseXCurve\"=hex:\\\n";
        string = string +   "00,00,00,00,00,00,00,00,\\\n";
        string = string +   "00,00,01,00,00,00,00,00,\\\n";
        string = string +   "00,00,02,00,00,00,00,00,\\\n";
        string = string +   "00,00,03,00,00,00,00,00,\\\n";
        string = string +   "00,00,04,00,00,00,00,00\n";
        
        
        string = string + "\"SmoothMouseYCurve\"=hex:\\\n";
        string = string +   "00,00,00,00,00,00,00,00,\\\n";
        string = string +   "00,00,01,00,00,00,00,00,\\\n";
        string = string +   "00,00,02,00,00,00,00,00,\\\n";
        string = string +   "00,00,03,00,00,00,00,00,\\\n";
        string = string +   "00,00,04,00,00,00,00,00\n";
        
        window.open("data:text/json;charset=utf-8," + escape(string));
        
    }
    else
    {
        $('#myModal').modal('show');
    }
}

function graph() 
{
  $.jqplot.config.enablePlugins = true;
  s1 = [[0,0],[0.33,0.33],[0.66, 0.66],[1, 1]];
  plot1 = $.jqplot('chart1',[s1],{
     title: 'Move points around to draw your mouse profile',

  });
}

$(document).ready(graph);

function validData()
{
    var keep = true;
    for(var i=0; i<3 && keep; i++)
    {
        var x = plot1.series[0].data[i][0];
        var y = plot1.series[0].data[i][0];
        
        var xNext = plot1.series[0].data[i+1][0];
        var yNext = plot1.series[0].data[i+1][0];
        
        if(xNext<= x)
        {
            keep=false
        }
        if(x<0 || x>1)
        {
            keep=false
        }
        if(y<0 || y>1)
        {
            keep=false
        }
        if(xNext<0 || xNext>1)
        {
            keep=false
        }
        if(yNext<0 || yNext>1)
        {
            keep=false
        }
    }
    return keep;
}