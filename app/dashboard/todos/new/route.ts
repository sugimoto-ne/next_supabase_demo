import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { Database } from '../../../../database.types';

export const revalidate = 0

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response('failed to load env', {
      status: 500,
    });
  }

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies
  })

  const auth = await supabase.auth.getSession()
  if (!auth?.data?.session?.user?.id) {
    return new Response('Unauthorized', {
      status: 500,
    });
  }

  const { title } = await request.json()
  const { data, error } = await supabase.from("todos").insert({ user_id: auth?.data?.session?.user?.id, title }).select('*')
  console.log('################')
  console.log(error)
  console.log(data)
  console.log('################')
  
  if (!auth?.data?.session?.user?.id) {
    return new Response(error?.message, {
      status: 500,
    });
  }

  return NextResponse.json(data);
}
