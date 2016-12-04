/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var STORYLINE = {
  Intro : {
    text : '曲目 000<br />聽說，有一個這樣的故事...',
    next : 'SecIntro',
    duration : 6000,
  },
  SecIntro : {
    text : '別忘了，會痛，是因為有愛。',
    next : 'Start',
    duration : 4500,
  },
  Start : {
    source : 'videos/Start.mp4',
    next : 'Q',
  },
  Q : {
    text : '還撐得下去嗎？',
    next : {
      可以 : 'QY',
      不行 : 'QN',
    },
    duration : 3000,
  },
  QY : {
    source : 'videos/QY.mp4',
    next : 'YAN',
  },
  YAN : {
    text : '過來嗎？',
    next : {
      好 : 'AY',
      不要 : 'AN',
    },
    duration : 3000,
  },
  QN : {
    source : 'videos/QN.mp4',
    next : 'YaN',
  },
  YaN : {
    text : '你有牽我的手嗎？',
    next : {
      有 : 'aaY',
      沒有 : 'aaN',
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
    text : '這是要給你的，喜歡嗎？',
    next : {
      喜歡 : 'BY',
      不喜歡 : 'BN',
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
    text : '你要吃點藥嗎？',
    next : {
      好 : 'bbY',
      不要 : 'bbN',
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
    text : '跟上去嗎？',
    next : {
      好 : 'CY',
      不要 : 'CN',
    },
    duration : 3000,
  },
  YcN : {
    text : '跟上來嗎？',
    next : {
      好 : 'ccY',
      不要 : 'ccN',
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
    text : '我從不存在，但她一直都在。',
    next : {
      繼續 : 'DG',
      離開 : 'DL',
    },
    duration : 3000,
  },
  YdN : {
    text : '可以讓我進去嗎？',
    next : {
      好 : 'ddY',
      不要 : 'ddN',
    },
    duration : 3000,
  },
  TeF : {
    text : '待在籠子裡是不會自由的。',
    next : {
      對 : 'eeT',
      不對 : 'eeF001',
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
    text : '我從來都沒有家人。',
    next : {
      對 : 'ET',
      不對 :'EF',
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
    text : '你覺得我逃出去了嗎？',
    next : {
      是 : 'FY',
      否 : 'FN004',
    },
    duration : 3000,
  },
  YfN : {
    text : '你愛我嗎？',
    next : {
      愛 : 'ffY001',
      不愛 : 'GN_ffN003',
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
    text : '你愛我嗎？',
    next : {
      愛 : 'GY',
      不愛 : 'GN_ffN003',
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
    text : '你覺得我自由了嗎？',
    next : {
      是 : 'HY001',
      否 : 'HN002',
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
    text : '「海的另一邊，有一個偉大的城市。」<br /><br />-- 城市圓舞曲',
    duration : 4500,
    share : {
      description : '我說了我的故事，接下來是「海的另一邊，有一座偉大的城市。」- 城市圓舞曲',
      picture : 'http://tzchien.com/images/the-city-waltz-chinese.png',
    },
  },
  End002 : {
    // text : '「你的人生早在一開始就決定好了。」<br /><br />-- The Floor Sample',
    // Safari can't show the word started from english character with chinese
    // font, so we need to specify it's english.
    text : '「你的人生早在一開始就決定好了。」<br /><p class="english">-- The Floor Sample</p>',
    duration : 4500,
    share : {
      description : '我說了我的故事，接下來是「你的人生早在一開始就決定好了。」- The Floor Sample',
      picture : 'http://tzchien.com/images/the-floor-sample-chinese.png',
    },
  },
  End003 : {
    // text : '「如果被盯上了，就全力奔跑吧。」<br /><br />-- Black Sheep',
    // Safari can't show the word started from english character with chinese
    // font, so we need to specify it's english.
    text : '「如果被盯上了，就全力奔跑吧。」<br /><p class="english">-- Black Sheep</p>',
    duration : 4500,
    share : {
      description : '我說了我的故事，接下來是「如果被盯上了，就全力奔跑吧。」- Black Sheep',
      picture : 'http://tzchien.com/images/black-sheep-chinese.png',
    },
  },
  End004 : {
    text : '「為了自由，我消逝風中。」<br /><br />-- 飄浮',
    duration : 4500,
    share : {
      description : '我說了我的故事，接下來是「為了自由，我消逝風中。」- 飄浮',
      picture : 'http://tzchien.com/images/floating-chinese.png',
    },
  },
};
