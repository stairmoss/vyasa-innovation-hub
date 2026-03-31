# Pending Works & Future Improvements

## 1. Backend Integration
- [ ] **Authentication**: Currently, the login page (`app/login/page.js`) is simulated. Need to integrate reliable auth (NextAuth.js, Firebase Auth, or Supabase).
- [ ] **Database Connection**: The Project Upload form in the Dashboard (`app/dashboard/page.js`) mimics submission. Needs a real backend (Firebase Firestore or PostgreSQL) to store project data.

## 2. Yodha AI Enhancements
- [ ] **API Key Security**: The current implementation uses a public proxy or simulation. For production, secure the Hack Club API key in `.env.local` and use a server-side route handler to call it.
- [ ] **Chat History**: Persist chat logs so conversations aren't lost on refresh.

## 3. Dynamic Content
- [ ] **Events & Teams**: Currently hardcoded in `app/page.js`. Move this data to a CMS (Sanity, Contentful) or a database for easier updates without code changes.

## 4. Performance & Polish
- [ ] **3D Optimization**: Monitor `ThreeGlobe` performance on low-end mobile devices. Consider lazy loading or reducing polygon count if lag occurs.
- [ ] **Asset Quality**: Verify all placeholder images in `public/assets` are replaced with high-resolution photos of the actual team and events.

## 5. Deployment
- [ ] **Build Check**: Run `npm run build` to ensure no strict mode errors before deploying to Vercel/Netlify.
