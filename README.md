# ShivaCivic - Shivamogga Civic Engagement Platform

A modern, feature-rich civic engagement platform for Shivamogga, Karnataka, inspired by CivInc. This platform connects citizens with their local representatives and provides transparent access to ward information.

![ShivaCivic](public/logo.svg)

## 🌟 Features

### Core Functionality
- **Ward Data Lookup**: Search for ward information by city and ward number
- **Interactive Maps**: View ward locations on interactive Leaflet maps
- **Corporator Information**: Access contact details and information about local representatives
- **Multi-Language Support**: Available in English, Hindi, and Kannada
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Pages
1. **Home** - Hero section with ward search and process overview
2. **Ward Details** - Comprehensive ward information with maps
3. **Partners** - Information about partner organizations
4. **Data Review** - Track civic issue status
5. **Feedback** - Submit citizen grievances
6. **About** - Platform mission and vision
7. **Team** - Meet the team behind ShivaCivic
8. **Collaborate** - Partnership opportunities

## 🚀 Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 4.5
- **Routing**: React Router DOM
- **Maps**: Leaflet & React-Leaflet
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables
- **Languages**: JavaScript/JSX

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd /Users/vishalaradhyajc/Desktop/civic/shivamogga-civic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
shivamogga-civic/
├── public/
│   └── logo.svg                 # Application logo
├── src/
│   ├── components/              # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/                   # Page components
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── WardDetails.jsx
│   │   ├── WardDetails.css
│   │   ├── Feedback.jsx
│   │   ├── Feedback.css
│   │   ├── DataReview.jsx
│   │   ├── About.jsx
│   │   ├── Team.jsx
│   │   ├── Collaborate.jsx
│   │   └── Partners.jsx
│   ├── data/                    # Data files
│   │   ├── wardData.js          # Ward information (60 wards)
│   │   └── translations.js      # Multi-language translations
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & design system
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                    # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6`
- **Accent Cyan**: `#06b6d4`
- **Success Green**: `#10b981`
- **Warning Orange**: `#f59e0b`
- **Error Red**: `#ef4444`

### Dark Mode
- **Background**: `#0f172a`
- **Secondary**: `#1e293b`
- **Tertiary**: `#334155`

### Typography
- System fonts for optimal performance
- Gradient text for headings
- Responsive font sizes

### Components
- Cards with hover effects
- Gradient buttons
- Form inputs with focus states
- Badges and tags
- Responsive navigation

## 🌍 Multi-Language Support

The platform supports three languages:
- **English** (en)
- **Hindi** (hi) - हिंदी
- **Kannada** (kn) - ಕನ್ನಡ

Language preference is saved in localStorage and persists across sessions.

## 📊 Ward Data

The platform includes data for all 60 wards of Shivamogga:
- Ward boundaries
- Corporator information
- Contact details
- Population and area
- Public facilities
- Geographic coordinates

### Sample Ward Structure
```javascript
{
  id: 1,
  wardNumber: 1,
  wardName: 'Ward 1 - Gandhi Bazaar',
  corporator: {
    name: 'Rajesh Kumar',
    party: 'Independent',
    phone: '+91 98765 43210',
    email: 'rajesh.ward1@shivamogga.gov.in'
  },
  boundaries: {
    north: 'MG Road',
    south: 'Station Road',
    east: 'BH Road',
    west: 'Tunga River'
  },
  facilities: ['Primary Health Center', 'Government School'],
  population: 8500,
  area: '2.5 sq km',
  coordinates: [13.9299, 75.5681]
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding New Wards

Edit `src/data/wardData.js` and add ward objects to the `shivamoggaWards` array.

### Adding Translations

Edit `src/data/translations.js` and add new keys to the `translations` object for each language.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🎯 Features Roadmap

### Completed ✅
- [x] Ward search functionality
- [x] Interactive maps
- [x] Multi-language support
- [x] Dark mode
- [x] Responsive design
- [x] All core pages
- [x] Feedback form
- [x] Data review system

### Planned 🔮
- [ ] Backend API integration
- [ ] Real-time issue tracking
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Advanced search filters
- [ ] Data analytics dashboard
- [ ] QR code generation
- [ ] PDF report downloads

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Team

- **Project Lead**: Dr. Rajesh Kumar
- **Technical Lead**: Priya Sharma
- **Community Manager**: Arun Gowda
- **Research Associate**: Lakshmi Devi

## 📧 Contact

- **Email**: contact@shivacivic.in
- **Phone**: +91 98765 43210
- **Address**: Shivamogga, Karnataka

## 🙏 Acknowledgments

- Inspired by [CivInc](https://civinc.in)
- Built for the citizens of Shivamogga
- Supported by Shivamogga City Corporation

## 📸 Screenshots

### Homepage
The landing page features a clean hero section with ward search functionality.

### Ward Details
Comprehensive ward information with interactive maps showing exact locations.

### Multi-Language
Full support for English, Hindi, and Kannada languages.

### Dark Mode
Beautiful dark theme for comfortable viewing in low-light conditions.

---

**Made with ❤️ for Shivamogga**

For more information, visit our website or contact us at contact@shivacivic.in
