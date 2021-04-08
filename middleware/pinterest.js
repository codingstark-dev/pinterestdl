export default function (context) {
  var queryData = decodeURIComponent(context.route.query.dl)
  //   console.log(
  //     ((context.userAgent = process.server
  //       ? context.req.headers['user-agent']
  //       : navigator.userAgent),
  //     context.route.query,context)  ,
  // console.log(context.redirect({ name: 'dl', params: { slug: 'mySlug' } }))
  if (
    queryData.includes('pinterest.com/pin/') ||
    queryData.includes('pin.it')
  ) {
    if (queryData.includes('pin.it')) {
      var configExpandUrl = {
        method: 'get',
        url: 'https://pinterest-api.vercel.app/expandurl',
        headers: {
          url: queryData,
        },
      }
      return context
        .$axios(configExpandUrl)
        .then((result) => {
          console.log(result.data, result.data == {})
          if (result.data !== {} && result.data != null && result.data != '') {
            const pinID = result.data.split('/')[4]

            var config1 = {
              method: 'get',
              url: 'https://pinterest-api.vercel.app/pin',
              headers: {
                id: pinID,
              },
            }
            return context
              .$axios(config1)
              .then((result) => {
                if (
                  result.data !== {} &&
                  result.data != null &&
                  result.data != ''
                ) {
                  context.store.commit('link/add', result.data)
                  context.store.commit('link/error', true)
                  return { dataUrls: result.data, errorAPi: true }
                } else {
                  context.store.commit('link/error', false)
                  return { dataUrls: result.data, errorAPi: false }
                }
              })
              .catch((err) => {
                console.error(err)
                context.store.commit('link/error', false)
                return { errorAPi: false }
              })
          } else {
            context.store.commit('link/error', false)
            return { errorAPi: false }
          }
        })
        .catch((err) => {
          context.store.commit('link/error', false)
          console.error(err)
          return { errorAPi: false }
        })
    } else if (queryData.includes('pinterest.com/pin/')) {
      const pinID = queryData.split('/')[4]
      var config2 = {
        method: 'get',
        url: 'https://pinterest-api.vercel.app/pin',
        headers: {
          id: pinID,
        },
      }
      return context
        .$axios(config2)
        .then((result) => {
          console.log(result.data, result.data == {})
          if (result.data !== {} && result.data != null && result.data != '') {
            context.store.commit('link/add', result.data)
            context.store.commit('link/error', true)

            return { dataUrls: result.data, errorAPi: true }
          } else {
            context.store.commit('link/error', false)

            return { dataUrls: result.data, errorAPi: false }
          }
        })
        .catch((err) => {
          context.store.commit('link/error', false)

          console.error(err)
          return { errorAPi: false }
        })
    }
  } else {
    context.store.commit('link/error', false)

    return { errorAPi: false }
  }
}
