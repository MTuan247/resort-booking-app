module.exports = {
  base_url: "https://ui-avatars.com/api/",
  genUrl: (name) => {
    return this.base_url += `?name=${name}&background=random`
  }
};