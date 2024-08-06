     
function printLabel() {
    var { productName, size, Ndecarton, Ndepiece, date, caliber } = savingvalues();
    
    var originalContent = document.body.innerHTML;
    var labelContent = document.getElementById('label-preview').innerHTML;

    
    document.body.innerHTML = labelContent;
    window.print();
    
    document.body.innerHTML = originalContent;

    
    document.getElementById('product-name').value = productName;
    document.getElementById('Forma').value = size;
    document.getElementById('Ndecarton').value = Ndecarton;
    document.getElementById('Ndepiece').value = Ndepiece;
    document.getElementById('date').value = date;

    
    document.querySelectorAll('#cliberbtns button').forEach(function(button) {
        button.classList.remove('selected');
        if (button.innerText === caliber) {
            button.classList.add('selected');
        }
    });

    
    attachEventListeners();
}


const generateLabelContent = (object) => {
    return (
    `<div class="card-div">
        <div class="header">
            <img src="${object.imageURL}" alt="Sadjia Ceram">
            <h1 class="uppercase-text" >sadjia ceram</h1>
            <img src="${object.imageURL}" alt="Sadjia Ceram">
        </div>
        <div class="general-info">
            <h2 class="uppercase-text" >zone industrielle sidi bouamama sidi chahmi essenia</h2>
            <h2>Tel: 05 60 83 83 83</h2>
        </div>
        <div class="model-and-format-div">
            <div class="labeled-div">
                <label class="label uppercase-text" for="model-color">model:</label>
                <h2 id="model">${object.productName}</h2>
            </div>
            <div class="labeled-div">
                <label class="uppercase-text label" for="format">format:</label>
                <h2 id="format">${object.format}</h2>
            </div>
        </div>
        <div class="dimensions-div">
            <h2>${object.cartonNumbers} cartons</h2>
            <h2>${object.pieceNumber} pieces/crt</h2>
            <h2>${object.surface} </h2>
        </div>
        <div class="data-and-time">
            <div class="labeled-div"">
                <label class="uppercase-text label" for="date">date:</label>
                <h2 id="date">${object.date}</h2>
            </div>
        </div>
        <div class="choice-div">
            <div class="labeled-div"">
                <label class= "uppercase-text labelChoice" for="choice">choix:</label>
                <h2 id="choice">${object.caliber}</h2>
            </div>
        </div>
    </div> `
    );
}

function Alllabels(caliber) {
    var { productName, Ndecarton, Ndepiece, date } = savingvalues();
    var surface = surfacearea() + " M²";
    var Forma = hundelforma();
    var imageURL = "images/download.png";

    const object = {
        productName,
        cartonNumbers: Ndecarton,
        pieceNumber: Ndepiece,
        date,
        format: Forma,
        surface,
        imageURL,
        caliber
    };

    const labelContent = generateLabelContent(object);    
    document.getElementById('label-content').innerHTML = labelContent;
    document.getElementById('label-preview').style.display = 'flex';

    
    document.querySelectorAll('#cliberbtns button').forEach(function(button) {
        button.classList.toggle('selected', button.innerText === caliber);
    });
}


function savingvalues(){
    var productName = document.getElementById('product-name').value;
    var size = document.getElementById('Forma').value;
    var Ndecarton = document.getElementById('Ndecarton').value;
    var Ndepiece = document.getElementById('Ndepiece').value;
    var date = document.getElementById('date').value;

    
    var caliberButton = document.querySelector('#cliberbtns .selected');
    var caliber = caliberButton ? caliberButton.innerText : "";

    return {productName,size,Ndecarton,Ndepiece,date,caliber} ;
}
function surfacearea() {
    var { size ,Ndecarton,Ndepiece} = savingvalues();
    var dimensions = size.split(/[^0-9]+/);
    if (dimensions.length < 2) return "Invalid size format";
    var width = parseInt(dimensions[0], 10);
    var height = parseInt(dimensions[1], 10);
    if (isNaN(width) || isNaN(height)) return "Invalid dimensions";
    var surface = (width/1000 * height/1000) * Ndecarton * Ndepiece;
    return surface.toFixed(2);
}

function hundelforma() {
    var { size } = savingvalues();
    var dimensions = size.split(/[^0-9]+/);
    if (dimensions.length < 2) return "Invalid size format";
    var width = parseInt(dimensions[0], 10);
    var height = parseInt(dimensions[1], 10);
    if (isNaN(width) || isNaN(height)) return "Invalid dimensions";
    return `${width} X ${height}`;
}

function attachEventListeners() {
    document.querySelectorAll('#cliberbtns button').forEach(function(button) {
        button.addEventListener('click', function() {
            
            document.querySelectorAll('#cliberbtns button').forEach(function(btn) {
                btn.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            Alllabels(this.innerText);
        });
    });
}
