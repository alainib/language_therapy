import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "language_therapy/src/styles";

import { LineChart } from "react-native-chart-kit";

export default class ResultsStat extends React.PureComponent {
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Résultat : </Text>
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
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  }
}
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
