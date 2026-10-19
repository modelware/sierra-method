# Sierra Method

[![Release](https://img.shields.io/github/v/release/ulaleya/sierra-method)](https://github.com/ulaleya/sierra-method/releases/tag/v1.0.0)
[![Live Site](https://img.shields.io/badge/Live-Site-brightgreen)](https://ulaleya.github.io/sierra-method/)

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

## SIE 502 Capstone Release v1.0.0

The Waterline Construction Capstone Release v1.0.0 represents the
completion of the project's automated CI/CD workflow.

The release demonstrates OML linting, SHACL validation, and logical
reasoning through GitHub Actions. Intentional failures were introduced
and corrected to verify that each quality check works as expected.

The main branch is protected by required pull request checks, and
versioned releases automatically deploy the generated documentation
to GitHub Pages.

- [Official GitHub Release v1.0.0](https://github.com/ulaleya/sierra-method/releases/tag/v1.0.0)
- [Published Documentation](https://ulaleya.github.io/sierra-method/)
- [Capstone Release Pull Request #2](https://github.com/ulaleya/sierra-method/pull/2)

# Waterline Construction Project

## Project Overview

The Waterline Construction project models a representative municipal waterline construction and installation system using the Sierra Method and OML. The model focuses on relationships among waterline components, installation activities, construction requirements, inspections, testing, and verification.

The model includes representative waterline components such as pipes, fittings, valves, and hydrants. It also models installation, inspection, and testing activities so that construction requirements can be traced to the components and activities to which they apply.

The project was developed to support the business questions established for the waterline construction project, including requirement applicability, required inspections and testing, change impacts, verification status, and traceability from requirements through verification.

## Model Organization

The reusable Waterline Construction vocabulary is located in: src/method/oml/waterline.project/waterline-construction/

The project-specific descriptions and code generation configuration are located in: src/model/oml/waterline.project/waterline-construction/

The project contains the following files:

- `waterline.oml` — Defines the reusable Waterline Construction vocabulary, including components, activities, relationships, property characteristics, a defined concept, and a reasoning rule.
- `vocabulary-bundle.oml` — Bundles the Waterline Construction vocabulary with the Sierra vocabularies used by the model.
- `waterline-description.oml` — Contains representative waterline components, installation activities, inspections, testing, and construction requirements.
- `description-bundle.oml` — Bundles the Waterline Construction descriptions for reasoning.
- `src/method/oml/waterline.project/waterline-construction/codegen/verification-report.oml` — Defines the reuseable verification report generator.
- `src/model/oml/waterline.project/waterline-construction/codegen/configs.oml` — Configures verification report generation for the Waterline Construction model. 

The Waterline Construction model reuses Sierra concepts for components, processes, stakeholders, and requirements while adding terminology specific to municipal waterline construction.

## Project 4: Methodology Packaging and Reuse

For Project 4, the Waterline Construction methodology was packaged as part of Sierra Method version 1.0.2. The reusable package includes the Waterline Construction vocabulary, five Markdown editor templates, and an OML verification report generator.

The methodology was packaged using oml pack and published to a local Verdaccio npm registry as @modelware/sierra-method@1.0.2.

To demonstrate reuse, a separate Waterline Consumer project was created. This independent project installs the published Sierra Method package, defines its own waterline components and requirements, and uses the reusable verification report generator to produce a Markdown verification report.

The consumer project demonstrates that the Waterline Construction methodology can be installed and used outside the original Sierra Method repository.

Independent consumer repository: https://github.com/ulaleya/waterline-consumer

Note: The package was published to a local Verdaccio registry, not the public npm registry.

## Reasoning Features

The model demonstrates several OML reasoning capabilities, including:

- Property characteristics such as functional properties.
- Disjointness and closure through the vocabulary bundle.
- A defined `CriticalWaterlineRequirement` concept that allows the reasoner to classify high-priority requirements.
- A `RequirementVerification` rule that derives a verification relationship between a requirement and an inspection when the requirement applies to a component that requires that inspection.

For example, `BeddingRequirement_01` is asserted with a priority of `"High"`. The reasoner classifies it as a `CriticalWaterlineRequirement`. The reasoning rule also derives that `BeddingRequirement_01` requires `BeddingInspection_01` for verification.

## Build and Validate

From the root of the `sierra-method` repository, run:

```powershell
oml lint
```

This checks the OML files for syntax and modeling errors.

Then run:

```powershell
oml reason
```

This performs reasoning across the model and generates entailment artifacts in the `build/owl` directory.

A successful build should complete without lint errors or reasoning inconsistencies.

# Copyrights and Licenses

This content is copyrighted to Modelware Solutions LLC. To obtain a license, contact [Modelware](mailto:info@modelware.io).