// script.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('sudoku-grid');
    const solveButton = document.getElementById('solve-button');
    const resetButton = document.getElementById('reset-button');

    // Создание игрового поля
    function createGrid() {
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = '1';
            cell.dataset.index = i;
            grid.appendChild(cell);
        }
    }

    createGrid();

    // Функция для сброса игры
    function resetGame() {
        const cells = document.querySelectorAll('.grid input');
        cells.forEach(cell => cell.value = '');
    }

    // Функция для решения (пустая реализация)
    function solveGame() {
        // Здесь будет алгоритм решения
        alert('Функция решения пока не реализована');
    }

    solveButton.addEventListener('click', solveGame);
    resetButton.addEventListener('click', resetGame);
});