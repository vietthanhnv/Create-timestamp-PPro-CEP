var csInterface = new CSInterface();

// Show/hide custom format input based on selection
document.getElementById('format-select').addEventListener('change', function() {
    var customContainer = document.getElementById('custom-format-container');
    if (this.value === 'custom') {
        customContainer.style.display = 'block';
    } else {
        customContainer.style.display = 'none';
    }
});

document.getElementById('create-btn').addEventListener('click', function() {
    var format = document.getElementById('format-select').value;
    var customPattern = '';
    var cleanNumbers = document.getElementById('clean-numbers').checked;
    
    if (format === 'custom') {
        customPattern = document.getElementById('custom-format').value;
        if (!customPattern.trim()) {
            alert('Please enter a custom format pattern');
            return;
        }
    }
    
    var scriptCall = format === 'custom' 
        ? 'getChapters("' + format + '", "' + customPattern.replace(/"/g, '\\"') + '", ' + cleanNumbers + ')'
        : 'getChapters(' + format + ', "", ' + cleanNumbers + ')';
    
    csInterface.evalScript(scriptCall, function(result) {
        console.log("Raw result:", result);
        var chapters = result.split("|||");
        displayResults(chapters);
    });
});

document.getElementById('copy-btn').addEventListener('click', function() {
    var table = document.getElementById('result-table');
    var text = "";
    for (var i = 1; i < table.rows.length; i++) {
        text += table.rows[i].cells[0].innerText + "\n";
    }
    copyToClipboard(text);
});

function displayResults(chapters) {
    var table = document.getElementById('result-table');
    table.innerHTML = "<tr><th>Timestamp</th></tr>";
    chapters.forEach(function(chapter) {
        var row = table.insertRow(-1);
        var cell = row.insertCell(0);
        cell.textContent = chapter;
    });
}

function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        alert('Copied to clipboard!');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}