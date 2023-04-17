<template>
  <div class="flex flex-col h-screen items-center justify-center">
    <div class="bg-secondary w-fit max-w-xl mb-24 pt-4 pb-6 px-8 rounded-xl">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-200">Sign up</h2>
      </div>
      <form class="">
        <div class="mb-4 rounded-md shadow-sm">
          <div class="flex justify-between space-x-4 mt-4">
            <input id="name" type="text"
              class="border-2 border-slate-500 rounded-md py-1.5 pl-3 bg-secondary text-white placeholder:text-slate-400 outline-none focus-visible:border-indigo-600"
              placeholder="Name" />
            <input id="surname" type="text"
              class="border-2 border-slate-500 rounded-md py-1.5 pl-3 bg-secondary text-white placeholder:text-slate-400 outline-none focus-visible:border-indigo-600"
              placeholder="Surname" />
          </div>
        </div>

        <div class="flex w-full justify-between items-center">
          <button type="submit"
            class="relative flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white hover:bg-indigo-500">
            Create account
          </button>
          <button class="float-right text-slate-300 hover:text-white mt-2">
            <router-link to="/log-in">Already have an account? Log in</router-link>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- TODO Hook links -->
<!-- TODO Save user in local storage and in cookies -->