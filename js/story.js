// The story is composed by many videos and text prompts. The videos and prompts
// are packaged into chunks, and all the chunks are structured as a tree.
//
//         +- D
//    +- B +
//    |    +- E
// A -+
//    |    +- E (Link to same node is available)
//    +- C +
//         +- B (Use same chunk is available)
//         |
//         +- A (Loop is available)
//
// The storyline goes by one path, depending on user's answers for questions
// shown during prompt.
//
// Author : Chun-Min Chang    chun.m.chang@gmail.com
// Date   : 2016-11-4
'use strict';

// const STORYLINE will be loaded dynamically based on the selected language.
(function(aExports) {
  var debug = true;

  /*
   * Story Player
   * ======================================================== */
  function Story(aStoryline, aRootNode, aMusicFile, aBackgroundVideo) {
    log('Story constructor');
    assert(aStoryline, 'No settings!');
    this._storyline = aStoryline;
    assert(aRootNode, 'No root DOM node to insert!');
    this._rootNode = aRootNode;
    assert(aMusicFile, 'No music!');
    this._music = aMusicFile;
    aBackgroundVideo && (this._bgVideo = aBackgroundVideo);
  }

  Story.prototype = {
    _storyline: null, // The story tree with videos and prompts information.
    _currentChunk: null, // The current playing chunk.
    _queue: new Map(), // Contain the preloaded chunk candidates.
    _rootNode: null, // The root DOM node to insert the chunk elements.
    _music: null, // The music played when story goes.
    _bgVideo: null, // The background video that will be played during prompt.

    init: function(aStartId) {
      log('init: ' + aStartId);
      this._initMusic(this._music);
      // Load the background video into the DOM tree if it exists.
      if (this._bgVideo) {
        this._initBackgroundVideo(this._bgVideo);
        // this._bgVideo.style.display = 'none'; // Hide it first.
      }
      // Load the beginning chunk into the DOM tree.
      this._currentChunk = this._loadChunk(aStartId);
    },

    start: function() {
      log('start');
      this._music.play();
      this._loop();
    },

    _loop: function() {
      log('_loop');

      // Clear the preload chunks from the DOM tree and clear the queue.
      for (let [id, chunk] of this._queue) {
        removeElement(chunk.element);
      }
      this._queue.clear();

      // Check if there is next chunk for playing.
      if (!this._currentChunk) {
        log('No chunk for playing. The story is ended.');
        return;
      }

      // Preload the next candidates and push them into queue.
      if (this._currentChunk.next) {
        if (typeof this._currentChunk.next === 'string') {
          this._queue.set(this._currentChunk.next,
                          this._loadChunk(this._currentChunk.next, true));
        } else if (typeof this._currentChunk.next === 'object') {
          for (let option in this._currentChunk.next) {
             this._queue.set(this._currentChunk.next[option],
                             this._loadChunk(this._currentChunk.next[option], true));
          }
        }
        assert(this._queue.size, 'Queue should not be empty!');
      }

      // Set the callback fired after ending play.
      this._currentChunk.onEnded = (function(aNextId) {
        log('next chunk: ' + aNextId);
        // Assign the next chunk and remove it from the queue.
        if (aNextId) {
          // Take out the next playing chunk from the queue.
          let nextChunk = this._queue.get(aNextId);
          assert(nextChunk, 'The next chunk should be in the queue!');
          this._queue.delete(aNextId);
          // Stop the background video only when the current chunk is prompt and
          // the next is video, so that the background video doesn't stop between
          // two successive prompt chunks.
          if (this._bgVideo && !this._currentChunk.isVideo && nextChunk.isVideo) {
            log('Stop the background video.');
            this._bgVideo.pause();
            this._bgVideo.style.display = 'none';
            this._bgVideo.load(); // Reset to beginning.
          }
          // Remove the current chunk element from DOM tree
          // if there is a next chunk element.
          removeElement(this._currentChunk.element);
          this._currentChunk = nextChunk;
        } else {
          this._bgVideo && !this._bgVideo.paused && this._bgVideo.pause();
          this._currentChunk = null;
        }
        // Keep looping.
        this._loop();
      }).bind(this);

      // Play the background video during prompt if it's not playing.
      if (this._bgVideo && !this._currentChunk.isVideo && this._bgVideo.paused) {
        log('Play the background video.');
        this._bgVideo.style.display = 'block';
        this._bgVideo.play();
      }

      this._currentChunk.play();
    },

    _loadChunk: function(aChunkId, aHide) {
      assert(aChunkId, 'No chunk id!');
      let chunk = (this._storyline[aChunkId].source) ?
        new VideoChunk(aChunkId, this._storyline[aChunkId].source,
                       this._storyline[aChunkId].next) :
        new PromptChunk(aChunkId, this._storyline[aChunkId].text,
                        this._storyline[aChunkId].next,
                        this._storyline[aChunkId].duration);
      aHide && (chunk.element.style.display = 'none');
      this._rootNode.appendChild(chunk.element);
      return chunk;
    },

    _initMusic: function(aSource) {
      assert(aSource, 'No source for audio!');
      let audio = document.createElement('audio');
      audio.src = aSource;
      this._rootNode.appendChild(audio);
      this._music = audio;
    },

    _initBackgroundVideo: function(aSource) {
      assert(aSource, 'No source for background video!');
      this._bgVideo = (new VideoChunk('bgVideo', aSource)).element;
      this._bgVideo.classList.add('background-video');
      this._rootNode.appendChild(this._bgVideo);
    },
  };

  /*
   * Chunk Classes
   * ======================================================== */
  // Base Chunk Class
  // ------------------------------------
  function Chunk() {}
  Chunk.prototype = {
    element: null, // Return a video element or div element.
    id: null, // The chunk id used only in debugging log.
    next: null, // Return next chunk candidates.
    nextId: null, // The id for next chunk.
    get isVideo() {
      return this.element.tagName.toUpperCase() === 'VIDEO';
    },
    onEnded() {
      throw new Error("Not implemented.");
    },
    play() {
      throw new Error("Not implemented.");
    },
  };

  // Video Chunk Class
  // ------------------------------------
  function VideoChunk(aId, aSource, aNext) {
    assert(aSource, 'No video source!');
    let video = document.createElement('video');
    video.src = aSource;
    video.id = this.id = aId;
    video.classList.add('full-size');
    video.preload = 'auto'; // Preload the video for better experience!
    this.element = video;
    if (aNext) {
      assert(typeof aNext === 'string', 'Next chunk of video should be a id string');
      this.next = this.nextId = aNext;
    }
  }
  VideoChunk.prototype = {
    __proto__: new Chunk(),
    play() {
      log('VideoChunk::play ' + this.id);
      this.element.style.display = 'block';
      this.element.onended = (function(){
        this.onEnded(this.nextId);
      }).bind(this);
      this.element.play();
    },
  };

  // Prompt Chunk Class
  // ------------------------------------
  function PromptChunk(aId, aText, aOptions, aDuration) {
    assert(aText, 'No prompt text!');
    aDuration && (this._duration = aDuration);
    this.next = (aOptions) ? aOptions : null;

    let prompt = document.createElement('div');
    prompt.classList.add('prompt');
    prompt.id = this.id = aId;

    let table = document.createElement('div');
    table.classList.add('table');
    let textRow = document.createElement('div');
    textRow.classList.add('row');
    let textCell = document.createElement('div');
    textCell.classList.add('cell');
    textCell.innerHTML = aText;
    textRow.appendChild(textCell);
    table.appendChild(textRow);
    if (typeof aOptions === 'string') {
      // There is no need to show the option if there is only one choice.
      this.nextId = aOptions;
    } else if (typeof aOptions === 'object') {
      let optionRow = document.createElement('div');
      optionRow.classList.add('row');
      let optionTable = document.createElement('div');
      optionTable.classList.add('table');
      for (let key in aOptions) {
        let optionCell = document.createElement('div');
        optionCell.classList.add('cell');
        optionCell.style.width = (100 / Object.keys(aOptions).length) + '%';
        optionCell.innerHTML = key;
        optionCell.dataset.key = key;
        optionCell.classList.add('button');
        optionCell.onclick = onSelect.bind(this);
        optionTable.appendChild(optionCell);
        function onSelect(aEvent) {
          let key = aEvent.target.dataset.key;
          log(aEvent.type + ' ' + key + '(' + aOptions[key] + ')');
          this.nextId = aOptions[key];
        };
      }
      // The default next chunk is the first option.
      this.nextId = aOptions[Object.keys(aOptions)[0]];
      optionRow.appendChild(optionTable);
      table.appendChild(optionRow);
    }

    prompt.appendChild(table);
    this.element = prompt;
  }
  PromptChunk.prototype = {
    __proto__: new Chunk(),
    _duration: 1000, // duration for showing prompt.
    play() {
      log('PromptChunk::play ' + this.id + ' for ' + this._duration + 'ms');
      this.element.style.display = 'block';
      setTimeout((function() {
        this.onEnded(this.nextId);
      }).bind(this), this._duration);
    },
  };

  /*
   * Helpers
   * ======================================================== */
  function log(aMsg) {
    debug && console.log('[Story.js] ' + aMsg);
  }

  function assert(aCondition, aMsg) {
    // console.assert(aCondition, aMsg);
    if (!aCondition) {
      throw ('[Story] ' + aMsg) || "Assertion failed";
    }
  }

  function removeElement(aElement) {
    aElement.parentElement.removeChild(aElement);
  }

  /*
   * Language Selection
   * ======================================================== */
   function createLanguageOptions(aLanguages, onSelected) {
     let table = document.createElement('div');
     table.classList.add('table');
     let row = document.createElement('div');
     row.classList.add('row');
     let optionTable = document.createElement('div');
     optionTable.classList.add('table');
     for (let lang in aLanguages) {
       let optionCell = document.createElement('div');
       optionCell.classList.add('cell', aLanguages[lang].class);
       optionCell.style.width = (100 / Object.keys(aLanguages).length) + '%';
       optionCell.innerHTML = aLanguages[lang].text;
       optionCell.dataset.lang = lang;
       optionCell.classList.add('button');
       optionCell.onclick = onSelect.bind(this);
       optionTable.appendChild(optionCell);
       function onSelect(aEvent) {
         let lang = aEvent.target.dataset.lang;
         log('Select ' + lang + '(' + aLanguages[lang].text + ')');
         onSelected(lang);
       };
     }
     row.appendChild(optionTable);
     table.appendChild(row);
     return table;
   }

   function setLanguage(aRootNode, aLanguages) {
     let matches = navigator.languages.filter(function(aLang) {
       return Object.keys(aLanguages).indexOf(aLang) > -1;
     });
     matches && log('Possible prefered languages: ' + matches);
     return new Promise(function(aResolve, aReject) {
       let langOptions = createLanguageOptions(aLanguages, function(aLanguage) {
         // Set the corresponding font-family for the following story.
         aRootNode.classList.add(aLanguages[aLanguage].class);
         removeElement(langOptions);
         aResolve(aLanguage);
       });
       aRootNode.appendChild(langOptions);
     });
   }

   function loadStoryline(aLanguage) {
     return new Promise(function(aResolve, aReject) {
       let script = document.createElement('script');
       script.src = 'js/storyline/' + aLanguage + '/source.js';
       log('load STORYLINE from : ' + script.src);
       script.onload = function () {
         assert(STORYLINE, 'STORYLINE should be defined in ' + script.src);
         aResolve();
       };
       document.head.appendChild(script);
     });
   }

  /*
   * Start-up
   * ======================================================== */
  function startup() {
    // Get the root DOM node to insert our story.
    const rootNode = document.getElementById('story');

    // The entry point of the story.
    const beginning = 'Intro';
    // The file path of the story music.
    const music = 'music/they-tell-a-tale-preview.mp3';
    // The file path of background video shown during prompt.
    const backgroundVideo = 'videos/background.mp4';

    const langs = {
      'en-US' : {
        text : 'English',
        class : 'english',
      },
      'zh-TW' : {
        text: '中文',
        class : 'chinese',
      },
    };
    setLanguage(rootNode, langs).then(loadStoryline).then(function() {
      // Set up the story configurations.
      var story = new Story(STORYLINE, rootNode, music, backgroundVideo);
      // Init the music and load the first chunk.
      story.init(beginning);
      // Start playing the story.
      story.start();
    });
  }

  aExports.ready(startup);
}(window));
