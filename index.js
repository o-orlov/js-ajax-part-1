const MOUSE_PRIMARY_BUTTON = 1;
const COORDS_OFFSET = 50;

const dragAreaEl = document.getElementById('drag-area');
const dropAreaGridEl = document.getElementById('drop-area_grid');
const dropAreaCanvasEl = document.getElementById('drop-area_canvas');
const draggableItemEl = document.getElementById('draggable-item');

let pointerId = null;

function onDocumentPointerUp(event) {
    if (event.pointerId !== pointerId) {
        return;
    }

    console.log('onDocumentPointerUp');
    pointerId = null;
    document.removeEventListener('pointerup', onDocumentPointerUp);
    document.removeEventListener('pointermove', onDocumentPointerMove);

    setDraggableItemVisible(false);
    setDropAreaHighlighted(dropAreaGridEl, false);
    setDropAreaHighlighted(dropAreaCanvasEl, false);
}

function onDocumentPointerMove(event) {
    if (event.pointerId !== pointerId) {
        return;
    }

    console.log('onDocumentPointerMove');
    setDraggableItemCoords(event.pageX, event.pageY);

    const elements = document.elementsFromPoint(event.pageX, event.pageY);
    if (elements.includes(dropAreaGridEl)) {
        setDropAreaHighlighted(dropAreaGridEl, true);
        setDropAreaHighlighted(dropAreaCanvasEl, false);
    } else if (elements.includes(dropAreaCanvasEl)) {
        setDropAreaHighlighted(dropAreaGridEl, false);
        setDropAreaHighlighted(dropAreaCanvasEl, true);
    } else {
        setDropAreaHighlighted(dropAreaGridEl, false);
        setDropAreaHighlighted(dropAreaCanvasEl, false);
    }
}

function setDropAreaHighlighted(dropAreaEl, highlighted) {
    if (highlighted) {
        dropAreaEl.classList.add('drop-area_highlighted');
    } else {
        dropAreaEl.classList.remove('drop-area_highlighted');
    }
}

function getRandomColor() {
    const color = ['#'];
    for (let i = 0; i < 6; i++) {
        color.push(Math.floor(Math.random() * 16).toString(16));
    }
    return color.join('');
}

function setDraggableItemVisible(visible) {
    if (visible) {
        draggableItemEl.classList.remove('draggable-item_hidden');
    } else {
        draggableItemEl.classList.add('draggable-item_hidden');
    }
}

function setDraggableItemCoords(x, y) {
    draggableItemEl.style.top = `${y - COORDS_OFFSET}px`;
    draggableItemEl.style.left = `${x - COORDS_OFFSET}px`;
}

function onDragAreaPointerDown(event) {
    if (pointerId !== null) {
        return;
    }
    // eslint-disable-next-line no-bitwise
    if (event.pointerType === 'mouse' && !(event.buttons & MOUSE_PRIMARY_BUTTON)) {
        return;
    }

    console.log('onDragAreaPointerDown');
    pointerId = event.pointerId;
    document.addEventListener('pointerup', onDocumentPointerUp);
    document.addEventListener('pointermove', onDocumentPointerMove);

    draggableItemEl.style.backgroundColor = getRandomColor();
    setDraggableItemCoords(event.pageX, event.pageY);
    setDraggableItemVisible(true);
}

dragAreaEl.addEventListener('pointerdown', onDragAreaPointerDown);
