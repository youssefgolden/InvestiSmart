import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  console.log('TEST------');

  try {
    console.log('CALL API');
    const response = await axios.get(
      'https://yahoo-finance166.p.rapidapi.com/api/market/get-quote',
      {
        headers: {
          'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          'x-rapidapi-key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31',
        },
        params: { symbols: 'ATO.PA' },
      }
    );

    if (response?.data) {
      return NextResponse.json({ data: response.data });
    } else {
      console.error('API returned no data');
      return NextResponse.json(
        { error: 'No data returned from the API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('ERREUR API---', error);

    // Vérification et gestion du type de l'erreur
    let errorMessage = 'An unknown error occurred';

    if (axios.isAxiosError(error)) {
      // Si c'est une erreur Axios
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      // Si c'est une erreur classique de type Error
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch data from the API',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
