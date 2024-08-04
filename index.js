     
function printLabel() {
      var { productName, size, Ndecarton, date } = savingvalues();
      
      var originalContent = document.body.innerHTML;
  
      var labelContent = document.getElementById('label-preview').innerHTML;
  
      document.body.innerHTML = labelContent;
  
      window.print();
  
      document.body.innerHTML = originalContent;
      document.getElementById('product-name').value = productName;
      document.getElementById('Forma').value = size;
      document.getElementById('Ndecarton').value = Ndecarton;
      document.getElementById('date').value = date;

    attachEventListeners();
}




function Alllabels(caliber){
    var { productName, Ndecarton, date } = savingvalues();
    var surface = surfacearea() + " M^2";
    var Forma = hundelforma();
    var imageURL = "images/download.png" ;

    var labelContent = `

    <img src="${imageURL}" alt="Label Image" style="
    display: block; 
    width: 400px; 
    height: auto; 
    margin: 10px auto 0;
    " /><br>

    <strong>Nom de Model:</strong> ${productName} <br>
    <strong>Caliber:</strong> ${caliber} <br>
    <strong>Forma:</strong> ${Forma} <br>
    <strong>surface:</strong> ${surface} <br>
    <strong>N de Carton:</strong> ${Ndecarton} <br>
    <strong>Date:</strong> ${date} 

    `;
    document.getElementById('label-content').innerHTML = labelContent;
    document.getElementById('label-preview').style.display = 'block';
}


function savingvalues(){
    var productName = document.getElementById('product-name').value;
    var size = document.getElementById('Forma').value;
    var Ndecarton = document.getElementById('Ndecarton').value;
    var date = document.getElementById('date').value;
    return {productName,size,Ndecarton,date} ;
}
function surfacearea() {
    var { size } = savingvalues();
    var dimensions = size.split(/[^0-9]+/);
    if (dimensions.length < 2) return "Invalid size format";
    var width = parseInt(dimensions[0], 10);
    var height = parseInt(dimensions[1], 10);
    if (isNaN(width) || isNaN(height)) return "Invalid dimensions";
    var surface = (width * height) / 10000;
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
    document.querySelectorAll('#label-form button').forEach(function(button) {
        button.addEventListener('click', function() {
            var caliber = this.innerText;
            Alllabels(caliber);
        });
    });
}