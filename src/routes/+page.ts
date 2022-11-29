// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import { createPost, getPosts,getTotal_repo,getLastupdate_repo } from "$lib/services";



/** @type {import('./$types').PageLoad} */
export async function load() {
    const {data, error} = await getPosts()
const {count, newerror} = await getTotal_repo()
const {lastupdate} = await getLastupdate_repo()
let ctreatedAt
lastupdate?.forEach((newname)=>{
 ctreatedAt = newname.created_at
})

    return {
      post: data, count,ctreatedAt
    };
  }
