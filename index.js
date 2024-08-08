function printLabel() {
    const values = savingvalues();
    console.log('Values before printing:', values);
    
    const { productName, size, Ndecarton, Ndepiece, date, caliber, Ndepiecevrac, Ndevrac } = values;
    const originalContent = document.body.innerHTML;
    const labelContent = document.getElementById('label-preview').innerHTML;
    document.body.innerHTML = labelContent;
    try {
        window.print();
    } finally {
        document.body.innerHTML = originalContent;
        setInputValues(values);
        updateCaliberSelection(caliber);
        additemstolist(caliber);
    }
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
                    <h2 id="date">${object.date} / ${object.time}</h2>
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
    const time = getCurrentTime();
    const values = savingvalues();
    const { productName, Ndecarton, Ndepiece, Ndepiecevrac, Ndevrac, date } = values;
    const format = formatSize(values.size);
    const imageURL = "images/download.png";
    const { surfacecarton, surfacevrac } = surfacearea(values);
    const surface = caliber === "3eme" ? surfacevrac + " M²" : surfacecarton + " M²";
    const cartonNumbers = caliber === "3eme" ? Ndevrac : Ndecarton;
    const pieceNumber = caliber === "3eme" ? Ndepiecevrac : Ndepiece;
    const labelObject = { time, productName, cartonNumbers, pieceNumber, date, format, surface, imageURL, caliber };
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

function updateCaliberSelection(selectedCaliber) {
    const buttons = document.querySelectorAll('#cliberbtns button');
    buttons.forEach(button => {
        if (button.innerText === selectedCaliber) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

function additemstolist(caliber) {
    const values = savingvalues();
    const { productName, Ndecarton, size, Ndevrac, date } = values;
    const time = getCurrentTime();
    const selectedCaliber = caliber || getSelectedCaliber();

    console.log('Selected Caliber:', selectedCaliber);
    console.log('Adding item to list:', selectedCaliber);

    const itemId = `item-${Date.now()}`;

    const listItem = `<li id="${itemId}">
        <span class="item-details">${selectedCaliber} | ${size} | ${Ndecarton} | ${time}</span>
        <button class="delete-button" onclick="deleteItem('${itemId}')">Delete</button>
    </li>`;

    document.getElementById('printed-list').innerHTML += listItem;
}

function deleteItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
    } else {
        console.error('Item not found:', itemId);
    }
}

function printPrintedList() {
    // Preserve current content and state
    const originalContent = document.body.innerHTML;
    const originalInputs = Array.from(document.querySelectorAll('input, select, textarea')).map(input => ({
        id: input.id,
        value: input.value
    }));
    
    // Clone the printed list to avoid modifying the original DOM
    const listElement = document.getElementById('printed-list');
    const listClone = listElement.cloneNode(true);

    // Remove delete buttons from the cloned list
    const buttons = listClone.querySelectorAll('button');
    buttons.forEach(button => button.remove());

    // Get the modified list content
    const listContent = listClone.outerHTML;

    // Set the body content to the list content
    document.body.innerHTML = `
        <html>
            <head>
                <title>Print List</title>
                <style>
                    /* Add your print-specific styles here */
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    #printed-list {
                        border: 1px solid #ddd;
                        padding: 10px;
                        width: 100%;
                    }
                    #printed-list li {
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;
                        padding: 5px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        white-space: nowrap; /* Prevents text wrapping */
                        overflow: hidden; /* Hides overflowed text */
                        text-overflow: ellipsis; /* Adds ellipsis (...) for overflowed text */
                    }
                    h1 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Printed Items List</h1>
                ${listContent}
            </body>
        </html>
    `;

    // Print the content
    window.print();

    // Restore the original content and input values
    document.body.innerHTML = originalContent;
    originalInputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            element.value = input.value;
        }
    });
}


function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
