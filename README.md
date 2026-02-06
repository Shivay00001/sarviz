# Sarviz - AI Business Growth Platform

Sarviz is a production-ready MVP SaaS designed to help local businesses grow through AI-driven automation. It includes features for growth planning, ads management, lead CRM, and performance analytics.

## 🚀 Features

- **AI Growth Plans**: Generate personalized marketing strategies based on business profile.
- **Ads Campaign Manager**: Plan and track Google and Social Media ads.
- **Lead CRM**: Manage leads, track status, and improve conversion.
- **Performance Analytics**: Real-time dashboard for revenue and lead tracking.
- **Local SEO Tools**: Generate Google updates and manage reviews.
- **Authentication**: Secure login/signup via Supabase.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS v4, ShadCN UI
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

## 📦 Setup & Installation

1. **Clone the repository**
2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Environment Variables**:
    Create a `.env.local` file with your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. **Database Setup**:
    Run the SQL script located in `supabase/schema.sql` in your Supabase SQL Editor.
5. **Run Development Server**:

    ```bash
    npm run dev
    ```

6. **Build for Production**:

    ```bash
    npm run build
    npm start
    ```

## 🧪 Verification

To verify the installation:

1. Run `npm run build`.
2. Start the app and navigate to `http://localhost:3000`.
3. Sign up and complete the onboarding to see the Growth Plan.
