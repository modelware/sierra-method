// Extract the local name (fragment) from an IRI.
const frag = iri => (iri || '').split(/[#\/]/).filter(Boolean).pop() ?? '';

// Convert an IRI fragment to a safe identifier (replaces non-word chars with _).
const toId = iri => frag(iri).replace(/\W/g, '_');

// Return a display label: prefer explicit label, fall back to IRI fragment.
const displayLabel = (label, iri) => label || frag(iri);

const omlPalette = ["#4a90d9", "#e67e22", "#27ae60", "#8e44ad", "#c0392b", "#16a085", "#d35400", "#2980b9"];

async function renderMermaid(code) {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    const { svg } = await mermaid.render('mmd' + Date.now(), code);
    display(svg);
}