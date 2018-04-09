import * as React from "react"
import {rawData} from "../data/raw.data"
import {Button} from "./button"

export class App extends React.Component {
  state = {
    csv: rawData,
    data: []
  }

  handleTextAreaChange = (ev) => {
    this.setState({
      csv: ev.value,
    })
  }

  generateReport = () => {
    //splits by newline character and gets rid of first line
    var splitByNewline = this.state.csv.split("\n");
    splitByNewline.shift();
    //then split each element by commas
    var parsed = splitByNewline.map(elem => elem.split(","));
    //create array that contains money spent on restaurants
    var moneySpent = parsed.map(elem => parseFloat(elem[4].substr(1)));
    //calculate employee and company share
    var employeeShare = moneySpent.reduce((tot, cur) => cur > 400 ? tot+cur-400 : tot , 0);
    var companyShare = moneySpent.reduce((tot, cur) => cur > 400 ? tot+400 : tot+cur, 0);
    
    return {
        parsedData: parsed, 
        employeeShare: employeeShare,
        companyShare: companyShare
    };
  }

  render() {
    const {csv, data} = this.state;
    const result = this.generateReport();
    var rows = result.parsedData.map((elem, index) => {
       return (
         <TableRow 
           id={elem[0]}
           date={elem[1]}
           time={elem[2]}
           rest={elem[3]}
           price={elem[4]}
           key={index}
        />
       )
     });
    return <div className="flexbox-column" style={{padding: 16, alignItems: "left"}}>
      <div style={{fontSize: 24, paddingBottom: 16}}>10bis Report</div>

      <div style={{paddingBottom: 16, width: "100%"}}>
        <textarea style={{height: 200, width: "100%"}} value={csv} onChange={this.handleTextAreaChange}/>
      </div>

      <div>
        <table style={{border: '1px solid black', overflowY: "scroll", height: 400, display: "block"}}>
          <tbody>
            {rows}
          </tbody>
        </table>
        <p>Employee share: 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {result.employeeShare}
        </p>
        <p>Company share:
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {result.companyShare}
        </p>
      </div>
    </div>
  }
}

class TableRow extends React.Component {
  
  render() {
    var tdStyle = {
      width: 90,
      padding: 7
    }
    return (
      <tr>
        <td style={tdStyle}>{this.props.id}</td>
        <td style={tdStyle}>{this.props.date}</td>
        <td style={tdStyle}>{this.props.time}</td>
        <td style={tdStyle}>{this.props.rest}</td>
        <td style={tdStyle}>{this.props.price}</td>
      </tr>
    )
  }
}