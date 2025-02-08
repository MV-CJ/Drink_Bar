interface CategoryCardProps {
    name: string;
    count: number;
    color: string;
    onClick: ()=>void;
}

export default function CategoryCard({ name, count, color, onClick }: CategoryCardProps) {
    return (
        <div className={`rounded-lg p-6 text-white bg-gradient-to-br ${color} shadow-md`}
            onClick={onClick}>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm mt-2">{count} items</p>
            
        </div>
    );
}
