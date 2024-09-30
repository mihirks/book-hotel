/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        PUBLIC_URL: '/',
    },

    images:{
        domains:[
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'res.cloudinary.com'
    ]
    }
}

module.exports = nextConfig
