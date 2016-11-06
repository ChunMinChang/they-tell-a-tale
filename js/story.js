// The story is composed by many videos and text prompts. The videos and prompts
// are packaged into chunks, and all the chunks are structured as a tree.
// The storyline goes by one path, depending on user's answers for questions
// shown during prompt.
//
// Author : Chun-Min Chang    chun.m.chang@gmail.com
// Date   : 2016-11-4
'use strict';

// The below variables are settings imported from source.js.
// const STORYLINE: story tree with settings.
// const BEGINNING: the entry point of the story.
// const MUSIC: the source path of the story music.
// const BACKGROUND_VIDEO: the source path of the background video.
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
    _rootNode: null, // The root DOM node to insert the chunk elements.
    _music: null, // The music played when story goes.
    _bgVideo: null, // The background video that will be played during prompt.

    init: function(aStartId) {
      log('init: ' + aStartId);
      this._initMusic(this._music);
      // Load the background video into the DOM tree.
      if (this._bgVideo) {
        this._bgVideo = (new VideoChunk('bgVideo', this._bgVideo)).element;
        this._bgVideo.classList.add('background-video');
        this._rootNode.appendChild(this._bgVideo);
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
      if(!this._currentChunk) {
        log('No chunk for playing. The story is finished.');
        return;
      }
      // Set the callback fired after ending play.
      this._currentChunk.onEnded = (function(aNextId) {
        log('next chunk: ' + aNextId);
        if (aNextId) {
          // Stop the background video only when the current chunk is prompt and
          // the next is video, so that the background video doesn't stop between
          // two successive prompt chunks.
          let nextChunk = this._loadChunk(aNextId);
          if (this._bgVideo && !this._currentChunk.isVideo && nextChunk.isVideo) {
            log('Stop the background video.');
            this._bgVideo.pause();
            this._bgVideo.style.display = 'none';
            this._bgVideo.load(); // Reset to beginning.
          }
          // Remove this chunk element from DOM tree.
          removeElement(this._currentChunk.element);
          this._currentChunk = nextChunk;
        } else {
          this._bgVideo && this._bgVideo.pause();
          this._currentChunk = null;
        }
        // Keep looping.
        this._loop();
      }).bind(this);
      // Play the background video during prompt.
      if (this._bgVideo && !this._currentChunk.isVideo && this._bgVideo.paused) {
        log('Play the background video.');
        this._bgVideo.style.display = 'block';
        this._bgVideo.play();
      }
      // Play this chunk.
      this._currentChunk.play();
    },

    _loadChunk: function(aChunkId) {
      assert(aChunkId, 'No chunk id!');
      let chunk = (this._storyline[aChunkId].source) ?
        new VideoChunk(aChunkId, this._storyline[aChunkId].source,
                       this._storyline[aChunkId].next) :
        new PromptChunk(aChunkId, this._storyline[aChunkId].text,
                        this._storyline[aChunkId].next,
                        this._storyline[aChunkId].duration);
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
  };

  /*
   * Chunk Classes
   * ======================================================== */
  // Base Chunk Class
  // ------------------------------------
  function Chunk() {}
  Chunk.prototype = {
    id: null, // The chunk id used only in debugging log.
    nextId: null, // The id for next chunk.
    element: null, // Return a video element or div element.
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
    this.element = video;
    this.nextId = aNext;
  }
  VideoChunk.prototype = {
    __proto__: new Chunk(),
    play() {
      log('VideoChunk::play ' + this.id);
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
      // There is only one option for next chunk, so no need to show choice.
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
   * Start-up
   * ======================================================== */
  function startup() {
    // Get the root DOM node to insert our story.
    const rootNode = document.getElementById('story');
    // Set up the story configurations.
    var story = new Story(STORYLINE, rootNode, MUSIC, BACKGROUND_VIDEO);
    // Init the music and the first chunk.
    story.init(BEGINNING);
    // Start playing the story.
    story.start();
  }

  aExports.ready(startup);
}(window));
