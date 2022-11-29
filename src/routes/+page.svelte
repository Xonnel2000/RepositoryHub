<!-- <script>
  import { page } from "$app/stores";
  import Account from "./Account.svelte";
  import Auth from "./Auth.svelte";
</script>

<svelte:head>
  <title>Supabase + SvelteKit</title>
  <meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if !$page.data.session}
  <Auth />
{:else}
  <Account session={$page.data.session} />
{/if} -->
<script>
  import logo from "$lib/images/gYTPzoRf_400x400.jpg";
  import Modal from "$lib/Modal.svelte";
  import { createPost, getPosts, createRepoCount } from "$lib/services";
  import Error from "$lib/Error.svelte";
  import Success from "$lib/Success.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  function handlechangeData() {
    console.log("urls");
    //goto("/category/" + urls);
  }

  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data.ctreatedAt);

  let showModal = false;
  let typename = "";
  function closeModal() {
    showModal = false;
  }

  function showingModal() {
    showModal = true;
  }

  let createPostPromise = Promise.resolve({});
  function handleCreatePost() {
    createPostPromise = createPost({ name: typename, typename_url: typename });
  }

  function handCount(repo_id) {
    console.log("this is new repo_id", repo_id);
    createRepoCount({ repo_id });
  }
</script>

<div
  class="flex flex-col min-h-screen max-h-auto overflow-hidden bg-gray-800 p-6"
>
  <div
    class="grid h-20 card bg-gray-800 text-slate-50 rounded-box place-items-start"
  >
    <div class="dropdown dropdown-bottom">
      <label for="" tabindex="0" class="btn m-1">Click To Select</label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-gray-800 text-slate-50 rounded-box w-52"
      >
        {#each data.post || [] as postname}
          <li
            aria-current={$page.url.pathname === "/category"
              ? "page"
              : undefined}
            on:click={() => {
              handCount(postname.id);
            }}
          >
            <a href="/category/{postname.id}/{postname.name}">{postname.name}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <h3>Select the dropdown to pick Repositories Type</h3>
  </div>
  <div class="divider" />
  <div
    class="flex flex-row h-auto card bg-gray-800 text-slate-50 rounded-box place-content-start "
  >
    <div class="w-1/2 p-4">
      <img src={logo} alt="" srcset="" />
    </div>

    <div class=" w-1/2 p-4 overflow-hidden">
      <div>
        <h1
          class="text-2xl uppercase underline decoration-dashed  decoration-4 decoration-slate-400"
        >
          Christex Foundation Ecosystem
        </h1>
        <h2>Repositories Tracked <span>>{data.count}</span></h2>
        <h3>Lasted Updated <span>{data.ctreatedAt}</span></h3>
      </div>
      <div class="divider" />

      <div>
        <h1
          class="text-2xl  uppercase underline decoration-dashed  decoration-4 decoration-slate-400"
        >
          MOTD
        </h1>
        <p>Welcome to Christex foundation Blockchain Ecosystem Repository.</p>
        <p>
          This dataset aims to categorize all of the open source Repositories
          from
        </p>
        <p>
          cryptocurrency, blockchain, and decentralized ecosystem. Please help
          us expand the eosystem and Repositories by adding missing enetries
        </p>
        <p>with a github pull request or a submission to our link</p>
        <button class="btn btn-xl" on:click={showingModal}>Add </button>
      </div>
    </div>
  </div>
  <div class="divider" />
</div>

<!-- this is a modal -->

{#if showModal}
  <Modal
    on:click={() => {
      showModal = false;
    }}
  >
    <span slot="body">
      <p class="text-center mb-6">Add type examaple Dapp/Defi/Nft !</p>
      <form class="form-control" on:submit|preventDefault={handleCreatePost}>
        <div class="form-control mb-2 w-full">
          <label for="" class="label">
            <!-- <span class="label-text"
          >Add type examaple Dapp/Defi/Nft </span -->
          </label>
          <label class="input-group input-group-vertical mb-2">
            <span>Type Name</span>
            <input
              type="text"
              placeholder="Type Name"
              class="input input-bordered"
              bind:value={typename}
            />
            {#await createPostPromise}
              <button disabled type="button" class="btn">Sending Data!</button>
            {:then { data, error }}
              <button class="btn">Write and press enter to send data!</button>
              {#if data}
                <strong class="text-green-600">Successfully create post!</strong
                >
              {/if}
              <Error {error} />
            {/await}
          </label>
        </div>
      </form>
    </span>
    <span slot="button" let:hover={hovering}>
      <button
        on:click={() => {
          showModal = false;
        }}
        class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md"
      >
        Close</button
      >
    </span>
  </Modal>
{/if}
