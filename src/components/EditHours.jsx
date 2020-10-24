import React, { Component } from 'react';

class EditHours extends Component {
    constructor(props) {
        super(props)
        this.state = { 
                newHours: this.props.hours, 
                showAdd: false, 
                id: 1,
                day: 'Monday',
                inputList: [{open:'', close:''}],
                data: []
            }
    }

    // edit hours after input change
    handleChange(e, day, index, id, openKey) {
        let value = e.target.value
        this.props.handleNewHours( day, index, openKey, value )
      }
      // add new hours
      addHours() {
        this.setState({ inputList: this.state.inputList.concat({open:'', close:''}) })
      }
      removehours(id) {
        let array = this.state.inputList
        array.splice(id, 1)
        this.setState({ inputList: array })
      }
    render(){
        return(
            <div className="edit-hours-wrapper">
                {
                    Object.entries(this.props.hours).map(([day, hoursArr], index ) => (
                    <ul key={index} className="working-days">
                        <li className="day">{day}</li>
                        <div className="please">
                        {
                            Object.entries(hoursArr).map(([key, openingHours], i ) => (
                                <ul key={i} className="edit-open-close-wrapper">
                                    { Object.entries(openingHours).map(([openKey, hour], id ) => (
                                        <li key={id} className="edit-open-close">
                                            <div className="edit-input">
                                                <input type="text" defaultValue={ hour } 
                                                onBlur={(e) => this.handleChange(e, day, i, id, openKey)}
                                                />
                                                {this.state.text}
                                            </div>
                                            { key === 'open' && <span>-</span>}
                                        </li>
                                    ))}
                                </ul>
                            ))
                        }
                        </div>
                    </ul>
                    ))
                }
                {
                    Object.keys(this.props.hours).length === 0  && 
                    <div>
                        <div className="select-day">
                            <span>
                                Select days and time
                            </span>
                        </div>
                    <div className="add-hours-wrapper">
                        <div className="add-days-wrapper">
                            <div className={`add-day ${this.state.id === 1 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 1, day: 'Monday' })}
                            >
                                <span>M</span>
                            </div>
                            <div className={`add-day ${this.state.id === 2 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 2, day: 'Tuesday' })}
                            >
                                <span>T</span>
                            </div>
                            <div className={`add-day ${this.state.id === 3 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 3, day: 'Wednesday' })}
                            >
                                <span>W</span>
                            </div>
                            <div className={`add-day ${this.state.id === 4 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 4, day: 'Thursday' })}
                            >
                                <span>T</span>
                            </div>
                            <div className={`add-day ${this.state.id === 5 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 5, day: 'Friday' })}
                            >
                                <span>F</span>
                            </div>
                            <div className={`add-day ${this.state.id === 6 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 6, day: 'Saturday' })}
                            >
                                <span>S</span>
                            </div>
                            <div className={`add-day ${this.state.id === 0 ? 'active' : ''}`} 
                                onClick={() => this.setState({ id : 0, day: 'Sunday'})}
                            >
                                <span>S</span>
                            </div>
                        </div>
                        <div className="add-inputs-wrapper">
                        {
                            this.state.inputList.map( (items, id) => (
                                    <ul key={ id } className="open-close">
                                        <div className="edit-input">
                                            <input type="text" defaultValue="08:00"
                                             onChange={(e) => this.handleChange(e, this.state.day, id, 0, 'open')}
                                             />
                                        </div>
                                        <span>-</span>
                                        <div className="edit-input">
                                            <input type="text"  defaultValue="24:00" 
                                             onChange={(e) => this.handleChange(e, this.state.day, id, 1, 'close')}
                                            />
                                        </div>
                                        <div className="clear" onClick={ () => this.removehours(id) }>
                                            <span>&#10005;</span>
                                        </div>
                                    </ul>
                            ))
                        }
                        </div>
                        <span className="add-hours" 
                            onClick={() => this.addHours()}>
                            Add Hours
                        </span>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default EditHours;