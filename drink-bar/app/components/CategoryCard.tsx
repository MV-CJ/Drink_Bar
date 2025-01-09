export default function CategoryCard({ name, count, color }) {
    return (
        <div className={`rounded-lg p-6 text-white bg-gradient-to-br ${color} shadow-md`}>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm mt-2">{count} items</p>
        </div>
    );
}
