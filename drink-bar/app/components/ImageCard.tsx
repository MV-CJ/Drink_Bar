const ImageCard = ({ image, name, children }) => {
    // Formata a imagem para garantir que o prefixo base64 está correto
    const formattedImage = image.startsWith('data:image/')
        ? image
        : `data:image/jpeg;base64,${image}`;

    return (
        <div className="rounded-lg overflow-hidden bg-gray-700 shadow-md h-full flex flex-col">
            <img
                src={formattedImage}
                alt={name}
                className="w-full h-48 object-cover object-top"
            />
            <div className="p-6 flex flex-col flex-grow">{children}</div>
        </div>
    );
};

export default ImageCard;
