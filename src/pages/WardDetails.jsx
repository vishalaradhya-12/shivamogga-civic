import { useParams, useSearchParams } from 'react-router-dom';
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

                <div className="ward-content">
                    {/* Corporator Info */}
                    <div className="corporator-card card animate-fade-in">
                        <h2>Ward Corporator</h2>
                        <div className="corporator-info">
                            <div className="corporator-avatar">
                                {ward.corporator.photo ? (
                                    <img src={ward.corporator.photo} alt={ward.corporator.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {ward.corporator.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="corporator-details">
                                <h3>{ward.corporator.name}</h3>
                                <p className="party-badge badge">{ward.corporator.party}</p>
                                <div className="contact-details">
                                    <a href={`tel:${ward.corporator.phone}`} className="contact-link">
                                        <Phone size={18} />
                                        {ward.corporator.phone}
                                    </a>
                                    <a href={`mailto:${ward.corporator.email}`} className="contact-link">
                                        <Mail size={18} />
                                        {ward.corporator.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="map-card card animate-fade-in">
                        <h2>Ward Location</h2>
                        <div className="map-container">
                            <MapContainer
                                center={ward.coordinates}
                                zoom={14}
                                style={{ height: '400px', width: '100%' }}
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

                    {/* Boundaries */}
                    <div className="boundaries-card card animate-fade-in">
                        <h2>Ward Boundaries</h2>
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

                    {/* Facilities */}
                    <div className="facilities-card card animate-fade-in">
                        <h2>Public Facilities</h2>
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
        </div>
    );
}

export default WardDetails;
