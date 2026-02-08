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
        coordinates: [13.9299, 75.5681], // Shivamogga center coordinates
        employees: [
            {
                id: 'W1-HEALTH-001',
                name: 'Ramesh Kumar',
                nameKn: 'ರಮೇಶ್ ಕುಮಾರ್',
                nameHi: 'रमेश कुमार',
                designation: 'Sanitation Inspector',
                designationKn: 'ನೈರ್ಮಲ್ಯ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'स्वच्छता निरीक्षक',
                department: 'health',
                phone: '+91 98765 11001',
                email: 'ramesh.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-HEALTH-002',
                name: 'Kavitha Shetty',
                nameKn: 'ಕವಿತಾ ಶೆಟ್ಟಿ',
                nameHi: 'कविता शेट्टी',
                designation: 'Sweeper Supervisor',
                designationKn: 'ಗುಡಿಸುವವರ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'सफाई पर्यवेक्षक',
                department: 'health',
                phone: '+91 98765 11002',
                email: 'kavitha.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-STREET-001',
                name: 'Suresh Gowda',
                nameKn: 'ಸುರೇಶ್ ಗೌಡ',
                nameHi: 'सुरेश गौड़ा',
                designation: 'Electrical Technician',
                designationKn: 'ವಿದ್ಯುತ್ ತಂತ್ರಜ್ಞ',
                designationHi: 'विद्युत तकनीशियन',
                department: 'streetlights',
                phone: '+91 98765 11003',
                email: 'suresh.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-ROAD-001',
                name: 'Manjunath Rao',
                nameKn: 'ಮಂಜುನಾಥ್ ರಾವ್',
                nameHi: 'मंजुनाथ राव',
                designation: 'Road Inspector',
                designationKn: 'ರಸ್ತೆ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'सड़क निरीक्षक',
                department: 'roads',
                phone: '+91 98765 11004',
                email: 'manjunath.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-WATER-001',
                name: 'Priya Sharma',
                nameKn: 'ಪ್ರಿಯಾ ಶರ್ಮಾ',
                nameHi: 'प्रिया शर्मा',
                designation: 'Water Supply Engineer',
                designationKn: 'ನೀರು ಪೂರೈಕೆ ಇಂಜಿನಿಯರ್',
                designationHi: 'जल आपूर्ति इंजीनियर',
                department: 'water',
                phone: '+91 98765 11005',
                email: 'priya.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-DRAIN-001',
                name: 'Venkatesh Naik',
                nameKn: 'ವೆಂಕಟೇಶ್ ನಾಯಕ್',
                nameHi: 'वेंकटेश नायक',
                designation: 'Drainage Supervisor',
                designationKn: 'ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'जल निकासी पर्यवेक्षक',
                department: 'drainage',
                phone: '+91 98765 11006',
                email: 'venkatesh.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-PERMIT-001',
                name: 'Anitha Reddy',
                nameKn: 'ಅನಿತಾ ರೆಡ್ಡಿ',
                nameHi: 'अनिता रेड्डी',
                designation: 'Permissions Officer',
                designationKn: 'ಅನುಮತಿ ಅಧಿಕಾರಿ',
                designationHi: 'अनुमति अधिकारी',
                department: 'permissions',
                phone: '+91 98765 11007',
                email: 'anitha.w1@shivamogga.gov.in'
            },
            {
                id: 'W1-ELEC-001',
                name: 'Rajesh Bhat',
                nameKn: 'ರಾಜೇಶ್ ಭಟ್',
                nameHi: 'राजेश भट्ट',
                designation: 'Electrical Supervisor',
                designationKn: 'ವಿದ್ಯುತ್ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'विद्युत पर्यवेक्षक',
                department: 'electrical',
                phone: '+91 98765 11008',
                email: 'rajesh.w1@shivamogga.gov.in'
            }
        ]
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
        coordinates: [13.9320, 75.5700],
        employees: [
            {
                id: 'W2-HEALTH-001',
                name: 'Deepak Hegde',
                nameKn: 'ದೀಪಕ್ ಹೆಗಡೆ',
                nameHi: 'दीपक हेगड़े',
                designation: 'Sanitation Inspector',
                designationKn: 'ನೈರ್ಮಲ್ಯ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'स्वच्छता निरीक्षक',
                department: 'health',
                phone: '+91 98765 22001',
                email: 'deepak.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-HEALTH-002',
                name: 'Sunitha Nayak',
                nameKn: 'ಸುನೀತಾ ನಾಯಕ್',
                nameHi: 'सुनीता नायक',
                designation: 'Sweeper Supervisor',
                designationKn: 'ಗುಡಿಸುವವರ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'सफाई पर्यवेक्षक',
                department: 'health',
                phone: '+91 98765 22002',
                email: 'sunitha.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-STREET-001',
                name: 'Arun Kumar',
                nameKn: 'ಅರುಣ್ ಕುಮಾರ್',
                nameHi: 'अरुण कुमार',
                designation: 'Electrical Technician',
                designationKn: 'ವಿದ್ಯುತ್ ತಂತ್ರಜ್ಞ',
                designationHi: 'विद्युत तकनीशियन',
                department: 'streetlights',
                phone: '+91 98765 22003',
                email: 'arun.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-ROAD-001',
                name: 'Lakshman Rao',
                nameKn: 'ಲಕ್ಷ್ಮಣ್ ರಾವ್',
                nameHi: 'लक्ष्मण राव',
                designation: 'Road Inspector',
                designationKn: 'ರಸ್ತೆ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'सड़क निरीक्षक',
                department: 'roads',
                phone: '+91 98765 22004',
                email: 'lakshman.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-WATER-001',
                name: 'Meena Patel',
                nameKn: 'ಮೀನಾ ಪಟೇಲ್',
                nameHi: 'मीना पटेल',
                designation: 'Water Supply Engineer',
                designationKn: 'ನೀರು ಪೂರೈಕೆ ಇಂಜಿನಿಯರ್',
                designationHi: 'जल आपूर्ति इंजीनियर',
                department: 'water',
                phone: '+91 98765 22005',
                email: 'meena.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-DRAIN-001',
                name: 'Harish Shetty',
                nameKn: 'ಹರೀಶ್ ಶೆಟ್ಟಿ',
                nameHi: 'हरीश शेट्टी',
                designation: 'Drainage Supervisor',
                designationKn: 'ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'जल निकासी पर्यवेक्षक',
                department: 'drainage',
                phone: '+91 98765 22006',
                email: 'harish.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-PERMIT-001',
                name: 'Rekha Desai',
                nameKn: 'ರೇಖಾ ದೇಸಾಯಿ',
                nameHi: 'रेखा देसाई',
                designation: 'Permissions Officer',
                designationKn: 'ಅನುಮತಿ ಅಧಿಕಾರಿ',
                designationHi: 'अनुमति अधिकारी',
                department: 'permissions',
                phone: '+91 98765 22007',
                email: 'rekha.w2@shivamogga.gov.in'
            },
            {
                id: 'W2-ELEC-001',
                name: 'Prakash Bhat',
                nameKn: 'ಪ್ರಕಾಶ್ ಭಟ್',
                nameHi: 'प्रकाश भट्ट',
                designation: 'Electrical Supervisor',
                designationKn: 'ವಿದ್ಯುತ್ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'विद्युत पर्यवेक्षक',
                department: 'electrical',
                phone: '+91 98765 22008',
                email: 'prakash.w2@shivamogga.gov.in'
            }
        ]
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
        coordinates: [13.9280, 75.5650],
        employees: [
            {
                id: 'W3-HEALTH-001',
                name: 'Ganesh Kulkarni',
                nameKn: 'ಗಣೇಶ್ ಕುಲಕರ್ಣಿ',
                nameHi: 'गणेश कुलकर्णी',
                designation: 'Sanitation Inspector',
                designationKn: 'ನೈರ್ಮಲ್ಯ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'स्वच्छता निरीक्षक',
                department: 'health',
                phone: '+91 98765 33001',
                email: 'ganesh.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-HEALTH-002',
                name: 'Radha Bai',
                nameKn: 'ರಾಧಾ ಬಾಯಿ',
                nameHi: 'राधा बाई',
                designation: 'Sweeper Supervisor',
                designationKn: 'ಗುಡಿಸುವವರ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'सफाई पर्यवेक्षक',
                department: 'health',
                phone: '+91 98765 33002',
                email: 'radha.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-STREET-001',
                name: 'Naveen Kumar',
                nameKn: 'ನವೀನ್ ಕುಮಾರ್',
                nameHi: 'नवीन कुमार',
                designation: 'Electrical Technician',
                designationKn: 'ವಿದ್ಯುತ್ ತಂತ್ರಜ್ಞ',
                designationHi: 'विद्युत तकनीशियन',
                department: 'streetlights',
                phone: '+91 98765 33003',
                email: 'naveen.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-ROAD-001',
                name: 'Shivakumar Gowda',
                nameKn: 'ಶಿವಕುಮಾರ್ ಗೌಡ',
                nameHi: 'शिवकुमार गौड़ा',
                designation: 'Road Inspector',
                designationKn: 'ರಸ್ತೆ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'सड़क निरीक्षक',
                department: 'roads',
                phone: '+91 98765 33004',
                email: 'shivakumar.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-WATER-001',
                name: 'Savitha Rao',
                nameKn: 'ಸವಿತಾ ರಾವ್',
                nameHi: 'सविता राव',
                designation: 'Water Supply Engineer',
                designationKn: 'ನೀರು ಪೂರೈಕೆ ಇಂಜಿನಿಯರ್',
                designationHi: 'जल आपूर्ति इंजीनियर',
                department: 'water',
                phone: '+91 98765 33005',
                email: 'savitha.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-DRAIN-001',
                name: 'Mohan Reddy',
                nameKn: 'ಮೋಹನ್ ರೆಡ್ಡಿ',
                nameHi: 'मोहन रेड्डी',
                designation: 'Drainage Supervisor',
                designationKn: 'ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'जल निकासी पर्यवेक्षक',
                department: 'drainage',
                phone: '+91 98765 33006',
                email: 'mohan.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-PERMIT-001',
                name: 'Latha Shetty',
                nameKn: 'ಲತಾ ಶೆಟ್ಟಿ',
                nameHi: 'लता शेट्टी',
                designation: 'Permissions Officer',
                designationKn: 'ಅನುಮತಿ ಅಧಿಕಾರಿ',
                designationHi: 'अनुमति अधिकारी',
                department: 'permissions',
                phone: '+91 98765 33007',
                email: 'latha.w3@shivamogga.gov.in'
            },
            {
                id: 'W3-ELEC-001',
                name: 'Dinesh Naik',
                nameKn: 'ದಿನೇಶ್ ನಾಯಕ್',
                nameHi: 'दिनेश नायक',
                designation: 'Electrical Supervisor',
                designationKn: 'ವಿದ್ಯುತ್ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'विद्युत पर्यवेक्षक',
                department: 'electrical',
                phone: '+91 98765 33008',
                email: 'dinesh.w3@shivamogga.gov.in'
            }
        ]
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
        coordinates: [13.9340, 75.5720],
        employees: [
            {
                id: 'W4-HEALTH-001',
                name: 'Kiran Shetty',
                nameKn: 'ಕಿರಣ್ ಶೆಟ್ಟಿ',
                nameHi: 'किरण शेट्टी',
                designation: 'Sanitation Inspector',
                designationKn: 'ನೈರ್ಮಲ್ಯ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'स्वच्छता निरीक्षक',
                department: 'health',
                phone: '+91 98765 44001',
                email: 'kiran.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-HEALTH-002',
                name: 'Pushpa Devi',
                nameKn: 'ಪುಷ್ಪಾ ದೇವಿ',
                nameHi: 'पुष्पा देवी',
                designation: 'Sweeper Supervisor',
                designationKn: 'ಗುಡಿಸುವವರ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'सफाई पर्यवेक्षक',
                department: 'health',
                phone: '+91 98765 44002',
                email: 'pushpa.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-STREET-001',
                name: 'Vijay Kumar',
                nameKn: 'ವಿಜಯ್ ಕುಮಾರ್',
                nameHi: 'विजय कुमार',
                designation: 'Electrical Technician',
                designationKn: 'ವಿದ್ಯುತ್ ತಂತ್ರಜ್ಞ',
                designationHi: 'विद्युत तकनीशियन',
                department: 'streetlights',
                phone: '+91 98765 44003',
                email: 'vijay.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-ROAD-001',
                name: 'Nagaraj Gowda',
                nameKn: 'ನಾಗರಾಜ್ ಗೌಡ',
                nameHi: 'नागराज गौड़ा',
                designation: 'Road Inspector',
                designationKn: 'ರಸ್ತೆ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'सड़क निरीक्षक',
                department: 'roads',
                phone: '+91 98765 44004',
                email: 'nagaraj.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-WATER-001',
                name: 'Asha Rani',
                nameKn: 'ಆಶಾ ರಾಣಿ',
                nameHi: 'आशा रानी',
                designation: 'Water Supply Engineer',
                designationKn: 'ನೀರು ಪೂರೈಕೆ ಇಂಜಿನಿಯರ್',
                designationHi: 'जल आपूर्ति इंजीनियर',
                department: 'water',
                phone: '+91 98765 44005',
                email: 'asha.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-DRAIN-001',
                name: 'Sunil Naik',
                nameKn: 'ಸುನೀಲ್ ನಾಯಕ್',
                nameHi: 'सुनील नायक',
                designation: 'Drainage Supervisor',
                designationKn: 'ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'जल निकासी पर्यवेक्षक',
                department: 'drainage',
                phone: '+91 98765 44006',
                email: 'sunil.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-PERMIT-001',
                name: 'Mamatha Kulkarni',
                nameKn: 'ಮಮತಾ ಕುಲಕರ್ಣಿ',
                nameHi: 'ममता कुलकर्णी',
                designation: 'Permissions Officer',
                designationKn: 'ಅನುಮತಿ ಅಧಿಕಾರಿ',
                designationHi: 'अनुमति अधिकारी',
                department: 'permissions',
                phone: '+91 98765 44007',
                email: 'mamatha.w4@shivamogga.gov.in'
            },
            {
                id: 'W4-ELEC-001',
                name: 'Ravi Hegde',
                nameKn: 'ರವಿ ಹೆಗಡೆ',
                nameHi: 'रवि हेगड़े',
                designation: 'Electrical Supervisor',
                designationKn: 'ವಿದ್ಯುತ್ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'विद्युत पर्यवेक्षक',
                department: 'electrical',
                phone: '+91 98765 44008',
                email: 'ravi.w4@shivamogga.gov.in'
            }
        ]
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
        coordinates: [13.9260, 75.5620],
        employees: [
            {
                id: 'W5-HEALTH-001',
                name: 'Basavaraj Patil',
                nameKn: 'ಬಸವರಾಜ್ ಪಾಟೀಲ್',
                nameHi: 'बसवराज पाटिल',
                designation: 'Sanitation Inspector',
                designationKn: 'ನೈರ್ಮಲ್ಯ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'स्वच्छता निरीक्षक',
                department: 'health',
                phone: '+91 98765 55001',
                email: 'basavaraj.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-HEALTH-002',
                name: 'Geetha Bai',
                nameKn: 'ಗೀತಾ ಬಾಯಿ',
                nameHi: 'गीता बाई',
                designation: 'Sweeper Supervisor',
                designationKn: 'ಗುಡಿಸುವವರ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'सफाई पर्यवेक्षक',
                department: 'health',
                phone: '+91 98765 55002',
                email: 'geetha.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-STREET-001',
                name: 'Santosh Kumar',
                nameKn: 'ಸಂತೋಷ್ ಕುಮಾರ್',
                nameHi: 'संतोष कुमार',
                designation: 'Electrical Technician',
                designationKn: 'ವಿದ್ಯುತ್ ತಂತ್ರಜ್ಞ',
                designationHi: 'विद्युत तकनीशियन',
                department: 'streetlights',
                phone: '+91 98765 55003',
                email: 'santosh.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-ROAD-001',
                name: 'Krishnamurthy Rao',
                nameKn: 'ಕೃಷ್ಣಮೂರ್ತಿ ರಾವ್',
                nameHi: 'कृष्णमूर्ति राव',
                designation: 'Road Inspector',
                designationKn: 'ರಸ್ತೆ ತನಿಖಾಧಿಕಾರಿ',
                designationHi: 'सड़क निरीक्षक',
                department: 'roads',
                phone: '+91 98765 55004',
                email: 'krishnamurthy.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-WATER-001',
                name: 'Usha Reddy',
                nameKn: 'ಉಷಾ ರೆಡ್ಡಿ',
                nameHi: 'उषा रेड्डी',
                designation: 'Water Supply Engineer',
                designationKn: 'ನೀರು ಪೂರೈಕೆ ಇಂಜಿನಿಯರ್',
                designationHi: 'जल आपूर्ति इंजीनियर',
                department: 'water',
                phone: '+91 98765 55005',
                email: 'usha.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-DRAIN-001',
                name: 'Chandrashekar Naik',
                nameKn: 'ಚಂದ್ರಶೇಖರ್ ನಾಯಕ್',
                nameHi: 'चंद्रशेखर नायक',
                designation: 'Drainage Supervisor',
                designationKn: 'ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'जल निकासी पर्यवेक्षक',
                department: 'drainage',
                phone: '+91 98765 55006',
                email: 'chandrashekar.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-PERMIT-001',
                name: 'Veena Shetty',
                nameKn: 'ವೀಣಾ ಶೆಟ್ಟಿ',
                nameHi: 'वीणा शेट्टी',
                designation: 'Permissions Officer',
                designationKn: 'ಅನುಮತಿ ಅಧಿಕಾರಿ',
                designationHi: 'अनुमति अधिकारी',
                department: 'permissions',
                phone: '+91 98765 55007',
                email: 'veena.w5@shivamogga.gov.in'
            },
            {
                id: 'W5-ELEC-001',
                name: 'Mahesh Bhat',
                nameKn: 'ಮಹೇಶ್ ಭಟ್',
                nameHi: 'महेश भट्ट',
                designation: 'Electrical Supervisor',
                designationKn: 'ವಿದ್ಯುತ್ ಮೇಲ್ವಿಚಾರಕ',
                designationHi: 'विद्युत पर्यवेक्षक',
                department: 'electrical',
                phone: '+91 98765 55008',
                email: 'mahesh.w5@shivamogga.gov.in'
            }
        ]
    }
];

// Add more wards (Shivamogga has 60 wards total)
// For demo purposes, we'll generate placeholder data for remaining wards
for (let i = 6; i <= 60; i++) {
    const departments = ['health', 'streetlights', 'roads', 'water', 'drainage', 'permissions', 'electrical'];
    const employees = departments.map((dept, index) => ({
        id: `W${i}-${dept.toUpperCase().substring(0, 6)}-001`,
        name: `Employee ${i}-${index + 1}`,
        nameKn: `ಉದ್ಯೋಗಿ ${i}-${index + 1}`,
        nameHi: `कर्मचारी ${i}-${index + 1}`,
        designation: dept === 'health' ? 'Sanitation Inspector' :
            dept === 'streetlights' ? 'Electrical Technician' :
                dept === 'roads' ? 'Road Inspector' :
                    dept === 'water' ? 'Water Supply Engineer' :
                        dept === 'drainage' ? 'Drainage Supervisor' :
                            dept === 'permissions' ? 'Permissions Officer' :
                                'Electrical Supervisor',
        designationKn: dept === 'health' ? 'ನೈರ್ಮಲ್ಯ ತನಿಖಾಧಿಕಾರಿ' :
            dept === 'streetlights' ? 'ವಿದ್ಯುತ್ ತಂತ್ರಜ್ಞ' :
                dept === 'roads' ? 'ರಸ್ತೆ ತನಿಖಾಧಿಕಾರಿ' :
                    dept === 'water' ? 'ನೀರು ಪೂರೈಕೆ ಇಂಜಿನಿಯರ್' :
                        dept === 'drainage' ? 'ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಕ' :
                            dept === 'permissions' ? 'ಅನುಮತಿ ಅಧಿಕಾರಿ' :
                                'ವಿದ್ಯುತ್ ಮೇಲ್ವಿಚಾರಕ',
        designationHi: dept === 'health' ? 'स्वच्छता निरीक्षक' :
            dept === 'streetlights' ? 'विद्युत तकनीशियन' :
                dept === 'roads' ? 'सड़क निरीक्षक' :
                    dept === 'water' ? 'जल आपूर्ति इंजीनियर' :
                        dept === 'drainage' ? 'जल निकासी पर्यवेक्षक' :
                            dept === 'permissions' ? 'अनुमति अधिकारी' :
                                'विद्युत पर्यवेक्षक',
        department: dept,
        phone: `+91 98765 ${i}${index}00${index}`,
        email: `employee${i}.${index}@shivamogga.gov.in`
    }));

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
        ],
        employees: employees
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
