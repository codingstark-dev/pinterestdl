<template>
  <div class=" pt-15">
    <div class="bg-red-500 h-auto ">

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
    <div class="mx-10">

      <video
        :src="dataUrls.video.url"
        controls
        class=" w-auto rounded-lg shadow-lg focus:outline-transparent"
      ></video>
    </div>

    {{dataUrls}}
  </div>

</template>


<script>
export default {
  data() {
    return {
      pinLink: '',
      dataUrls: [],
    }
  },
  asyncData({
    $axios,
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/pin',
      headers: {
        id: '827395762790546353',
      },
    }
    return $axios(config)
      .then((result) => {
        console.log(result.data)
        return { dataUrls: result.data }
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
</script>