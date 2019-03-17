# They Tell a Tale
This is a same-name project of [_TzChien慈謙_](http://tzchien.com/)'s song, _They Tell a Tale_,
for designing an __interactive__ MV.
You can see the short [demo here](https://chunminchang.github.io/they-tell-a-tale/). For the whole story, please go [tzchien.com](http://tzchien.com/albums/Life-as-an-Individual/they-tell-a-tale/) to experience it.

The interactive MV is composed by several video pieces and questions prompted
to audiences. The story of MV varies from person to person,
depending on the user's answers.

## How to compose your own MV
You need to structure the storyline as a __tree__.
```
         +- D
    +- B +
    |    +- E
 A -+
    |    +- E (Link to same node is available)
    +- C +
         +- B (Use same chunk is available)
         |
         +- A (Loop is available)
```
Each node(A, B, ..) is a small video file and every fork comes with a option
for user to choose a branch, so the storyline goes by one path.
More specifically, you need to define two type of nodes. One is video,
and the other is a option. The __video node__ is defined as:
```
video1 : {
  source : 'path/to/file.mp4',
  next : 'option1',
},
```

While the __option__ node is defined as:
```
option1 : {
  text : 'Do you like it?',
  next : {
    Yes : 'video2',
    No : 'video3',
  },
  duration : 3000,
},
```

The setting is intuitive. The ```video1``` and ```option1``` are the _id_ of
nodes. If ```source``` is defined in the node, then it's _video_ node.
On the other hand, the ```text``` is necessary to be set for _option_ node.

### Next node
The ```next``` must be the _id_ of some node for the _video_ node,
while it could be _id_ or dictionary of _id_ for the _option_ node.
If it's a dictionary, then it is a map to link __options__ to
its corresponding next node. Take ```option1``` above as an example,
the next node is ```video2```/```video3``` when the answer is ```Yes```/```No```.

There is no restriction for linking nodes. You can link _video_ to _video_,
_video_ to _option_, _option_ to _video_, or _option_ to _option_.

#### Default next
The _id_ of the __first__ pair in the dictionary is the default id of next node.

### Duration for option node
There is a ```duration``` setting for _option_ node to limit the displayed time.
If the ```duration``` is set to ```3000```, then this option will be
displayed ```3000```_ms_ and then jump to the next node directly.

### Background video for option node
You can set a background video played during the option is displaying.
Please see the ```backgroundVideo``` in the [story.js](js/story.js).

### Languages
You need to provide different sources for different languages.
Remember to define the corresponding [css](css/common.css) for its font
and modify the [story.js](js/story.js) to set this pair.

## Examples
Please see the [story.js](js/story.js) and following source.js
- [en-US](js/storyline/en-US/source.js)
- [zh-TW](js/storyline/zh-TW/source.js)

## Converting videos into MP4 format
_ffmpeg.sh_ is used to convert video files into _MP4_ format.
Put _ffmpeg.sh_ with all the videos that need to be converted into a folder,
then go to the folder and run ```bash ffmpeg.sh```.
The _MP4_ videos will be created after running the script.
