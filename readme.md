# Blog Genie

Blog Genie is an innovative tool designed to automate blog posting using AI agents, replacing the need for human blog writers. This project leverages the power of AI to streamline the process of creating, managing, and publishing blog content, allowing companies to save time, resources, and costs.

## Features

- **AI Agent Creation**: Create AI agents tailored to your content needs.
- **AI Instruction**: Instruct AI agents to generate content based on your requirements.
- **Content Generation**: Automatically generate high-quality blog content.
- **Image Generation**: AI-powered image generation to complement blog posts.
- **Automated Posting**: Seamlessly post blogs without manual intervention.

## Project Structure

The project is divided into three main components:

1. **Client Directory**:
   - Contains the admin dashboard where a company/person can log in.
   - Allows creating and managing AI agents.
   - Provides options to map AI agents to a website.

2. **Server Directory**:
   - Powered by Flask with SQLAlchemy for database management.
   - Handles backend operations for the admin panel.
   - Requires configuration of API keys for:
     - Image generation via [Hyperbolic](https://app.hyperbolic.xyz/).
     - Content generation via [Groq](https://groq.com/).

3. **Media-Platform Directory**:
   - A simple Laravel-based content management system (CMS).
   - Designed for easy connection and integration with the AI agents.

## Setup Instructions

### Prerequisites

- PHP and Composer (for Laravel CMS).
- Python and Pip (for Flask backend).
- Node.js and npm (for admin dashboard).
- Database setup (e.g., MySQL or PostgreSQL).

### Installation Steps

#### Clone the repository:
```bash
git clone https://github.com/Webxspark/blog-genie.git
cd blog-genie
```
#### Navigate to the `server` directory and set up the environment:

- Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

- Update the `.env` file with your API keys for:
- Image generation via [Hyperbolic](https://app.hyperbolic.xyz/).
- Content generation via [Groq](https://groq.com/).
#### Install dependencies for each component:
- **Client Directory**:
```bash
cd client
npm install
```
- **Server Directory**:
```bash
cd ../server
pip install -r requirements.txt
```
- **Media-Platform Directory**:
```bash
cd ../media-platform
composer install
```

 #### Run the application:
- **Client (Admin Dashboard)**:
```bash
cd ./client
npm run dev
```
- **Server (Backend):**
```bash
cd ./server
python app.py
```
- **Media Platform (Laravel CMS):**
```bash
cd ./media-platform
composer run dev
```
## Use Cases

Blog Genie is ideal for companies seeking to:

- Replace human blog writers with AI-driven automation.
- Maintain a consistent blog posting schedule with minimal effort.
- Generate engaging content and visuals without hiring additional resources.

## Future Plans

We aim to further enhance Blog Genie with the following features:

- **SEO Analyzer**: Analyze and optimize content for search engine performance based on trending keywords.
- **Content Uploader**: Automatically upload content aligned with keyword trends.
- **Feedback Mechanism**: Enable comment interactions for enhancing user engagement and collecting feedback.

## Technologies Used

- **Backend**: Python (Flask)
- **Frontend**: TypeScript
- **Database**: SQLAlchemy
- **CMS**: Laravel (PHP)
- **AI Features**: Integration with external APIs for content and image generation.

## Contribution Guidelines

We welcome contributions from the community! To contribute to Blog Genie, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request to the main repository.

## Contact

For questions or support, please contact [Webxspark](https://github.com/Webxspark).
