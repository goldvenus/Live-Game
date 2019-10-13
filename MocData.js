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
      roundLock: require('./assets/images/game/pages/round-lock.png'),
      roundBgOrange: require('./assets/images/game/pages/round-top-bg-orange.png'),
      roundBgRed: require('./assets/images/game/pages/round-top-bg-red.png')
    }
  }
};

export default Images;