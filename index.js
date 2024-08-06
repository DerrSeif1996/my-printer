function printLabel() {
    const values = savingvalues();
    const { productName, size, Ndecarton, Ndepiece, date, caliber, Ndepiecevrac, Ndevrac } = values;
    
    // Save original content and replace with label content for printing
    const originalContent = document.body.innerHTML;
    const labelContent = document.getElementById('label-preview').innerHTML;
    document.body.innerHTML = labelContent;
    window.print();
    document.body.innerHTML = originalContent;

    // Restore values after printing
    setInputValues(values);

    // Update caliber selection
    updateCaliberSelection(caliber);

    // Reattach event listeners
    attachEventListeners();
}

function generateLabelContent(object) {
    return `
        <div class="card-div">
            <div class="header">
                <img src="${object.imageURL}" alt="Sadjia Ceram">
                <h1 class="uppercase-text">sadjia ceram</h1>
                <img src="${object.imageURL}" alt="Sadjia Ceram">
            </div>
            <div class="general-info">
                <h2 class="uppercase-text">zone industrielle sidi bouamama sidi chahmi essenia</h2>
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
                <h2>${object.surface}</h2>
            </div>
            <div class="data-and-time">
                <div class="labeled-div">
                    <label class="uppercase-text label" for="date">date:</label>
                    <h2 id="date">${object.date}</h2>
                </div>
            </div>
            <div class="choice-div">
                <div class="labeled-div">
                    <label class="uppercase-text labelChoice" for="choice">choix:</label>
                    <h2 id="choice">${object.caliber}</h2>
                </div>
            </div>
        </div>`;
}

function Alllabels(caliber) {
    const values = savingvalues();
    const { productName, Ndecarton, Ndepiece, Ndepiecevrac, Ndevrac, date } = values;
    const format = formatSize(values.size);
    const imageURL = "images/download.png";
    const { surfacecarton, surfacevrac } = surfacearea(values);

    const surface = caliber === "3eme" ? surfacevrac + " M²" : surfacecarton + " M²";
    const cartonNumbers = caliber === "3eme" ? Ndevrac : Ndecarton;
    const pieceNumber = caliber === "3eme" ? Ndepiecevrac : Ndepiece;

    const labelObject = { productName, cartonNumbers, pieceNumber, date, format, surface, imageURL, caliber };
    const labelContent = generateLabelContent(labelObject);

    document.getElementById('label-content').innerHTML = labelContent;
    document.getElementById('label-preview').style.display = 'flex';

    updateCaliberSelection(caliber);
}

function savingvalues() {
    return {
        productName: document.getElementById('product-name').value,
        size: document.getElementById('Forma').value,
        Ndecarton: document.getElementById('Ndecarton').value,
        Ndepiece: document.getElementById('Ndepiece').value,
        Ndevrac: document.getElementById('Ndevrac').value,
        Ndepiecevrac: document.getElementById('Ndepiecevrac').value,
        date: document.getElementById('date').value,
        caliber: getSelectedCaliber()
    };
}

function surfacearea({ size, Ndecarton, Ndepiece, Ndepiecevrac, Ndevrac }) {
    const dimensions = size.split(/[^0-9]+/);
    if (dimensions.length < 2 || isNaN(dimensions[0]) || isNaN(dimensions[1])) return { surfacecarton: "Invalid", surfacevrac: "Invalid" };

    const width = parseInt(dimensions[0], 10);
    const height = parseInt(dimensions[1], 10);
    const surfacecarton = ((width / 1000) * (height / 1000) * Ndecarton * Ndepiece).toFixed(2);
    const surfacevrac = ((width / 1000) * (height / 1000) * Ndepiecevrac * Ndevrac).toFixed(2);

    return { surfacecarton, surfacevrac };
}

function formatSize(size) {
    const dimensions = size.split(/[^0-9]+/);
    if (dimensions.length < 2 || isNaN(dimensions[0]) || isNaN(dimensions[1])) return "Invalid size format";
    return `${parseInt(dimensions[0], 10)} X ${parseInt(dimensions[1], 10)}`;
}

function getSelectedCaliber() {
    const selectedButton = document.querySelector('#cliberbtns .selected');
    return selectedButton ? selectedButton.innerText : "";
}

function setInputValues({ productName, size, Ndecarton, Ndepiece, Ndevrac, Ndepiecevrac, date }) {
    document.getElementById('product-name').value = productName;
    document.getElementById('Forma').value = size;
    document.getElementById('Ndecarton').value = Ndecarton;
    document.getElementById('Ndepiece').value = Ndepiece;
    document.getElementById('Ndevrac').value = Ndevrac;
    document.getElementById('Ndepiecevrac').value = Ndepiecevrac;
    document.getElementById('date').value = date;
}

function updateCaliberSelection(caliber) {
    document.querySelectorAll('#cliberbtns button').forEach(button => {
        button.classList.toggle('selected', button.innerText === caliber);
    });
}

function attachEventListeners() {
    document.querySelectorAll('#cliberbtns button').forEach(button => {
        button.addEventListener('click', () => {
            const caliber = button.innerText;
            Alllabels(caliber);
        });
    });
}
