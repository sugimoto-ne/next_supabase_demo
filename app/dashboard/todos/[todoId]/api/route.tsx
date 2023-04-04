import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { Database } from '../../../../../database.types';

export const revalidate = 0

type PathParams = {
  todoId: string
}

export async function PUT(request: Request,  { params }: { params: PathParams }) {
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

  const { id, title, description } = await request.json()
  if (id !== params.todoId) {
    return new Response('invalid params', {
      status: 500,
    });
  }

  const { data, error } = await supabase.from("todos").update({ description, title }).eq('id', params.todoId).select("*")
  if (!auth?.data?.session?.user?.id) {
    return new Response(error?.message, {
      status: 500,
    });
  }

  return NextResponse.json(data);
}



export async function POST(request: Request,  { params }: { params: PathParams }) {
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



  const { id, done } = await request.json()
  if (id !== params.todoId) {
    return new Response('invalid params', {
      status: 500,
    });
  }
  const { data, error } = await supabase.from("todos").update({ done }).eq('id', params.todoId).select("*")
  if (!auth?.data?.session?.user?.id) {
    return new Response(error?.message, {
      status: 500,
    });
  }

  return NextResponse.json(data);
}


export async function DELETE(request: Request,  { params }: { params: PathParams }) {
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




  const { id } = await request.json()
  if (id !== params.todoId) {
    return new Response('invalid params', {
      status: 500,
    });
  }

  const { error } = await supabase.from("todos").delete().eq('id', params.todoId)
  if (!auth?.data?.session?.user?.id) {
    return new Response(error?.message, {
      status: 500,
    });
  }

  return NextResponse.json({"message": "ok"});
}

