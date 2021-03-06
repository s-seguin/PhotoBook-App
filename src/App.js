import React, {Component} from 'react';
import Header from './components/Header';

import './App.css';
import Editor from "./components/Editor";
import {DragDropContextProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import CreateBook from "./components/CreateBook";


//return created components for the home menu
    function App() {
        return (
            <Router>
                <div className="App">
                    <DragDropContextProvider backend={HTML5Backend}>
                        <Route path="/book" component={Book} />
                        <Route exact path="/create" component={CreateBook}/>
                        <Route exact path="/" component={Home}/>
                    </DragDropContextProvider>
                </div>
            </Router>
        );
    }
//function to send user to book selected
    function Book({match}) {
        return (
            <Route path={`${match.path}/:id`} component={BookId} />
        )
    }

    function BookId({match}) {
        return(
            <div>
                <Header/>
                <Editor id={match.params.id}/>
            </div>

        );
    }

    function Home() {
        return (
            <Homepage/>
        )
    }

export default App;
