const MOUSE_PRIMARY_BUTTON = 1;
const DRAGGABLE_ITEM_COORDS_OFFSET = 50;
const BORDER_WIDTH = 1;

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

    if (doesDraggableItemCollideWithDropArea(dropAreaGridEl, false)) {
        dropDraggableItem(dropAreaGridEl);
    } else if (doesDraggableItemCollideWithDropArea(dropAreaCanvasEl, true)) {
        dropDraggableItem(dropAreaCanvasEl);
    }

    setDraggableItemVisible(false);
    setDropAreaHighlighted(dropAreaGridEl, false);
    setDropAreaHighlighted(dropAreaCanvasEl, false);
}

function dropDraggableItem(dropAreaEl) {
    const droppedItemEl = document.createElement('div');
    droppedItemEl.className = 'dropped-item';
    droppedItemEl.style.backgroundColor = draggableItemEl.style.backgroundColor;

    if (dropAreaEl === dropAreaGridEl) {
        droppedItemEl.classList.add('dropped-item_grid');
    } else {
        droppedItemEl.classList.add('dropped-item_canvas');
        setDroppedItemCoordsMappedToDropAreaCanvas(droppedItemEl, dropAreaEl);
    }

    dropAreaEl.appendChild(droppedItemEl);
}

function setDroppedItemCoordsMappedToDropAreaCanvas(droppedItemEl, dropAreaEl) {
    if (dropAreaEl !== dropAreaCanvasEl) {
        return;
    }
    const dropAreaRect = dropAreaEl.getBoundingClientRect();
    const top = parseInt(draggableItemEl.style.top, 10) - dropAreaRect.top - BORDER_WIDTH + dropAreaEl.scrollTop;
    const left = parseInt(draggableItemEl.style.left, 10) - dropAreaRect.left - BORDER_WIDTH + dropAreaEl.scrollLeft;
    droppedItemEl.style.top = `${top}px`;
    droppedItemEl.style.left = `${left}px`;
}

function onDocumentPointerMove(event) {
    if (event.pointerId !== pointerId) {
        return;
    }
    console.log('onDocumentPointerMove');
    setDraggableItemCoords(event.pageX, event.pageY);
    updateDropAreasHighlighting();
}

function updateDropAreasHighlighting() {
    if (doesDraggableItemCollideWithDropArea(dropAreaGridEl, false)) {
        setDropAreaHighlighted(dropAreaGridEl, true);
        setDropAreaHighlighted(dropAreaCanvasEl, false);
    } else if (doesDraggableItemCollideWithDropArea(dropAreaCanvasEl, true)) {
        setDropAreaHighlighted(dropAreaGridEl, false);
        setDropAreaHighlighted(dropAreaCanvasEl, true);
    } else {
        setDropAreaHighlighted(dropAreaGridEl, false);
        setDropAreaHighlighted(dropAreaCanvasEl, false);
    }
}

function doesDraggableItemCollideWithDropArea(dropAreaEl, fully) {
    const draggableItemRect = draggableItemEl.getBoundingClientRect();
    const dropAreaRect = dropAreaEl.getBoundingClientRect();

    if (fully) {
        return (
            draggableItemRect.top > dropAreaRect.top &&
            draggableItemRect.right < dropAreaRect.right &&
            draggableItemRect.bottom < dropAreaRect.bottom &&
            draggableItemRect.left > dropAreaRect.left
        );
    }

    return !(
        draggableItemRect.top > dropAreaRect.bottom ||
        draggableItemRect.right < dropAreaRect.left ||
        draggableItemRect.bottom < dropAreaRect.top ||
        draggableItemRect.left > dropAreaRect.right
    );
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
    draggableItemEl.style.top = `${y - DRAGGABLE_ITEM_COORDS_OFFSET}px`;
    draggableItemEl.style.left = `${x - DRAGGABLE_ITEM_COORDS_OFFSET}px`;
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
