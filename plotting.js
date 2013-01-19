$(document).ready(function () {
 
  $.jqplot.config.enablePlugins = true;
 
  s1 = [[0,0],[0.33,0.33],[0.66, 0.66],[1, 1]];
 
  plot1 = $.jqplot('chart1',[s1],{
     title: 'Highlighting, Dragging, Cursor and Trend Line',
     axes: {
         xaxis: {
             renderer: $.jqplot.LineRenderer,
             tickOptions: {
                 formatString: '$%.2f'
             },
             numberTicks: 4
         },
         yaxis: {
             tickOptions: {
                 formatString: '$%.2f'
             }
         }
     },
     highlighter: {
         sizeAdjust: 10,
         tooltipLocation: 'n',
         tooltipAxes: 'y',
         tooltipFormatString: '<b><i><span style="color:red;">hello</span></i></b> %.2f',
         useAxesFormatters: false
     },
     cursor: {
         show: true
     }
  });
});