import React from "react";
import POCCanvas from "../poc/POCCanvas";
import io from "socket.io-client";
import {OTControllerClient} from "../ot/ot_controller_client";

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doc: {
                canvas: {
                    test1: ""
                }
            }
        };

        this.handleCanvasUpdate = this.handleCanvasUpdate.bind(this);
    }


    componentDidMount() {
        // this.setupSocket();
        // this.setupOC();
    }

    componentWillUnmount() {
        console.log('disconnecting')
    }

    setupSocket() {
        this.socket = io(process.env.REACT_APP_DATA_SERVICE);
        this.socket.on('connect', () => console.log("connected"));
        this.socket.on('disconnect', () => console.log("disconnected"));
        this.socket.on('connect_error', () => alert("Could Not Connect To Server"));
        this.socket.on('connect_timeout', () => alert("Could Not Connect To Server"));
    }

    setupOC() {
        this.ot = new OTControllerClient();
        this.ot.setSend((data) => this.socket.emit('edit', data));
        this.socket.on('edit', this.ot.receive)
    }

    handleCanvasUpdate(canvas) {
        const doc = {...this.state.doc, canvas: canvas};
        this.setState({...this.state, doc: doc});
    }

    render() {
        return (
            <div className="editor">
                <POCCanvas data={this.state.doc.canvas} onChange={this.handleCanvasUpdate}/>
            </div>
        )
    }
}

export default Editor;