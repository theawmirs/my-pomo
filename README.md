# MyPomo - Boost Your Focus

A modern, feature-rich Pomodoro timer application built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

![MyPomo](public/og-image.png)

## 📋 Overview

MyPomo is a productivity tool based on the Pomodoro Technique, a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This application helps users improve focus, manage distractions, and maintain productivity throughout their work sessions.

## ✨ Features

- **Customizable Timer Settings**: Adjust work and break durations to fit your workflow
- **Session Tracking**: Track completed Pomodoro sessions with detailed statistics
- **User Authentication**: Secure login and registration with NextAuth
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme for comfortable viewing
- **Beautiful UI**: Modern, clean interface with smooth animations
- **Session History**: View and analyze your past Pomodoro sessions
- **Real-time Clock**: Keep track of the current time while using the timer

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **UI Components**: Radix UI, Shadcn UI
- **Styling**: Tailwind CSS, CSS animations
- **Form Handling**: React Hook Form with Zod validation

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/my-pomo.git
   cd my-pomo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/mypomo"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:

   ```bash
   npx prisma db push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. The main models include:

- **User**: Stores user information and authentication details
- **Pomodoro**: Tracks completed Pomodoro sessions with duration and type

## 📱 Usage

1. **Register/Login**: Create an account or log in to track your Pomodoro sessions
2. **Start a Session**: Choose your timer settings and start focusing
3. **Take Breaks**: The app will notify you when it's time for a break
4. **Track Progress**: View your productivity statistics and session history

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Built with ❤️ using [Next.js](https://nextjs.org)
