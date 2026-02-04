import { Search } from 'lucide-react';
import { useState } from 'react';
import { getTranslation } from '../data/translations';

function DataReview({ language }) {
    const [issueId, setIssueId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState('');
    const t = (key) => getTranslation(key, language);

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setSearchResult(null);

        if (!issueId.trim()) return;

        // Fetch from localStorage
        const complaints = JSON.parse(localStorage.getItem('civic_complaints') || '[]');
        const found = complaints.find(c => c.id.toLowerCase() === issueId.toLowerCase());

        if (found) {
            // Mock department name look up (in a real app this would be joined data)
            // For now, capitalize the ID or just use raw department key if needed
            const deptName = found.department.charAt(0).toUpperCase() + found.department.slice(1);
            setSearchResult({
                ...found,
                departmentName: deptName
            });
        } else {
            setError('Complaint not found. Please check the ID and try again. (Example: #SHV-1234)');
        }
    };

    return (
        <div className="data-review-page" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div className="text-center mb-2xl animate-fade-in">
                    <h1>{t('dataReviewTitle')}</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '1rem' }}>
                        {t('dataReviewSubtitle')}
                    </p>
                </div>

                <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                    <form onSubmit={handleSearch} className="mb-2xl">
                        <div className="form-group">
                            <label htmlFor="issueId">{t('enterIssueId')}</label>
                            <input
                                type="text"
                                id="issueId"
                                value={issueId}
                                onChange={(e) => setIssueId(e.target.value)}
                                placeholder="#SHV-XXXX"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            <Search size={20} />
                            {t('trackIssue')}
                        </button>
                    </form>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center animate-fade-in border border-red-100">
                            {error}
                        </div>
                    )}

                    {searchResult && (
                        <div className="search-result animate-fade-in">
                            <div className="result-header p-4 bg-gray-50 rounded-t-lg border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <span className="text-sm text-gray-500 block mb-1">Issue ID</span>
                                    <strong className="text-lg">{searchResult.id}</strong>
                                </div>
                                <span className={`status-badge ${searchResult.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium`}>
                                    {searchResult.status}
                                </span>
                            </div>
                            <div className="result-body p-6 border border-gray-100 rounded-b-lg border-t-0">
                                <h3 className="text-xl font-semibold mb-2">{searchResult.title}</h3>
                                <div className="mb-4">
                                    <span className="text-sm text-gray-500">Department</span>
                                    <p className="font-medium text-gray-700">{searchResult.departmentName}</p>
                                </div>
                                <div className="mb-4">
                                    <span className="text-sm text-gray-500">Description</span>
                                    <p className="text-gray-600 mt-1">{searchResult.description}</p>
                                </div>
                                <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                                    Submitted on {new Date(searchResult.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DataReview;
