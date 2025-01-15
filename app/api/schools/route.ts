import { NextRequest, NextResponse } from 'next/server';
import executeQuery from '../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email = formData.get('email') as string;
    const image = formData.get('image') as File;

    let imageBase64 = '';
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageBase64 = buffer.toString('base64');
      const result = await executeQuery({
        query: `
          INSERT INTO schools (name, address, city, state, contact, email_id, image)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        values: [name, address, city, state, contact.replace(/\D/g, ''), email, imageBase64]
      });

      return NextResponse.json({
        message: 'School added successfully',
        result
      });
    }
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json({
      error: 'Failed to add school'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await executeQuery({
      query: 'SELECT * FROM schools'
    });

    const schools = result.map((school: any) => ({
      ...school,
      image: school.image || null
    }));

    return NextResponse.json({
      schools
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({
      error: 'Failed to fetch schools'
    }, { status: 500 });
  }
}
