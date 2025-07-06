# College Connect

A comprehensive platform connecting students, colleges, and educational brokers for a seamless college admission experience.

## 🌟 Features

### For Students
- **College Exploration**: Browse and discover colleges that match your interests
- **Community Groups**: Join college-specific groups and connect with peers
- **Q&A Platform**: Ask questions and get answers from the community
- **Broker Consultation**: Chat with verified educational brokers
- **Application Tracking**: Track your college applications and deadlines

### For Colleges
- **Application Management**: Review and manage student applications
- **Student Engagement**: Connect with prospective students
- **Analytics Dashboard**: View detailed insights and analytics
- **Content Publishing**: Share announcements and updates
- **Group Management**: Monitor and manage student groups

### For Brokers
- **Client Management**: Manage client relationships and progress
- **Session Scheduling**: Schedule and manage consultation sessions
- **Reviews & Ratings**: Build trust through client reviews
- **Earnings Tracking**: Monitor revenue and business metrics
- **Performance Analytics**: Track success rates and client satisfaction

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Firebase Auth** - Authentication
- **React Query** - Data fetching and caching
- **Heroicons** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Firebase Admin** - Server-side Firebase integration
- **Mongoose** - MongoDB object modeling

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Firebase project with Authentication enabled

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/college-connect
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-private-key
```

## 🌐 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up environment variables in Netlify dashboard

### Backend (Render/Heroku)
1. Create a new service on Render or Heroku
2. Connect your GitHub repository
3. Set environment variables
4. Deploy automatically from main branch

## 📱 Usage

1. **Landing Page**: Choose your role (Student, College, Broker)
2. **Authentication**: Sign in with Google
3. **Dashboard**: Access role-specific features and tools
4. **Profile**: Complete your profile information
5. **Connect**: Start connecting with others in your ecosystem

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@collegeconnect.com or join our community Discord server.

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] AI-powered college recommendations
- [ ] Video calling integration
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] API documentation

---

**Built with ❤️ for the future of education** 