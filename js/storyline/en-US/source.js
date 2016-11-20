const STORYLINE = {
  Intro : {
    text : 'Track 000<br />They Tell a Tale',
    next : 'SecIntro',
    duration : 6000,
  },
  SecIntro : {
    text : 'Remember, we hurt because we love.',
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
    next : 'EndY',
  },
  QN : {
    source : 'videos/QN.mp4',
    next : 'EndN',
  },
  EndY : {
    text : 'Your jorney will be continued on 12/2.',
  },
  EndN : {
    text : 'The path will be revealed again on 12/2.',
  }
};
