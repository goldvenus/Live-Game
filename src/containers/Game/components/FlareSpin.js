import { Text } from 'native-base';
import { Image, View } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import AppMocData from '@share/data/MocData';
import { FlareType } from '@share/data/gamePlay/FlareType';

const FlareSpin = (props) => {
  const { spinInfoData, angle, shadow, running } = props;
  const { spinType, spinNumber, spinColor, spinSize,
    spinTextSize, megaType, userType } = spinInfoData;
  let flareType = spinType;
  const targetImage = AppMocData.game.gameplay.target;
  let ty = spinSize / 8;
  if (spinType === FlareType.spinType.triangle) {
    ty = spinSize / 20;
  } else if (spinType === FlareType.spinType.ellipse) {
    ty = spinSize / 8;
  }
  if (spinNumber === 0 && megaType !== 'lock') { // //mega type
    ty = spinSize / 6;
  } else if (spinNumber <= 0) {
    ty = spinSize / 8.6;
  }

  let flareSpinColor = spinColor;
  if (spinNumber === 0
    && spinInfoData.spinSize === FlareType.spinSize.big
    && megaType !== FlareType.spinType.mega.mega
    && spinType !== FlareType.spinType.survey) {
    flareType = FlareType.spinType.glow;
  } else if (spinNumber === -1) {
    flareSpinColor = userType.userColor;
  }
  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: hp(spinSize / -8),
    }}
    >
      {
        shadow && (
        <Image
          source={targetImage.shadow[flareSpinColor]}
          style={{
            marginTop: wp(spinSize / 6),
            width: spinNumber === -1 ? wp(spinSize) : wp(spinSize * (2 / 3)),
            height: hp(spinSize * 1.5),
            opacity: 0.4,
            position: 'absolute',
            resizeMode: 'contain',
          }} />
        )
      }

      <Image
        source={
          (spinNumber === -1)
            ? AppMocData.game.users[userType.userImage]
            : (!shadow && spinType === FlareType.spinType.survey)
              ? AppMocData.game.gameplay.target.survey.survey_third
              : targetImage[flareType][flareSpinColor]
        }
        style={{
          width: wp(spinSize),
          height: wp(spinSize),
          tintColor: (running && !shadow) ? 'gray' : null,
          transform: [{ rotate: `${angle}rad` }],
        }}
      />
      {
        (spinNumber > 0)
          ? (
            <Text style={{
              position: 'absolute',
              fontSize: wp(spinTextSize),
              marginTop: hp(ty),
              fontFamily: 'Antonio-Bold',
              color: 'white',
              transform: [{ rotate: `${angle}rad` }],
            }}
          >
              {spinNumber}
            </Text>
          ) : (spinNumber !== -1
            && spinType !== FlareType.spinType.survey
            && flareType !== FlareType.spinType.glow)
          && (
          <Image
            source={targetImage.mega[megaType]}
            style={{
              position: 'absolute',
              width: spinNumber === 0 && megaType !== 'lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
              height: spinNumber === 0 && megaType !== 'lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
              marginTop: hp(ty),
              zIndex: 0,
              transform: [{ rotate: `${angle}rad` }],
            }}
          />
          )
      }
      {
        !shadow && spinType === FlareType.spinType.survey
        && (
        <Image
          source={AppMocData.game.gameplay.target.survey.survey_icon}
          style={{
            position: 'absolute',
            width: spinNumber === 0 && megaType !== 'lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
            height: spinNumber === 0 && megaType !== 'lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
            marginTop: hp(ty),
            zIndex: 0,
            transform: [{ rotate: `${angle}rad` }],
          }}
        />
        )
      }
    </View>
  );
};

FlareSpin.propTypes = {
  spinInfoData: PropTypes.object.isRequired,
  angle: PropTypes.number,
  shadow: PropTypes.bool,
  running: PropTypes.bool
};

FlareSpin.defaultProps = {
  angle: 0,
  shadow: true,
  running: true
};

export default FlareSpin;
