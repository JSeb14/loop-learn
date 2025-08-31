# LoopLearn 🎓

A modern, intelligent flashcard application built with Next.js that helps you accelerate your learning through spaced repetition and customizable study sets.

## 🌟 Features

### Core Functionality
- **Create Custom Flashcard Sets**: Build personalized flashcard collections for any subject
- **Spaced Repetition Learning**: Implements the SM-2 algorithm for optimal memory retention
- **Image Support**: Add images to both front and back of flashcards for visual learning
- **Practice Modes**: Multiple study modes including practice sessions and quiz mode
- **Progress Tracking**: Track your learning progress with confidence ratings and review intervals

### User Experience
- **Modern UI**: Clean, responsive design with dark/light theme support
- **User Authentication**: Secure account creation and management via Supabase Auth
- **Real-time Sync**: All data synchronized across devices
- **Search & Discovery**: Find and explore flashcard sets
- **Private/Public Sets**: Control visibility of your flashcard collections

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Zustand** - Lightweight state management

### Backend & Database
- **Supabase** - Backend-as-a-Service providing:
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication & authorization
  - File storage for images

### Key Libraries
- **React Hook Form** + **Zod** - Form handling and validation
- **Lucide React** - Beautiful icons
- **UUID** - Unique identifier generation
- **Next Themes** - Theme switching support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loop-learn.git
   cd loop-learn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

### Spaced Repetition Algorithm
LoopLearn uses the SM-2 (SuperMemo 2) algorithm to optimize learning:
- Cards are scheduled for review based on your performance
- Successful recalls increase the interval between reviews
- Difficult cards are reviewed more frequently
- Each card has an ease factor that adjusts based on your confidence

### Study Flow
1. **Create a Set**: Add a new flashcard set with title, description, and subject
2. **Add Cards**: Create flashcards with text and optional images
3. **Practice**: Study cards using spaced repetition
4. **Rate Confidence**: After each card, rate your confidence (1-5)
5. **Track Progress**: Monitor your learning with review statistics

## 🏗️ Project Structure

```
loop-learn/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── protected/         # Authenticated routes
│   └── assets/            # Static assets
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── flashcards/       # Flashcard management
│   ├── practice/         # Study session components
│   ├── sets/             # Set management
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
│   ├── controllers/      # API controllers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Business logic
│   ├── stores/          # Zustand state stores
│   ├── supabase/        # Supabase configuration
│   └── types/           # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## 🔧 Key Components

### Authentication
- Email/password authentication via Supabase
- Password reset functionality
- Protected routes with middleware
- Session management

### Flashcard Management
- CRUD operations for flashcards and sets
- Image upload and storage
- Batch operations for efficient data handling

### Study System
- SM-2 spaced repetition algorithm implementation
- Confidence-based rating system
- Review scheduling and due date calculation
- Progress tracking and statistics

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Study statistics and analytics dashboard
- [ ] Collaborative flashcard sets
- [ ] Export/import functionality
- [ ] Mobile app development
- [ ] Advanced scheduling algorithms
- [ ] Gamification features

---

Built with ❤️ using Next.js and Supabase