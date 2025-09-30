function getChapters(format, customPattern) {
    var project = app.project;
    var sequence = project.activeSequence;
    var chapters = [];
    var trackCount = 1;
    var debugInfo = "";

    debugInfo += "Project: " + (project ? "exists" : "null") + "\n";
    debugInfo += "Sequence: " + (sequence ? "exists" : "null") + "\n";

    if (sequence && sequence.audioTracks.numTracks > 0) {
        var audioTrack1 = sequence.audioTracks[0];
        debugInfo += "Audio Track 1: " + (audioTrack1 ? "exists" : "null") + "\n";
        debugInfo += "Number of clips: " + audioTrack1.clips.numItems + "\n";
        
        for (var i = 0; i < audioTrack1.clips.numItems; i++) {
            var clip = audioTrack1.clips[i];
            if (clip && clip.projectItem) {
                var clipName = clip.projectItem.name.replace(/\.[^\.]+$/, '');
                var startTime = clip.start.seconds;
                
                var minutes = Math.floor(startTime / 60);
                var seconds = Math.floor(startTime % 60);
                var formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                
                var chapterText = "";
                
                if (format == 1) {
                    chapterText = "Track " + trackCount + ": " + clipName + " (" + formattedTime + ")";
                } else if (format == 2) {
                    chapterText = formattedTime + " " + clipName;
                } else if (format === "custom" && customPattern) {
                    // Replace placeholders in custom pattern
                    chapterText = customPattern
                        .replace(/\{index\}/g, trackCount)
                        .replace(/\{name\}/g, clipName)
                        .replace(/\{time\}/g, formattedTime);
                } else {
                    chapterText = formattedTime + " " + clipName; // fallback
                }
                
                chapters.push(chapterText);
                trackCount++;
            }
        }
    }

    if (chapters.length === 0) {
        chapters.push("No chapters found. Debug info: " + debugInfo);
    }

    return chapters.join("|||");
}