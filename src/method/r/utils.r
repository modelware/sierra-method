# Extract the local name (fragment) from an IRI.
frag <- function(iri) {
    parts <- strsplit(iri, "[#/]")[[1]]
    tail(parts[nchar(parts) > 0], 1)
}

# Return display labels: use oml:label when present, fall back to IRI fragment.
display_label <- function(labels, iris) {
    if (is.null(labels) || length(labels) == 0) labels <- rep("", length(iris))
    ifelse(!is.na(labels) & nchar(labels) > 0, labels, sapply(iris, frag))
}

oml_palette <- c("#4a90d9", "#e67e22", "#27ae60", "#8e44ad", "#c0392b", "#16a085", "#d35400", "#2980b9")

# Render a horizontal bar chart via display().
bar_chart <- function(labels, values, title = "", palette = oml_palette) {
    maxval <- if (length(values) > 0) max(values) else 1
    bars <- sapply(seq_along(values), function(i) {
        pct <- max(4, round(values[i] / maxval * 70))
        col <- palette[(i - 1L) %% length(palette) + 1L]
        paste0(
            '<div style="display:flex;align-items:center;margin:4px 0">',
            '<div style="width:140px;text-align:right;padding-right:10px;font-size:13px;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">', labels[i], '</div>',
            '<div style="background:', col, ';width:', pct, '%;height:20px;border-radius:3px;min-width:4px"></div>',
            '<div style="padding-left:8px;font-size:13px;color:#555">', values[i], '</div>',
            '</div>'
        )
    })
    hdr <- if (nchar(title) > 0)
        paste0('<div style="font-weight:600;font-size:14px;margin-bottom:8px;color:#222">', title, '</div>')
    else ''
    display(paste0('<div style="padding:12px 4px">', hdr, paste(bars, collapse = ""), '</div>'))
}

render_mermaid <- function(code) {
    id <- paste0('mmd-', as.hexmode(sample.int(2^31, 1)))
    display(paste0('<div id="', id, '"></div>'))
    js(paste0(
        'if(!globalThis.mermaid){await new Promise((resolve,reject)=>{',
        'const s=document.createElement("script");',
        's.src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";',
        's.onload=resolve;',
        's.onerror=()=>reject(new Error("Failed to load Mermaid"));',
        'document.head.appendChild(s);',
        '});}',
        'mermaid.initialize({startOnLoad:false,theme:"default"});',
        'const{svg}=await mermaid.render("', id, '-svg",`',
        gsub('`', '\\`', code, fixed=TRUE),
        '`);document.getElementById("', id, '").innerHTML=svg;'
    ))
}

# Convert a value between two units that measure the same quantity. from_unit/to_unit are
# lists with $multiplier and $quantity, looked up from the model (oml:multiplier and
# oml:measures on the unit). Checking the quantity IRI (not just the dimension) correctly
# rejects conversions between distinct quantities that share a dimension, e.g. frequency
# (Hz) vs activity (Bq). Works for any quantity. e.g.
#   convert_unit(90, list(multiplier=60, quantity="http://opencaesar.io/isq/Time"),
#                    list(multiplier=3600, quantity="http://opencaesar.io/isq/Time")) -> 1.5
convert_unit <- function(value, from_unit, to_unit) {
    if (!identical(from_unit$quantity, to_unit$quantity))
        stop(paste("Incompatible quantities:", from_unit$quantity, "vs", to_unit$quantity))
    value * from_unit$multiplier / to_unit$multiplier
}
