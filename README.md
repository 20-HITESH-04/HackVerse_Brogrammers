# Brogrammers
## TezClaim - AI-Powered Insurance Claim Verification

## Introduction
TezClaim is an advanced AI-powered solution designed to enhance security and efficiency in insurance claim verification. It leverages deep learning and natural language processing (NLP) to analyze insurance documents, detect fraudulent claims, and streamline the verification process in real time. By utilizing cutting-edge AI techniques, TezClaim ensures faster, more accurate claim assessments, reducing manual workload and minimizing fraud risks.

## How to Run

### Run Frontend
- cd my-app
- npm install
- npm run dev
### Run Backend
- cd backend
- npm install
- create file .env and add MONGO_URI JWT_SECRET PORT OPENCAGE_API_KEY
- npm start
  ### Run ML models
- cd ml/<model_name>
- install dependecies
- run the flask api file


## Project Structure
```
TezClaim/
│── backend/
│   ├── config/             # Configuration files
│   ├── controllers/        # Business logic and request handling
│   ├── middleware/         # Authentication and request validation
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── uploads/            # Uploaded documents
│   ├── server.js           # Main backend server
│   ├── package.json        # Backend dependencies
│
│── ml/                     # Machine learning models for document analysis
│
│── my-app/
│   ├── app/
│   │   ├── auth/           # Authentication pages
│   │   ├── api/ocr-verification/ # API for OCR document analysis
│   │   ├── car-insurance/  # Car insurance claim verification
│   │   ├── user/           # User-related pages
│   ├── Components/         # Reusable frontend components
│   ├── public/             # Static assets
│   ├── lib/                # Utility functions
│   ├── globals.css         # Global styles
│   ├── layout.js           # Main layout component
│   ├── page.js             # Root page
│
│── .env                    # Environment variables
│── package.json            # Project dependencies
│── package-lock.json       # Dependency lock file
````

## Machine Learning Models
TezClaim employs multiple deep learning models to ensure robust claim verification and fraud detection. Below are the core models used:

1. **OCR & NLP Verification (Doctr)**  
   - Utilizes the Doctr library for Optical Character Recognition (OCR) and Natural Language Processing (NLP) to extract and analyze text from insurance documents.  
   - Helps verify the authenticity of documents by comparing extracted data with predefined rules.  
   - ![image](https://github.com/user-attachments/assets/6dbbae3f-7c08-464b-98bf-83d94a31d68b)
   - ![image](https://github.com/user-attachments/assets/5314b1cc-3530-4efa-9b20-6bfec63753c5)



2. **Damage Detection (Deceptron)**  
   - Uses the Deceptron model to analyze images of damaged vehicles or property.
   - Detects the severity of damage and categorizes it to assist insurance claim assessments.  
   -![WhatsApp Image 2025-03-28 at 11 42 20_a33efb84](https://github.com/user-attachments/assets/dadbb0fa-b83b-4328-9eb9-3afa4017e7f3)
   -![WhatsApp Image 2025-03-28 at 11 42 07_77027deb](https://github.com/user-attachments/assets/063916ff-74bc-4198-85d0-be5a9807c46f)


3. **Face Recognition (FaceNet)**  
   - Implements FaceNet for identity verification through facial recognition.
   - Ensures that claimants match the identities associated with their policies.  
   - ![Face Recognition Model](#)

4. **Signature Recognition (ResNet)**  
   - Leverages ResNet to analyze and verify signatures on insurance documents.
   - Helps detect forged or manipulated signatures.  
   - ![image](https://github.com/user-attachments/assets/2e29e8a4-ae25-4591-b668-a3cbd665ee26)


5. **House Detection (Custom Model)**  
   - Trained on a custom dataset to detect houses in claim-related images.
   - Assists in verifying property insurance claims and ensuring the claimed structure matches records.  
## Frontend Features
The frontend of TezClaim is designed to provide a seamless experience for both admins and users, ensuring efficient claim verification and fraud detection. Below are the key features:

### Admin Dashboard
- Provides an overview of all user statistics, including active claims and fraud detection rates.
- Allows the admin to add new users by setting up their email, photo, and signature for verification purposes.
- ![image](https://github.com/user-attachments/assets/73169fb8-7051-487f-a898-6454a03ef236)
  

### User Dashboard
- Displays all the insurance policies the user has applied for.
- Users can navigate from the dashboard to claim policies.
- !![image](https://github.com/user-attachments/assets/23570a88-5922-4830-9539-d20f7263a4bd)
- ![image](https://github.com/user-attachments/assets/67415b07-1c0a-4581-842f-bce78311d500)


### Claim Policies
- Users can upload required documents, including:
  - Policy photo
  - User photo
  - User signature
  - Property loss images
- The system matches the uploaded data against the database for verification.
- Location and time tracking ensure the claim is consistent with the accident report.
- For car insurance claims, the system checks if the claimed location and the user's device location align within the given time frame.
- House claims undergo a similar verification process.
- ![image](https://github.com/user-attachments/assets/a6b36175-6d7e-4043-8ed0-38e92305e7e9
![image](https://github.com/user-attachments/assets/6423be2a-3b18-4f31-b66a-b0cecb9f6fe1)



### Claim History
- Users can view previous claims and their verification status.
- Helps track claim progress and detect inconsistencies in past submissions.
-![image](https://github.com/user-attachments/assets/bbb63bee-c7f4-4a1d-b83e-19d89286304e)


### AI Chatbot (RAG Model)
- Provides an interactive chatbot for users to get real-time assistance on claim-related queries.
- Uses Retrieval-Augmented Generation (RAG) to deliver accurate and context-aware responses.
-![WhatsApp Image 2025-03-28 at 12 32 15_59767e91](https://github.com/user-attachments/assets/d32dc714-6dfb-45fb-bce4-d7514b6c4da1)


## Backend Features
The backend of TezClaim is responsible for handling secure authentication, user management, ML model integration, and API endpoints for claim verification. Below are the core backend features:

### Secure Authentication
- Implements **JWT-based authentication** for secure user login and session management.
- Supports **role-based access control (RBAC)** to differentiate admin and user permissions.
- Encrypts sensitive user data to ensure privacy and security.

### User Management
- Allows users to **sign up and log in** securely.
- Admins can **add new users**, set their profile details, and manage authentication credentials.
- Stores user-related data, including **profile pictures and signatures**, for verification.

### Machine Learning Integration
- Integrates ML models for **document verification, damage detection, face recognition, and fraud detection**.
- Processes **OCR results in real-time** to validate insurance claims.
- Uses **geolocation and timestamp analysis** to check the legitimacy of accident claims.

### API Endpoints
- Exposes REST APIs for:
  - **User authentication and role-based access**
  - **Document submission and verification**
  - **Fraud detection using ML models**
  - **Claim history retrieval and status updates**
- Ensures **high performance** and **scalability** through optimized database queries and caching.
