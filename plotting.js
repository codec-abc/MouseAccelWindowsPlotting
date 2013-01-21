function computeFile()
{
    if(validData())
    {
        var xScale = $("#slider").slider("value");
        var yScale = $("#slider2").slider("value");
        var string = "Windows Registry Editor Version 5.00\n\n[HKEY_CURRENT_USER\\Control Panel\\Mouse]\n";
        string = string + "\"SmoothMouseXCurve\"=hex:\\\n";
        string = string + "00,00,00,00,00,00,00,00,\\\n";
        for(var i=0; i<4; i++)
        {
            var graphValue = plot1.series[0].data[i][0]*xScale;
            var values = transformNumberTo16_16hexa(graphValue);
            var output = transform16_16hexaToWindowsRegristryNotation(values[0],values[1]);
            string = string + output;
            string = string + ",\\\n";
        }
        string = string.substring(0,string.length-3);
        string = string + "\n\n";
        string = string + "\"SmoothMouseYCurve\"=hex:\\\n";
        string = string + "00,00,00,00,00,00,00,00,\\\n";
        for(var i=0; i<4; i++)
        {
            var graphValue = plot1.series[0].data[i][1]*yScale;
            var values = transformNumberTo16_16hexa(graphValue);
            var output = transform16_16hexaToWindowsRegristryNotation(values[0],values[1]);
            string = string + output;
            string = string + ",\\\n";
        }
        string = string.substring(0,string.length-3);
        string = string + "\n\n";

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
      axesDefaults: {
        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
        tickOptions: {
            fontFamily: 'Georgia, Serif',
            fontSize: '12pt'
        }
      },
      title: 'Move points around to draw your mouse profile',
      axes:{
          xaxis:{
          label:'Mouse Velocity',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
          labelOptions: {
            fontFamily: 'Georgia, Serif',
            fontSize: '12pt'
          },
          numberTicks : 5,
          ticks : [0,0.25,0.5,0.75,1.25]
        },
        yaxis:{
          label:'Pointer Velocity',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
          labelOptions: {
            fontFamily: 'Georgia, Serif',
            fontSize: '12pt'
          },
          numberTicks : 5,
          ticks : [0,0.25,0.5,0.75,1.25]
        }
      }

  });
  $( "#slider" ).slider({ max: 65535 },{ min: 1 });
  $( "#slider2" ).slider({ max: 65535 },{ min: 1 });

}

$(document).ready(graph);

function validData()
{
    var keep = true;
    for(var i=0; i<3 && keep; i++)
    {
        var x = plot1.series[0].data[i][0];
        var y = plot1.series[0].data[i][1];
        
        var xNext = plot1.series[0].data[i+1][0];
        var yNext = plot1.series[0].data[i+1][1];
        
        if(xNext<= x)
        {
            keep=false;
        }
        if(x<0 || x>1)
        {
            keep=false;
        }
        if(y<0 || y>1)
        {
            keep=false;
        }
        if(xNext<0 || xNext>1)
        {
            keep=false;
        }
        if(yNext<0 || yNext>1)
        {
            keep=false;
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
    
    hexStringDecimalPart = hexStringDecimalPart.toUpperCase();
    hexStringWholePart = hexStringWholePart.toUpperCase();
    return [hexStringWholePart, hexStringDecimalPart]; 
}

function transform16_16hexaToWindowsRegristryNotation(wholePartIn,decimalPartIn)
{
    var string ="";
    
    for (var i=0;i<2;i++)
    {
        string = wholePartIn.substring(i*2,i*2+2) + string;
        string = "," + string;
    }
    
    for (var i=0;i<2;i++)
    {
        string = decimalPartIn.substring(i*2,i*2+2) + string;
        string = "," + string;
    }
    
    string = string.substring(1,string.length);
    string = string + ",00,00,00,00";
    return string;
}