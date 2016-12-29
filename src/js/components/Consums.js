import React, {Component} from 'react';

import moment from 'moment';

import Alerts, {types as AlertTypes} from './Alerts';
import Chart from './Chart';
import FileDropper from './FileDropper';
import CSVParser from '../parsers/CSVParser';

export default class Consums extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parser: CSVParser,
            alerts: []
        };
        this.onDataRead = this.onDataRead.bind(this);
        this.addAlert = this.addAlert.bind(this);
    }

    onDataRead(data) {
        const timeseries = data.map(row =>
            ({
                date: moment(row.date),
                value: row.value
            })
        );

        this.addAlert("Consum diari mitjà: " + this.hourlyMean(timeseries).reduce((sum, item) => sum + item, 0)/1000 + " KW·h", AlertTypes.WARNING);
        this.setState({data: timeseries});
    }

    weekends = ({date}) => date.day() == 0 || date.day() == 7;
    weekdays = ({date}) => date.day() > 0 && date.day() < 7;
    month = (month) => ({date}) => date.month() == month-1;

    hourlyMean = (data) => data.reduce((reduced, item) => {
        const ret = [...reduced];
        ret[item.date.hour()] += parseInt(item.value);
        return ret;
    }, new Array(24).fill(0)).map(item => Math.round(item/(data.length/24)));

    addAlert(message, type) {
        this.setState(prevState => {
            return {
                alerts: prevState.alerts.concat({
                    message, type
                })
            }
        });
    }

    render() {
        let charts;
        if (this.state.data) {
            let byweek = {
                "Dilluns a divendres":  this.hourlyMean(this.state.data.filter(this.weekdays)),
                "Caps de setmana": this.hourlyMean(this.state.data.filter(this.weekends))
            };
            let bymonth1 = [2,3,4,5,6].reduce((r, i) => {
                r[i] = this.hourlyMean(this.state.data.filter(this.month(i)));
                return r;
            }, {});
            let bymonth2 = [7,8,9,10,11].reduce((r, i) => {
                r[i] = this.hourlyMean(this.state.data.filter(this.month(i)));
                return r;
            }, {});
            charts = (<div>
                <div className="row">
                    <Chart data={byweek}/>
                </div>
                <div className="row">
                    <Chart data={bymonth1}/>
                </div>
                <div className="row">
                    <Chart data={bymonth2}/>
                </div>
            </div>);
        }

        return (<div>
            <div className="row document-view">
                <FileDropper name="registre de consums" parser={this.state.parser} onFileRead={this.onDataRead} onAlert={this.addAlert} />
            </div>
            <div className="row">
                <Alerts alerts={this.state.alerts}/>
            </div>
            { this.state.data && charts }
        </div>);
    }
}
