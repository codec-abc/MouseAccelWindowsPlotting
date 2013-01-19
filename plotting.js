function computeFile()
{
    alert("bouton clique");
    var toto = plot1.series[0].data[2][2];//._plotdata[0];
}

function graph() {
 
  $.jqplot.config.enablePlugins = true;
 
  s1 = [[0,0],[0.33,0.33],[0.66, 0.66],[1, 1]];
 
  plot1 = $.jqplot('chart1',[s1],{
     title: 'Highlighting, Dragging, Cursor and Trend Line',

  });
}



$(document).ready(graph);


