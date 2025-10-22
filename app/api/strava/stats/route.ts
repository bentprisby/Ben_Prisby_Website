import { NextResponse } from 'next/server'

// Strava API configuration
// You'll need to set these environment variables in your .env.local file:
// STRAVA_CLIENT_ID=your_client_id
// STRAVA_CLIENT_SECRET=your_client_secret
// STRAVA_REFRESH_TOKEN=your_refresh_token

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN

interface StravaTokenResponse {
  access_token: string
  expires_at: number
  refresh_token: string
}

interface StravaAthlete {
  id: number
  username: string
}

interface StravaStats {
  all_run_totals: {
    distance: number // in meters
    count: number
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    console.error('Missing Strava credentials')
    return null
  }

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      console.error('Failed to refresh Strava token')
      return null
    }

    const data: StravaTokenResponse = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Error refreshing Strava token:', error)
    return null
  }
}

async function getAthleteStats(accessToken: string): Promise<number> {
  try {
    // First, get the athlete ID
    const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!athleteResponse.ok) {
      console.error('Failed to fetch athlete data')
      return 0
    }

    const athlete: StravaAthlete = await athleteResponse.json()

    // Then get the athlete stats
    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athlete.id}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!statsResponse.ok) {
      console.error('Failed to fetch athlete stats')
      return 0
    }

    const stats: StravaStats = await statsResponse.json()
    
    // Convert meters to miles (1 meter = 0.000621371 miles)
    const totalMiles = Math.round(stats.all_run_totals.distance * 0.000621371)
    
    return totalMiles
  } catch (error) {
    console.error('Error fetching athlete stats:', error)
    return 0
  }
}

export async function GET() {
  try {
    // Get a fresh access token
    const accessToken = await refreshAccessToken()

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Strava', totalMiles: 1247 },
        { status: 500 }
      )
    }

    // Fetch the total miles
    const totalMiles = await getAthleteStats(accessToken)

    return NextResponse.json(
      { totalMiles },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    )
  } catch (error) {
    console.error('Error in Strava stats API:', error)
    return NextResponse.json(
      { error: 'Internal server error', totalMiles: 1247 },
      { status: 500 }
    )
  }
}

