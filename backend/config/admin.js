module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4e0faa67dd8bbb39e45457795f7125a4'),
  },
});
