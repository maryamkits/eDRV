import React, { Component } from 'react';
import EditHours from './EditHours';

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = { newHour: {}, newHours: [] }
    }
    // edit callback after input change
    childCallback = ( day, index, openKey, value ) => {
        // this.setState({ newHour: {day, index, openKey, value} })
        if (!this.state.newHours.find(item => item.day === day && item.index === index && Object.keys(item)[2] === openKey)){
            this.setState({ newHours: this.state.newHours.concat({day, index, openKey, value})})
        }
    }
    saveClickedCallBack = () => {
        if(this.state.newHours.length) {
            this.props.saveClicked(this.state.newHours);
        }
    }
    cancelCallBack = () => {
        this.props.cancelClicked();
    }
    render(){
        return(
            <div className="popup-wrapper">
                <div className="popup">
                    <EditHours hours={ this.props.item } 
                                handleNewHours={ this.childCallback }
                    />
                    <div className="buttons-wrapper">
                        <button className="cancel-button button"
                                onClick={ this.cancelCallBack }
                        >
                            Cancel
                        </button> 
                        <button className="save-button button" 
                                onClick={ this.saveClickedCallBack }
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup;