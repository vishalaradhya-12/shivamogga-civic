import QRCode from 'qrcode';

/**
 * Generate QR code for a specific ward
 * @param {number} wardNumber - Ward number (1-60)
 * @param {string} baseUrl - Base URL of the application
 * @returns {Promise<string>} - Data URL of the QR code image
 */
export const generateWardQRCode = async (wardNumber, baseUrl = 'https://shivamogga-civic-app.vercel.app') => {
    const url = `${baseUrl}/ward/${wardNumber}`;

    try {
        // Generate QR code with high error correction
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
            errorCorrectionLevel: 'H', // High error correction (30%)
            type: 'image/png',
            quality: 1,
            margin: 2,
            width: 800, // High resolution for printing
            color: {
                dark: '#047857',  // Shivamogga green
                light: '#FFFFFF'
            }
        });

        return qrCodeDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

/**
 * Generate QR code in SVG format for a specific ward
 * @param {number} wardNumber - Ward number (1-60)
 * @param {string} baseUrl - Base URL of the application
 * @returns {Promise<string>} - SVG string of the QR code
 */
export const generateWardQRCodeSVG = async (wardNumber, baseUrl = 'https://shivamogga-civic-app.vercel.app') => {
    const url = `${baseUrl}/ward/${wardNumber}`;

    try {
        const qrCodeSVG = await QRCode.toString(url, {
            errorCorrectionLevel: 'H',
            type: 'svg',
            margin: 2,
            color: {
                dark: '#047857',
                light: '#FFFFFF'
            }
        });

        return qrCodeSVG;
    } catch (error) {
        console.error('Error generating SVG QR code:', error);
        throw error;
    }
};

/**
 * Generate QR codes for all wards
 * @param {string} baseUrl - Base URL of the application
 * @returns {Promise<Array>} - Array of QR code data URLs
 */
export const generateAllWardQRCodes = async (baseUrl = 'https://shivamogga-civic-app.vercel.app') => {
    const qrCodes = [];

    for (let wardNumber = 1; wardNumber <= 60; wardNumber++) {
        try {
            const qrCodeDataUrl = await generateWardQRCode(wardNumber, baseUrl);
            qrCodes.push({
                wardNumber,
                qrCodeDataUrl,
                url: `${baseUrl}/ward/${wardNumber}/complaint`
            });
        } catch (error) {
            console.error(`Error generating QR code for ward ${wardNumber}:`, error);
        }
    }

    return qrCodes;
};

/**
 * Download QR code as PNG file
 * @param {string} dataUrl - QR code data URL
 * @param {number} wardNumber - Ward number
 */
export const downloadQRCode = (dataUrl, wardNumber) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ward-${wardNumber}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Download all QR codes as a ZIP file (requires JSZip library)
 * For now, we'll download them individually
 */
export const downloadAllQRCodes = async (qrCodes) => {
    for (const qrCode of qrCodes) {
        downloadQRCode(qrCode.qrCodeDataUrl, qrCode.wardNumber);
        // Add delay to prevent browser blocking multiple downloads
        await new Promise(resolve => setTimeout(resolve, 100));
    }
};
