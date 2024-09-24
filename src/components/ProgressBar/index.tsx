interface ProgressProps {
    value: number;
    color: string;
}

export default function ProgressBar({ value, color }: Readonly<ProgressProps>) {
    const radius = 20; // Radius of the circle
    const strokeWidth = 4; // Thickness of the circle
    const normalizedRadius = radius - strokeWidth * 0.5;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex justify-center items-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="rotate-[-90deg]"
            >
                {/* Background gray circle (for remaining part) */}
                <circle
                    stroke="#d3d3d3" // Light gray color
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                {/* Foreground red circle (for progress part) */}
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-stroke-dashoffset duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-xs font-bold">{value}%</span>
            </div>
        </div>
    );
}
