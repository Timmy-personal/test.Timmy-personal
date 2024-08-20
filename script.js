document.getElementById('convertButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Пожалуйста, выберите изображение для конвертации.');
        return;
    }

    // Чтение файла
    const reader = new FileReader();
    reader.onload = async () => {
        try {
            // Конвертируем изображение в PDF
            const { PDFDocument, rgb } = PDFLib;
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
            const imageBytes = new Uint8Array(reader.result);
            const image = await pdfDoc.embedPng(imageBytes);
            const { width, height } = image.size();
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: page.getWidth(),
                height: page.getHeight(),
            });

            // Генерируем PDF
            const pdfBytes = await pdfDoc.save();

            // Создаем ссылку для скачивания
            const downloadLink = document.getElementById('downloadLink');
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'image.pdf';
            downloadLink.style.display = 'inline';
            downloadLink.textContent = 'Скачать PDF';
        } catch (error) {
            alert('Ошибка при конвертации изображения в PDF.');
            console.error(error);
        }
    };
    reader.readAsArrayBuffer(file);
});