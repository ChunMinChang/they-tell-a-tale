/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var STORYLINE = {
  Intro : {
    text : 'Track 000<br />They Tell a Tale',
    next : 'SecIntro',
    duration : 6000,
  },
  SecIntro : {
    text : 'We hurt because we loved. Don\'t you forget...',
    next : 'Start',
    duration : 4500,
  },
  Start : {
    source : 'videos/Start.mp4',
    next : 'Q',
  },
  Q : {
    text : 'Are you able to sustain?',
    next : {
      Yes : 'QY',
      No : 'QN',
    },
    duration : 3000,
  },
  QY : {
    source : 'videos/QY.mp4',
    next : 'YAN',
  },
  YAN : {
    text : 'Will you come?',
    next : {
      Yes : 'AY',
      No : 'AN',
    },
    duration : 3000,
  },
  QN : {
    source : 'videos/QN.mp4',
    next : 'YaN',
  },
  YaN : {
    text : 'Did you take my hand?',
    next : {
      Yes : 'aaY',
      No : 'aaN',
    },
    duration : 3000,
  },
  AY : {
    source : 'videos/AY.mp4',
    next : 'YBN',
  },
  AN : {
    source : 'videos/AN.mp4',
    next : 'YaN',
  },
  YBN : {
    text : 'It is for you. Do you like it?',
    next : {
      Yes : 'BY',
      No : 'BN',
    },
    duration : 3000,
  },
  aaY : {
    source : 'videos/aaY.mp4',
    next : 'YbN',
  },
  aaN : {
    source : 'videos/aaN.mp4',
    next : 'YbN',
  },
  YbN : {
    text : 'Will you take some pills?',
    next : {
      Yes : 'bbY',
      No : 'bbN',
    },
    duration : 3000,
  },
  BY : {
    source : 'videos/BY.mp4',
    next : 'YCN',
  },
  BN : {
    source : 'videos/BN.mp4',
    next : 'YCN',
  },
  bbY : {
    source : 'videos/bbY.mp4',
    next : 'YcN',
  },
  bbN : {
    source : 'videos/bbN.mp4',
    next : 'YcN',
  },
  YCN : {
    text : 'Will you follow?',
    next : {
      Yes : 'CY',
      No : 'CN',
    },
    duration : 3000,
  },
  YcN : {
    text : 'Will you come up?',
    next : {
      Yes : 'ccY',
      No : 'ccN',
    },
    duration : 3000,
  },
  CY : {
    source : 'videos/CY_ddN.mp4',
    next : 'GDL',
  },
  CN : {
    source : 'videos/CN.mp4',
    next : 'GDL',
  },
  ccY : {
    source : 'videos/ccY.mp4',
    next : 'YdN',
  },
  ccN : {
    source : 'videos/ccN.mp4',
    next : 'TeF',
  },
  GDL : {
    text : 'I was never here, but she is.',
    next : {
      Go : 'DG',
      Leave : 'DL',
    },
    duration : 3000,
  },
  YdN : {
    text : 'Would you let me in?',
    next : {
      Yes : 'ddY',
      No : 'ddN',
    },
    duration : 3000,
  },
  TeF : {
    text : 'You cannot be free in a cage.',
    next : {
      True : 'eeT',
      False : 'eeF001',
    },
    duration : 3000,
  },
  DG : {
    source : 'videos/DG.mp4',
    next : 'TEF',
  },
  DL : {
    source : 'videos/DL.mp4',
    next : 'TEF',
  },
  ddY : {
    source : 'videos/ddY.mp4',
    next : 'TeF',
  },
  ddN : {
    source : 'videos/CY_ddN.mp4',
    next : 'TeF',
  },
  TEF : {
    text : 'I never have a family.',
    next : {
      True : 'ET',
      False :'EF',
    },
    duration : 3000,
  },
  ET : {
    source : 'videos/ET.mp4',
    next : 'YFN',
  },
  EF : {
    source : 'videos/EF.mp4',
    next : 'YFN',
  },
  eeT : {
    source : 'videos/eeT.mp4',
    next : 'YfN',
  },
  eeF001 : {
    source : 'videos/eeF001.mp4',
    next : 'End001',
  },
  YFN : {
    text : 'Do you think that I broke free?',
    next : {
      Yes : 'FY',
      No : 'FN004',
    },
    duration : 3000,
  },
  YfN : {
    text : 'Do you love me?',
    next : {
      Yes : 'ffY001',
      No : 'GN_ffN003',
    },
    duration : 3000,
  },
  FY : {
    source : 'videos/FY.mp4',
    next : 'YGN',
  },
  FN004 : {
    source : 'videos/FN004.mp4',
    next : 'End004',
  },
  ffY001 : {
    source : 'videos/ffY001.mp4',
    next : 'End001',
  },
  GN_ffN003 : {
    source : 'videos/GN_ffN003.mp4',
    next : 'End003',
  },
  YGN : {
    text : 'Do you love me?',
    next : {
      Yes : 'GY',
      No : 'GN_ffN003',
    },
    duration : 3000,
  },
  GY : {
    source : 'videos/GY.mp4',
    next : 'YHN',
  },
  GN_ffN003 : {
    source : 'videos/GN_ffN003.mp4',
    next : 'End003',
  },
  YHN : {
    text : 'Do you think that I break free?',
    next : {
      Yes : 'HY001',
      No : 'HN002',
    },
    duration : 3000,
  },
  HY001 : {
    source : 'videos/HY001.mp4',
    next : 'End001',
  },
  HN002 : {
    source : 'videos/HN002.mp4',
    next : 'End002',
  },
  End001 : {
    text : 'Over the sea, there will be a glorious city.<br /><br />-- The City Waltz',
    duration : 4500,
    share : {
      description : 'I\'ve told the tale. Then comes "Over the sea, there will be a glorious city." - The City Waltz',
      picture : 'http://tzchien.com/images/the-city-waltz.png',
    },
  },
  End002 : {
    text : 'Your life chose you at the very beginning.<br /><br />-- The Floor Sample',
    duration : 4500,
    share : {
      description : 'I\'ve told the tale. Then comes "Your life chose you at the very beginning." - The Floor Sample',
      picture : 'http://tzchien.com/images/the-floor-sample.png',
    },
  },
  End003 : {
    text : 'If you\'re picked, then run from reality.<br /><br />-- Black Sheep',
    duration : 4500,
    share : {
      description : 'I\'ve told the tale. Then comes "If you\'re picked, then run from reality." - Black Sheep',
      picture : 'http://tzchien.com/images/black-sheep.png',
    },
  },
  End004 : {
    text : 'To break free, I fade in the wind.<br /><br />-- Floating',
    duration : 4500,
    share : {
      description : 'I\'ve told the tale. Then comes "To break free, I fade in the wind." - Floating',
      picture : 'http://tzchien.com/images/floating.png',
    },
  },
};
