EatDailyJam
===========

Downloads todays Daily Jam from dailyjam.co.nz.

This node.js command line app downloads the day's free music MP3 file from DailyJam.co.nz.

You can run it manually, or may I suggest you configure it as a daily cron job, copying the files to
iTunes 'Automatically Add to iTunes' folder; end result being whenever you sync your phone,
you'll get a batch of new tunes without having done anything.  Sweet. We're all about the lack of effort.

##Installation

Ensure you have node and npm installed by executing

```ShellSession
node --version
```

at your command line and see it report Node version at least 0.10. If you are behind or node is not installed,
install / update it from http://nodejs.org/.

Once that is sorted, globally install eat-daily-jam by executing

```ShellSession
npm install -g eat-daily-jam
```

at the command line, which should install the program without error.

##Execution

Once EatDailyJam is installed, test it works OK, it should, by executing this at your command line:

```ShellSession
eat-daily-jam -d .
```

you should see the program have a bit of a chat to you and in the end a music track shows up in your current directory.

```ShellSession
mbp:~ adrian$ eat-daily-jam -d .
Eat Daily Jam v 0.4.0
   Saving jam to "/Users/adrian" folder.
   Reading dailyjam.co.nz...
   Parsing...
   Today's jam is 'Breath of fresh air' by Tim Armstrong Band...
   Downloading... (be patient, this takes a wee while)
Done! Check out 'Breath of fresh air' by Tim Armstrong Band at /Users/adrian and kick out the jam!
```

All good! From there it's over to you, but I suggest you wire up a cron job to execute it daily, so you never miss a jam again.

Big thanks to Si White at Silent Designs (http://silentdesigns.co.nz) for both putting Daily Jam up in the first place, and
also being cool enough to help me out with a couple of changes to his code when I asked nicely for them :)  cheers Si.
