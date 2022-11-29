<script>
  export let data;
  //console.log(data.count);
  const stuff = { repos: data.repo, counting: data.count }; // Name of object does not matter

  // import "carbon-components-svelte/css/g10.css";

  import RepoModal from "$lib/modal/RepoModal.svelte";
  import Repo from "$lib/Repo.svelte";
  import * as yup from "yup";
  import { Form, Message, isInvalid } from "svelte-yup";

  import { createForm } from "svelte-forms-lib";
  //import "carbon-components-svelte/css/g10.css";

  // import {
  //   TextInput,
  //   TextArea,
  //   Button,
  //   FormGroup,
  //   Form,
  // } from "carbon-components-svelte";

  let typenamee = data.name;
  let type_id = data.id;
  let repo_address = "";

  let schema = yup.object().shape({
    typenamee: yup.string().required().max(30).label("Type Name"),
    repo_address: yup.string().required().label("Repo Address"),
    // email: yup.string().required().email().label("Email address"),
    // age: yup
    //   .number()
    //   .required()
    //   .min(18)
    //   .label("Age")
    //   .nullable(true)
    //   .transform((v, o) => (o === "" ? null : v)),
    // answer: yup
    //   .number()
    //   .required()
    //   .positive()
    //   .oneOf([6], "Answer is wrong")
    //   .label("Answer")
    //   .nullable(true)
    //   .transform((v, o) => (o === "" ? null : v)),
    // gender: yup.string().required().label("Gender"),
  });
  let fields = { repo_address: repo_address, typenamee: typenamee };
  let submitted = false;
  let isValid;
  let createPostPromise = Promise.resolve({});

  function formSubmit() {
    submitted = true;

    isValid = schema.isValidSync(fields);
    if (isValid) {
      alert("Everything is validated!");

      createPostPromise = createRepo({
        repo_name: typenamee,
        repo_id: type_id,
        repo_url: typenamee,
        repo_address: fields.repo_address,
      });
    }
  }
  $: invalid = (typename) => {
    if (submitted) {
      return isInvalid(schema, typename, fields);
    }
    return false;
  };

  // const { form, errors, handleChange, handleSubmit, isSubmitting } = createForm(
  //   {
  //     initialValues: { typenamee: typenamee, repo_address: "" },
  //     validationSchema: validationSchema,

  //     onSubmit: async (values) => {
  //       createPostPromise = createRepo({
  //         repo_name: typenamee,
  //         repo_id: type_id,
  //         repo_url: typenamee,
  //         repo_address: repo_address,
  //       });
  //     },
  //   }
  // );

  let showModal = false;

  function showingModal() {
    showModal = true;
  }

  import { createRepo } from "$lib/services";
  import Error from "$lib/Error.svelte";

  // let createPostPromise = Promise.resolve({});
  // function handleCreateRepo() {
  //   validationSchema: validationSchema;
  //   createPostPromise = createRepo({
  //     repo_name: typenamee,
  //     repo_id: type_id,
  //     repo_url: typenamee,
  //     repo_address: repo_address,
  //   });
  // }
</script>

<div class="flex flex-col w-full border-opacity-50">
  <!-- this add Repositories button -->
  <div
    class="flex flex-row p-5 justify-evenly h-auto card bg-gray-800 rounded-box place-items-start   "
  >
    <h1
      class=" text-2xl  font-semibold text-slate-50 uppercase underline decoration-dashed decoration-slate-400 md:text-1xs  decoration-4"
    >
      welcome to {data.name} Repository
    </h1>
    <button
      type="submit"
      on:click={showingModal}
      class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md"
    >
      Add Repository</button
    >
  </div>
  <!-- end of add Repositories -->

  <!-- start of Repo compoment -->
  <div class="grid h-auto card bg-gray-800 rounded-box place-items-center p-3 ">
    <Repo {...stuff} />
  </div>
  <!-- end of Repo -->

  <!-- <div class="divider">OR</div> -->
</div>

<!-- this is modal div -->

{#if showModal}
  <RepoModal
    on:click={() => {
      showModal = false;
    }}
  >
    <span slot="body">
      <h1 class="text-center uppercase font-medium  mb-6">
        Add Repositories to Christex Ecosystem !
      </h1>

      <Form
        class="form"
        {schema}
        {fields}
        submitHandler={formSubmit}
        {submitted}
      >
        <label class="input-group input-group-vertical mb-5">
          <div class="form-control">
            <label class="input-group input-group-vertical">
              <span>Type Name</span>
              <input
                type="text"
                id="typenamee"
                placeholder="Type Name"
                class="input input-bordered"
                class:invalid={invalid("typenamee")}
                bind:value={fields.typenamee}
              />
            </label>
            <Message name="typenamee" />
          </div>

          <label
            for="comment"
            class="block text-sm font-medium text-gray-700 mt-10 "
            >Repository URLs *
          </label>
          <label for="comment" class="block text-sm font-medium text-gray-700">
            Comma separated list of github/gitlab URLS (e.g.
            https://github.com/bitcoin/bitcoin)</label
          >

          <div class="form-control mt-2">
            <label class="input-group input-group-vertical">
              <span>Repository URLs *</span>

              <textarea
                rows="4"
                name="repo_address"
                id="repo_address"
                placeholder="https://github.com/Xonnel2000/Solana_pda_clientside/tree/master"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                class:invalid={invalid("repo_address")}
                bind:value={fields.repo_address}
              />
            </label>
            <Message name="repo_address" />
          </div>

          {#await createPostPromise}
            <button disabled type="button" class="btn">Sending Data!</button>
          {:then { data, error }}
            <!-- <button class="btn">Write and press enter to send data!</button> -->
            {#if data}
              <strong class="text-green-600">Successfully create post!</strong>
            {/if}
            <Error {error} />
          {/await}

          <button
            type="submit"
            class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md mt-5"
          >
            Submit</button
          >
        </label>
      </Form>
    </span>
    <!-- <span slot="button" let:hover={hovering}>
    <button
      on:click={() => {
        showModal = false;
      }}
      class="bg-pink-500 text-white uppercase font-medium text-white p-2 rounded-md"
    >
      Close</button
    >
  </span> -->
  </RepoModal>
{/if}

<style>
  .invalid {
    border-color: red !important;
  }
</style>
