const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  secretOrKey: process.env.SECRET_OR_KEY || 'secret',
};

export default config;
