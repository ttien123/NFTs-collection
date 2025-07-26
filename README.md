# NFT Collections Marketplace

A modern Next.js-based NFT marketplace application that allows users to browse NFT collections, view detailed information, and interact with blockchain wallets. Built with TypeScript, Tailwind CSS, and Web3 technologies.

## 🚀 Features

- **NFT Collections Browser**: Browse and explore various NFT collections
- **Wallet Integration**: Connect with popular Web3 wallets using RainbowKit
- **Collection Details**: View detailed information about each NFT collection
- **Transaction History**: Track fake transaction history for demonstration
- **Favorites System**: Save and manage favorite collections
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components
- **Real-time Data**: Fetch NFT data from external APIs (from Magic eden api)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: Wagmi + RainbowKit + Viem + ethers
- **State Management**: Zustand stores
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: ShadcnUI

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **MetaMask** or any Web3 wallet extension installed in your browser

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ttien123/NFTs-collection.git
```

### 2. Install Dependencies

```bash
npm install

```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

> **Note:** When you enter a collection detail page (the home page as required by the test), you may see no NFTs displayed. This is because the Magic Eden API does not return data for some collections. If this happens, please go back and select a different collection to view its NFTs.

## 🧪 Testing Wallet Connection and Fake Transactions

### Testing Wallet Connection

1. **Open the Application**: Navigate to the homepage
2. **Connect Wallet**: Click the "Connect Wallet" button in the header
3. **Select Wallet**: Choose your preferred wallet (MetaMask, WalletConnect, etc.)
4. **Switch to Holesky Testnet**:
   - Click on the network button
   - Select "Holesky" testnet from the list
   - If Holesky is not available, add it manually with:
     - Network Name: Holesky
     - RPC URL: https://ethereum-holesky.publicnode.com
     - Chain ID: 17000
     - Currency Symbol: ETH
5. **Approve Connection**: Approve the connection in your wallet
6. **Verify Connection**: The wallet address should appear in the header

### Testing Fake Transactions

1. **Navigate to Collection**: Click on any NFT collection from the homepage
2. **View Transaction History**: Scroll down to see the transaction history section

   - Buyer and seller addresses
   - Transaction amounts in ETH
   - Historical transaction records

   > **Note:** The first time you visit, there may be no transaction history displayed. Please perform a purchase transaction for an NFT,  after that the transaction history will be updated and shown in this section.

### Testing Favorites Feature

1. **Browse Collections**: View the list of NFT collections
2. **Enter Collection**: Click on a specific NFT collection to view its details
3. **Add to Favorites**: Click the heart icon on the collection detail page
4. **View Favorites**: Navigate to the favorites page to see saved collections
5. **Remove from Favorites**: Click the heart icon again to remove from favorites

## 🏗️ Project Structure

```
nft_pr/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (home)/            # Homepage and favorites
│   │   └── collection/        # Collection detail pages
│   ├── components/            # Reusable UI components
│   ├── apis/                  # API integration layer
│   ├── hooks/                 # Custom React hooks
│   ├── stores/                # Zustand state management
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   └── Providers/             # Context providers
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## 🚧 Challenges Faced During Development

### 1. Home Page

- **Issue:** The Magic Eden API only provides two endpoints: get all collections and get a single collection by symbol. According to the requirements, it was necessary to mock and retrieve a single collection.
  - **Solution:** To ensure a more intuitive experience, I built the collection list page first, then created the home page to display the NFTs of a selected collection, allowing users to choose and view details.
- **Issue:** The `expiry` field of all NFTs returned from the API is -1.
  - **Solution:** I decided to display all NFTs as "Available", and if the `expiry` field returns a different value, it will be shown as "Expired".
- **Issue:** The API does not support searching NFTs by name.
  - **Solution:** I implemented client-side filtering by NFT name.
    - **Advantage:** Filtering is very fast and the logic can be easily extended to multiple criteria without relying on the backend.
    - **Disadvantage:** Search is limited to the NFTs already fetched on the client, not the entire server dataset. If the data set is large, client-side filtering may impact frontend performance.
- **Issue:** The API does not support filtering by types and status.
  - **Solution:** I implemented two frontend features: filtering by price and sorting direction.

### 2. NFT Detail Page

- **Issue:** There is no API to get detailed information about a single NFT.
  - **Solution:** When a user selects an NFT to view its details, I save that NFT's information to the store and localStorage for display on the detail page.
- **Issue:** Simulating the NFT purchase function.
  - **Solution:** I performed a basic native token transfer transaction, displayed the transaction information, and saved the history to the store and localStorage.
- **Issue:** There is no API to get the transaction history of an NFT.
  - **Solution:** I filtered the transaction history by the NFT's address from the data stored in the store.

### 3. Wallet Integration

- **Issue:** Wallet configuration encountered some bugs related to SSR when integrating multiple Web3 libraries (Wagmi, RainbowKit, Viem) with Next.js 14.
  - **Solution:** I researched, consulted AI, and successfully fixed the SSR-related issues.

### 4. Favorites

- **Issue:** The requirements only asked to save the favorites list to the store, which I found not very user-friendly.
  - **Solution:** I built an additional Favorites page so users can easily view and manage their favorite collections.

## 🤖 AI Tools Used in Development

During the development process, I utilized various AI tools, especially Cursor, with the following main roles:

- **UI Generation**: Used AI to quickly create layouts and UI components, saving time on design and interface building.
- **Debugging & Refactoring Support**: AI helped detect bugs, suggested fixes, optimized, and refactored code more efficiently.
- **Store & State Management Initialization**: Leveraged AI to rapidly generate Zustand stores, define state and actions, accelerating feature development.
- **Exploring & Interacting with the Magic Eden API**: AI assisted in looking up documentation, explaining endpoints, guiding API calls, and handling data from Magic Eden, making API integration faster and easier to understand.
- **Documentation Writing**: AI supported the writing and structuring of project documentation, making it clearer and more comprehensive.
- **Using AI Tools & Agents**: Mainly used Cursor (an AI-powered IDE) for code generation, refactoring, and optimizing the software development workflow. In addition, I utilized the Claude-3.5 agent for coding support, as well as other AI tools such as ChatGPT and Perplexity AI for research, documentation lookup, and answering questions throughout the development process.
