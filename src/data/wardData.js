// Shivamogga Ward Data
// Note: This is sample data. Real data should be obtained from Shivamogga City Corporation

export const shivamoggaWards = [
    {
        id: 1,
        wardNumber: 1,
        wardName: 'Ward 1 - Gandhi Bazaar',
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
        facilities: [
            'Primary Health Center',
            'Government School',
            'Public Library',
            'Community Hall'
        ],
        population: 8500,
        area: '2.5 sq km',
        coordinates: [13.9299, 75.5681] // Shivamogga center coordinates
    },
    {
        id: 2,
        wardNumber: 2,
        wardName: 'Ward 2 - Vinoba Nagar',
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
        facilities: [
            'Anganwadi Center',
            'High School',
            'Sports Complex',
            'Park'
        ],
        population: 9200,
        area: '3.1 sq km',
        coordinates: [13.9320, 75.5700]
    },
    {
        id: 3,
        wardNumber: 3,
        wardName: 'Ward 3 - Shankara Pura',
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
        facilities: [
            'Government Hospital',
            'Police Station',
            'Fire Station',
            'Market Complex'
        ],
        population: 10500,
        area: '2.8 sq km',
        coordinates: [13.9280, 75.5650]
    },
    {
        id: 4,
        wardNumber: 4,
        wardName: 'Ward 4 - Gopala',
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
        facilities: [
            'Primary School',
            'Community Center',
            'Playground',
            'Water Treatment Plant'
        ],
        population: 7800,
        area: '3.5 sq km',
        coordinates: [13.9340, 75.5720]
    },
    {
        id: 5,
        wardNumber: 5,
        wardName: 'Ward 5 - Ayanur',
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
        facilities: [
            'Veterinary Hospital',
            'Government School',
            'Post Office',
            'Bank Branch'
        ],
        population: 6500,
        area: '4.2 sq km',
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
