# AI-Powered Content Summarizer

This project is a React-based dashboard that allows users to input long-form text content or scrape content from web pages and receive AI-generated summaries. It uses the MERN stack (MongoDB, Express.js, React, Node.js) and Firebase for Google Sign-In authentication.

## Features

1. **Clean, Responsive Interface**: 
    - Text input area for users to paste or type long-form content.
    - URL input field for web scraping.
2. **Web Scraping**:
    - Users can input a URL to fetch HTML content.
    - Displays scraped content in the text input area for user review.
3. **AI Summarization**:
    - Integration with a mock AI summarization API.
    - Predefined summaries based on input length or keywords.
5. **User Authentication**:
    - Google Sign-In using Firebase.
    - Personalize the experience and save user-specific history.
7. **History Section**:
    - Saves previous summarization requests.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (local or cloud instance)

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/rohanramidwar/rohan-ai-powered-content-summarizer-frontend.git
    cd rohan-ai-powered-content-summarizer-frontend/server
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT = 5000
    CONNECTION_URL = "mongodb+srv://rohanramidwar71:vrpGMYwlkcN2840y@cluster0.sxu9okm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd ../client
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and go to `https://rohan-ai-powered-content-summarizer-frontend.vercel.app/`.
2. Sign in with Google using the provided authentication.
3. Input long-form content or a URL to scrape content.
4. Generate and view AI-generated summaries.
5. Adjust the summary length and export summaries as needed.
6. View the history of previous summarizations.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


