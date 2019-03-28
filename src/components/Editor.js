import React from "react";
import conn from "../sharedb";
import LeftPanel from "./LeftPanel";
import Workspace from "./Workspace";
import {Spinner} from "@blueprintjs/core";
import EditorStyle from "../styles/MainEditor.css";

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doc: {
                canvas: {}
            },
            isLoading: true
        };
        this.otDoc = null;
        this.handleCanvasUpdate = this.handleCanvasUpdate.bind(this);
        this.handleInitData = this.handleInitData.bind(this);
        this.handleOTUpdate = this.handleOTUpdate.bind(this);
        this.getWorkspace = this.getWorkspace.bind(this);

    }


    componentDidMount() {
        conn.debug = true;
        this.otDoc = conn.get('doc', '774ee64a-c65f-4f22-a950-f72396e963bf');
        this.otDoc.subscribe();
        this.otDoc.on('load', this.handleOTUpdate);
        this.otDoc.on('op', this.handleOTUpdate)
    }

    componentWillUnmount() {}

    handleInitData() {
        this.setState({...this.state, doc: this.otDoc.data.doc, isLoading: false});
    }

    handleOTUpdate() {
        if (this.state.isLoading === true)
            this.setState({...this.state, doc: this.otDoc.data.doc, isLoading: false});
        else
            this.setState({...this.state, doc: this.otDoc.data.doc});
    }

    handleCanvasUpdate(canvas) {
        const op = ['doc', 'canvas', [{r: {}}], [{i: canvas}]];
        this.otDoc.submitOp(op)
    }

    render() {
        return (
            <div className="editor">
                <LeftPanel/>
                {this.getWorkspace()}
            </div>
        )
    }

    getWorkspace() {
        if (this.state.isLoading) {
            return <Spinner/>
        } else {
            return <Workspace
                otDoc={this.otDoc}
                docPath={['doc', 'canvas']}
            />
        }
    }
}

export default Editor;