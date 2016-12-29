import React, {Component} from 'react';

import {types as AlertTypes} from './Alerts';

export default class FileDropper extends Component {

    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragEnter(e) {
        e.preventDefault();
        e.currentTarget.classList.add("is-dragover");
    }

    dragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove("is-dragover");
    }

    handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        e.currentTarget.classList.remove("is-dragover");

        this.parseFiles(e.dataTransfer.files);
    }

    handleInput(e) {
        this.parseFiles(e.target.files);
    }

    parseFiles(files) {
        const file = files[0];
        const Parser = this.props.parser;

        if (files.length > 1) {
            this.props.onAlert("Si us plau arrossegueu un sol fitxer", AlertTypes.WARNING);
            return;
        } else {
            console.info(`${file.name} (${file.type || 'n/a'}) - ${file.size} bytes`);
        }

        if (!Parser.isParseable(file.type)) {
            this.props.onAlert("Format de fitxer no reconegut", AlertTypes.DANGER);
        } else {
            this.props.onAlert("Llegint contingut del fitxer...", AlertTypes.INFO);
            Parser.parse(file, this.props.onFileRead);
        }
    }

    render() {
        return (<div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Afegiu fitxer de dades</h3>
                </div>
                <div className="panel-body text-center">
                    <div className="drop" onDragOver={this.dragOver} onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.handleDrop}>
                        <h1 className="glyphicon glyphicon-file"/>
                        <p>Arrossegueu fitxer aquí</p>
                        <label className="btn btn-warning btn-sm btn-file">o escolliu un fitxer
                            <input type="file" id="input" onChange={this.handleInput}/>
                        </label>
                    </div>
                </div>
            </div>
        </div>);
    }
}
