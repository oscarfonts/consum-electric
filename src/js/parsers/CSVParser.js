import Parser from 'comma-separated-values';

import TextFileParser from './TextFileParser'

export default class CSVParser extends TextFileParser {
    static supportedMimeTypes = [
        "text/csv"
    ];

    static parse(file, callback, skipRows = 0, encoding = 'UTF-8') {
        super.parse(file, string => callback(this.parseCSV(string, skipRows)), encoding);
    }

    static parseCSV(string, skipRows) {
        return this.indexByColumnName(this.asArray(string, skipRows));
    }

    static asArray(string, skipRows) {
        const t0 = performance.now();
        const array = new Parser(string, {cast: false}).parse();
        const t1 = performance.now();
        console.info("CSV Parsed in " + (t1 - t0) + " milliseconds.");
        return this.trimEmptyRows(array.slice(skipRows));
    }

    static trimEmptyRows = data => data.reduce((out, row) => row.every(cell => cell == "") ? out : [ ...out, row ], []);

    static indexByColumnName(data) {
        let headers = data.slice(0,1)[0];
        let values = data.slice(1);

        return values.map(row => row.reduce((obj, value, index) => {
            obj[headers[index]] = value;
            return obj;
        }, {}));
    }
}
