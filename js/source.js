// The chunks are structured as a tree, and the story goes by one path.
//
//         +- D
//    +- B +
//    |    +- E
// A -+
//    |    +- E (Link to same node is available)
//    +- C +
//         +- B (Use same chunk is available)
//         |
//         +- C (Loop is available)
//
// More specifically, the video chunks are actually structured as follows:
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
    text : 'Your jorney will be continued on 11/30.',
  },
  EndN : {
    text : 'The path will be revealed again on 11/30.',
  }
};

// The entry point of the story.
const BEGINNING = 'Intro';

// The file path of the story music.
const MUSIC = 'music/they-tell-a-tale-preview.mp3';

// The file path of background video shown during prompt.
const BACKGROUND_VIDEO = 'videos/background.mp4';
