export default {
  series() {
    return {
      path: '/series.json',
      resolve: (response, mappers) => mappers.pipe(response.results)
    }
  }
}
