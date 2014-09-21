EatDailyJam
===========

Downloads todays Daily Jam from dailyjam.co.nz.

Still a work in progress. This node.js command line app downloads the day's free track from DailyJam.co.nz.
The plan is to get cron running this once a day, copying the files to iTunes 'Automatically Add to iTunes' folder 
- yielding the end result that whenever I sync my phone, I'll get a batch of new tunes without having done anything.

At present this script works OK when invoked via Node manually e.g.
cd <install dir>
./EatDailyJam.js -d /path/to/folder

so all that is left to do is get it 'npm installable'.

Big thanks to Si White at Silent Designs (http://silentdesigns.co.nz) for both putting Daily Jam up in the first place, and
also being cool enough to help me out with a couple of changes to his code when I asked nicely for them :)  cheers Si.
