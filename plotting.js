function onChartClick(event) 
{
    
}

function onChartLoad(event)
{

}

function onPointSelected()
{
    movePoint(this);
}

function movePoint(e)
{
    if(e.selected)
    {
        setInterval(movePoint(e),40);
    }
}

function onPointClicked()
{
    //this.update([0.2, 0.8]);
}  

$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'spline',
                margin: [70, 50, 60, 80],
                events: {
                	    click:onChartClick,
                        load: onChartLoad
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
                min:0,
                max:1,
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
                    allowPointSelect : true,
                    lineWidth: 1,
                    point: {
                        events: {
                           'click': onPointClicked,
                           'select': onPointSelected
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