def frag(iri):
    """Extract the local name (fragment) from an IRI."""
    return (iri or '').rstrip('/').split('#')[-1].split('/')[-1]

def display_label(label, iri):
    """Return a display label: prefer explicit label, fall back to IRI fragment."""
    return label or frag(iri)

def image_html(fig):
    """Convert a matplotlib figure to an inline PNG HTML string."""
    import io, base64
    import matplotlib.pyplot as plt  # type: ignore
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=130, bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    b64 = base64.b64encode(buf.read()).decode()
    return f'<img src="data:image/png;base64,{b64}" style="max-width:100%;border-radius:4px">'
