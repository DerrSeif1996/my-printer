     
function printLabel() {
      var { productName, size, Ndecarton, Ndepiece,date } = savingvalues();
      
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

    attachEventListeners();
}




function Alllabels(caliber) {
    var { productName, Ndecarton, Ndepiece, date } = savingvalues();
    var surface = surfacearea() + " M²";
    var Forma = hundelforma();
    var imageURL = "images/download.png";

    var labelContent = `
        <div class="label-container">
        <div class="head">
            <img src="${imageURL}" alt="Sadjia Ceram" class="company-logo">
            <h1 class="company-name">SADJIA CERAM</h1>
            <img src="${imageURL}" alt="Sadjia Ceram" class="company-logo">
        </div>
            <p class="company-address">ZONE INDUSTRIELLE SIDI BOUAMAMA SIDI CHAHMI ESSENIA</p>
            <p class="company-phone">Tel : 05 60 83 83 83</p>
            
            <div class="product-details">
                <div class="detail-row1">
                    <span id="detail-label1" class="detail-label">MODEL :</span>
                    <span  class="detail-value">${productName}</span>
                    <span id="detail-label2" class="detail-label">FORMAT :</span>
                    <span  class="detail-value">${Forma}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-value">${Ndecarton} CARTON</span>
                    <span class="detail-value">${Ndepiece} PIECES/CRT</span>
                    <span class="detail-value">${surface}</span>
                </div>
                
            </div>
            
            <p class="date-info">DATE: ${date}</p>
            
            <p class="caliber-choice">CHOIX: ${caliber}</p>
        </div>
    `;
    
    document.getElementById('label-content').innerHTML = labelContent;
    document.getElementById('label-preview').style.display = 'flex';
}


function savingvalues(){
    var productName = document.getElementById('product-name').value;
    var size = document.getElementById('Forma').value;
    var Ndecarton = document.getElementById('Ndecarton').value;
    var Ndepiece = document.getElementById('Ndepiece').value;
    var date = document.getElementById('date').value;
    return {productName,size,Ndecarton,Ndepiece,date} ;
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
    document.querySelectorAll('#label-form button').forEach(function(button) {
        button.addEventListener('click', function() {
            var caliber = this.innerText;
            Alllabels(caliber);
        });
    });
}