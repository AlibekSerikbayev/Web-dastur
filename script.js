function loadImage() {
    const input = document.getElementById('upload');
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.width = 400;
        img.height = 400;
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').appendChild(img);
    };
    
    reader.readAsDataURL(file);
}

function identifyImage() {
    const input = document.getElementById('upload');
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/identify', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML += `<p>${data.label} (${data.confidence}%)</p>`;
    })
    .catch(error => console.error('Error:', error));
}
