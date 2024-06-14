import React from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';

const Landings = () => {
  return (
    <LayoutAdmin>
      <h1 class="text-xl font-bold mb-6">Landings</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr className="hover">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
        </tbody>
      </table>
    </LayoutAdmin>
  );
}

export default Landings;
