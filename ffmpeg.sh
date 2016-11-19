#!/bin/sh

# Put this script into the folder containing the video sources
# that need to be converted.

# First set bash option to avoid unmatched patterns expand as result values
shopt -s nullglob
# Then store matching file names into filesay
files=( * )

thisFile=$(basename "$0")
echo === Run $thisFile to convert videos by FFmpeg ===

# Iterate through all files
for ((i=0; i<${#files[@]}; ++i)); do
  currentFile=${files[$i]}
  if [[ "$currentFile" == "$thisFile" ]]; then
    unset files[$i]
    continue
  fi

  basename="${currentFile%.*}"
  filename="$basename.mp4"
  echo Convert $currentFile to $filename ....
  ffmpeg -i $currentFile -vcodec copy -acodec copy $filename
done
