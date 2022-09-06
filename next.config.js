/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // to get images from unspash , click on image and copy link address
    // TODO: make sure that not present url here does not cause page load to fail
    domains: [
      'unsplash.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'cdn.pixabay.com'
    ]
  }
}

module.exports = nextConfig;

