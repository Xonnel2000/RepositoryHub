import type { LayoutServerLoad } from './$types'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { createPost, getPosts } from "$lib/services";


export const load: LayoutServerLoad = async (event) => {
  const {data, error} = await getPosts()

  return {
    session: await getServerSession(event),
    props: {
      posts: data,
      error
    }
  }
}