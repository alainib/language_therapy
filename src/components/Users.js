import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "language_therapy/src/styles";
import * as tools from "language_therapy/src/tools";

class Users extends React.PureComponent {
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
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20
                }}
                onPress={() => {
                  this.setState({
                    showAddUser: !this.state.showAddUser
                  });
                }}
              >
                <Text style={{ fontSize: 20, textAlign: "center" }}> + </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              Utilisateur courant : {"\n" + this.state.users.current}
            </Text>
          </View>
        </View>
        {this.state.showAddUser && (
          <View
            style={{
              flexDirection: "row",
              height: 50,
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
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
            <View style={{ width: 40, marginRight: 10 }}>
              <Button
                title="Ok"
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
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flex: 1
          }}
        >
          {_listLength > 0 && (
            <View style={styles.flex1}>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  this.setState({ showUsersList: !this.state.showUsersList });
                }}
              >
                <Text style={styles.title}>
                  Autres utilisateurs {this.state.showUsersList && ":"}
                </Text>
              </TouchableOpacity>

              {this.state.showUsersList && (
                <ScrollView>
                  {tools.mapObject(this.state.users.list, (key, value) => {
                    return (
                      <View key={key.toString()}>
                        <TouchableOpacity
                          style={{ padding: 5 }}
                          onPress={() => {
                            this.props.action_setCurrentUser(key);
                          }}
                        >
                          <Text style={styles.titleMD}>{key}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

function mapToStateProps(data) {
  return {
    users: data.users
  };
}

import { connect } from "react-redux";
import * as actions from "language_therapy/src/redux/actions";

export default connect(
  mapToStateProps,
  actions
)(Users);
