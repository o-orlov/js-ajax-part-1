const dragAreaEl = document.getElementById('drag-area');
const dropAreaGrid = document.getElementById('drop-area_grid');
const dropAreaCanvas = document.getElementById('drop-area_canvas');

const MOUSE_PRIMARY_BUTTON = 1;

function onDocumentPointerUp(event) {
    console.log('onDocumentPointerUp');
    document.removeEventListener('pointerup', onDocumentPointerUp);
    document.removeEventListener('pointermove', onDocumentPointerMove);
    dropAreaGrid.removeEventListener('pointerenter', onDropAreaGridPointerEnter);
    dropAreaGrid.removeEventListener('pointerleave', onDropAreaGridPointerLeave);
    dropAreaCanvas.removeEventListener('pointerenter', onDropAreaCanvasPointerEnter);
    dropAreaCanvas.removeEventListener('pointerleave', onDropAreaCanvasPointerLeave);
    setDropAreaHighlighted(dropAreaGrid, false);
    setDropAreaHighlighted(dropAreaCanvas, false);
}

function onDocumentPointerMove(event) {
    console.log('onDocumentPointerMove');
}

function onDropAreaGridPointerEnter(event) {
    console.log('onDropAreaGridPointerEnter');
    setDropAreaHighlighted(dropAreaGrid, true);
}

function onDropAreaGridPointerLeave(event) {
    console.log('onDropAreaGridPointerLeave');
    setDropAreaHighlighted(dropAreaGrid, false);
}

function onDropAreaCanvasPointerEnter(event) {
    console.log('onDropAreaCanvasPointerEnter');
    setDropAreaHighlighted(dropAreaCanvas, true);
}

function onDropAreaCanvasPointerLeave(event) {
    console.log('onDropAreaCanvasPointerLeave');
    setDropAreaHighlighted(dropAreaCanvas, false);
}

function setDropAreaHighlighted(dropAreaEl, highlighted) {
    if (highlighted) {
        dropAreaEl.classList.add('drop-area_highlighted');
    } else {
        dropAreaEl.classList.remove('drop-area_highlighted');
    }
}

function onDragAreaPointerDown(event) {
    // eslint-disable-next-line no-bitwise
    if (event.pointerType === 'mouse' && !(event.buttons & MOUSE_PRIMARY_BUTTON)) {
        return;
    }
    console.log('onDragAreaPointerDown');
    document.addEventListener('pointerup', onDocumentPointerUp);
    document.addEventListener('pointermove', onDocumentPointerMove);
    dropAreaGrid.addEventListener('pointerenter', onDropAreaGridPointerEnter);
    dropAreaGrid.addEventListener('pointerleave', onDropAreaGridPointerLeave);
    dropAreaCanvas.addEventListener('pointerenter', onDropAreaCanvasPointerEnter);
    dropAreaCanvas.addEventListener('pointerleave', onDropAreaCanvasPointerLeave);
}

dragAreaEl.addEventListener('pointerdown', onDragAreaPointerDown);
