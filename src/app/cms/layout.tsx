
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/cms/login');
  }

  const { data: user } = await supabase
    .from('users')
    .select('role')
    .single();

  if (user?.role !== 'cms_admin') {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen flex">
      {children}
    </div>
  );
}
