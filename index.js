   

function printLabel() {
      // Save the values of the form fields
      var productName = document.getElementById('product-name').value;
      var size = document.getElementById('size').value;
      var manufacturer = document.getElementById('manufacturer').value;
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
      document.getElementById('size').value = size;
      document.getElementById('manufacturer').value = manufacturer;
      document.getElementById('date').value = date;

    // Reattach event listeners, if necessary (as they've been lost during the innerHTML replacement)
    // This assumes you're not using event listeners added in the HTML via onClick or other attributes
    // For example, if using addEventListener or jQuery to bind events, you'll need to reattach them
    
}

// A hypothetical function to reattach event listeners if needed
function attachEventListeners() {
    // Example: document.getElementById('generateButton').addEventListener('click', generateLabel);
    // Add back any event listeners here
}


function C1lable(){
   Alllabels("C1");
}

function C2lable(){
    Alllabels("C2");
}
function C3lable(){
    Alllabels("C3");
}
function C4lable(){
    Alllabels("C4");
}
function lable2eme(){
    Alllabels("2eme");
}
function lable3eme(){
    Alllabels("3eme");
}

function Alllabels(caliber){
    var productName = document.getElementById('product-name').value;
    var size = document.getElementById('size').value;
    var manufacturer = document.getElementById('manufacturer').value;
    var date = document.getElementById('date').value;
    var labelContent = `
    <strong>Product:</strong> ${productName} <br>
    <strong>Caliber:</strong> ${caliber} <br>
    <strong>size:</strong> ${size} <br>
    <strong>Manufacturer:</strong> ${manufacturer} <br>
    <strong>Date:</strong> ${date}
 `;
 
 // Display the label preview
 document.getElementById('label-content').innerHTML = labelContent;
 document.getElementById('label-preview').style.display = 'block';
}