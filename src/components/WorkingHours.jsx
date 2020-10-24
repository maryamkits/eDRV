import React, { Component } from 'react';

class WorkingHours extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hours: {}
        }
    }
    render(){
        return(
            <div className="hours-wrapper">
                {
                    Object.entries(this.props.hours).map(([key, value],i ) => (
                    <ul key={i} className="working-days">
                        <li className="day">{key}</li>
                        {
                            Object.entries(value).map(([key, value],i ) => (
                                <li key={i}>
                                    { Object.entries(value).map(([key, value],id ) => (
                                        <ul key={id} className="open-close">
                                            <li>{key}</li>
                                            <span className="seperator">-</span>
                                            <li>{value}</li>
                                        </ul>
                                    ))}
                                </li>
                            ))
                        }
                    </ul>
                    ))
                }
                { Object.keys(this.props.hours).length === 0  && <span className="no-data">no data</span> }
            </div>
        )
    }
}

export default WorkingHours;