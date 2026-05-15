const passport = require("passport");
const { Strategy: GitHubStrategy } = require("passport-github2");
const { randomUUID } = require("crypto");
const db = require("./database");

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, (_accessToken, _refreshToken, profile, done) => {
  const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
  let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) {
    user = { id: randomUUID(), name: profile.displayName || profile.username, email, password: "", createdAt: new Date().toISOString() };
    db.prepare("INSERT INTO users (id,name,email,password,createdAt) VALUES (?,?,?,?,?)").run(user.id, user.name, user.email, user.password, user.createdAt);
  }
  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, db.prepare("SELECT * FROM users WHERE id = ?").get(id)));
