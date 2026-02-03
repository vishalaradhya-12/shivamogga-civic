import { Search } from 'lucide-react';
import { useState } from 'react';
import { getTranslation } from '../data/translations';

function DataReview({ language }) {
    const [issueId, setIssueId] = useState('');
    const t = (key) => getTranslation(key, language);

    const handleSearch = (e) => {
        e.preventDefault();
        // In real app, fetch issue status from backend
        alert(`Searching for issue: ${issueId}`);
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
                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <label htmlFor="issueId">{t('enterIssueId')}</label>
                            <input
                                type="text"
                                id="issueId"
                                value={issueId}
                                onChange={(e) => setIssueId(e.target.value)}
                                placeholder={t('issueIdPlaceholder')}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <Search size={20} />
                            {t('trackIssue')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DataReview;
