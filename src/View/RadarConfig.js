import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


export const RadarData = {
  labels: [
       "Visual",
        "Verbal",
        "Active",
        "Reflective",
        "Intuitive",
        "Sensitive",
        "Sequential",
        "Global"],
  datasets: [
    {
      label: "Amira",
      backgroundColor: "rgba(34, 202, 236, .2)",
      fill: true,
      borderColor: "rgba(34, 202, 236, 1)",
      hoverBorderColor:"blue",
      pointBackgroundColor: "rgba(34, 202, 236, 1)",
      poingBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(34, 202, 236, 1)",
      data: [3,0,1,0,4,0,0,7],
    },

    {
      label: " Raja",
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
      data: [0,4,3,0,2,0,0,1],
    },

    {
      label: " Che Yew",
      backgroundColor: 'rgba(3, 201, 169, 1)',
      fill: true,
      borderColor: 'rgb(195, 255, 104)',
      pointBackgroundColor: 'rgb(195, 255, 104)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(195, 255, 104)',
      data: [4,0,3,0,1,0,0,1],
    },

    {
      label: "Iman",
      backgroundColor: 'rgba(142, 68, 173, 1)',
      fill: true,
      borderColor: 'rgb(142, 68, 173, 1)',
      pointBackgroundColor: 'rgb(142, 68, 173, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(142, 68, 173, 1)',
      data: [7,0,0,4,0,3,0,1],
    },

    {
      label: "Harry",
      backgroundColor: 'rgba(229, 98, 94, 1)',
      fill: true,
      borderColor: 'rgb(229, 98, 94)',
      pointBackgroundColor: 'rgb(229, 98, 94)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(229, 98, 94)',
      data: [7,0,0,4,0,3,0,1],
    },
    
    
  ]
};

export const RadarOptions = {
  scale: {
    
    ticks: {
      min: 0,
      max: 16,
      stepSize: 2,
      showLabelBackdrop: false,
      backdropColor: "rgba(203, 197, 11, 1)",

    },
    angleLines: {
      color: "rgba(191, 191, 191, 1)",
      lineWidth: 1
    },
    gridLines: {
      color: "rgba(191, 191, 191, 1)",
      circular: true
    },
    pointLabels: {
      fontColor:"black",
      fontSize: 30
    },
    datasets: {
      label:{
        fontColor:"white",
        fontSize: 15
      }
      
    }
  }
};