<template>
  <div class=" pt-15">
    <div class="bg-red-500 h-auto ">

      <h1 class="text-4xl text-center  font-semibold text-white  pt-3">Pinterest Video<br> Downloader
      </h1>
      <h2 class=" text-center  font-medium text-white  pb-3">
        Download Pinterest video, Image and Gif online
      </h2>

      <form
        method="post"
        @submit.prevent="navToDl"
        class="flex p-2"
        autocomplete="on"
      >

        <input
          oninvalid="this.setCustomValidity('Please Enter Valid Link')"
          onvalid="this.setCustomValidity('')"
          required="required"
          type="text"
          v-model="pinLink"
          onchange="this.setCustomValidity('')"
          placeholder="Enter Pinterest Link"
          class=" items-center w-full  m-0 p-4 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400 "
        >
        <button
          type="submit"
          class="focus:outline-transparent items-center font-medium text-red-500 w-28 text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
        >
          Download
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pinLink: '',
    }
  },
  methods: {
    navToDl() {
      this.$router.push({
        path: 'dl',
        query: { dl: encodeURIComponent(this.pinLink) },
      })
    },
  },
}
</script>

