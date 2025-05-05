# Event Permission System

A digital solution for streamlining the event permission process in colleges. This application allows students to request permissions for attending events/competitions and faculty/HODs to review and approve these requests.

## Features

### For Students

- Submit digital permission requests with supporting documents
- Track request status in real-time
- View request history
- No need for physical paperwork or tracking down busy faculty

### For Faculty/HODs

- View all pending permission requests in one place
- Easily approve or reject requests with feedback
- Access request history
- Simple dashboard to manage permissions

## Tech Stack

- **Frontend + Backend**: Next.js with App Router
- **UI**: Tailwind CSS + Shadcn UI
- **Authentication + Database + Storage**: Supabase

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier)

### Setting up Supabase

1. Create a new Supabase project
2. Set up the database tables according to the schema in `lib/supabase-schema.ts`
3. Create a storage bucket named `documents`
4. Set up authentication (email/password)
5. Configure Row Level Security policies from the schema file
6. Get your project URL and anon key from the Supabase dashboard

### Local Development

1. Clone the repository

```bash
git clone <repository-url>
cd event-permissions-system
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file based on the example

```bash
cp .env.local.example .env.local
```

4. Fill in your Supabase credentials in `.env.local`

5. Run the development server

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy

## License

MIT
