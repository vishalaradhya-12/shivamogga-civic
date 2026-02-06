import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Phone, Mail, MapPin, Users, Building, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { getWardByNumber } from '../data/wardData';
import { getTranslation } from '../data/translations';
import { complaintsData } from '../data/complaintsData';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import ComplaintModal from '../components/ComplaintModal';
import 'leaflet/dist/leaflet.css';
import './WardDetails.css';

// Fix for default marker icon in React-Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function WardDetails({ language }) {
    const { wardNumber } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const departmentFilter = searchParams.get('dept');
    const ward = getWardByNumber(wardNumber);
    const t = (key) => getTranslation(key, language);

    const { user } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isComplaintOpen, setIsComplaintOpen] = useState(false);

    // State for expanded complaint cards
    const [expandedComplaint, setExpandedComplaint] = useState(null);

    // Get current department data
    const currentDept = departmentFilter ? complaintsData[departmentFilter] : null;

    if (!ward) {
        return (
            <div className="ward-details">
                <div className="container">
                    <div className="error-message card">
                        <h2>{t('wardNotFound')}</h2>
                        <p>{t('wardNotFoundDesc')}</p>
                    </div>
                </div>
            </div>
        );
    }

    const toggleComplaint = (complaintId) => {
        setExpandedComplaint(expandedComplaint === complaintId ? null : complaintId);
    };

    const handleComplaintClick = () => {
        if (user) {
            setIsComplaintOpen(true);
        } else {
            setIsLoginOpen(true);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoginOpen(false);
        setIsComplaintOpen(true);
    };

    return (
        <div className="ward-details">
            <div className="container">
                {/* Header */}
                <div className="ward-header animate-fade-in">
                    <div className="ward-title-section">
                        <h1>{language === 'kn' ? (ward.wardNameKn || ward.wardName) :
                            language === 'hi' ? (ward.wardNameHi || ward.wardName) :
                                ward.wardName}</h1>
                        <div className="ward-meta">
                            <span className="badge">{t('ward')} {ward.wardNumber}</span>
                            {departmentFilter && currentDept && (
                                <span className="badge" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white' }}>
                                    <Filter size={14} />
                                    {language === 'kn' ? (currentDept.nameKn || currentDept.name) :
                                        language === 'hi' ? (currentDept.nameHi || currentDept.name) :
                                            currentDept.name}
                                </span>
                            )}
                            <span className="ward-stat">
                                <Users size={16} />
                                {ward.population.toLocaleString()} {t('residents')}
                            </span>
                            <span className="ward-stat">
                                <MapPin size={16} />
                                {language === 'kn' ? (ward.areaKn || ward.area) :
                                    language === 'hi' ? (ward.areaHi || ward.area) :
                                        ward.area}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="ward-content-layout">
                    {/* Sidebar - Department Folders */}
                    <aside className="departments-sidebar">
                        <h3>{t('availableComplaints')}</h3>
                        <div className="department-list">
                            <button
                                className={`department-item ${!departmentFilter ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}`)}
                            >
                                <Building size={18} />
                                <span>{t('allDepartments')}</span>
                                <span className="count">{Object.keys(complaintsData).length}</span>
                            </button>

                            {Object.entries(complaintsData).map(([key, dept]) => {
                                const deptName = language === 'kn' ? (dept.nameKn || dept.name) :
                                    language === 'hi' ? (dept.nameHi || dept.name) :
                                        dept.name;
                                return (
                                    <button
                                        key={key}
                                        className={`department-item ${departmentFilter === key ? 'active' : ''}`}
                                        onClick={() => navigate(`/ward/${wardNumber}?dept=${key}`)}
                                    >
                                        <Building size={18} />
                                        <span>{deptName}</span>
                                        <span className="count">{dept.complaints.length}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="ward-main-content">
                        {/* Corporator Card */}
                        <div className="corporator-card-compact card">
                            <div className="corporator-info-compact">
                                <div className="corporator-avatar-small">
                                    {ward.corporator.photo ? (
                                        <img src={ward.corporator.photo} alt={ward.corporator.name} />
                                    ) : (
                                        <div className="avatar-placeholder-small">
                                            {ward.corporator.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="corporator-details-compact">
                                    <h3>{ward.corporator.name}</h3>
                                    <p className="party-badge-small">{ward.corporator.party}</p>
                                </div>
                                <div className="contact-details-compact">
                                    <a href={`tel:${ward.corporator.phone}`} className="contact-link-small">
                                        <Phone size={16} />
                                        {ward.corporator.phone}
                                    </a>
                                    <a href={`mailto:${ward.corporator.email}`} className="contact-link-small">
                                        <Mail size={16} />
                                        {ward.corporator.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Department Content */}
                        {currentDept && (
                            <div className="complaints-section">
                                <h2>{language === 'kn' ? (currentDept.nameKn || currentDept.name) :
                                    language === 'hi' ? (currentDept.nameHi || currentDept.name) :
                                        currentDept.name}</h2>
                                <div className="complaints-grid">
                                    {currentDept.complaints.map((complaint) => (
                                        <div
                                            key={complaint.id}
                                            className={`complaint-card ${expandedComplaint === complaint.id ? 'expanded' : ''}`}
                                            onClick={() => toggleComplaint(complaint.id)}
                                        >
                                            <div className="complaint-header">
                                                <h4>{complaint.title}</h4>
                                                {expandedComplaint === complaint.id ? (
                                                    <ChevronDown size={20} className="expand-icon" />
                                                ) : (
                                                    <ChevronRight size={20} className="expand-icon" />
                                                )}
                                            </div>
                                            <p className="complaint-dept">{currentDept.department}</p>

                                            {expandedComplaint === complaint.id && (
                                                <div className="complaint-contact-info">
                                                    <div className="contact-divider"></div>
                                                    <h5>{t('contactInformation')}</h5>
                                                    <div className="contact-person">
                                                        <strong>{complaint.contactPerson}</strong>
                                                    </div>
                                                    <div className="contact-methods">
                                                        <a href={`tel:${complaint.phone}`} className="contact-method">
                                                            <Phone size={16} />
                                                            <span>{complaint.phone}</span>
                                                        </a>
                                                        <a href={`mailto:${complaint.email}`} className="contact-method">
                                                            <Mail size={16} />
                                                            <span>{complaint.email}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="complaint-footer">

                                    <p>{t('couldntFindComplaint')}</p>
                                    <button className="btn-secondary" onClick={handleComplaintClick}>{t('submitNewComplaint')}</button>
                                </div>
                            </div>
                        )}

                        {/* Overview Section (when no department selected) */}
                        {!departmentFilter && (
                            <div className="overview-section">
                                <div className="info-grid">
                                    <div className="info-card card">
                                        <h3>{t('wardInformation')}</h3>
                                        <div className="info-stats">
                                            <div className="stat-item">
                                                <Users size={24} />
                                                <div>
                                                    <strong>{ward.population.toLocaleString()}</strong>
                                                    <span>{t('residents')}</span>
                                                </div>
                                            </div>
                                            <div className="stat-item">
                                                <MapPin size={24} />
                                                <div>
                                                    <strong>{language === 'kn' ? ward.areaKn : language === 'hi' ? ward.areaHi : ward.area}</strong>
                                                    <span>{t('area')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="map-card card">
                                        <h3>{t('wardLocation')}</h3>
                                        <div className="map-container">
                                            <MapContainer
                                                center={ward.coordinates}
                                                zoom={14}
                                                style={{ height: '300px', width: '100%' }}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={ward.coordinates}>
                                                    <Popup>
                                                        <strong>{ward.wardName}</strong>
                                                        <br />
                                                        Corporator: {ward.corporator.name}
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    </div>

                                    <div className="boundaries-card card">
                                        <h3>{t('wardBoundaries')}</h3>
                                        <div className="boundaries-grid">
                                            <div className="boundary-item">
                                                <strong>{t('north')}:</strong>
                                                <span>{language === 'kn' ? (ward.boundariesKn?.north || ward.boundaries.north) :
                                                    language === 'hi' ? (ward.boundariesHi?.north || ward.boundaries.north) :
                                                        ward.boundaries.north}</span>
                                            </div>
                                            <div className="boundary-item">
                                                <strong>{t('south')}:</strong>
                                                <span>{language === 'kn' ? (ward.boundariesKn?.south || ward.boundaries.south) :
                                                    language === 'hi' ? (ward.boundariesHi?.south || ward.boundaries.south) :
                                                        ward.boundaries.south}</span>
                                            </div>
                                            <div className="boundary-item">
                                                <strong>{t('east')}:</strong>
                                                <span>{language === 'kn' ? (ward.boundariesKn?.east || ward.boundaries.east) :
                                                    language === 'hi' ? (ward.boundariesHi?.east || ward.boundaries.east) :
                                                        ward.boundaries.east}</span>
                                            </div>
                                            <div className="boundary-item">
                                                <strong>{t('west')}:</strong>
                                                <span>{language === 'kn' ? (ward.boundariesKn?.west || ward.boundaries.west) :
                                                    language === 'hi' ? (ward.boundariesHi?.west || ward.boundaries.west) :
                                                        ward.boundaries.west}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="facilities-card card">
                                        <h3>{t('publicFacilities')}</h3>
                                        <div className="facilities-list">
                                            {(language === 'kn' ? (ward.facilitiesKn || ward.facilities) :
                                                language === 'hi' ? (ward.facilitiesHi || ward.facilities) :
                                                    ward.facilities).map((facility, index) => (
                                                        <div key={index} className="facility-item">
                                                            <Building size={20} />
                                                            <span>{facility}</span>
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>


            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSuccess={handleLoginSuccess}
            />

            <ComplaintModal
                isOpen={isComplaintOpen}
                onClose={() => setIsComplaintOpen(false)}
                initialDepartment={departmentFilter}
            />
        </div >
    );
}

export default WardDetails;
