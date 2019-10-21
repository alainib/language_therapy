import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";
import styles from "language_therapy/src/styles";
import * as tools from "language_therapy/src/tools";
import IconFeather from "react-native-vector-icons/Feather";
import Config from "language_therapy/src/Config";
import IconIonic from "react-native-vector-icons/Ionicons";

class Users extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <TouchableOpacity
          underlayColor={Config.colors.green}
          onPress={() => {
            navigation.navigate("Users");
          }}
        >
          <IconIonic
            name="md-person"
            size={Config.iconSize.xxl}
            color={tintColor}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      users: props.users || null,
      showUsersList: false,
      showAddUser: false,
      newUserName: "alain ibrahim" || null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      this.setState({ users: nextProps.users });
    }
  }

  render() {
    const _listLength = Object.keys(this.state.users.list).length;

    return (
      <View style={styles.flex1}>
        {!this.state.showUsersList && (
          <View style={styles.flex1}>
            {this.state.users.current != null ? (
              <View>
                <Text style={thisstyles.titleLeft}>
                  Utilisateur courant : {this.state.users.current}
                </Text>

                <View style={{ ...styles.center, width: 100 }}>
                  <Button
                    containerStyle={{ margin: 10 }}
                    title="Suivi"
                    onPress={() => this.props.navigation.navigate("Suivi")}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <Button
                  title="Ajouter un utilisateur"
                  onPress={() => {
                    this.setState({
                      showAddUser: !this.state.showAddUser
                    });
                  }}
                />
              </View>
            )}
          </View>
        )}

        {this.state.showAddUser && (
          <View style={styles.flexRowSpaceAround}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              ref={input => {
                this.txtInput = input;
              }}
              value={this.state.newUserName}
              style={styles.acSearchSectionInput}
              placeholder={"nom - prénom"}
              onChangeText={newUserName => {
                this.setState({ newUserName });
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <View style={styles.margin10}>
                <Button
                  title="Annuler"
                  color="grey"
                  onPress={() => {
                    this.setState({
                      showAddUser: false,
                      newUserName: null
                    });
                  }}
                />
              </View>
              <View style={styles.margin10}>
                <Button
                  title="Ok"
                  color="green"
                  onPress={() => {
                    this.props.action_addUser(this.state.newUserName);
                    this.setState({
                      showAddUser: false,
                      newUserName: null
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {!this.state.showAddUser && _listLength > 0 && (
          <View style={thisstyles.flexRowStart}>
            <View style={styles.flex1}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      showUsersList: !this.state.showUsersList
                    });
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={thisstyles.titleLeft}>
                      Utilisateurs : Autres
                    </Text>
                    <IconIonic
                      name={
                        this.state.showUsersList
                          ? "md-arrow-dropup-circle"
                          : "md-arrow-dropdown-circle"
                      }
                      size={Config.iconSize.xl}
                    />
                  </View>
                </TouchableOpacity>

                {!this.state.showUsersList && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        showAddUser: !this.state.showAddUser
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingRight: 20
                      }}
                    >
                      <Text style={thisstyles.titleLeft}>Ajouter</Text>
                      <IconIonic
                        name="md-add-circle"
                        size={Config.iconSize.xl}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              {this.state.showUsersList && (
                <ScrollView>
                  {tools.mapObject(this.state.users.list, (key, value) => {
                    return (
                      <View
                        key={key.toString()}
                        style={thisstyles.flexRowbetween10}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.props.action_setCurrentUser(key);
                          }}
                        >
                          <Text style={styles.titleMD}>{key}</Text>
                        </TouchableOpacity>
                        <IconFeather
                          name="trash"
                          size={Config.iconSize.md}
                          color="#000"
                          onPress={() => {
                            Alert.alert(
                              "Effacer l'utilisateur ?",
                              "ainsi que tous ses tests ",
                              [
                                {
                                  text: "Oui",
                                  onPress: () =>
                                    this.props.action_removeUser(key)
                                },
                                {
                                  text: "Non"
                                }
                              ],
                              { cancelable: true }
                            );
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

function mapToStateProps(data) {
  return {
    users: data.users,
    options: data["options"]
  };
}

import { connect } from "react-redux";
import * as actions from "language_therapy/src/redux/actions";

export default connect(
  mapToStateProps,
  actions
)(Users);

const thisstyles = StyleSheet.create({
  centerp20: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  centerf20: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  titleLeft: {
    padding: 5,
    paddingHorizontal: 20,
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  flexRowStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1
  },
  padding5: { padding: 5 },
  flexRowbetween10: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center"
  }
});
