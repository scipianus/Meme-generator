function redrawMeme(image, topLine, bottomLine) {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    context.font = '36pt Impact';
    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    
    if (topLine !== null) {
        context.fillText(topLine, canvas.width / 2, 50, canvas.width);
        context.strokeText(topLine, canvas.width / 2, 50, canvas.width);
    }
    if (bottomLine !== null) {
        context.fillText(bottomLine, canvas.width / 2, canvas.height - 50, canvas.width);
        context.strokeText(bottomLine, canvas.width / 2, canvas.height - 50, canvas.width);
    }
}

function textChangeListener(e) {
    var id = e.target.id;
    var text = e.target.value;

    if (id == 'topLineText') {
        window.topLineText = text;
    } else {
        window.bottomLineText = text;
    }

    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function saveFile() {
    document.getElementById('downloadLink').href = document.getElementById('myCanvas').toDataURL('image/jpeg');
}

function handleFileSelect(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(fileObject) {
        var data = fileObject.target.result;

        var image = new Image();
        image.onload = function() {
            window.imageSrc = this;
            redrawMeme(window.imageSrc, null, null);
        };

        image.src = data;
    };
    reader.readAsDataURL(file);
}

function setup() {
    window.topLineText = '';
    window.bottomLineText = '';
    var input1 = document.getElementById('topLineText');
    var input2 = document.getElementById('bottomLineText');
    input1.oninput = textChangeListener;
    input2.oninput = textChangeListener;
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('saveBtn').addEventListener('click', saveFile, false);
}