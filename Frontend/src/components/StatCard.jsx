function StatCard({ value, label, color }) {
    return (
        <div className="rounded-2xl border border-gray-700 bg-[#00001A]/60 p-4 text-center">
            <div className={`text-3xl font-bold ${color}`}>
                {value}
            </div>

            <p className="mt-1 text-sm text-gray-400">
                {label}
            </p>
        </div>
    );
}

export default StatCard