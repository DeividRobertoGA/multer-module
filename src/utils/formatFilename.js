const formatName = (name) => {
    // Muda a codificação do texto
    const textEncoding = Buffer.from(name, 'latin1').toString('utf8');

    // Remove acentuação
    const nameWithoutAccents = textEncoding.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


    // Remove espaços
    const nameWithoutSpaces = nameWithoutAccents.replace(/\s+/g, "");

    return nameWithoutSpaces;
};

const textEncoding = (name) => {
    // Muda a codificação do texto
    const textEncoding = Buffer.from(name, 'latin1').toString('utf8');

    return textEncoding;
}

export { formatName, textEncoding };