import { error } from '@sveltejs/kit';
import { createPost, getPosts,getCat,getRepo, getypename_count } from "$lib/services";
import { page } from "$app/stores";
// const { slug } = $page.params;

 
/** @type {import('./$types').PageLoad} */
export async function load({ params:{id, name} }) {
 //console.log( id,name)
const {data, error} = await getRepo(id)
let repo = data


const {count, newerror} = await getypename_count(id)
//let newcount = newdata


//console.log(data)


  //  let lang = url.searchParams.get('id');
  //  let q = url.searchParams.get('name');
  // console.log(q)
   return { id, name,repo, count };
}

// export async function load({ params }) {
  
// //   let [id, name] = data;

//    // console.log(params.id)
//    // console.log(params.name)
  
// //   const {data, error} = await getCat(params.slug)

// //   let [id, name] = data;
// //  // console.log(id, name)


//   return {
//     post:
// params
//   };
 
// }





