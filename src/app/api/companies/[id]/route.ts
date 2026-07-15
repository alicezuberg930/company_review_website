import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    return NextResponse.json({ id })
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const body = await request.json()

    return NextResponse.json({
        message: 'Updated',
        id,
        data: body,
    })
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return NextResponse.json({
        message: 'Deleted',
        id,
    })
}