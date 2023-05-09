Ignews - a basic react blog with paywall and payment features built with NextJS, Prismic, Sass, FaunaDB and Stripe for Rocketseat's Ignite taining.

## Features

- **Authentication:** Authentication enabled via GitHub and persisted with FaunaDB
- **Subscription:** Users can subscribe to the service via an integration with Stripe and connected to the app with webhooks
- **Paywall:** Regular users see a paywall if not subscribed. The public API will only pull preview data

![user view](https://github.com/vitorhw/ignews-deploy/blob/master/public/screenshot.png)

## Built with

- [NextJS](https://nextjs.org/)
- [Prismic](https://prismic.io/)
- [FaunaDB](https://fauna.com/)
- [Stripe](https://stripe.com/)
- Deployed on [Vercel](https://vercel.com/)

## Running the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## License

This project is under the MIT License.
