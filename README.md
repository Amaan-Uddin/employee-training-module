


# Employee Training Module

This project is a full-stack application designed for employee training. It requires users to register or sign in, and then allows them to complete training modules in a sequential manner. The application tracks user progress and ensures that each module is completed fully before moving to the next.

## Features

-   **User Authentication**: Users can register or sign in using their credentials. JWT-based authentication is used for securing API requests.
-   **Dashboard**: Displays the user's progress through the training modules.
-   **Sequential Module Completion**: Modules must be watched in order, and users cannot fast forward or skip videos.
-   **Progress Tracking**: The application tracks user progress after each module.
-   **Responsive UI**: Built with React and styled using Tailwind CSS and Shadcn UI components.
-   **Media Storage**: Videos are securely stored and served from Cloudinary.


## Getting Started

### Installation

1.  Clone the repository:
    
     ``` 
     https://github.com/Amaan-Uddin/employee-training-module.git 
     ``` 
    
2.  Navigate to the project directory:
  
    ```
    cd employee-training-module
    ``` 
    
### Backend
1.  Install dependencies:
        
    ```
    cd server
    npm install
    ``` 
    
4.  Set up environment variables:
    
    -   Create a `.env` file in the root directory.

     ```
     PORT= 
     MONGO_URI= 
     ACCESS_TOKEN_SECRET= 
     REFRESH_TOKEN_SECRET= 
     ACCESS_TOKEN_MAX= 
     REFRESH_TOKEN_MAX= 
     ALLOWED_ORIGINS=
     ``` 
        
5.  Start the development server:
    
    ```
    npm run dev
    ``` 
    
6.  Access the application at 
     ```
     http://localhost:3000
    ```
  
 ### Frontend
1.  Install dependencies:
        
    ```
    cd client
    npm install
    ``` 
    
4.  Set up environment variables:
    
    -   Create a `.env.local` file in the root directory.


     ```
     VITE_BASE_URL=   
       ``` 
        
5.  Start the react development server:
    
    ```
    npm run dev
    ``` 
    
6.  Access the application at 
     ```
     http://localhost:5173
    ```
    
  ## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Amaan-Uddin/employee-training-module/blob/main/LICENSE) file for details.
