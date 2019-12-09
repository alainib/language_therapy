import React, { Component } from "react";
import CanvasJSReact from "../lib/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ResultsStat extends Component {
  render() {
    const options = {
      title: {
        text: "Résultat :"
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{indexLabel}",
          dataPoints: [
            { label: "1 réponse" + (this.props.results.oneRep > 1 ? "s" : ""), y: this.props.results.oneRep },
            { label: "2 réponse" + (this.props.results.twoRep > 1 ? "s" : ""), y: this.props.results.twoRep },
            { label: "3 réponse" + (this.props.results.threeRep > 1 ? "s" : ""), y: this.props.results.threeRep },
            { label: "4 réponse" + (this.props.results.fourRep > 1 ? "s" : ""), y: this.props.results.fourRep },
            { label: "5+ réponse" + (this.props.results.fiveAndMoreRep > 1 ? "s" : ""), y: this.props.results.fiveAndMoreRep },
            { label: "sautée" + (this.props.results.skiped > 1 ? "s" : ""), y: this.props.results.skiped }
          ]
        }
      ]
    };
    return (
      <div style={{ minWidth: 500, minHeight: 500 }}>
        <CanvasJSChart
          options={options}
          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}
