#  CampusMart

**CampusMart** is a **student-focused marketplace platform** that enables users within a campus to **buy, sell, and exchange items easily**. It provides a secure and user-friendly environment for students to list products, connect with buyers, efficiently.  

---

## 🌟 Features

### 🔐 Authentication
- Secure login/signup using JWT (JSON Web Tokens)  
- User-specific dashboards  

### 🛍 Product Listings
- Students can post items for sale  
- Add product details (title, description, price, images)  

### 🔎 Search & Browse
- Browse all available products  
- Search and filter items easily  

### 💬 User Interaction
- Buyers can contact sellers  
- Smooth communication between users  

### 🤖 AI-Powered Features


#### 1. Smart Price Recommendation
- Buyers can input item details (Item Name, years used, condition, category)  
- AI predicts a **recommended price range** for the item  
- Helps sellers price their items competitively and fairly  

### 📁 File Uploads
- Upload product images using Multer  

### 📦 Order & Management
- Manage listed products  
- Track posted items and activity  



---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT |
| **File Uploads** | Multer |
| **AI & Recommendations** | Price Prediction Model ( ML-Algorithm: RandomForestRegressor) |
| **Tools** | Node.js, NPM, VS Code |

---

## 🚀 Project Workflow

1. **User Authentication**  
   - Users register and log in  
   - JWT used for secure sessions  

2. **Product Management**  
   - Sellers upload product details and images  
   - Products stored in MongoDB  

3. **Browsing & Searching**  
   - Users explore available items  
   - Filter/search functionality improves usability  

4. **AI Recommendations**    
   - Smart Price Recommendation:
     - Buyer inputs item details (condition, usage, category)  
     - AI predicts a fair price range  

5. **User Interaction**  
   - Buyers connect with sellers  

6. **Backend Handling**  
   - REST APIs built using Express.js  
   - Database operations handled via MongoDB  

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/CampusMart.git
cd CampusMart

2. Install Dependencies
Backend
cd server
npm install
Frontend
cd ../frontend
npm install
3. Environment Variables
Create a .env file inside the server/ folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the Application
Start Backend
cd server
npm start
Start Frontend
cd ../frontend
npm start

```
## 📖 Usage

- Sign up or log in
- Add products you want to sell
- Browse available items
- Use **AI-powered Price Recommendation** to get a suggested price for items
- Receive personalized product recommendations
