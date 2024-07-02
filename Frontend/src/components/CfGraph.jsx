import React, { useRef, useEffect, useContext } from 'react'
import { contextData } from './Context';
import { Chart} from 'chart.js';
import 'chart.js/auto';

function CfGraph() {
 
    const {formData, setformData} = useContext(contextData);

    let data = localStorage.getItem('dat');
    data = JSON.parse(data);
    let data1 = data.data.data1;
    let data2 = data.data.data11
    let data3 = data.data.data12;
  
    // console.log(data3.result[0].problem.rating);
    // console.log(data3.result[0].problem.tags[0]);
    // console.log(data3);
    let rating = [];
    let number = [];
    // console.log(data.result);
    let maxRating = 0;
    let ind = 1;
    (data1.result).forEach(element => {
      rating.push(element.newRating);
      number.push(ind);
      maxRating = Math.max(maxRating, element.newRating)
      ind++;
    });
  
    // console.log(rating);
    let ratings = new Map([]);
    let tags = new Map([]);
  
  
    let items = data3.result;
    items.forEach((item) => {
      if(item.verdict === 'OK') {
      let rat = item.problem.rating;
      if(ratings.get(rat) === undefined) {
        // ratings[rat] = 0;
        ratings.set(rat, 0);
      }
      let value = ratings.get(rat);
      ratings.set(rat, value+1);
  
      let tag = item.problem.tags;
    
      tag.forEach((item) => {
        if(tags.get(item) === undefined) {
  
          tags.set(item, 0);
        }
        let value = tags.get(item);
        tags.set(item, value+1);
      })
      
    }
    })
  
    let ratingsList = [];
    let ratingsValue = [];
  
    let tagsKey = [];
    let tagsValue = [];
    // console.log("size is", ratings.size)
    ratings = new Map([...ratings.entries()].sort((a, b) => a[0]-b[0]));
    ratings.forEach((key, value) => {
    
      ratingsList.push(value);
      ratingsValue.push(key);
    })
  
    
  
    // console.log(ratingsList)
    tags = new Map([...tags.entries()].sort((a, b) => b[1]-a[1]));
  
    tags.forEach((key, value) => {
      tagsKey.push(key);
      tagsValue.push(value);
      // console.log(value)
    })
  
    // console.log(tagsKey);
  
  
  
    const chartRef = useRef(null);
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
  
    const chartData = {
      labels: [...number],
      datasets: [
        {
          label: 'Rating',
          data: [...rating], // Replace with your data
          fill: false,
          borderColor: 'rgb(75, 192, 192)', // Line color
          tension: 0.1, // Line curve tension (0 for straight lines)
        },
      ],
    };
  
    const chartData1 = {
      labels: [...ratingsList],
      datasets: [
        {
          label: 'Solved',
          data: [...ratingsValue], // Replace with your data
          fill: false,
          borderColor: 'rgb(75, 192, 192)', // Line color
          tension: 0.1, // Line curve tension (0 for straight lines)
        },
      ],
    };
    const colors = [
      '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
      '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
      '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000',
      '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080',
      '#ff7f7f', '#7f7f7f', '#ff0000', '#00ff00', '#0000ff',
      '#ff00ff', '#00ffff', '#ffff00', '#7f0000', '#007f00'
    ];
    const chartData2 = {
      labels: [...tagsValue],
      datasets: [
        {
          label: 'Solved',
          data: [...tagsKey], // Replace with your data
          fill: false,
          // borderColor: 'rgb(75, 192, 192)', // Line color
          // borderColor: colors,
          backgroundColor: colors, // Line color
          tension: 0.1, // Line curve tension (0 for straight lines)
        },
      ],
    };
  
    // Configuration options for the chart
    const chartOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Rating graph', // Chart title
          font: {
            size: 18,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Contests', // X-axis label
            font: {
              size: 14,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: '', // Y-axis label
            font: {
              size: 14,
            },
          },
          suggestedMin: 0, // Minimum value for the Y-axis
            // suggestedMax: 1,
        },
      },
    };
    const chartOptions1 = {
      plugins: {
        title: {
          display: true,
          text: 'Problem Ratings', // Chart title
          font: {
            size: 18,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '', // X-axis label
            font: {
              size: 14,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: '', // Y-axis label
            font: {
              size: 14,
            },
          },
          suggestedMin: 0, // Minimum value for the Y-axis
            // suggestedMax: 1,
        },
      },
    };
  
    const chartOptions2 = {
      plugins: {
        title: {
          display: true,
          text: 'Problem Ratings', // Chart title
          font: {
            size: 18,
          },
        },
      },
      // scales: {
      //   x: {
      //     title: {
      //       display: true,
      //       text: '', // X-axis label
      //       font: {
      //         size: 14,
      //       },
      //     },
      //   },
      //   y: {
      //     title: {
      //       display: true,
      //       text: '', // Y-axis label
      //       font: {
      //         size: 14,
      //       },
      //     },
      //     suggestedMin: 0, // Minimum value for the Y-axis
      //       // suggestedMax: 1,
      //   },
      // },
    };
  
  
    const createOrUpdateChart = () => {
      const ctx = chartRef.current.getContext('2d'); // Get the 2D context of the canvas
      const ctx1 = chartRef1.current.getContext('2d'); // Get the 2D context of the canvas
      const ctx2 = chartRef2.current.getContext('2d'); // Get the 2D context of the canvas
  
      // Destroy any existing chart instance
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      if (chartRef1.current && chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }
      if (chartRef2.current && chartRef2.current.chart) {
        chartRef2.current.chart.destroy();
      }
  
      // Create a new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });
      chartRef1.current.chart = new Chart(ctx1, {
        type: 'bar',
        data: chartData1,
        options: chartOptions1,
      });
      chartRef2.current.chart = new Chart(ctx2, {
        type: 'pie',
        data: chartData2,
        options: chartOptions2,
      });
    };
  
    useEffect(() => {
      createOrUpdateChart(); // Create or update chart on mount
  
      // Clean up function to destroy the chart on unmount
      return () => {
        if (chartRef.current && chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
        if (chartRef1.current && chartRef1.current.chart) {
          chartRef1.current.chart.destroy();
        }
        if (chartRef2.current && chartRef2.current.chart) {
          chartRef2.current.chart.destroy();
        }
      };
    }, []);
    
  
    return (
      <>
          
  
          <div className='flex justify-center space-x-6 my-10 md:text-base lg:text-xl'>
        <div className=''>
          {/* Current Rating : {data2.result[(data2.result.length-1)]} */}
        </div>
        <div>
        Highest Rating : {data2.result[0].maxRating}
        </div>
        <div>
        Current Rating : {data2.result[0].rating}
        </div>
        <div>
          Current Rank : {data2.result[0].rank}
        </div>
        <div>
          Max Rank : {data2.result[0].maxRank}
        </div>
        </div>
      
          <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div style={{width: '550px', height: '300px'}}>

          <canvas ref={chartRef}></canvas> 
          </div>
          <div style={{width: '550px', height: '300px'}}>
          <canvas ref={chartRef1}></canvas> 
          </div>
        </div>

        <div style={{width: '500px', height: '600px'}} className='flex justify-center w-11/12 h-96 mx-auto my-10'>
          <canvas  ref={chartRef2}></canvas> 
          </div>
        
  
      </>
    )
}

export default CfGraph