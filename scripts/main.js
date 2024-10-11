const openPopup = document.getElementById('openPopup');
const popup = document.getElementById('popup');
const closePopup = document.getElementsByClassName('close')[0];
const box = document.getElementById('box');
const draggables = document.querySelectorAll('.draggable');
const sequenceLog = document.getElementById('sequenceLog');

openPopup.onclick = function() {
    popup.style.display = "flex";
}

closePopup.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragend', dragEnd);
});

box.addEventListener('dragover', dragOver);
box.addEventListener('dragenter', dragEnter);
box.addEventListener('dragleave', dragLeave);
box.addEventListener('drop', drop);

function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
    updateSequenceLog();
}

function dragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(box, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        box.appendChild(draggable);
    } else {
        box.insertBefore(draggable, afterElement);
    }
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function drop() {}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateSequenceLog() {
    const currentSequence = Array.from(box.children).map(item => item.textContent).join(', ');
    sequenceLog.textContent = `Current sequence: ${currentSequence}`;
}
