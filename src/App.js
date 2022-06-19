import React, { Component } from 'react';
import './App.css';

class App extends Component {

  csvToArray = (str, delimiter = ",") => {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('Submit on')
    const csvFile = document.getElementById("csvFile");
    const input = csvFile.files[0];
    console.log(input)
    const reader = new FileReader();

    // reader.onload = function (e) {
    //   console.log(e.target.result);
    //   const text = e.target.result;
    //   console.log(text)
    //   document.write(text);
    // };
    
    reader.onload = function (e) {
      const text = e.target.result;
      const data = this.csvToArray(text);
      document.write(JSON.stringify(data));
    };
    
    reader.readAsText(input);
  }

  render() {

    return (
      <div className="App">
        <form id="myForm" onSubmit={this.handleSubmit}>
          <input type="file" id="csvFile" accept=".csv" />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
