import { Chart } from "chart.js";
type Analytics = {
    date: string;
    count: number;
  }[];  
export const generateChartImage = async (
    data: Analytics,
    label: string,
    color: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map((item) => item.date),
            datasets: [
              {
                label,
                data: data.map((item) => item.count),
                borderColor: color,
                backgroundColor: `${color}33`,
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: false,
            animation: {
              onComplete: () => {
                resolve(canvas.toDataURL("image/png"));
                chart.destroy();
              },
            },
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: { display: true },
              y: { display: true },
            },
          },
        });
      } else {
        resolve("");
      }
    });
  };