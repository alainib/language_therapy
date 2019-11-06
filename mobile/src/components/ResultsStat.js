import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

// import { LineChart, BarChart } from "react-native-chart-kit";

export default class ResultsStat extends React.PureComponent {
  render() {
    /*
    let lineChartData = {
      labels: ["total", "1 rép", "2 rép", "3 rép", "4 rép", "5 ou +", "sautée"],
      datasets: [
        {
          data: [this.props.results.total, this.props.results.oneRep,
            this.props.results.twoRep,
            this.props.results.threeRep,
            this.props.results.fourRep,
            this.props.results.fiveAndMoreRep,
            this.props.results.skiped]
        }
      ]
    };*/

    let total = this.props.results.total;
    let nums = [
      this.props.results.oneRep,
      this.props.results.twoRep,
      this.props.results.threeRep,
      this.props.results.fourRep,
      this.props.results.fiveAndMoreRep,
      this.props.results.skiped
    ];
    let max = Math.max(...nums);
    let data = [
      { label: "1 rép", value: this.props.results.oneRep },
      { label: "2 rép", value: this.props.results.twoRep },
      { label: "3 rép", value: this.props.results.threeRep },
      { label: "4 rép", value: this.props.results.fourRep },
      { label: "5+ rép", value: this.props.results.fiveAndMoreRep },
      { label: "sautée", value: this.props.results.skiped }
    ];

    let radius = this.props.minimizedDisplay ? 5 : 15;

    return (
      <View style={{ flex: 1, margin: this.props.minimizedDisplay ? 1 : 10 }}>
        {!this.props.minimizedDisplay && <Text style={thisstyles.text}>Résultat des {total} items </Text>}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: this.props.minimizedDisplay ? 1 : 20
          }}
        >
          {data.map((item, index) => {
            return (
              <View
                style={{ margin: this.props.minimizedDisplay ? 1 : 10, flex: 1, flexDirection: "column" }}
                key={"ac" + index.toString()}
              >
                <View style={{ flex: max - item.value }}></View>
                {item.value > 0 && (
                  <View
                    style={{
                      backgroundColor: "mediumseagreen",
                      flex: item.value,
                      ...thisstyles.center,
                      borderTopLeftRadius: radius,
                      borderTopRightRadius: radius
                    }}
                  >
                    {!this.props.minimizedDisplay && <Text style={{ ...thisstyles.text, ...thisstyles.center }}>{item.value}</Text>}
                  </View>
                )}
                {!this.props.minimizedDisplay && (
                  <View style={thisstyles.center}>
                    <Text style={thisstyles.text}>{item.label}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        {/* <BarChart
          style={{
            borderRadius: 16
          }}
          data={lineChartData}
          width={Dimensions.get("window").width - 40} // from react-native
          height={Dimensions.get("window").height - 100}
          yAxisLabel={""}
          chartConfig={{
            backgroundColor: "skyblue",
            backgroundGradientFrom: "aliceblue",
            backgroundGradientTo: "skyblue",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
        />*/}
      </View>
    );
  }
}
const thisstyles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  center: { justifyContent: "center", alignItems: "center" }
});
/*
        <LineChart
          data={lineChartData}
           width={Dimensions.get("window").width - 40} // from react-native
          height={Dimensions.get("window").height - 100}
        
          chartConfig={{
            // backgroundColor: '#e26a00',
            backgroundGradientFrom: "#ffae49",
            backgroundGradientTo: "#ffae49",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            borderRadius: 16
          }}
        />
        */
/*import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "language_therapy/src/styles";

import { LineChart } from "react-native-chart-kit";

let { width, height } = Dimensions.get("window");

console.log("stat", { width, height });

export default class ResultsStat extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);

    this.state = {
      viewWidth: width,
      viewHeight: height,
      display: false // bug, fait que retrecir la taille de la vue...
    };
  }

  onLayout(e) {
    let { width, height } = e.nativeEvent.layout;

    if (this.state.viewWidth !== width || this.state.viewHeight !== height) {
      console.log("nouvelle taile ", width + " " + height);
      if (!this.state.display) {
        this.setState({ viewWidth: width, viewHeight: height, display: true });
      }
    }
  }

  render() {
    let lineChartData = {
      labels: ["total", "1 rép", "2 rép", "3 rép", "4 rép", "5 ou +", "sautée"],
      datasets: [
        {
          data: [
            this.props.results.total,
            this.props.results.oneRep,
            this.props.results.twoRep,
            this.props.results.threeRep,
            this.props.results.fourRep,
            this.props.results.fiveAndMoreRep,
            this.props.results.skiped
          ]
        }
      ]
    };
    return (
      <View onLayout={this.onLayout} style={styles.center}>
        <Text>Résultat : </Text>
        {this.state.display ? (
          <LineChart
            data={lineChartData}
            width={this.state.viewWidth - 70}
            height={this.state.viewHeight - 100}
            chartConfig={{
              // backgroundColor: '#e26a00',
              backgroundGradientFrom: "#ffae49",
              backgroundGradientTo: "#ffae49",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        ) : (
          <Text>erreur taille</Text>
        )}
      </View>
    );
  }
}
*/
