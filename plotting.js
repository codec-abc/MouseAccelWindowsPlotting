function computeFile()
{
    if(validData())
    {
        $('#myModal').modal('show');
    }
    else
    {
       // alert("Points positions are not valid");
        $('#myModal').modal('show');
    }
}

function graph() 
{
  $.jqplot.config.enablePlugins = true;
  s1 = [[0,0],[0.33,0.33],[0.66, 0.66],[1, 1]];
  plot1 = $.jqplot('chart1',[s1],{
     title: 'Highlighting, Dragging, Cursor and Trend Line',

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