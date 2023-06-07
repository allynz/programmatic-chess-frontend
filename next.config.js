/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // TODO: make this true? causing useEffect to run twice
  images: {
    // to get images from unspash , click on image and copy link address
    // CHECK: make sure that not present url here does not cause page load to fail
    domains: [
      'unsplash.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'upload.wikimedia.org',
      'programmatic-chess-images.s3.amazonaws.com'
    ]
  }
}

module.exports = nextConfig;

