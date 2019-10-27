import React from "react";
import { View, TouchableOpacity } from "react-native";
import CreateTarget from "../components/CreateTarget";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeSpinList } from "../../../redux/action/game";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";

function GetBubbleLeftScreen({ removeSpinList, spinInfoData, getSpinListItems, running, backPage }) {
  const onOpenGetMegaSpinResultPage = (index) => {
    if(running)
      return;
    switch (index) {
      case 'niki':
        backPage("GameNikiRound", {param: 'niki'});
        removeSpinList('niki');
        break;
      case 'apple':
        backPage("GameNikiRound", {param:'apple'});
        removeSpinList('apple');
        break;
      case 'mega':
        backPage("GameNikiRound", {param:'mega'});
        removeSpinList('mega');
        break;
      case 'lock':
        backPage("GameMegaRound", {param:'lock'});
        removeSpinList('lock');
        break;
    }
  };
  return (
    <View style={{
      flex: 1,
      zIndex: 10,
      position: "absolute",
      top: hp("30"),
      left: wp("1")
    }}>
      {getSpinListItems.map((item, index) =>
        <TouchableOpacity key={index} onPress={() =>onOpenGetMegaSpinResultPage(item.megaType)}>
          <View style={{
            opacity: running ? 0.6 : 1
          }}>
            <CreateTarget spinInfoData={item} angle={0} shadow={false} running={running}/>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    getSpinListItems: state.game.getSpinListItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      removeSpinList: removeSpinList
    }, dispatch)
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(GetBubbleLeftScreen);
