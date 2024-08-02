   

function printLabel() {
      // Save the values of the form fields
      var productName = document.getElementById('product-name').value;
      var size = document.getElementById('Forma').value;
      var Ndecarton = document.getElementById('Ndecarton').value;
      var date = document.getElementById('date').value;
      
      // Get the original content of the page
      var originalContent = document.body.innerHTML;
  
      // Get the label content
      var labelContent = document.getElementById('label-preview').innerHTML;
  
      // Replace the body content with the label content
      document.body.innerHTML = labelContent;
  
      // Print the label content
      window.print();
  
      // Revert to the original content
      document.body.innerHTML = originalContent;
      
      // Restore the values of the form fields
      document.getElementById('product-name').value = productName;
      document.getElementById('Forma').value = size;
      document.getElementById('Ndecarton').value = Ndecarton;
      document.getElementById('date').value = date;
      


    
    attachEventListeners();
}

function attachEventListeners() {
    
    document.querySelectorAll('#label-form button').forEach(function(button) {
        button.addEventListener('click', function() {
            var caliber = this.innerText;
            Alllabels(caliber);
        });
    });
}



function Alllabels(caliber){
    var productName = document.getElementById('product-name').value;
    var size = document.getElementById('Forma').value;
    var manufacturer = document.getElementById('Ndecarton').value;
    var date = document.getElementById('date').value;
    

    var labelContent = `
    <strong>Nom de Model:</strong> ${productName} <br>
    <strong>Caliber:</strong> ${caliber} <br>
    <strong>Forma:</strong> ${size} <br>
    <strong>N de Carton:</strong> ${manufacturer} <br>
    <strong>Date:</strong> ${date} 
 `;
 
 document.getElementById('label-content').innerHTML = labelContent;
 document.getElementById('label-preview').style.display = 'block';
}

