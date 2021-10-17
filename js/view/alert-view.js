const renderAlert = (message) => {
    const html = /*html*/`
    <div class="alert">
        ${message}
    </div>
    `;

    return html;
}

export { renderAlert };