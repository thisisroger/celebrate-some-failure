export default {
  episode(id) {
    return {
      path: `/episode/${id}.json`,
      resolve: (response, mappers) => {
        let episode = response.results[0];

        return mappers.merge({
          film: episode.film,
          guests: episode.guests,
          episodeDescription: episode.episodeDescription,
          mediaLinks: episode.mediaLinks
        })
      }
    }
  }
}
