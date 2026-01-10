# Neon Postgres Setup Guide

This project uses Neon Postgres (free tier) for persistent data storage.

## Step 1: Create a Neon Account

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account (no credit card required)
3. Create a new project

## Step 2: Get Your Connection String

1. In your Neon dashboard, go to your project
2. Click on "Connection Details" or "Connection String"
3. Copy the connection string (it will look like: `postgresql://user:password@host/database?sslmode=require`)

## Step 3: Add to Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new variable:
   - **Name**: `POSTGRES_URL` (or `DATABASE_URL`)
   - **Value**: Paste your Neon connection string
   - **Environment**: Production, Preview, and Development (select all)
4. Click "Save"

## Step 4: Redeploy

1. After adding the environment variable, Vercel will automatically redeploy
2. Or manually trigger a redeploy from the Deployments tab

## Step 5: Verify

1. Visit your deployed site
2. Try submitting a wish
3. Refresh the page - the wish should persist!

## Local Development

For local development, create a `.env.local` file in the root directory:

```
POSTGRES_URL=your_neon_connection_string_here
```

Or use `DATABASE_URL` instead of `POSTGRES_URL`.

## Free Tier Limits

Neon's free tier includes:
- 256 MB storage (expandable to 512 MB)
- ~192 compute hours per month
- Perfect for small to medium projects

## Troubleshooting

If you see errors:
1. Make sure the connection string is correct
2. Check that the environment variable is set in Vercel
3. Verify the database schema was created (it auto-creates on first use)
4. Check Vercel function logs for detailed error messages
