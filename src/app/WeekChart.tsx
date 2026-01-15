import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";


interface AcquisitionData {
    year: number;
    count: number;
}


export default function ChartExample() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    const data: AcquisitionData[] = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
        { year: 2017, count: 35 },
    ];

    useEffect(() => {
        if (!canvasRef.current) return;

        // Evita múltiplos gráficos ao recarregar
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "bar",
            data: {
                labels: data.map((row) => row.year.toString()),
                datasets: [
                    {
                        label: "Acquisitions by year",
                        data: data.map((row) => row.count),
                    },
                ],
            },
        });

        return () => {
            chartRef.current?.destroy();
        };
    }, []);

    return (
        <div className="w-full max-w-xl p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
                Acquisitions
            </h2>
            <canvas ref={canvasRef} />
        </div>
    );
}
