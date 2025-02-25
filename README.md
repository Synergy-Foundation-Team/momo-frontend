This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [@ianvs/prettier-plugin-sort-imports](https://github.com/ianvs/prettier-plugin-sort-imports)
- [@eslint/eslintrc](https://github.com/eslint/eslint/tree/main/packages/eslint-config-eslintrc)
- [ReactQuery](https://tanstack.com/query/v4)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

```
src/
├── app/                    # Next.js app directory with pages and layouts
├── components/             # Reusable UI components
│   ├── layouts/           # Layout components (navbar, footer, etc.)
│   └── ui/               # UI components (buttons, forms, etc.)
├── lib/                   # Utility functions and configurations
│   ├── axiosInstance.ts  # Axios configuration with interceptors
│   └── react-query.ts    # React Query client configuration
├── services/              # API services and data fetching
│   └── products/         # Product-related services
│       ├── api.ts        # API functions
│       ├── hooks.ts      # React Query hooks
│       ├── types.ts      # TypeScript interfaces
│       └── index.ts      # Barrel exports
└── styles/               # Global styles and Tailwind CSS configuration
```

This project uses a modular architecture with clear separation of concerns:

- **components/**: Reusable UI components organized by type
- **lib/**: Core configurations and utilities
- **services/**: API integration layer with TypeScript types and React Query hooks
- **styles/**: Global styling and theme configuration

The project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
