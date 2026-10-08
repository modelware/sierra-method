# Sierra Method

![Release](https://img.shields.io/badge/Release-v0.1.0-blue)

This repository provides an [OML Code](https://www.modelware.io/) template for modeling and analyzing systems using the **Sierra Method**.

## 🚀 Already in OML Code?

Click on <a href="src/model/md/index.md" class="internal-link"><button style="color: white; border: 2px solid green; background-color: green; padding: 10px 20px; font-size: 12px; cursor: pointer; border-radius: 5px;">START</button></a>

## 🛠️ Install OML Code

If you don’t have VS Code installed, install it from [here](https://code.visualstudio.com/download).

If you don't have OML Code extension installed, search in Extensions tab for `OML Code` and install it.

## 🏁 Clone Repository

Follow the steps below to get up and running with this template.

### 1. Fork the Repository

The preferred approach is for you to fork this repo (and pull it later to get the latest):

1. Click the **Fork** button in the top right corner of this github repo page
2. Choose a GitHub organization or personal account as the destination

This will create your own copy of this repository under your chosen account.

### 2. Clone Your Forked Repository

After forking, you can clone the repository to your local machine:

```bash
git clone https://GITHUB/YOUR_ORGANIZATION/YOUR_FORKED_REPOSITORY.git
```
Replace GITHUB, YOUR_ORGANIZATION, and YOUR_FORKED_REPOSITORY with the actual values from your GitHub account.

## 🧩 **Start Using the Sierra Viewpoints**

1. In Vs Code, choose File -> Open Folder ... -> Navigate to the clone folder
2. Click on the README (this document) then on the green **Start** button above.

## 📦 Publishing the Method

The reusable method (`src/method`) is packaged as `@modelware/sierra-method`.

### Test locally

Use a local test registry, which runs on your machine:

1. Start the local registry from the [`verdaccio`](https://github.com/modelware/verdaccio) repository (clone it next to this one) and leave it running:
   ```bash
   cd ../verdaccio
   node registry.mjs
   ```
   It serves http://localhost:4873 and logs npm in to the registry as a local user.
2. In another terminal, in this repository, pack the method into `build/dist`:
   ```bash
   mkdir -p build/dist
   oml pack
   ```
3. Preview, then publish to the local registry:
   ```bash
   oml publish -r http://localhost:4873 --dry-run
   oml publish -r http://localhost:4873
   ```
   Browse the result at http://localhost:4873.
4. Remove a version (e.g., 0.1.0):
   ```bash
   oml unpublish 0.1.0 -r http://localhost:4873
   ```
   npm refuses to remove a package's only version unless you also add `--force`.

A version can be published only once. To publish changes, unpublish then publish.

# Copyrights and Licenses

This content is copyrighted to. Modelware Solutions LLC. To obtain a license, contact [Modelware](emailto:info@modelware.io).
