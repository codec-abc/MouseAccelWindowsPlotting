function test(e) 
{
    // find the clicked values and the series
    var x = e.xAxis[0].value,    
    y = e.yAxis[0].value,    
    series = this.series[0];
    // Add it
    //    series.addPoint([x, y]);
}

function test2(e)
{
  //  if (this.series.data.length > 1) this.remove();
    this.x=0.5;
    this.y=0.5;
    e.redraw();
}  

$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'scatter',
                margin: [70, 50, 60, 80],
                events: {
                	    click: test
                }
            },
            title: {
                text: 'User supplied data'
            },
            subtitle: {
                text: 'Click the plot area to add a point. Click a point to remove it.'
            },
            xAxis: {
                min:0,
                minPadding: 0.2,
                maxPadding: 0.2,
                maxZoom: 2,
                max:1
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                minPadding: 0.2,
                maxPadding: 0.2,
                maxZoom: 2,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    point: {
                        events: {
                            'click': test2(chart)
                            
                        }
                    }
                }
            },
            series: [{
                data: [[0, 0], [0.33, 0.33] , [0.66, 0.66] , [1, 1]]
            }]
        });
    });
    
});