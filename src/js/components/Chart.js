import React, {Component} from 'react';

let LineChart = require("react-chartjs").Line;

let colours = [
    { // blue
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,0.8)"
    },
    { // light grey
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,0.8)"
    },
    { // red
        fillColor: "rgba(247,70,74,0.2)",
        strokeColor: "rgba(247,70,74,1)",
        pointColor: "rgba(247,70,74,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(247,70,74,0.8)"
    },
    { // green
        fillColor: "rgba(70,191,189,0.2)",
        strokeColor: "rgba(70,191,189,1)",
        pointColor: "rgba(70,191,189,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(70,191,189,0.8)"
    },
    { // yellow
        fillColor: "rgba(253,180,92,0.2)",
        strokeColor: "rgba(253,180,92,1)",
        pointColor: "rgba(253,180,92,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(253,180,92,0.8)"
    },
    { // grey
        fillColor: "rgba(148,159,177,0.2)",
        strokeColor: "rgba(148,159,177,1)",
        pointColor: "rgba(148,159,177,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(148,159,177,0.8)"
    },
    { // dark grey
        fillColor: "rgba(77,83,96,0.2)",
        strokeColor: "rgba(77,83,96,1)",
        pointColor: "rgba(77,83,96,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(77,83,96,1)"
    }
];

export default class Chart extends Component {
    options = {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'label'
      },
      hover: {
        mode: 'dataset'
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Month'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Value'
            },
            ticks: {
              suggestedMin: -10,
              suggestedMax: 250
            }
          }
        ]
      }
    };

    render() {
        const data = {
            labels: [...Array(24).keys()].map(i => i + "h"),
            datasets: Object.keys(this.props.data).map((key, i) => (Object.assign({}, colours[i],{
                label: key,
                data: this.props.data[key]
            })))
        };

        return (<div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Consum horari mitjà (KW)</h3>
                </div>
                <div className="panel-body">
                    <LineChart data={data} options={this.options}/>
                </div>
            </div>
        </div>);
    }
}
