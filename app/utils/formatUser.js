function formatUser(user) {
  let formattedUser;
  if (user.title) {
    formattedUser = {
      email: user.email,
      pseudo: `${user.firstname}#${user.id}`,
      bookmark: {
        title: user.title,
        originalTitle: user.original_title,
        description: user.description,
        director: user.director,
        image: user.image_src,
        banner: user.banner_src,
        releaseDate: user.release_date,
        duration: user.duration,
      },
    };
  } else {
    formattedUser = {
      email: user.email,
      pseudo: `${user.firstname}#${user.id}`,
      bookmark: user.favorite,
    };
  }
  return formattedUser;
}

module.exports = formatUser;
