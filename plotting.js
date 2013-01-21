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
        
        window.open("data:text/octet-stream;charset=utf-8," + escape(string));

        
    }
    else
    {
        $('#myModal').modal('show');
    }
}

function graph() 
{
  $.jqplot.config.enablePlugins = true;
  s1 = [[0.25,0.25],[0.5,0.5],[0.75, 0.75],[1, 1]];
  plot1 = $.jqplot('chart1',[s1],{
     title: 'Move points around to draw your mouse profile',

  });
}

$(document).ready(graph);

function validData()
{
    var keep = true;
    for(var i=0; i<4 && keep; i++)
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

function transformNumberTo16_16hexa(decimalNumberIn)
{
  //  var maxValue = 65536.9999847412109375;
    var currentValue = decimalNumberIn;
    var wholePart = Math.floor(currentValue);
    var decimalPart = (currentValue - wholePart);
    decimalPart= Math.floor(decimalPart/0.0000152587890625);
    var hexStringWholePart = wholePart.toString(16);
    var hexStringDecimalPart = decimalPart.toString(16);
    while(hexStringWholePart.length<4)
    {
        hexStringWholePart = "0"+hexStringWholePart;
    }
    while(hexStringDecimalPart.length<4)
    {
        hexStringDecimalPart = "0"+hexStringDecimalPart;
    }
    hexStringDecimalPart.toUpperCase();
    hexStringWholePart.toUpperCase();
}

function transform16_16hexaToWindowsRegristryNotation(wholePartIn,decimalPartIn)
{
    
}