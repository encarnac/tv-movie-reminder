import React from 'react';
import TableRows from './TableRows';

function TableFrame({rowData}) {



    return (
    <>
          <div class="card m-5">
            <div class="card-body shadow-sm">

              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Reviews</th>
                    <th scope="col">Description</th>
                    <th scope="col">Content</th>
                  </tr>
                </thead>
                <tbody>
                    <TableRows rowData={rowData} />
                </tbody>



              </table>

            </div>
          </div>
    </>
    );
}

export default TableFrame;

