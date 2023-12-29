export function getBase64 (file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            return '';
        }
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}