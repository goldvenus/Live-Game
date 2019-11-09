import React from "react";
import {View, TouchableOpacity} from "react-native";
import FlareSpin from "../components/FlareSpin";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {removeSpinList} from "../../../redux/action/game";
import {heightPercentageToDP as hp, widthPercentageToDP as wp}
  from "react-native-responsive-screen";
import * as Animatable from 'react-native-animatable';

function GetBubbleLeftScreen({removeSpinList, spinInfoData, getSpinListItems, running, backPage, leftSpinUpdate}) {

  const zoomAnimation = {
    0: {
      scale: 1
    },
    0.5: {
      scale: 2
    },
    1: {
      scale: 1
    }
  };

  const repeatAnimation = {
    0: {
      scale: 1
    },
    0.5: {
      scale: 1
    },
    1: {
      scale: 1
    }
  };
  const onOpenGetMegaSpinResultPage = (index) => {
    if (running)
      return;
    switch (index) {
      case 'niki':
        backPage("GameNikiRound", {param: 'niki'});
        removeSpinList('niki');
        break;
      case 'apple':
        backPage("GameNikiRound", {param: 'apple'});
        removeSpinList('apple');
        break;
      case 'mega':
        backPage("GameNikiRound", {param: 'mega'});
        removeSpinList('mega');
        break;
      case 'lock':
        backPage("GameMegaRound", {param: 'lock'});
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
        <Animatable.View style={{
          opacity: running ? 0.6 : 1,
          transform: [
            {scaleX: 0},
            {scaleY: 0}
          ],
        }}
           animation={leftSpinUpdate === index ? zoomAnimation : repeatAnimation} key={index}>
          <TouchableOpacity onPress={() => onOpenGetMegaSpinResultPage(item.megaType)}>
            <FlareSpin spinInfoData={item} angle={0} shadow={false} running={running}/>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    getSpinListItems: state.game.getSpinListItems,
    leftSpinUpdate: state.game.leftSpinUpdate
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
