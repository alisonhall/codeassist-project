import React, { Component } from 'react';

var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var LocationStore = require('../stores/LocationStore');

class Locations extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);

        // Getting the state out of your store is simple, every alt store has a method which returns its state. The state is copied over as a value when returned so you accidentally don’t mutate it by reference. 
        this.state = LocationStore.getState();
    }

    //But then we’ll want to listen to changes once the state in the store is updated. In your react component on `componentDidMount` you can add an event handler using `LocationStore.listen`.
    componentDidMount() {
        LocationStore.listen(this.onChange);
        console.log("HERE");
        LocationActions.fetchLocations();
    }

    // remove your event listener
    componentWillUnmount() {
        LocationStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        if (this.state.errorMessage) {
            return (
                <div>Something is wrong</div>
            );
        }

        if (!this.state.locations.length) {
            return (
                <div>
                    <img src="./../images/loading-spinner.gif" />
                </div>
            )
        }

        return (
            <ul>
                {this.state.locations.map((location, i) => {
                    return (
                        <li key={i}>{location.name}</li>
                    );
                })}
            </ul>
        );
    }
}


export default Locations;