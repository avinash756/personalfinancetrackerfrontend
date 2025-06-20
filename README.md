
# 💰 Personal Finance Tracker

A full-stack web application to help users manage their personal expenses, visualize their spending habits, and securely track financial transactions. This app supports QR code scanning for UPI payments and includes data export and analytics features.

---

## 🚀 Features

- ✅ User authentication using [Clerk](https://clerk.dev)
- ✅ Add, delete financial transactions
- ✅ Scan UPI QR codes to quickly initiate payments
- ✅ Visualize data using:
  - Pie Chart (Spending by Category)
  - Bar Chart (Expenses over Category)
  - Line Chart (Spending Over Time)
  - Transaction Table
- ✅ Download full report as PDF (charts + table)
- ✅ Responsive UI with React Bootstrap Carousel

---

---

## 🧑‍💻 Tech Stack

### Frontend
- ReactJS (with Hooks)
- React Bootstrap
- Chart.js via `react-chartjs-2`
- html2canvas + jsPDF for PDF generation
- Clerk for authentication
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- REST API (secured with Bearer Token)
- CORS + dotenv

---

🎨 Home Page Carousel
Shows welcome slides or feature highlights

Implemented using react-bootstrap carousel

Responsive design with custom height control

==========================================================
npm install recharts

npm install react-spinners

npm install react-toastify


for visually appealing:

pie chart,line chart,bar chart 


===========================================================
📄 Export Feature
Users can download all their transactions and charts as a PDF Report

Generated with html2canvas and jsPDF


✅ Best Option: Download as PDF with Charts + Table
You can combine:

Chart components (like Pie, Bar, Line)

HTML table (your transaction table)

into one downloadable PDF

✅ How to Implement (React)
🔧 Step 1: Install dependencies
bash
Copy
Edit
npm install html2canvas jspdf
html2canvas: Takes a screenshot of your visual area.

jspdf: Converts the image (and text) into a downloadable PDF.


===================================================


📲 QR Scanning and UPI Integration
Scan any UPI QR using your device camera

If a valid UPI QR code is detected, a button will appear to open it in a UPI app

(On web, redirection is attempted; full app opening depends on mobile device support)


✅ Install a QR Code Scanner Library
Use react-qr-reader or html5-qrcode.

📦 Recommended: html5-qrcode (better camera access control)
bash
Copy
Edit
npm install html5-qrcode

const url = new URL(data);
const params = new URLSearchParams(url.search);
console.log(params.get("pa")); // upi ID
console.log(params.get("am")); // amount

upi://pay?pa=daveeddaveedd@axl&pn=Mr.%20GANGI%20DAVID&am=500&tn=Groceries&cu=INR



| Parameter | Meaning                | Example             |
| --------- | ---------------------- | ------------------- |
| `pa`      | Payee address (UPI ID) | `daveeddaveedd@axl` |
| `pn`      | Payee name             | `Mr. GANGI DAVID`   |
| `am`      | Amount                 | `500`               |
| `tn`      | Transaction note       | `Groceries`         |
| `cu`      | Currency               | `INR`               |



====================================================================



Backend

=========================================
.env 

PORT=5000
MONGO_URL=your_mongodb_url
CLERK_SECRET_KEY=your_clerk_secret_key



======================================
issues fixed:

✅ Fix: Switch to @clerk/express (New SDK)
The official Clerk notice already warned:

“Starting October 8, 2024, the Node SDK is entering a three-month notice period. We encourage everyone to migrate to @clerk/express.”

🔧 Step-by-Step Migration
Install the new Clerk Express SDK:

npm install @clerk/express



🧠 Future Improvements

More powerful QR integration with UPI apps

Budget goals and alerts































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
