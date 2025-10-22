# Strava Integration Setup

This guide will help you connect your Strava account to display your total miles ran on your portfolio website.

## Prerequisites

- A Strava account
- Running activities tracked on Strava

## Setup Instructions

### 1. Create a Strava API Application

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Create a new application
3. Fill in the required fields:
   - **Application Name**: Your Portfolio Website
   - **Category**: Choose appropriate category
   - **Website**: Your website URL (or http://localhost:3000 for development)
   - **Authorization Callback Domain**: `localhost` (for development) or your production domain
4. Save and note down your **Client ID** and **Client Secret**

### 2. Get Your Refresh Token

To get your refresh token, follow these steps:

1. **Get Authorization Code**:
   - Open this URL in your browser (replace `YOUR_CLIENT_ID` with your actual Client ID):
   ```
   https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000&response_type=code&scope=activity:read_all
   ```
   - Click "Authorize"
   - You'll be redirected to a URL like: `http://localhost:3000/?code=AUTHORIZATION_CODE`
   - Copy the `code` parameter from the URL

2. **Exchange Authorization Code for Refresh Token**:
   - Run this curl command (replace the placeholders):
   ```bash
   curl -X POST https://www.strava.com/oauth/token \
     -d client_id=YOUR_CLIENT_ID \
     -d client_secret=YOUR_CLIENT_SECRET \
     -d code=YOUR_AUTHORIZATION_CODE \
     -d grant_type=authorization_code
   ```
   - You'll receive a JSON response containing your `refresh_token`

### 3. Set Up Environment Variables

1. Create a `.env.local` file in the root of your project:
   ```bash
   touch .env.local
   ```

2. Add your Strava credentials to `.env.local`:
   ```
   STRAVA_CLIENT_ID=your_client_id_here
   STRAVA_CLIENT_SECRET=your_client_secret_here
   STRAVA_REFRESH_TOKEN=your_refresh_token_here
   ```

3. **Important**: Never commit `.env.local` to version control (it should already be in `.gitignore`)

### 4. Restart Your Development Server

After setting up the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## How It Works

- The Stats component fetches your total miles from the Strava API
- The API route (`/api/strava/stats`) handles authentication and data retrieval
- Your access token is automatically refreshed using your refresh token
- The data is cached for 1 hour to avoid hitting Strava's API rate limits
- If the API fails, it falls back to a placeholder value (1247 miles)

## Troubleshooting

### No data showing
- Check that your environment variables are correctly set in `.env.local`
- Make sure you've restarted the development server after adding environment variables
- Check the browser console for any error messages
- Verify your refresh token is still valid

### Rate limiting
- Strava has API rate limits (100 requests per 15 minutes, 1000 per day)
- The API route includes caching to minimize requests
- Consider implementing additional caching strategies if needed

## API Response Format

The API endpoint returns:
```json
{
  "totalMiles": 1247
}
```

The miles are calculated from your total running distance on Strava (converted from meters).

