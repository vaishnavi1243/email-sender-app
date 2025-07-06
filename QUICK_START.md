# 🚀 Email Sender App - Quick Start Guide

## Your app is now running! 🎉

### Current Status:
- ✅ **Backend**: Running on http://localhost:5000
- ✅ **Frontend**: Running on http://localhost:3001
- ✅ **Browser**: Opened at http://localhost:3001

## 📧 How to Configure Email Sending

### Step 1: Set up Email Credentials
Edit the file: `backend\.env`

**Option A - Using Ethereal Email (Recommended for testing):**
1. Go to https://ethereal.email/
2. Click "Create Ethereal Account"
3. Copy the credentials and update your `.env` file:
```
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your-ethereal-email@ethereal.email
SMTP_PASS=your-ethereal-password
```

**Option B - Using Gmail:**
1. Enable 2-factor authentication
2. Generate an App Password in Google Account settings
3. Update your `.env` file:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

### Step 2: Test the Application
1. Fill in the form with:
   - **To**: Any valid email address
   - **Subject**: Your email subject
   - **Message**: Your email content

2. Click "Send Email"

3. You'll see a success/error toast notification

4. If using Ethereal Email, you'll get a preview link to see your email

## 🔧 Development Commands

### Backend Commands:
```bash
cd backend
npm run dev    # Start development server
npm start      # Start production server
```

### Frontend Commands:
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
```

## 🎨 Features Included

✅ **Form Validation**: Real-time validation with error messages
✅ **Loading States**: Visual feedback during email sending
✅ **Toast Notifications**: Success/error messages
✅ **Responsive Design**: Works on all device sizes
✅ **Modern UI**: Built with Tailwind CSS
✅ **Error Handling**: Comprehensive error handling
✅ **Input Sanitization**: Server-side validation

## 🚨 Troubleshooting

### Email not sending?
- Check your SMTP credentials in `backend\.env`
- Ensure your internet connection is working
- For Gmail: Make sure 2FA is enabled and App Password is correct

### Port conflicts?
- Backend runs on port 5000
- Frontend runs on port 3001 (or next available port)
- Check if these ports are available

### Frontend not loading?
- Ensure all dependencies are installed: `npm install`
- Check browser console for errors
- Verify backend is running on port 5000

## 📁 Project Structure

```
email-sender-app/
├── backend/
│   ├── index.js          # Express server
│   ├── .env              # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   └── index.css     # Tailwind styles
│   └── package.json
├── README.md
├── setup.bat            # Windows setup script
└── start.bat            # Windows start script
```

## 🎯 Next Steps

1. **Configure your email credentials** in `backend\.env`
2. **Test sending an email** using the form
3. **Customize the UI** by editing `frontend/src/App.jsx`
4. **Deploy to production** when ready

---

**Happy Emailing! 📧**
