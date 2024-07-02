import React, {useState, useRef, useEffect} from 'react'
import { Chart, ArcElement } from "chart.js";
import 'chart.js/auto';


Chart.register(ArcElement);

function LeetcodeGraph() {
    let d = localStorage.getItem('dat');
    d = JSON.parse(d);
    d = d.data.data3;
  
      const canvasRef1 = useRef(null); // Reference for the canvas element
      const canvasRef2 = useRef(null); // Reference for the canvas element
      const canvasRef3 = useRef(null); // Reference for the canvas element
      const chartRef1 = useRef(null); // Reference for the Chart.js instance
      const chartRef2 = useRef(null); // Reference for the Chart.js instance
      const chartRef3 = useRef(null); // Reference for the Chart.js instance
    
      // Data for the chart
      const chartData1 = {
        labels: ['Easy Solved', 'Unsolved'],
        datasets: [{
          data: [d.easySolved, d.totalEasy-d.easySolved], // Replace this with dynamic data as needed
          backgroundColor: [
            'rgb(75, 192, 192)', // Easy - Greenish
            // 'rgb(255, 159, 64)', // Medium - Orange
            // 'rgb(255, 99, 132)'  // Hard - Red
            'rgb(215, 215, 215)'
          ],
          hoverOffset: 2
        }]
      };
      const chartData2 = {
        labels: ['Medium Solved', 'Unsolved'],
        datasets: [{
          data: [d.mediumSolved, d.totalMedium-d.mediumSolved], // Replace this with dynamic data as needed
          backgroundColor: [
            // 'rgb(75, 192, 192)', // Easy - Greenish
            'rgb(255, 159, 64)', // Medium - Orange
            // 'rgb(255, 99, 132)'  // Hard - Red
            'rgb(215, 215, 215)'
          ],
          hoverOffset: 2
        }]
      };
      const chartData3 = {
        labels: ['Hard Solved', 'Unsolved'],
        datasets: [{
          data: [d.hardSolved, d.totalHard-d.hardSolved], // Replace this with dynamic data as needed
          backgroundColor: [
            // 'rgb(75, 192, 192)', // Easy - Greenish
            // 'rgb(255, 159, 64)', // Medium - Orange
            'rgb(255, 99, 132)',  // Hard - Red
            'rgb(215, 215, 215)'
          ],
          hoverOffset: 2
        }]
      };
      
    
      // Configuration for the chart
      const chartConfig1 = {
        type: 'doughnut',
        data: chartData1,
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            tooltip: {
              enabled: true
            }
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true
        }
      };
      const chartConfig2 = {
        type: 'doughnut',
        data: chartData2,
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            tooltip: {
              enabled: true
            }
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true
        }
      };
      const chartConfig3 = {
        type: 'doughnut',
        data: chartData3,
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            tooltip: {
              enabled: true
            }
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true
        }
      };
    
      // Create or update the chart
      const createOrUpdateChart = () => {
        const ctx1 = canvasRef1.current.getContext('2d'); // Get the 2D context of the canvas
        const ctx2 = canvasRef2.current.getContext('2d'); // Get the 2D context of the canvas
        const ctx3 = canvasRef3.current.getContext('2d'); // Get the 2D context of the canvas
    
        // If a chart instance already exists, destroy it first
        if (chartRef1.current) {
          chartRef1.current.destroy();
        }
        if (chartRef2.current) {
          chartRef2.current.destroy();
        }
        if (chartRef3.current) {
          chartRef3.current.destroy();
        }
    
        // Create a new chart instance
        chartRef1.current = new Chart(ctx1, chartConfig1);
        chartRef2.current = new Chart(ctx2, chartConfig2);
        chartRef3.current = new Chart(ctx3, chartConfig3);
      };
    
      // Effect to create the chart after the component mounts
      useEffect(() => {
        createOrUpdateChart(); // Create chart on mount
    
        // Clean up function to destroy the chart on unmount
        return () => {
          if (chartRef1.current) {
            chartRef1.current.destroy();
          }
          if (chartRef2.current) {
            chartRef2.current.destroy();
          }
          if (chartRef3.current) {
            chartRef3.current.destroy();
          }
        };
      }, []);
    
  
    return (
      <>
    
    {/* <canvas width="300" height="300" ref={canvasRef}></canvas>
     */}
     <div className='grid grid-cols-1 gap-0.5 lg:grid-cols-3 place-content-center'>
     <div className='' style={{ width: '350px', height: '450px' }}>
        <canvas ref={canvasRef1}></canvas>
        <div className='text-center mx-auto'>
        {d.easySolved} / {d.totalEasy}
        </div>
      </div>
      <div style={{ width: '350px', height: '450px' }}>
        <canvas ref={canvasRef2}></canvas>
        <div className='text-center mx-auto'>
        {d.mediumSolved} / {d.totalMedium}
        </div>
      </div>
      <div style={{ width: '350px', height: '450px' }}>
        <canvas ref={canvasRef3}></canvas>
        <div className='text-center mx-auto'>
        {d.hardSolved} / {d.totalHard}
        </div>
      </div>
      </div>
    {/* <button onClick={createOrUpdateChart}>Update Chart</button> */}
  
  
  
      </>
    )
}

export default LeetcodeGraph;