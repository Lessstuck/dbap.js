# dbap.js
When loaded into Max’s js object, dbap.js implements a JavaScript version of Tim Place's j.dbap object. Its messages control matrix~.

DBAP, by Trond Lossius and Pascal Baltazar, is a handy algorithm for moving virtual sound sources through an arbitrarily-placed speaker array. When j.dbap no longer worked on Apple M1 processors, I hacked this little JavaScript version as a temporary solution. This is not a port of Tim's object; this is a fresh implementation of the original paper by Lossius & Baltazar.

It does a subset of what Tim's object does. Just like when using j.dap, the matrix~ should have a float (0. is a good choice) for a third argument, and @ramp set to at least 30.

Differences from j.dbap:

    • j.dap is initialized with arguments for number of dimensions, sources, and destinations.
      dbap.js does not have initialization arguments.

    • dbap.js is always 3D.
  
    • Sources and destinations are added dynamically, after clearing the destination array with a "clear" message.
  
    • "loadSpeakers" loads speaker data from .json file, but the preferred method is to read from a .csv file.
  
    • "showSpeakerArray" posts the current state of the destination array in the Max window.
  
Similarities compared to j.dbap:

    • "rolloff $1", with a range of 3 to 6, implements the distinction between spaces with walls or not.
      Values much higher have been used for effect.

    • "blur <source_number> $1" adjusts blur from 0. to 1.
  
    • Source location is driven by "src_position <source_number> <x> <y> <z>".
  
    • Speaker locations are loaded using "dst_position <speaker_number> <x> <y> <z>"
