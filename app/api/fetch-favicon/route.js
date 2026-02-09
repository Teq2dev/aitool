import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    // Parse domain
    const domain = new URL(url).origin;
    
    // Try multiple favicon sources
    const faviconSources = [
      `${domain}/favicon.ico`,
      `${domain}/favicon.png`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      `https://icon.horse/icon/${new URL(url).hostname}`,
    ];

    // Try to fetch each source
    for (const source of faviconSources) {
      try {
        const response = await fetch(source, { 
          method: 'HEAD',
          timeout: 3000 
        });
        
        if (response.ok) {
          return NextResponse.json({ 
            success: true, 
            faviconUrl: source 
          });
        }
      } catch (err) {
        continue;
      }
    }

    // Fallback to Google favicon service
    return NextResponse.json({ 
      success: true, 
      faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    });

  } catch (error) {
    console.error('Favicon fetch error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch favicon' 
    }, { status: 500 });
  }
}
