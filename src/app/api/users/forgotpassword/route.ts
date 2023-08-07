import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    await sendEmail(body);
    return NextResponse.json({ message: 'Mail send successfully', success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
