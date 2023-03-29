import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { headers, cookies } from 'next/headers'
import { ToastArea } from './components/ToastArea';
import { Database } from '../database.types';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SupabaseListener } from './components/SupabaseListener';
import { Navbar } from './components/Navbar';

const layout = async ({
  children
}: {
  children: React.ReactNode
}) => {

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html style={{overflow: "hidden"}}>
      <body>
        <Navbar />
        <SupabaseListener serverAccessToken={session?.access_token} />
        <ToastArea />
          {children}
      </body>
    </html>
  );
}

export default layout;