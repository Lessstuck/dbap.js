# dbap.js
JavaScript version of dbap spatialization Max object. Its messages control matrix~

DBAP, by Trond Lossius and Pascal Baltazar, is a handy algorithm for moving virtual sound sources through an arbitrarily-placed speaker array. When Tim Place's lovely realization for Max/MSP no longer worked on Apple M1 processors, I hacked this little JavaScript version as a temporary solution, in order to do a subset of what Tim's versionn does, still based on generating messages for Max's matrix~ object. Note that matrix~ should have a float (0. is a good choice) for a third argument, and @ramp set to at least 30.

This is not a port of Tim's object; this is a fresh implementation of the algorithm by Lossius & Baltazar. The major differences from Tim's version are:

  j.dap is initialized with arguments for number of dimensions, sources, and destinations. dbap.js is always 3D. Sources and destinations are added dynamically. 
  
  Messages similar to Place version: "rolloff $1" should go from 3 to 6, depending on the room type, but sometimes values much higher have been used. "blur <source_number> $1" adjusts blur from 0. to 1. Source location is driven by "src_position <source_number>", followed by the xyz coordinates of the source.
  
  Additional messages: "loadSpeakers" loads speaker data from .json file. "clear" removes all destination speaker data. "showSpeakerArray" shows the current state of the destination array.
