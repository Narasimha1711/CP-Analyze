import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';
import ChefGraph from './ChefGraph';

Chart.register(...registerables);

function Codechef() {
  let d = localStorage.getItem('dat');
  d = JSON.parse(d);
  d = d.data.data2;
  // let source = `https://codechef-api.vercel.app/rating/${d.name}`;
  // let ss = `https://codechef-api.vercel.app/heatmap/${d.name}?theme=day`

  return (
    <>
      {/* Here comes the data of Codechef */}

      {/* <div className='flex justify-center space-x-6 my-10 md:text-base lg:text-xl'>
      <div className=''>
        Current Rating : {d.currentRating}
      </div>
      <div>
      Highest Rating : {d.highestRating}
      </div>
      <div>
        Star : {d.stars}
      </div>
      </div>

      <div className='flex justify-center my-10'>
      <iframe className='w-7/12' height='570px' src= {source}></iframe>
      </div>

      <div className='mx-auto flex justify-center'>
      <iframe className='w-5/12 ' height='500px' src= {ss}></iframe>
      </div> */}
      
      {/* <div style={{ width: '600px', height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div> */}
      
      {d ? <ChefGraph /> : <div className='text-center my-6'>Handle is not submitted</div>}
    </>
  );
}

export default Codechef;
