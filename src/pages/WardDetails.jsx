import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Phone, Mail, MapPin, Users, Building, Filter } from 'lucide-react';
import { getWardByNumber } from '../data/wardData';
import { getTranslation } from '../data/translations';
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

    // Department names mapping
    const departmentNames = {
        health: 'Health & Sanitation',
        water: 'Water Supply',
        roads: 'Roads & Infrastructure',
        education: 'Education',
        streetlights: 'Street Lights',
        parks: 'Parks & Gardens'
    };

    if (!ward) {
        return (
            <div className="ward-details">
                <div className="container">
                    <div className="error-message card">
                        <h2>Ward Not Found</h2>
                        <p>The ward number you're looking for doesn't exist.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ward-details">
            <div className="container">
                {/* Header */}
                <div className="ward-header animate-fade-in">
                    <div className="ward-title-section">
                        <h1>{ward.wardName}</h1>
                        <div className="ward-meta">
                            <span className="badge">Ward {ward.wardNumber}</span>
                            {departmentFilter && (
                                <span className="badge" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white' }}>
                                    <Filter size={14} />
                                    {departmentNames[departmentFilter]}
                                </span>
                            )}
                            <span className="ward-stat">
                                <Users size={16} />
                                {ward.population.toLocaleString()} residents
                            </span>
                            <span className="ward-stat">
                                <MapPin size={16} />
                                {ward.area}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="ward-content-layout">
                    {/* Sidebar - Department Folders */}
                    <aside className="departments-sidebar">
                        <h3>Available Complaints</h3>
                        <div className="department-list">
                            <button
                                className={`department-item ${!departmentFilter ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}`)}
                            >
                                <Building size={18} />
                                <span>All Departments</span>
                                <span className="count">18</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'health' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=health`)}
                            >
                                <Building size={18} />
                                <span>Garbage And Sanitation</span>
                                <span className="count">12</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'streetlights' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=streetlights`)}
                            >
                                <Building size={18} />
                                <span>Street Light</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'roads' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=roads`)}
                            >
                                <Building size={18} />
                                <span>Road Maintenance</span>
                                <span className="count">5</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'permissions' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=permissions`)}
                            >
                                <Building size={18} />
                                <span>Road Cutting Permissions</span>
                                <span className="count">3</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'electrical' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=electrical`)}
                            >
                                <Building size={18} />
                                <span>Electrical</span>
                                <span className="count">3</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'water' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=water`)}
                            >
                                <Building size={18} />
                                <span>Water Supply</span>
                                <span className="count">5</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'drainage' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=drainage`)}
                            >
                                <Building size={18} />
                                <span>Underground Drainage</span>
                                <span className="count">6</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'voterid' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=voterid`)}
                            >
                                <Building size={18} />
                                <span>Voter Id</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'birth' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=birth`)}
                            >
                                <Building size={18} />
                                <span>Birth/Death Certificates</span>
                                <span className="count">3</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'animal' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=animal`)}
                            >
                                <Building size={18} />
                                <span>Animal Control</span>
                                <span className="count">3</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'safety' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=safety`)}
                            >
                                <Building size={18} />
                                <span>Public Safety</span>
                                <span className="count">3</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'toilets' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=toilets`)}
                            >
                                <Building size={18} />
                                <span>Public Toilets</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'trade' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=trade`)}
                            >
                                <Building size={18} />
                                <span>Trade License</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'building' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=building`)}
                            >
                                <Building size={18} />
                                <span>Building License</span>
                                <span className="count">3</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'construction' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=construction`)}
                            >
                                <Building size={18} />
                                <span>Building Construction</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'parks' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=parks`)}
                            >
                                <Building size={18} />
                                <span>Lakes</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'welfare' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=welfare`)}
                            >
                                <Building size={18} />
                                <span>Social Welfare</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'general' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=general`)}
                            >
                                <Building size={18} />
                                <span>General</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'education' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=education`)}
                            >
                                <Building size={18} />
                                <span>Health</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'housing' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=housing`)}
                            >
                                <Building size={18} />
                                <span>Housing Scheme Information</span>
                                <span className="count">4</span>
                            </button>

                            <button
                                className={`department-item ${departmentFilter === 'revenue' ? 'active' : ''}`}
                                onClick={() => navigate(`/ward/${wardNumber}?dept=revenue`)}
                            >
                                <Building size={18} />
                                <span>Revenue</span>
                                <span className="count">4</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content - Complaints/Issues */}
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
                        {departmentFilter === 'health' && (
                            <div className="complaints-section">
                                <h2>Garbage And Sanitation</h2>
                                <div className="complaints-grid">
                                    <div className="complaint-card">
                                        <h4>Public dustbins not cleaned</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Garbage dump</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Garbage vehicle not arrived</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Sweeping not done</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Drains not cleaned/ blockage in drains</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Burning of garbage in open spaces</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Garbage dumping in open sites</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Stagnant water on the road</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Urination in public/open defecation (OD)</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Littering</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Non segregation of waste</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                    <div className="complaint-card">
                                        <h4>Illegal dumping of biomedical and hazardous waste</h4>
                                        <p className="complaint-dept">Health department</p>
                                    </div>
                                </div>
                                <div className="complaint-footer">
                                    <p>Couldn't find your complaint?</p>
                                </div>
                            </div>
                        )}

                        {!departmentFilter && (
                            <div className="overview-section">
                                <div className="info-grid">
                                    <div className="info-card card">
                                        <h3>Ward Information</h3>
                                        <div className="info-stats">
                                            <div className="stat-item">
                                                <Users size={24} />
                                                <div>
                                                    <strong>{ward.population.toLocaleString()}</strong>
                                                    <span>Residents</span>
                                                </div>
                                            </div>
                                            <div className="stat-item">
                                                <MapPin size={24} />
                                                <div>
                                                    <strong>{ward.area}</strong>
                                                    <span>Area</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="map-card card">
                                        <h3>Ward Location</h3>
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
                                        <h3>Ward Boundaries</h3>
                                        <div className="boundaries-grid">
                                            <div className="boundary-item">
                                                <strong>North:</strong>
                                                <span>{ward.boundaries.north}</span>
                                            </div>
                                            <div className="boundary-item">
                                                <strong>South:</strong>
                                                <span>{ward.boundaries.south}</span>
                                            </div>
                                            <div className="boundary-item">
                                                <strong>East:</strong>
                                                <span>{ward.boundaries.east}</span>
                                            </div>
                                            <div className="boundary-item">
                                                <strong>West:</strong>
                                                <span>{ward.boundaries.west}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="facilities-card card">
                                        <h3>Public Facilities</h3>
                                        <div className="facilities-list">
                                            {ward.facilities.map((facility, index) => (
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
        </div>
    );
}

export default WardDetails;
