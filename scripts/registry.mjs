#!/usr/bin/env node
// Starts the local test registry (Verdaccio) for this repo at http://localhost:4873 and prepares
// publishing: creates build/dist for `oml pack`, and logs npm in to the registry as a local user
// (the token is saved in ~/.npmrc, as `npm adduser` would). Leave it running; Ctrl-C stops it.
// Its data (packages, users) is kept in .verdaccio/; delete that folder to start over.
//
// Usage (macOS, Linux, Windows):  node scripts/registry.mjs
// Port: set OML_REGISTRY_PORT to use another port (default 4873).

import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = process.env.OML_REGISTRY_PORT || '4873';
const registry = `http://localhost:${port}`;
const isWindows = process.platform === 'win32';
const user = { name: 'local', password: 'local-registry', email: 'local@localhost' };

mkdirSync(join(root, 'build', 'dist'), { recursive: true });

// On Windows npx is a .cmd file, which Node only runs through a shell. Elsewhere, start Verdaccio in
// its own process group so stopping it also stops the processes npx starts underneath.
const verdaccio = spawn(
    'npx',
    ['--yes', 'verdaccio@6', '--config', './verdaccio.yaml', '--listen', `localhost:${port}`],
    { cwd: root, stdio: 'inherit', shell: isWindows, detached: !isWindows },
);

let stopping = false;
function stop(code) {
    if (stopping) return;
    stopping = true;
    try {
        if (isWindows) {
            spawnSync('taskkill', ['/pid', String(verdaccio.pid), '/T', '/F'], { stdio: 'ignore' });
        } else {
            process.kill(-verdaccio.pid, 'SIGTERM');
        }
    } catch {
        // Already gone.
    }
    process.exit(code);
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
verdaccio.on('exit', (code) => {
    if (!stopping) {
        console.error(`The registry stopped (exit code ${code}). Is port ${port} already in use?`);
        process.exit(1);
    }
});

async function waitForRegistry() {
    for (let attempt = 0; attempt < 120; attempt++) {
        try {
            const response = await fetch(`${registry}/-/ping`);
            if (response.ok) return;
        } catch {
            // Not listening yet.
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error(`The registry did not start at ${registry}.`);
}

// Creates the local user on first run; on later runs the user exists (409), so log it in instead.
// Either way the registry answers with a token.
async function login() {
    const url = `${registry}/-/user/org.couchdb.user:${user.name}`;
    const body = JSON.stringify(user);
    const headers = { 'Content-Type': 'application/json' };
    let response = await fetch(url, { method: 'PUT', headers, body });
    if (response.status === 409) {
        const basic = Buffer.from(`${user.name}:${user.password}`).toString('base64');
        response = await fetch(url, { method: 'PUT', headers: { ...headers, Authorization: `Basic ${basic}` }, body });
    }
    const result = await response.json().catch(() => ({}));
    if (!result.token) {
        throw new Error('Could not log in to the local registry. Stop it, delete .verdaccio/, and try again.');
    }
    return result.token;
}

try {
    await waitForRegistry();
    const token = await login();
    const saved = spawnSync('npm', ['config', 'set', `//localhost:${port}/:_authToken`, token], {
        shell: isWindows,
        stdio: 'inherit',
    });
    if (saved.status !== 0) {
        throw new Error('Could not save the registry login with `npm config set`.');
    }
    console.log(`\nLocal registry ready at ${registry} (logged in as '${user.name}'). Leave this running.`);
    console.log(`In another terminal:  oml pack  then  oml publish -r ${registry}\n`);
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    stop(1);
}
