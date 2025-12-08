export function getBase64 (file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            return '';
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export const formatCreatedAt = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const hours = createdAtDate.getHours().toString().padStart(2, '0');
    const minutes = createdAtDate.getMinutes().toString().padStart(2, '0');
    const day = createdAtDate.getDate().toString().padStart(2, '0');
    const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0');
    const year = createdAtDate.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

/**
 * Format number to 2 decimal places
 * @param {number|string} numberValue - Number to format
 * @returns {string} - Formatted number string
 */
export const formattedCount = (numberValue) => {
    return Number(numberValue).toFixed(2);
};