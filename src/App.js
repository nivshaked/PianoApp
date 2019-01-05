import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';
import './App.css';

const NUMBER_OF_KEYS = 25;
const STARTING_NOTE = 60;
const KEY_ORDER= ['a','w','s','e','d','f','t','g','y','h','u','j','k','o','l','p',';'];
const BKACK_KEYS=[1,3,6,8,10,13,15,18,20,22]
let fired = false;

class App extends Component {
  constructor() {
    super()
    this.state={
      showKeyMapping:true,
      value: 0,
      keyPressed: -1,
    };
    this.noteClicked = this.noteClicked.bind(this)
  }

  noteClicked(event){
    let pich = Number(event.currentTarget.value) + STARTING_NOTE
    this.midiSounds.playChordNow(this.state.value, [pich], 1);
  }
  
  printKeys(){
    let keys = []
      for (let i = 0; i < NUMBER_OF_KEYS; i++) {
      if (!BKACK_KEYS.includes(i)){
        keys.push(<button className={(this.state.keyPressed === i) ? "White-key-pressed" : 'White-key'} value={i} onMouseDown={this.noteClicked}>
                      {this.state.showKeyMapping && <h2 className="White-key-text">{KEY_ORDER[i]}</h2>}
                      </button>)
      } else {
        keys.push(<button className={(this.state.keyPressed === i) ? "Black-key-pressed" : 'Black-key'}  value={i} onMouseDown={this.noteClicked}> 
                      {this.state.showKeyMapping && <h2 disabled={true} className="Black-key-text">{KEY_ORDER[i]}</h2>}
                      </button>)
      }
    } 
    return <tbody>{keys}</tbody>;
  }
  
  mappingToggle(){
    this.setState({showKeyMapping: !this.state.showKeyMapping})
  }

  handleKeyPress(event){
    let keyPressed = KEY_ORDER.indexOf(event.key)
    if (keyPressed > -1 && !fired){
      this.setState({keyPressed: KEY_ORDER.indexOf(event.key)})
      this.midiSounds.playChordNow(this.state.value, [keyPressed+STARTING_NOTE], 1);
      fired = true
    }
  }
  handleKeyRelease(){
    fired=false
    this.setState({keyPressed : -1})
  }
  chngeInstrument(event){
    this.setState({value: event.target.value});
  }
  instrumentPicker(){
    return(
      <select value={this.state.value} onChange={this.chngeInstrument.bind(this)}>
        <option value={0}>Piano</option>
        <option value={43}>E.Piano</option>
        <option value={89}>Celesta</option>
        <option value={116}>Vibraphone</option>
        <option value={286}>E.Guitar</option>
        <option value={115}>Music Box</option>    
      </select>
    )
  }
  render() {
    return (
      <div style={{justifyContent:'center'}}>
        <header className="App-header" repeat="falsed" onKeyDown={this.handleKeyPress.bind(this)} onKeyUp={this.handleKeyRelease.bind(this)} >
          <div style={{display:'flex', textAlign:'center', flexDirection:'row'}}>     
            <div style={{marginLeft:-50}}>
              <h5 style={{marginBottom:15}} >Pick an instrument</h5>
              {this.instrumentPicker()}
            </div>           
            <div style={{marginLeft:30}}>
              <h5 style={{marginBottom:15}} >Keyboard Mapping</h5>
              <button onClick={this.mappingToggle.bind(this)}> show/hide </button>
            </div>
          </div>
          <div className="Piano">
            {this.printKeys()}
          </div>
        </header>
        <div disabled={true} style={{display:'none'}}><MIDISounds ref={(ref)=>(this.midiSounds = ref)} appElementName="root" instruments={[0]} hide={true}/></div>
      </div>
    );
  }
}

export default App;