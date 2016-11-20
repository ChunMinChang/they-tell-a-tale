const STORYLINE = {
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
    text : '還撐得下去嗎?',
    next : {
      可以 : 'QY',
      不行 : 'QN',
    },
    duration : 3000,
  },
  QY : {
    source : 'videos/QY.mp4',
    next : 'EndY',
  },
  QN : {
    source : 'videos/QN.mp4',
    next : 'EndN',
  },
  EndY : {
    text : '你的旅程將在 12/2 繼續。',
  },
  EndN : {
    text : '前方的道路將在 12/2 再次浮現。',
  }
};
