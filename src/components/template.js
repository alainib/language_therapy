import React from "react";
import {
  ScrollView,
  View,
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

export default class Template1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={{ flex: 1 }}></View>;
  }
}

//-----------------------------------------------------------
class Template extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
         
      };
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.users) {
        this.setState({ users: nextProps.users });
      }
    }
  
    render() {
       
      return (
        <View style={{ flex: 1 }}>
         
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
  )(Template);
  