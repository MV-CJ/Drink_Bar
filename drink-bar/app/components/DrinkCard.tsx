export default function DrinkCard({ name, description, image, difficulty, rating }) {
    return (
        <div className="rounded-lg overflow-hidden bg-gray-700 shadow-md">
            <img src={image} alt={name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-100">{name}</h3>
                <p className="text-sm text-gray-300 mt-2">{description}</p>
                <div className="text-xs text-gray-400 mt-2">
                    <p>Difficulty: {difficulty}</p>
                    <p>Rating: {rating}</p>
                </div>
            </div>
        </div>
    );
}
