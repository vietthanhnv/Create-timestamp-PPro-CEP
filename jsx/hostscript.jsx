function getChapters(format, customPattern, cleanNumbers, removeTrackNumbers, soleTrackMode) {
    var project = app.project;
    var sequence = project.activeSequence;
    var chapters = [];
    var trackCount = 1;
    var debugInfo = "";

    debugInfo += "Project: " + (project ? "exists" : "null") + "\n";
    debugInfo += "Sequence: " + (sequence ? "exists" : "null") + "\n";
    debugInfo += "Sole track mode: " + (soleTrackMode ? "enabled" : "disabled") + "\n";

    if (sequence && sequence.audioTracks.numTracks > 0) {
        var tracksToScan = [];
        
        if (soleTrackMode && sequence.audioTracks.numTracks >= 2) {
            // Sole track mode: scan both track 1 and 2
            tracksToScan.push(sequence.audioTracks[0]);
            tracksToScan.push(sequence.audioTracks[1]);
            debugInfo += "Scanning both audio tracks 1 and 2\n";
        } else {
            // Normal mode: scan only track 1
            tracksToScan.push(sequence.audioTracks[0]);
            debugInfo += "Scanning audio track 1 only\n";
        }
        
        // Collect all clips from selected tracks with their start times
        var allClips = [];
        
        for (var trackIndex = 0; trackIndex < tracksToScan.length; trackIndex++) {
            var audioTrack = tracksToScan[trackIndex];
            debugInfo += "Track " + (trackIndex + 1) + " clips: " + audioTrack.clips.numItems + "\n";
            
            for (var i = 0; i < audioTrack.clips.numItems; i++) {
                var clip = audioTrack.clips[i];
                if (clip && clip.projectItem) {
                    allClips.push({
                        clip: clip,
                        startTime: clip.start.seconds,
                        trackNumber: trackIndex + 1
                    });
                }
            }
        }
        
        // Sort clips by start time to get chronological order
        allClips.sort(function(a, b) {
            return a.startTime - b.startTime;
        });
        
        // Process sorted clips
        for (var j = 0; j < allClips.length; j++) {
            var clipData = allClips[j];
            var clip = clipData.clip;
            var clipName = clip.projectItem.name.replace(/\.[^\.]+$/, '');
            
            // Remove track numbers from beginning if option is enabled
            if (removeTrackNumbers) {
                // Remove patterns like "01 - ", "02 - ", "1. ", "2. ", etc. at the beginning
                clipName = clipName.replace(/^\d+[\s\-\.]+/, '');
            }
            
            // Clean numerical suffixes if option is enabled
            if (cleanNumbers) {
                // Remove patterns like " (1)", " (2)", etc. at the end of the name
                clipName = clipName.replace(/\s*\(\d+\)$/, '');
            }
            
            var startTime = clipData.startTime;
            
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

    if (chapters.length === 0) {
        chapters.push("No chapters found. Debug info: " + debugInfo);
    }

    return chapters.join("|||");
}