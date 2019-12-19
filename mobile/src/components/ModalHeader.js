import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import { Column as Col, Row } from "react-native-flexbox-grid";
import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";

/**
 * affiche un button back + titre comme les navigations bar de stackNavigator
 * facultatif : icon à gauche
 * passer en parametre rightIconName
 * callback on click sur icon
 *
 * removeLeftSpace : option facultative pour supprimer l'espace vide à droite entre la fleche de retour et le titre
 *
 */
export default class ModalHeader extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    /*
		 on doit avoir row de largeur 24 et les colonnes de largeur	[ 3 , 3 , 18 , 3 ]
		 il est possible de supprimer la seconde colonne pour agrandir la 3ième avec this.props.removeLeftSpace
		 si il n'y a pas de button dans la 4ième colonne alors la 3ième occupera ca place également.
		*/

    let getSize = indice => {
      this.props.removeLeftSpace;
      switch (indice) {
        case 1:
          return this.props.removeLeftSpace ? 0 : 3;
        case 2:
          let width = this.props.rightIcon ? 15 : 18;
          if (this.props.removeLeftSpace) {
            width += 2;
          }
          return width;
        case 3:
          return this.props.rightIcon ? 3 : 0;
      }
    };

    return (
      <View style={{ ...styles.customHeaderContainer, zIndex: 10 }}>
        <Row size={24} style={styles.customHeaderContainer}>
          <Col sm={3} style={styles.alignCenter}>
            <TouchableOpacity
              accessibilityLabel="BACK"
              underlayColor={Config.colors.touchOpacity}
              style={styles.backButton}
              onPress={() => {
                this.props.callbackClickBackButton();
              }}
            >
              <IconFeather name="arrow-left" size={Config.iconSize.xl} color={Config.colors.black} />
            </TouchableOpacity>
          </Col>
          <Col sm={getSize(1)} />
          <Col sm={getSize(2)} style={styles.modalHeaderTitleCol}>
            <Text style={styles.modalHeaderTitle} ellipsizeMode="tail" numberOfLines={2}>
              {this.props.title}
            </Text>
          </Col>
          <Col sm={getSize(3)} style={styles.alignCenter}>
            {this.props.rightIcon && this.props.rightIcon()}
          </Col>
        </Row>
      </View>
    );
  }
}
