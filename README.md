<p align="center">
    <h1 align="center">
        Diagonal-SDK
    </h1>
    <p align="center">SDK for easier interaction with the Diagonal protocol.</p>
</p>

<p align="center">
    <a href="https://github.com/diagonal-finance/sdk/blob/master/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/diagonal-finance/sdk.svg?style=flat-square">
    </a>
    <a href="https://github.com/diagonal-finance/sdk/actions?query=workflow%3Atest">
        <img alt="GitHub Workflow test" src="https://img.shields.io/github/workflow/status/diagonal-finance/sdk/test?label=test&style=flat-square&logo=github">
    </a>
    <a href="https://coveralls.io/github/diagonal-finance/sdk">
        <img alt="Coveralls" src="https://img.shields.io/coveralls/github/diagonal-finance/sdk?label=coverage (ts)&style=flat-square&logo=coveralls">
    </a>
    <a href="https://eslint.org/">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint">
    </a>
    <a href="https://prettier.io/">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
</p>

<div align="center">
    <h4>
        <a href="/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="/CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/diagonal-finance/sdk/issues/new/choose">
            🔎 Issues
        </a>
    </h4>
</div>

| Diagonal SDK is a collection of classes which enables developers easier interaction with the Diagonal protocol. |
| --------------------------------------------------------------------------------------------------------------- |

♜ [Jest](https://jestjs.io/) tests & common test coverage for all packages (`yarn test`)\
♞ [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) to keep the code neat and well organized (`yarn prettier` & `yarn lint`)\
♝ Automatic deployment of documentation generated with [typedocs](https://typedoc.org/)

---

## 📦 Package

<table>
    <th>Package</th>
    <th>Version</th>
    <th>Downloads</th>
    <th>Size</th>
    <tbody>
        <tr>
            <td>
                <a href="https://github.com/diagonal-finance/sdk">
                    @diagonal-finance/sdk
                </a>
                 <a href="https://github.com/diagonal-finance/sdk">
                    (docs)
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@diagonal-finance/sdk">
                    <img src="https://img.shields.io/npm/v/@diagonal-finance/sdk.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@diagonal-finance/sdk">
                    <img src="https://img.shields.io/npm/dm/@diagonal-finance/sdk.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
            <td>
                <!-- Size -->
                <a href="https://bundlephobia.com/package/@diagonal-finance/sdk">
                    <img src="https://img.shields.io/bundlephobia/minzip/@diagonal-finance/sdk" alt="npm bundle size (scoped)" />
                </a>
            </td>
        </tr>
    <tbody>
</table>

## 🛠 Installation

### Via NPM:

```bash
yarn add @diagonal-finance/sdk
```

### Raw Javascript bundle:

```html
<script
    src="https://cdn.jsdelivr.net/npm/@diagonal-finance/sdk@1.0.2/dist/diagonal.bundle.js"
    type="text/javascript"
></script>
```

### 📜 Usage

```typescript
import {
    Diagonal,
    Subscription,
    SubscriptionDetails,
} from "@diagonal-finance/sdk";

let chainId = 80001;
let rpc = "https://rpc-mumbai.maticvigil.com/";

let userAddress = "0x4Ea66bE6947D711Ed963fc4aa8c04c5a4da6959B";
let serviceAddress = "0x7eD9eAFBE6239404E93e3F60f4F4081E821f064e";
let tokenAddress = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
let packageId = 2;

const diagonal = new Diagonal(chainId, rpc);
const subscription = new Subscription(
    diagonal,
    userAddress,
    serviceAddress,
    tokenAddress
);

const subscriptionDetails: SubscriptionDetails =
    await subscription.getDetails();
const isValid: boolean = await subscription.validate(packageId);
```

## 🛠 Development

Clone this repository and install the dependencies:

```bash
git clone https://github.com/diagonal-finance/sdk.git
cd sdk && yarn
```

### 📜 Usage

```bash
yarn lint # Syntax check with ESLint (yarn lint:fix to fix errors).
yarn prettier # Syntax check with Prettier (yarn prettier:fix to fix errors).
yarn test # Run tests (with common coverage).
yarn build # Create a JS build.
yarn publish # Publish a package on npm.
```
