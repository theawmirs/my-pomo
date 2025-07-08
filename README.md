# My Pomo

My Pomo is a modern and feature-rich Pomodoro timer application designed to help you stay focused and manage your tasks effectively. Built with Next.js and a powerful set of tools, it provides a seamless user experience with features like user authentication, task management, customizable themes, and performance tracking.

## ✨ Features

- **Pomodoro Timer**: A customizable timer with focus, short break, and long break sessions.
- **Task Management**: Create, read, update, and delete tasks. Filter and sort tasks to stay organized.
- **User Authentication**: Secure user registration and login using NextAuth.js.
- **User Profiles**: View and edit your profile, including uploading a profile picture.
- **User Statistics**: Track your completed sessions and tasks over time.
- **Customizable Wallpaper**: Personalize your workspace by changing the background wallpaper.
- **Theme Switching**: Switch between light and dark modes.
- **Responsive Design**: A fully responsive interface that works on all devices.
- **Notifications**: Get notified when a session ends.

### In-Depth Features

#### Authentication System

The application uses **NextAuth.js** for robust and secure user authentication.

- **Credentials-Based Login**: Users can sign up with an email and password. Passwords are encrypted using `bcryptjs` before being stored in the database.
- **Session Management**: NextAuth.js handles session management, keeping users logged in across browser sessions.
- **Protected Routes**: Middleware is used to protect application routes, ensuring that only authenticated users can access the main Pomodoro timer and their personal data.

#### User Profile and Settings

Each user has a dedicated profile page where they can manage their account and track their progress.

- **Public Profile Page**: Displays user's name, profile picture, and statistics like total Pomodoro sessions and completed tasks.
- **Profile Editing**: Users can update their personal information, including their name and profile picture. Profile pictures are uploaded to Vercel Blob storage.
- **Account Settings**: Users can manage their account settings, with the option to delete their account and all associated data.

#### Customization

My Pomo offers several options for users to personalize their experience.

- **Wallpaper**: Users can choose from a selection of wallpapers to set as their background, creating a more pleasant and motivating workspace. Selections are saved to the database.
- **Theme**: A theme toggle allows switching between a light and dark mode to suit user preference and reduce eye strain. The chosen theme is persisted across sessions using `next-themes`.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `shadcn/ui` for components.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **File Uploads**: Vercel Blob
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📂 Folder Structure

The project follows a modular, feature-sliced architecture to keep the codebase organized and scalable.

```
src
├── app/                  # Next.js App Router: Pages, Layouts, and API Routes
│   ├── (app)/            # Main application routes (protected)
│   ├── (home)/           # Landing page
│   ├── api/              # API endpoints
│   └── auth/             # Authentication pages (login/register)
│
├── components/           # Shared UI components (e.g., Button, Card)
│
├── lib/                  # Core libraries and utilities
│   ├── auth/             # Authentication configuration
│   ├── db/               # Database actions and schemas
│   └── prisma.ts         # Prisma client instance
│
├── modules/              # Feature-based modules
│   ├── auth/             # Authentication logic (forms, actions, state)
│   ├── global/           # Global components (Navbar, ThemeProvider)
│   ├── home/             # Components for the landing page
│   ├── pomodoro/         # Pomodoro timer logic and components
│   ├── tasks/            # Task management logic and components
│   └── user/             # User profile and settings logic
│
└── middleware.ts         # Next.js middleware for route protection
```

## 🌊 App Flow

1.  **Landing Page**: New users are greeted with a landing page that showcases the app's features.
2.  **Authentication**: Users can sign up for a new account or log in with their existing credentials. The session is managed by NextAuth.js.
3.  **Pomodoro Timer**: After logging in, users are directed to the main Pomodoro timer. They can start a focus session, take short or long breaks, and receive notifications upon completion.
4.  **Task Management**: Users can open a modal to view their tasks. They can add new tasks, edit existing ones, mark them as complete, or delete them. Tasks can be filtered and sorted based on different criteria.
5.  **User Profile & Settings**: Users can access their profile page to view their statistics, such as completed Pomodoros and tasks. They can also edit their profile information and upload a new profile picture.
6.  **Customization**: The app allows users to personalize their experience by changing the wallpaper and switching between light and dark themes.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/my-pomo.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables. Create a `.env.local` file in the root of your project and add the necessary variables (e.g., database URL, NextAuth secret).
    ```env
    DATABASE_URL="your_database_url"
    AUTH_SECRET="your_nextauth_secret"
    # ... other variables
    ```
4.  Push the Prisma schema to your database.
    ```sh
    npx prisma db push
    ```
5.  Run the development server.
    ```sh
    npm run dev
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000).
