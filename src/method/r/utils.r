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
