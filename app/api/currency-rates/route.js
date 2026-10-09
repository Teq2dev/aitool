import { NextResponse } from 'next/server';
import { getLatestExchangeRates } from '@/lib/currencyRates';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    // If forcing refresh, require internal secret or authorization to prevent denial of service
    if (forceRefresh) {
      const authHeader = request.headers.get('authorization') || '';
      const secret = searchParams.get('token');
      const expectedSecret = process.env.CRON_SECRET || process.env.ADMIN_SECRET || 'internal_refresh_token';
      
      if (!authHeader.includes(expectedSecret) && secret !== expectedSecret) {
        return NextResponse.json(
          { error: 'Unauthorized refresh request' },
          { status: 401 }
        );
      }
    }

    const rateDataset = await getLatestExchangeRates({ forceRefresh });

    return NextResponse.json({
      success: true,
      base: rateDataset.base,
      rateDate: rateDataset.rateDate,
      provider: rateDataset.provider,
      sourceLabel: rateDataset.sourceLabel,
      rates: rateDataset.rates,
      fetchedAt: rateDataset.fetchedAt
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
