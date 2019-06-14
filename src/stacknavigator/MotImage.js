//Comprehension.js
import React from "react";
import { View, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Image } from "react-native";

import styles from "number_therapy/src/styles";
import { LineChart } from 'react-native-chart-kit'
import Config from "number_therapy/src/Config";

import { createMotImageSerie } from "number_therapy/src/services/image";


export default class MotImage extends React.Component {
    // pour encadrer en rouge ou vert la réponse sélectionner puis passer à la question suivante si juste
    _timeout = null;

    constructor(props) {
        super(props);
        this.state = {
            // toutes les series
            series: [],
            // celle choisi par l'utilisateur
            currentSerie: this.initCurrentSerie(null),
            // permet d'afficher le nom en francais
            questionClueVisible: false
        };
    }

    async componentDidMount() {
        this._timeout = null;
        let serie = await createMotImageSerie();
        this.setState({
            series: [serie]
        })
    }

    componentWillUnmount = () => {
        clearTimeout(this._timeout);
    };

    initCurrentSerie(questions = null) {
        return {
            questions, // liste des questions
            index: 0,  //  indice de la question courrante
            /*  results: {
                  total: 0,
                  oneRep: 0,
                  twoRep: 0,
                  threeRep: 0,
                  fourRep: 0,
                  fiveAndMoreRep: 0,
                  skiped: 0
              } */
        }
    }




    /** appelé lors du click sur un element de la liste */
    chooseSerie = (data) => {
        this.setState({ currentSerie: this.initCurrentSerie(data.questions) });
    }

    render() {
        if (this.state.currentSerie.questions == null) {
            return (
                <View>
                    <Text style={thisstyles.title}>Series disponibles :</Text>

                    <ScrollView scrollEnabled showsVerticalScrollIndicator={true}>
                        {this.state.series.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={"ac" + index.toString()}
                                    underlayColor={"rgba(207, 207, 207, 0.9)"}
                                    style={thisstyles.padding510}
                                    onPress={() => {
                                        this.chooseSerie(item);
                                    }}
                                >
                                    <Text style={thisstyles.titleEntry}>{item.display}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                </View>
            )
        } else {
            return this.displaySeries()
        }
    }

    _onLongPress = () => {
        this.setState({
            questionClueVisible: true
        })
    }
    _onPressOut = () => {
        this.setState({
            questionClueVisible: false
        })
    }

    displaySeries() {

        if (this.state.currentSerie.index < this.state.currentSerie.questions.length) {
            const height = 20;
            let question = this.state.currentSerie.questions[this.state.currentSerie.index];
            let ImageWidth = Config.width / question.images.length - 25;
            let borderStyle = {
                alignItems: "center", justifyContent: "center",
                width: ImageWidth, height: ImageWidth
            };
            if (question.answer.showBorder) {
                if (question.answer.correct) {
                    borderStyle["backgroundColor"] = "green";

                } else if (question.answer.wrong) {
                    borderStyle["backgroundColor"] = "red";
                }
            }

            return (
                <View style={{ flex: 1 }}>
                    <View style={{
                        height,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ width: 50, height, backgroundColor: 'powderblue' }} />
                        <View style={{ width: 50, height, backgroundColor: 'skyblue' }} />
                        <View style={{ width: 50, height, backgroundColor: 'steelblue' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                            <TouchableHighlight onLongPress={this._onLongPress} onPressOut={this._onPressOut} underlayColor="white" >
                                <Text style={thisstyles.title}>{question.display}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ flex: 8 }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                                {question.images.map((item, index) => {
                                    return (
                                        <TouchableHighlight
                                            key={"im" + index.toString()}
                                            underlayColor={"grey"}
                                            style={{
                                                alignItems: "center", justifyContent: "center",
                                                width: ImageWidth, height: ImageWidth
                                            }}
                                            onPress={() => {
                                                this.chooseAnswer(index);
                                            }}
                                        >
                                            {question.answer.clickedIndex == index ? (
                                                <View style={borderStyle}>
                                                    <Image source={item} style={{ width: ImageWidth - 6, height: ImageWidth - 6 }} />
                                                </View>
                                            ) : (
                                                    <Image source={item} style={{ width: ImageWidth - 6, height: ImageWidth - 6 }} />
                                                )
                                            }
                                        </TouchableHighlight>
                                    )
                                })}
                            </View>
                        </View>
                        {this.state.questionClueVisible ? <Text>{question.clue}</Text> : <Text></Text>}
                    </View>

                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {this.showResults()}
                </View>
            )
        }
    }

    showResults = () => {
        let { questions } = this.state.currentSerie;
        let results = {
            total: questions.length,
            oneRep: 0,
            twoRep: 0,
            threeRep: 0,
            fourRep: 0,
            fiveAndMoreRep: 0,
            skiped: 0
        }
        for (var i in questions) {
            if (questions[i].answer.correct) {
                switch (questions[i].answer.attempt) {
                    case 0:
                    case 1: results.oneRep++; break;
                    case 2: results.twoRep++; break;
                    case 3: results.threeRep++; break;
                    case 4: results.fourRep++; break;
                    case 5: results.fiveAndMoreRep++; break;
                    default:
                        results.fiveAndMoreRep++;
                }
            } else {
                results.skiped++;
            }
        }

        let lineChartData = {
            labels: ['total', '1 rép', '2 rép', '3 rép', '4 rép', '5 ou +', 'sautée'],
            datasets: [{
                data: [
                    results.total,
                    results.oneRep,
                    results.twoRep,
                    results.threeRep,
                    results.fourRep,
                    results.fiveAndMoreRep,
                    results.skiped,

                ]
                /* data: [
                     results.oneRep * 100 / results.total,
                     results.twoRep * 100 / results.total,
                     results.threeRep * 100 / results.total,
                     results.fourRep * 100 / results.total,
                     results.fiveAndMoreRep * 100 / results.total,
                     results.skiped * 100 / results.total,
                     100
                 ]*/
            }]
        };

        return (
            <View style={styles.center}>
                <Text>Résultat : </Text>
                <LineChart
                    data={lineChartData}
                    width={Dimensions.get('window').width - 40} // from react-native
                    height={Dimensions.get('window').height - 100}
                    chartConfig={{
                        // backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#ffae49',
                        backgroundGradientTo: '#ffae49',
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
            </View>)

    }

    chooseAnswer = (imageIndex) => {
        /* structure 
        question : {
					"display": "café",
					"clue": "café",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"showBorder": false, // afifche l'encadré ?
						"correct": false, //réponse juste
						"wrong": false, // réponse fausse
						"rightIndex": 3, // index de la réponse correct
						"attempt": -1, // nombre de tentative 
					},
					"images": [
						require(_PATH + "mot-image/serie-a/09.jpg"),
						require(_PATH + "mot-image/serie-a/10.jpg"),
						require(_PATH + "mot-image/serie-a/11.jpg"),
						require(_PATH + "mot-image/serie-a/12.jpg")
					]
				}
        */

        let currentSerie = this.state.currentSerie;
        let question = currentSerie.questions[currentSerie.index];

        question.answer.attempt++;
        question.answer.showBorder = true;
        question.answer.clickedIndex = imageIndex;
        if (imageIndex == question.answer.rightIndex) {
            question.answer.correct = true;
            question.answer.wrong = false;
            this.setState({ currentSerie })

            this._timeout = setTimeout(() => {
                let currentSerie = this.state.currentSerie;
                currentSerie.index = currentSerie.index + 1;
                this.setState({ currentSerie })
            }, 1000);
        } else {
            question.answer.correct = false;
            question.answer.wrong = true;
            this.setState({ currentSerie })

            this._timeout = setTimeout(() => {
                let currentSerie = this.state.currentSerie;
                let question = currentSerie.questions[currentSerie.index];
                question.answer.showBorder = false;
                this.setState({ currentSerie })
            }, 1000);
        }

    }
}


const thisstyles = StyleSheet.create({
    padding510: { padding: 5, paddingTop: 10, paddingBottom: 10 },
    m5: { margin: 5, backgroundColor: 'green' },
    title: {
        fontSize: 23,
        margin: 5
    },
    titleEntry: {
        fontSize: 18,
        margin: 5
    }
})