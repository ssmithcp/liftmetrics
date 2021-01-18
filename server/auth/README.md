# Authorization scheme

## Notes (need to organize)

- Users login using email + base64 encoded password over HTTPS
- Logging in returns two tokens (cookies) with flags - HttpOnly, Secure and SameSite
- The tokens are the `access_token` and `refresh_token` and are JWTs
- `refresh_token` has a long timeout (say 1 week) and when this expires, user must login again
- A whitelist of `refresh_token`s are stored in a high availability cache (in memory if not scaled, reddis if scaled)
  - this is so `refresh_token`s can be revoked if user changes her password
  - this implementation isn't stateless, but it minimizes DB/cache access because state is only accessed when `access_token` is refreshed
- `access_token` shorter lived (say 10 minutes) stores users current permissions, subscription level, etc
- When `access_token` expires, check `refresh_token` to see if it is still whitelisted; if it is, issue new `access_token` and `refresh_token` with a new timeout (say 1 week from current time)
- On every API request, send both `access_token` and `refresh_token`; when `access_token` expires, automatically issue new tokens
- Eventually support SSO through google, linkedin, facebook, etc...

Consider how to manage profile updates over multiple devices

- Force logout by removing whitelisted sessions?
- Another option is to make access token not have 'HttpOnly' flag - makes vulnerable to XSS but makes profile management easier
