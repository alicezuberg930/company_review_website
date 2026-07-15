import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json([{ a: '1' }])
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    return NextResponse.json(
        {
            message: 'POST: Created',
            data: body,
        },
        { status: 201 }
    )
}