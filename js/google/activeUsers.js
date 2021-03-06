/*!
 * Active Users 
 * History
 * 2015-Aug-10
 */

google.load('visualization', '1', {packages: ['corechart', 'bar']});

function callActiveUsers(sysHost, startDate, endDate) {

    console.log("CallActiveUser: " + sysHost + startDate + endDate);
    var jsonChartData = $.ajax
        ({url: "include/activeUsers.php",
         data: "sysHost="+sysHost + "&startDate=" + startDate + "&endDate=" +endDate,
         dataType:"json", async: false
         }).responseText;


    var count = checkJsonData(jsonChartData);

    if (count != 0) {

        document.getElementById("active_users_div").style.visibility = 'visible';

        // Create our data table out of JSON data loaded from server.
        var barChartData = new google.visualization.DataTable(
                jsonChartData);

        // Define Chart Options .
        var options = {title: 'Active Users',
            chartArea: {width: '80%', height:"70%", left: "auto" },
            legend: {position: 'top'},
            hAxis: {title: 'DateTimeRange'},
            vAxis: {title: 'Number of Users'},
            seriesType: 'bars',
            series: {2: {type: 'line'}}
        };

        // Instantiate and draw chart.
        var chart = new google.visualization.ComboChart(document.getElementById('active_users_div'));
        chart.draw(barChartData, options);
    }
    if (count == 0){
        document.getElementById("active_users_div").style.visibility = 'hidden';
    }
}

function checkJsonData (jsonTableData) {
    var o = JSON.parse(jsonTableData); 
    return (o.rows.length);
}  
