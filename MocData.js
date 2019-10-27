const Images = {
  bottomBar: {
    chat: require('./assets/images/bottom_nav_bar/chat.png'),
    gameActive: require('./assets/images/bottom_nav_bar/game-active.png'),
    gameNormal: require('./assets/images/bottom_nav_bar/game-normal.png'),
    menu: require('./assets/images/bottom_nav_bar/menu.png'),
    stats: require('./assets/images/bottom_nav_bar/stats.png'),
    wave: require('./assets/images/bottom_nav_bar/wavescore.png')
  },
  game: {
    flag: {
      JAP: require('./assets/images/game/flag/JAP.png'),
      USA: require('./assets/images/game/flag/USA.png')
    },
    gameplay: {
      shot: {
        gun: {
          disable: require('./assets/images/game/gameplay/shot/gun/gun-disable.png'),
          green: require('./assets/images/game/gameplay/shot/gun/gun-green.png'),
          orange: require('./assets/images/game/gameplay/shot/gun/gun-orange.png'),
        },
        bullet: {
          bulletItem: {
            green: require('./assets/images/game/gameplay/shot/bullet/bullet/bullet-green.png'),
          },
          bulletShadow: {
            green: require('./assets/images/game/gameplay/shot/bullet/shadow/bullet-shadow-green.png'),
          }
        }
      },
      target: {
        circle: {
          blue: require('./assets/images/game/gameplay/target/circle/target-bg-blue-c.png'),
          green: require('./assets/images/game/gameplay/target/circle/target-bg-green-c.png'),
          orange: require('./assets/images/game/gameplay/target/circle/target-bg-orange-c.png'),
          pink: require('./assets/images/game/gameplay/target/circle/target-bg-pink-c.png')
        },
        mega: {
          apple: require('./assets/images/game/gameplay/target/mega/apple.png'),
          lock: require('./assets/images/game/gameplay/target/mega/lock.png'),
          mega: require('./assets/images/game/gameplay/target/mega/mega-spin.png'),
          niki: require('./assets/images/game/gameplay/target/mega/niki.png'),
        },
        shadow: {
          white: require('./assets/images/game/gameplay/target/shadow/target-trace-white-3.png'),
          blue: require('./assets/images/game/gameplay/target/shadow/target-trace-blue-3.png'),
          pink: require('./assets/images/game/gameplay/target/shadow/target-trace-pink-3.png'),
          green: require('./assets/images/game/gameplay/target/shadow/target-trace-green-3.png'),
          orange: require('./assets/images/game/gameplay/target/shadow/target-trace-orange-3.png')
        },
        triangular: {
          green: require('./assets/images/game/gameplay/target/triangular/target-bg-green-3.png'),
          orange: require('./assets/images/game/gameplay/target/triangular/target-bg-orange-3.png')
        }
      }
    },
    header: {
      amber: require('./assets/images/game/header/amber.png'),
      user: require('./assets/images/game/header/ava.png')
    },
    lightning: {
      first: require('./assets/images/game/lightning/lightning1.png'),
      second: require('./assets/images/game/lightning/lightning2.png'),
      third: require('./assets/images/game/lightning/lightning3.png'),
      fourth: require('./assets/images/game/lightning/lightning4.png'),
      image: require('./assets/images/game/lightning/lightning-cover.png')
    },
    users: {
      image1: require('./assets/images/game/users/3.png'),
      image2: require('./assets/images/game/users/4.png')
    },
    page: {
      mega: {
        megaBig: require('./assets/images/game/pages/mega/mega-spin-big.png'),
        megaTopMark: require('./assets/images/game/pages/mega/mega-spin-top-mark.png'),
        roundUnlock: require('./assets/images/game/pages/mega/round-unlock.png')
      },
      niki: {
        nikiShoe: require('./assets/images/game/pages/niki/niki-shoe.png')
      },
      nikiQuestion: {
        first: require('./assets/images/game/pages/nikiQuestion/first.png'),
        second: require('./assets/images/game/pages/nikiQuestion/second.png'),
        third: require('./assets/images/game/pages/nikiQuestion/third.png'),
      },
      flareAnswer: {
        first: require('./assets/images/game/pages/flareAnswer/buttonBG.png'),
        background: require('./assets/images/game/pages/flareAnswer/answerBg.png')
      },
      roundLock: require('./assets/images/game/pages/first.png'),
      roundBgOrange: require('./assets/images/game/pages/second.png'),
      roundBgRed: require('./assets/images/game/pages/third.png')
    },
    icon: {
      arrow: require('./assets/images/game/icon/arrow.png'),
      megaSpin: require('./assets/images/game/icon/mega-spin.png'),
      ruleObject: require('./assets/images/game/icon/rule-objective.png'),
      waveScore: require('./assets/images/game/icon/wavescore.png'),
    }
  },
  sound: {
    countdownSound: require('./assets/audio/countDown.mp3'),
    shotSound: require('./assets/audio/shot.mp3'),
    mutiShotSound: require('./assets/audio/multishot.mp3'),
    holdShotSound: require('./assets/audio/holdshot.mp3')
  },
  wheel: {
    flare: {
      first: require('./assets/images/wheel/flare/wheel1.png'),
      second: require('./assets/images/wheel/flare/wheel2.png'),
      third: require('./assets/images/wheel/flare/wheel3.png'),
      fourth: require('./assets/images/wheel/flare/wheel4.png'),
      fifth: require('./assets/images/wheel/flare/wheel5.png'),
      sixth: require('./assets/images/wheel/flare/wheel6.png'),
      seventh: require('./assets/images/wheel/flare/wheel7.png'),
      eighth: require('./assets/images/wheel/flare/wheel8.png'),
    },
    background:{
      first: require('./assets/images/wheel/background/wheel_back1.png'),
      second: require('./assets/images/wheel/background/wheel_back2.png')
    },
    mega: {
      first: require('./assets/images/wheel/mega/mega1.png'),
      second: require('./assets/images/wheel/mega/75.png'),
      tenth:require('./assets/images/wheel/mega/mega3.png'),
      third: require('./assets/images/wheel/mega/150.png'),
      fourth: require('./assets/images/wheel/mega/200.png'),
      fifth: require('./assets/images/wheel/mega/mega2.png'),
      sixth: require('./assets/images/wheel/mega/45.png'),
      seventh: require('./assets/images/wheel/mega/100.png'),
      eighth: require('./assets/images/wheel/mega/15.png'),
      ninth: require('./assets/images/wheel/mega/30.png'),
    }
  },
  public: {
    close: require('./assets/images/close.png')
  }
};

export default Images;
