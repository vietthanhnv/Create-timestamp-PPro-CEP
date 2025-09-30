var csInterface = new CSInterface();

// Load saved formats on startup
document.addEventListener('DOMContentLoaded', function() {
    loadSavedFormats();
});

// Show/hide custom format input based on selection
document.getElementById('format-select').addEventListener('change', function() {
    var customContainer = document.getElementById('custom-format-container');
    if (this.value === 'custom') {
        customContainer.style.display = 'block';
        loadSavedFormats(); // Refresh the list when showing
    } else {
        customContainer.style.display = 'none';
    }
});

// Save format functionality
document.getElementById('save-format-btn').addEventListener('click', function() {
    var formatPattern = document.getElementById('custom-format').value.trim();
    if (!formatPattern) {
        alert('Please enter a format pattern to save');
        return;
    }
    
    var formatName = prompt('Enter a name for this format:', '');
    if (formatName && formatName.trim()) {
        saveCustomFormat(formatName.trim(), formatPattern);
        loadSavedFormats();
        alert('Format saved successfully!');
    }
});

// Load format functionality
document.getElementById('load-format-btn').addEventListener('click', function() {
    var selectedFormat = document.getElementById('saved-formats').value;
    if (selectedFormat) {
        var savedFormats = getSavedFormats();
        if (savedFormats[selectedFormat]) {
            document.getElementById('custom-format').value = savedFormats[selectedFormat];
        }
    } else {
        alert('Please select a format to load');
    }
});

// Delete format functionality
document.getElementById('delete-format-btn').addEventListener('click', function() {
    var selectedFormat = document.getElementById('saved-formats').value;
    if (selectedFormat) {
        if (confirm('Are you sure you want to delete "' + selectedFormat + '"?')) {
            deleteCustomFormat(selectedFormat);
            loadSavedFormats();
            document.getElementById('custom-format').value = '';
            alert('Format deleted successfully!');
        }
    } else {
        alert('Please select a format to delete');
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

// Custom format management functions
function getSavedFormats() {
    try {
        var saved = localStorage.getItem('timestampCustomFormats');
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        console.error('Error loading saved formats:', e);
        return {};
    }
}

function saveCustomFormat(name, pattern) {
    try {
        var savedFormats = getSavedFormats();
        savedFormats[name] = pattern;
        localStorage.setItem('timestampCustomFormats', JSON.stringify(savedFormats));
    } catch (e) {
        console.error('Error saving format:', e);
        alert('Error saving format. Please try again.');
    }
}

function deleteCustomFormat(name) {
    try {
        var savedFormats = getSavedFormats();
        delete savedFormats[name];
        localStorage.setItem('timestampCustomFormats', JSON.stringify(savedFormats));
    } catch (e) {
        console.error('Error deleting format:', e);
        alert('Error deleting format. Please try again.');
    }
}

function loadSavedFormats() {
    var savedFormats = getSavedFormats();
    var select = document.getElementById('saved-formats');
    
    // Clear existing options except the first one
    select.innerHTML = '<option value="">-- Select a saved format --</option>';
    
    // Add saved formats to dropdown
    for (var name in savedFormats) {
        if (savedFormats.hasOwnProperty(name)) {
            var option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        }
    }
}