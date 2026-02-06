import { useState, useEffect } from 'react';
import { generateWardQRCode, generateAllWardQRCodes, downloadQRCode } from '../utils/qrGenerator';
import { shivamoggaWards } from '../data/wardData';
import { getTranslation } from '../data/translations';
import './QRCodeManagement.css';

function QRCodeManagement({ language }) {
    const t = (key) => getTranslation(key, language);
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedWard, setSelectedWard] = useState(null);
    const [generatingAll, setGeneratingAll] = useState(false);

    const handleGenerateSingle = async (wardNumber) => {
        setLoading(true);
        try {
            const qrCodeDataUrl = await generateWardQRCode(wardNumber);
            setQrCodes(prev => {
                const existing = prev.find(qr => qr.wardNumber === wardNumber);
                if (existing) {
                    return prev.map(qr =>
                        qr.wardNumber === wardNumber
                            ? { ...qr, qrCodeDataUrl }
                            : qr
                    );
                }
                return [...prev, { wardNumber, qrCodeDataUrl }];
            });
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('Failed to generate QR code');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAll = async () => {
        setGeneratingAll(true);
        try {
            const allQrCodes = await generateAllWardQRCodes();
            setQrCodes(allQrCodes);
            alert(`Successfully generated ${allQrCodes.length} QR codes!`);
        } catch (error) {
            console.error('Error generating all QR codes:', error);
            alert('Failed to generate all QR codes');
        } finally {
            setGeneratingAll(false);
        }
    };

    const handleDownload = (wardNumber) => {
        const qrCode = qrCodes.find(qr => qr.wardNumber === wardNumber);
        if (qrCode) {
            downloadQRCode(qrCode.qrCodeDataUrl, wardNumber);
        }
    };

    const handleDownloadAll = () => {
        qrCodes.forEach((qrCode, index) => {
            setTimeout(() => {
                downloadQRCode(qrCode.qrCodeDataUrl, qrCode.wardNumber);
            }, index * 200); // Stagger downloads
        });
    };

    const handlePreview = (wardNumber) => {
        const ward = shivamoggaWards.find(w => w.wardNumber === wardNumber);
        setSelectedWard(ward);
    };

    const closePreview = () => {
        setSelectedWard(null);
    };

    return (
        <div className="qr-management-page">
            <div className="container">
                <div className="page-header">
                    <h1>QR Code Management</h1>
                    <p>Generate and manage QR codes for all 60 wards</p>
                </div>

                <div className="actions-bar">
                    <button
                        className="btn-primary"
                        onClick={handleGenerateAll}
                        disabled={generatingAll}
                    >
                        {generatingAll ? 'Generating All...' : 'Generate All QR Codes (60)'}
                    </button>

                    {qrCodes.length > 0 && (
                        <button
                            className="btn-secondary"
                            onClick={handleDownloadAll}
                        >
                            Download All ({qrCodes.length})
                        </button>
                    )}
                </div>

                {generatingAll && (
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(qrCodes.length / 60) * 100}%` }}></div>
                        <span className="progress-text">{qrCodes.length} / 60</span>
                    </div>
                )}

                <div className="qr-grid">
                    {shivamoggaWards.slice(0, 60).map(ward => {
                        const qrCode = qrCodes.find(qr => qr.wardNumber === ward.wardNumber);

                        return (
                            <div key={ward.wardNumber} className="qr-card">
                                <div className="qr-card-header">
                                    <h3>Ward {ward.wardNumber}</h3>
                                    <span className="ward-name">{ward.wardName}</span>
                                </div>

                                <div className="qr-code-container">
                                    {qrCode ? (
                                        <img
                                            src={qrCode.qrCodeDataUrl}
                                            alt={`QR Code for Ward ${ward.wardNumber}`}
                                            className="qr-code-image"
                                        />
                                    ) : (
                                        <div className="qr-placeholder">
                                            <span>QR Code Not Generated</span>
                                        </div>
                                    )}
                                </div>

                                <div className="qr-card-actions">
                                    {!qrCode ? (
                                        <button
                                            className="btn-generate"
                                            onClick={() => handleGenerateSingle(ward.wardNumber)}
                                            disabled={loading}
                                        >
                                            Generate
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn-download"
                                                onClick={() => handleDownload(ward.wardNumber)}
                                            >
                                                Download
                                            </button>
                                            <button
                                                className="btn-preview"
                                                onClick={() => handlePreview(ward.wardNumber)}
                                            >
                                                Preview
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="qr-url">
                                    <small>
                                        /ward/{ward.wardNumber}/complaint
                                    </small>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Preview Modal */}
            {selectedWard && (
                <div className="modal-overlay" onClick={closePreview}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closePreview}>×</button>

                        <h2>Ward {selectedWard.wardNumber} - {selectedWard.wardName}</h2>

                        <div className="preview-qr">
                            {qrCodes.find(qr => qr.wardNumber === selectedWard.wardNumber) && (
                                <img
                                    src={qrCodes.find(qr => qr.wardNumber === selectedWard.wardNumber).qrCodeDataUrl}
                                    alt={`QR Code for Ward ${selectedWard.wardNumber}`}
                                    className="preview-qr-image"
                                />
                            )}
                        </div>

                        <div className="preview-info">
                            <p><strong>URL:</strong> https://shivamogga-civic-app.vercel.app/ward/{selectedWard.wardNumber}/complaint</p>
                            <p><strong>Population:</strong> {selectedWard.population.toLocaleString()} residents</p>
                            <p><strong>Area:</strong> {selectedWard.area}</p>
                        </div>

                        <button
                            className="btn-primary"
                            onClick={() => handleDownload(selectedWard.wardNumber)}
                        >
                            Download QR Code
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QRCodeManagement;
