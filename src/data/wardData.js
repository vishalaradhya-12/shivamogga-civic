// Shivamogga Ward Data
// Note: This is sample data. Real data should be obtained from Shivamogga City Corporation

export const shivamoggaWards = [
    {
        id: 1,
        wardNumber: 1,
        wardName: 'Ward 1 - Gandhi Bazaar',
        wardNameKn: 'ವಾರ್ಡ್ 1 - ಗಾಂಧಿ ಬಜಾರ್',
        wardNameHi: 'वार्ड 1 - गांधी बाजार',
        corporator: {
            name: 'Rajesh Kumar',
            party: 'Independent',
            phone: '+91 98765 43210',
            email: 'rajesh.ward1@shivamogga.gov.in',
            photo: null
        },
        boundaries: {
            north: 'MG Road',
            south: 'Station Road',
            east: 'BH Road',
            west: 'Tunga River'
        },
        boundariesKn: {
            north: 'ಎಂಜಿ ರೋಡ್',
            south: 'ಸ್ಟೇಷನ್ ರೋಡ್',
            east: 'ಬಿಹೆಚ್ ರೋಡ್',
            west: 'ತುಂಗಾ ನದಿ'
        },
        boundariesHi: {
            north: 'एमजी रोड',
            south: 'स्टेशन रोड',
            east: 'बीएच रोड',
            west: 'तुंगा नदी'
        },
        facilities: [
            'Primary Health Center',
            'Government School',
            'Public Library',
            'Community Hall'
        ],
        facilitiesKn: [
            'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ',
            'ಸರ್ಕಾರಿ ಶಾಲೆ',
            'ಸಾರ್ವಜನಿಕ ಗ್ರಂಥಾಲಯ',
            'ಸಮುದಾಯ ಭವನ'
        ],
        facilitiesHi: [
            'प्राथमिक स्वास्थ्य केंद्र',
            'सरकारी स्कूल',
            'सार्वजनिक पुस्तकालय',
            'सामुदायिक भवन'
        ],
        population: 8500,
        area: '2.5 sq km',
        areaKn: '2.5 ಚ.ಕಿ.ಮೀ',
        areaHi: '2.5 वर्ग किमी',
        coordinates: [13.9299, 75.5681] // Shivamogga center coordinates
    },
    {
        id: 2,
        wardNumber: 2,
        wardName: 'Ward 2 - Vinoba Nagar',
        wardNameKn: 'ವಾರ್ಡ್ 2 - ವಿನೋಬಾ ನಗರ',
        wardNameHi: 'वार्ड 2 - विनोबा नगर',
        corporator: {
            name: 'Lakshmi Devi',
            party: 'BJP',
            phone: '+91 98765 43211',
            email: 'lakshmi.ward2@shivamogga.gov.in',
            photo: null
        },
        boundaries: {
            north: 'Vinoba Road',
            south: 'Kuvempu Road',
            east: 'College Road',
            west: 'NH 206'
        },
        boundariesKn: {
            north: 'ವಿನೋಬಾ ರೋಡ್',
            south: 'ಕುವೆಂಪು ರೋಡ್',
            east: 'ಕಾಲೇಜು ರೋಡ್',
            west: 'ಎನ್ಹೆಚ್ 206'
        },
        boundariesHi: {
            north: 'विनोबा रोड',
            south: 'कुवेम्पु रोड',
            east: 'कॉलेज रोड',
            west: 'एनएच 206'
        },
        facilities: [
            'Anganwadi Center',
            'High School',
            'Sports Complex',
            'Park'
        ],
        facilitiesKn: [
            'ಅಂಗನವಾಡಿ ಕೇಂದ್ರ',
            'ಪ್ರೄಢಶಾಲೆ',
            'ಕ್ರೀಡಾ ಸಂಕೀರ್ಣ',
            'ಉದ್ಯಾನವನ'
        ],
        facilitiesHi: [
            'आंगनवाड़ी केंद्र',
            'हाई स्कूल',
            'खेल परिसर',
            'पार्क'
        ],
        population: 9200,
        area: '3.1 sq km',
        areaKn: '3.1 ಚ.ಕಿ.ಮೀ',
        areaHi: '3.1 वर्ग किमी',
        coordinates: [13.9320, 75.5700]
    },
    {
        id: 3,
        wardNumber: 3,
        wardName: 'Ward 3 - Shankara Pura',
        wardNameKn: 'ವಾರ್ಡ್ 3 - ಶಂಕರ ಪುರ',
        wardNameHi: 'वार्ड 3 - शंकर पुरा',
        corporator: {
            name: 'Manjunath Gowda',
            party: 'Congress',
            phone: '+91 98765 43212',
            email: 'manjunath.ward3@shivamogga.gov.in',
            photo: null
        },
        boundaries: {
            north: 'Ring Road',
            south: 'Temple Street',
            east: 'Market Road',
            west: 'Railway Line'
        },
        boundariesKn: {
            north: 'ರಿಂಗ್ ರೋಡ್',
            south: 'ದೇವಸ್ಥಾನ ಬೀದಿ',
            east: 'ಮಾರುಕಟ್ಟೆ ರೋಡ್',
            west: 'ರೈಲ್ವೆ ಮಾರ್ಗ'
        },
        boundariesHi: {
            north: 'रिंग रोड',
            south: 'मंदिर स्ट्रीट',
            east: 'मार्केट रोड',
            west: 'रेलवे लाइन'
        },
        facilities: [
            'Government Hospital',
            'Police Station',
            'Fire Station',
            'Market Complex'
        ],
        facilitiesKn: [
            'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ',
            'ಪೊಲೀಸ್ ಠಾಣೆ',
            'ಅಗ್ನಿಶಾಮಕ ಠಾಣೆ',
            'ಮಾರುಕಟ್ಟೆ ಸಂಕೀರ್ಣ'
        ],
        facilitiesHi: [
            'सरकारी अस्पताल',
            'पुलिस स्टेशन',
            'फायर स्टेशन',
            'मार्केट कॉम्प्लेक्स'
        ],
        population: 10500,
        area: '2.8 sq km',
        areaKn: '2.8 ಚ.ಕಿ.ಮೀ',
        areaHi: '2.8 वर्ग किमी',
        coordinates: [13.9280, 75.5650]
    },
    {
        id: 4,
        wardNumber: 4,
        wardName: 'Ward 4 - Gopala',
        wardNameKn: 'ವಾರ್ಡ್ 4 - ಗೋಪಾಲ',
        wardNameHi: 'वार्ड 4 - गोपाल',
        corporator: {
            name: 'Sunitha Rao',
            party: 'JD(S)',
            phone: '+91 98765 43213',
            email: 'sunitha.ward4@shivamogga.gov.in',
            photo: null
        },
        boundaries: {
            north: 'Gopala Road',
            south: 'Bypass Road',
            east: 'Industrial Area',
            west: 'Residential Zone'
        },
        boundariesKn: {
            north: 'ಗೋಪಾಲ ರೋಡ್',
            south: 'ಬೈಪಾಸ್ ರೋಡ್',
            east: 'ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ',
            west: 'ವಸತಿ ವಲಯ'
        },
        boundariesHi: {
            north: 'गोपाल रोड',
            south: 'बाईपास रोड',
            east: 'औद्योगिक क्षेत्र',
            west: 'आवासीय क्षेत्र'
        },
        facilities: [
            'Primary School',
            'Community Center',
            'Playground',
            'Water Treatment Plant'
        ],
        facilitiesKn: [
            'ಪ್ರಾಥಮಿಕ ಶಾಲೆ',
            'ಸಮುದಾಯ ಕೇಂದ್ರ',
            'ಆಟದ ಮೈದಾನ',
            'ನೀರು ಸಂಸ್ಕರಣಾ ಘಟಕ'
        ],
        facilitiesHi: [
            'प्राथमिक विद्यालय',
            'सामुदायिक केंद्र',
            'खेल का मैदान',
            'जल उपचार संयंत्र'
        ],
        population: 7800,
        area: '3.5 sq km',
        areaKn: '3.5 ಚ.ಕಿ.ಮೀ',
        areaHi: '3.5 वर्ग किमी',
        coordinates: [13.9340, 75.5720]
    },
    {
        id: 5,
        wardNumber: 5,
        wardName: 'Ward 5 - Ayanur',
        wardNameKn: 'ವಾರ್ಡ್ 5 - ಅಯನೂರು',
        wardNameHi: 'वार्ड 5 - अयनूर',
        corporator: {
            name: 'Prakash Shetty',
            party: 'Independent',
            phone: '+91 98765 43214',
            email: 'prakash.ward5@shivamogga.gov.in',
            photo: null
        },
        boundaries: {
            north: 'Ayanur Main Road',
            south: 'Canal Road',
            east: 'Agricultural Land',
            west: 'City Limits'
        },
        boundariesKn: {
            north: 'ಅಯನೂರು ಮುಖ್ಯ ರಸ್ತೆ',
            south: 'ಕಾಲುವೆ ರಸ್ತೆ',
            east: 'ಕೃಷಿ ಭೂಮಿ',
            west: 'ನಗರ ಮಿತಿ'
        },
        boundariesHi: {
            north: 'अयनूर मुख्य सड़क',
            south: 'नहर रोड',
            east: 'कृषि भूमि',
            west: 'शहर की सीमा'
        },
        facilities: [
            'Veterinary Hospital',
            'Government School',
            'Post Office',
            'Bank Branch'
        ],
        facilitiesKn: [
            'ಪಶು ವೈದ್ಯಕೀಯ ಆಸ್ಪತ್ರೆ',
            'ಸರ್ಕಾರಿ ಶಾಲೆ',
            'ಅಂಚೆ ಕಛೇರಿ',
            'ಬ್ಯಾಂಕ್ ಶಾಖೆ'
        ],
        facilitiesHi: [
            'पशु चिकित्सालय',
            'सरकारी स्कूल',
            'डाकघर',
            'बैंक शाखा'
        ],
        population: 6500,
        area: '4.2 sq km',
        areaKn: '4.2 ಚ.ಕಿ.ಮೀ',
        areaHi: '4.2 वर्ग किमी',
        coordinates: [13.9260, 75.5620]
    }
];

// Add more wards (Shivamogga has 60 wards total)
// For demo purposes, we'll generate placeholder data for remaining wards
for (let i = 6; i <= 60; i++) {
    shivamoggaWards.push({
        id: i,
        wardNumber: i,
        wardName: `Ward ${i}`,
        corporator: {
            name: `Corporator ${i}`,
            party: ['BJP', 'Congress', 'JD(S)', 'Independent'][Math.floor(Math.random() * 4)],
            phone: `+91 98765 ${43210 + i}`,
            email: `ward${i}@shivamogga.gov.in`,
            photo: null
        },
        boundaries: {
            north: 'To be updated',
            south: 'To be updated',
            east: 'To be updated',
            west: 'To be updated'
        },
        facilities: [
            'Community Center',
            'Public Facilities'
        ],
        population: Math.floor(Math.random() * 5000) + 5000,
        area: `${(Math.random() * 3 + 2).toFixed(1)} sq km`,
        coordinates: [
            13.9299 + (Math.random() - 0.5) * 0.1,
            75.5681 + (Math.random() - 0.5) * 0.1
        ]
    });
}

export const getWardByNumber = (wardNumber) => {
    return shivamoggaWards.find(ward => ward.wardNumber === parseInt(wardNumber));
};

export const getAllWards = () => {
    return shivamoggaWards;
};

export const cities = [
    {
        id: 1,
        name: 'Shivamogga',
        nameKn: 'ಶಿವಮೊಗ್ಗ',
        nameHi: 'शिवमोग्गा',
        totalWards: 60,
        population: 322650,
        area: '127.55 sq km'
    }
];
