<template>
  <div class=" pt-15">
    <dl-form
      v-model="pinLink"
      headLine="All in One Video Downloader"
      :navToDl="navToDl"
    />
    <!-- <div class="bg-gradient-to-r from-red-500 to-red-700 h-auto ">
      <div class=" max-w-2xl mx-auto">

        <h1 class="text-4xl text-center  font-semibold text-white  pt-3"> All in One Video Downloader

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
    </div> -->
  </div>
</template>

<script>
import DlForm from '~/components/DlForm.vue'
export default {
  components: { DlForm },
  data() {
    return {
      pinLink: '',
    }
  },
  methods: {
    navToDl() {
      console.log(this.pinLink)
      window.location.href = `tools/pinterest-video-downloader?dl=${this.pinLink}`
      // this.$router.push({
      //   path: 'tools/pinterest-video-downloader',
      //   query: { dl: encodeURIComponent(this.pinLink) },
      // })
    },
  },
}
</script>

