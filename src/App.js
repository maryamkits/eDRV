import React, { Component } from 'react';
import WorkingHours from './components/WorkingHours'
import Popup from './components/Popup'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
      show: false,
      hours: {},
      newHours: {},
      locations: [
        { id: 1, address: 'Rustaveli', city: 'Tbilisi', stations: 1, 
          workingHours: {
            "0": [
              {
                  "open": "09:00",
                  "close": "12:00"
              },
              {
                  "open": "18:00",
                  "close": "21:00"
              }
          ],
          "1": [
              {
                  "open": "09:00",
                  "close": "18:00"
              }
          ],
          "2": [
              {
                  "open": "09:00",
                  "close": "18:00"
              }
          ],
          "3": [
              {
                  "open": "09:00",
                  "close": "18:00"
              }
          ],
          "4": [
              {
                  "open": "09:00",
                  "close": "18:00"
              }
          ],
        } 
      },
        { id: 2, address: 'Chavchavadze', city: 'Batumi', stations: 3,  
          workingHours: {} 
        },
        { id: 3, address: 'Kazbegi', city: 'Tbilisi', stations: 2, 
          workingHours: {
            "1": [
              {
                  "open": "09:00",
                  "close": "18:00"
              }
          ],
            "5": [
              {
                  "open": "09:00",
                  "close": "17:00"
              }
          ],
          } 
        },
        { id: 4, address: 'Vaja', city: 'Tbilisi', stations: 2, 
          workingHours: {
            "6": [
              {
                  "open": "09:00",
                  "close": "12:00"
              },
              {
                  "open": "18:00",
                  "close": "21:00"
              }
          ]
          } },
        { id: 5, address: 'Rustaveli', city: 'Rustavi', stations: 1, workingHours: {} },
        { id: 6, address: 'Paliashvili', city: 'Kutaisi', stations: 2, workingHours: {} }
      ]
    };
  }
  setData(item){
    if(this.state.show !== item.id) {
      this.setState({show: item.id})
      this.newJson(item.workingHours)
    } else this.setState({show: false})
  };
  openPopup(item) {
    this.setState({openPopup: item})
    this.setData(item)
  };
  newJson(hours) {
    let newHours = hours
    for (const key in newHours) {
        if (key === '0') {
            newHours["Sunday"] = newHours[key];
            delete newHours[key];
        } else if (key === '1'){
            newHours["Monday"] = newHours[key];
            delete newHours[key];
        } else if (key === '2'){
            newHours["Tuesday"] = newHours[key];
            delete newHours[key];
        } else if (key === '3'){
            newHours["Wednesday"] = newHours[key];
            delete newHours[key];
        } else if (key === '4'){
            newHours["Thursday"] = newHours[key];
            delete newHours[key];
        } else if (key === '5'){
            newHours["Friday"] = newHours[key];
            delete newHours[key];
        } else if (key === '6'){
            newHours["Saturday"] = newHours[key];
            delete newHours[key];
        } 
    }
    this.setState({hours: newHours})
}

// update data on save
saveClicked( item ) {
  let id = this.state.openPopup.id
  let stateCopy = Object.assign({}, this.state);
  let workingHours = stateCopy.locations[id-1].workingHours

  item.forEach(el => {
    let day = el.day
    let index = el.index
    let openKey = el.openKey
    let value = el.value
    if(Object.keys(workingHours).length === 0) {
  } else {
    workingHours[day][index][openKey] = value
  }
  });

  this.setState( stateCopy )
  this.closePopup()
}
closePopup() {
  this.setState({openPopup: false})
}
  render() {
    return (
      <div className="container-wrapper">
        <ul className="container">
            <li className="title-wrapper">
              <span className="title title-address">Address</span>
              <span className="title title-city">City</span>
              <span className="title title-stations">Chargerstations</span>
            </li>
          {
            // location list
              this.state.locations.map(item => (
                <li key={item.id} className="list-wrapper">
                  <span className="content address" onClick={() => { this.setData(item) } }
                  >
                    {item.address}
                  </span>
                  <span className="content city">{item.city}</span>
                  <div className="content stations">
                    <span> { item.stations }</span>

                    {/* edit hours button */}
                    <div className="edit-wrapper" 
                        onClick={ () => { this.openPopup(item) }}
                      >Edit
                    </div>
                  </div>

                  {/* show working hours after click */}
                  <div className={`working-hours ${ this.state.show === item.id ? "active" : ""}`}>
                    { 
                      this.state.show === item.id && !this.state.openPopup && 
                      <WorkingHours hours={ this.state.hours } /> 
                    }
                  </div>
                </li>
                ))
              }
        </ul>
        {/* popup for editing hours */}
        { this.state.openPopup && 
        <Popup item={ this.state.hours} 
          // handleNewHours={ this.childCallback }
          saveClicked={ this.saveClicked.bind(this) }
          cancelClicked={ this.closePopup.bind(this) }
        /> 
        }
      </div>
    );
  }
}

export default App;
