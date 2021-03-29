<template>
  <div class="bg-red-500 pt-20">
    <h1>Pinterest Downloader
    </h1>

    <form
      method="post"
      @submit.prevent="navToDl"
      class="flex p-2"
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
      var config = {
        method: 'get',
        url: 'http://localhost:8080/pin',
        headers: {
          id: '827395762790546353',
        },
      }
      this.$axios(config)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
  mounted() {},
}
</script>

<style>
</style>
