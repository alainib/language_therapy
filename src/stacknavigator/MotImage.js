//Comprehension.js
import React from "react";
import { View, Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Image } from "react-native";

import styles from "number_therapy/src/styles";
import { LineChart } from 'react-native-chart-kit'
import Config from "number_therapy/src/Config";

import { motImage_AllSeriesNames, motImage_randomSerie } from "number_therapy/src/services/image";

let _EASY = "easy", _MIDDLE = "middle";
let _FR = "fr", _AR = "AR";


export default class MotImage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            // tous les noms de series
            seriesNames: [],
            // celle choisi par l'utilisateur
            currentSerie: this.initCurrentSerie(null),
            // permet d'afficher le nom en francais
            questionClueVisible: false
        };
    }
    // pour encadrer en rouge ou vert la réponse sélectionner puis passer à la question suivante si juste

    _timeout = null;

    async componentDidMount() {
        this._timeout = null;
        let seriesNames = await motImage_AllSeriesNames();

        this.setState({
            level: _EASY,
            displayLg: _AR,
            seriesNames
        })
    }

    componentWillUnmount = () => {
        clearTimeout(this._timeout);
    };

    initCurrentSerie(datas = null) {
        return {
            questions: datas ? datas.questions || null : null, // liste des questions
            index: 0,  //  indice de la question courrante
            display: datas ? datas.display || null : null
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
    chooseSerie = async (name) => {
        // ici
        let res = await motImage_randomSerie(name, 4, this.state.displayLg, this.state.level);
        this.setState({ currentSerie: this.initCurrentSerie(res) });
    }

    render() {
        console.log("render ", this.state.currentSerie);
        if (this.state.currentSerie.questions == null) {
            return (
                <View>
                    <View style={{ flexDirection: 'row', height: 75, justifyContent: 'space-around' }}>
                        <View style={{ height: 75, flex: 1 }} >
                            <Text style={thisstyles.title}>Niveau :</Text>
                            <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around' }}>
                                <View style={{ height: 50, width: 100 }} >
                                    <Button
                                        color={this.state.level == _EASY ? "green" : "grey"}
                                        title="Facile"
                                        onPress={() => this.setState({ level: _EASY })}
                                    />
                                </View>
                                <View style={{ height: 50, width: 100 }} >
                                    <Button
                                        color={this.state.level == _MIDDLE ? "green" : "grey"}
                                        title="Moyen"
                                        onPress={() => this.setState({ level: _MIDDLE })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 75, flex: 1 }} >
                            <Text style={thisstyles.title}>Langue :</Text>
                            <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around' }}>
                                <View style={{ height: 50, width: 100 }} >
                                    <Button
                                        color={this.state.displayLg == _FR ? "green" : "grey"}
                                        title={_FR}
                                        onPress={() => this.setState({ displayLg: _FR })}
                                    />
                                </View>
                                <View style={{ height: 50, width: 100 }} >
                                    <Button
                                        color={this.state.displayLg == _AR ? "green" : "grey"}
                                        title={_AR}
                                        onPress={() => this.setState({ displayLg: _AR })}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>


                    <Text style={thisstyles.title}>Series disponibles :</Text>

                    <ScrollView scrollEnabled showsVerticalScrollIndicator={true}>
                        {this.state.seriesNames.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={"ac" + index.toString()}
                                    underlayColor={"rgba(207, 207, 207, 0.9)"}
                                    style={thisstyles.padding510}
                                    onPress={() => {
                                        this.chooseSerie(item);
                                    }}
                                >
                                    <Text style={thisstyles.titleEntry}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                </View>
            )
        } else {
            return this.displaySerieQuestions()
        }
    }

    _onLongPress = () => {
        console.log("show")
        this.setState({
            questionClueVisible: true
        })
    }
    _onPressOut = () => {
        console.log("hde")
        this.setState({
            questionClueVisible: false
        })
    }

    // affiche les questions d'une serie
    displaySerieQuestions() {
        if (this.state.currentSerie.index < this.state.currentSerie.questions.length) {
            const height = 50;
            let question = this.state.currentSerie.questions[this.state.currentSerie.index];
            let ImageWidth = Config.width / question.images.length - 2;

            let borderStyle = {
                alignItems: "center", justifyContent: "center",
                width: ImageWidth, height: ImageWidth
            };

            if (question.answer.showBorder) {
                if (question.answer.correct) {
                    borderStyle["borderWidth"] = 4;
                    borderStyle["borderColor"] = "green";

                } else if (question.answer.wrong) {
                    borderStyle["borderWidth"] = 4;
                    borderStyle["borderColor"] = "red";
                }
            }


            return (
                <View style={{ flex: 1 }}>

                    <View style={{
                        marginTop: 5,
                        flex: 1,
                        height,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ width: 50, height, backgroundColor: 'powderblue' }} />

                        <TouchableHighlight onLongPress={this._onLongPress} onPressOut={this._onPressOut} underlayColor="white"
                            style={{ padding: 20, justifyContent: "center", alignItems: "center" }} >
                            <Text style={thisstyles.title}>{question.display}</Text>
                        </TouchableHighlight>

                        <View style={{ width: 50, height, backgroundColor: 'steelblue' }} />
                    </View>

                    <View style={{ flex: 8, marginTop: 15 }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            {question.images.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={"im" + index.toString()}
                                        underlayColor={"grey"}
                                        style={{
                                            alignItems: "center", justifyContent: "center",
                                            width: ImageWidth, height: ImageWidth,
                                            backgroundColor: "white"
                                        }}
                                        onPress={() => {
                                            this.chooseAnswer(index);
                                        }}
                                    >
                                        {question.answer.clickedIndex == index ? (
                                            <View style={borderStyle}>
                                                <Image resizeMode={"stretch"}
                                                    source={item} style={{ width: ImageWidth - 6, height: ImageWidth - 6 }} />
                                            </View>
                                        ) : (
                                                <Image resizeMode={"stretch"} source={item} style={{ width: ImageWidth - 6, height: ImageWidth - 6 }} />
                                            )
                                        }
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    {this.state.questionClueVisible ?
                        <Text style={thisstyles.titleEntry}>{question.clue}</Text> :
                        <Text style={thisstyles.titleEntry}>{" "}</Text>
                    }
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
        if (!questions) {
            return <View style={styles.center}>
                <Text>Pas de question </Text>
            </View>;
        }
        console.log("show results", questions);


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
            console.log(questions[i])
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
            }, 500);
        } else {
            question.answer.correct = false;
            question.answer.wrong = true;
            this.setState({ currentSerie })

            this._timeout = setTimeout(() => {
                let currentSerie = this.state.currentSerie;
                let question = currentSerie.questions[currentSerie.index];
                question.answer.showBorder = false;
                this.setState({ currentSerie })
            }, 500);
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