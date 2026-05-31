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

def convert_unit(value, from_unit, to_unit):
    """Convert a value between two units that measure the same quantity.

    from_unit/to_unit are dicts {'multiplier': float, 'quantity': str} the caller looks up
    from the model (oml:multiplier and oml:measures on the unit). Checking the quantity IRI
    (not just the dimension) correctly rejects conversions between distinct quantities that
    share a dimension, e.g. frequency (Hz) vs activity (Bq). Works for any quantity. e.g.
        convert_unit(90, {'multiplier': 60, 'quantity': 'http://opencaesar.io/isq/Time'},
                         {'multiplier': 3600, 'quantity': 'http://opencaesar.io/isq/Time'}) -> 1.5
    """
    if from_unit['quantity'] != to_unit['quantity']:
        raise ValueError(f"Incompatible quantities: {from_unit['quantity']} vs {to_unit['quantity']}")
    return value * from_unit['multiplier'] / to_unit['multiplier']
