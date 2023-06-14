import { useAppSelector } from "../hooks";
import { Hotel } from "../types";
import HotelRow from "./Hotel";

function HotelTable() {
    
  const hotels = useAppSelector(state => state.hotels.hotels);

  return (
    <div className="h-1/4 overflow-y-auto">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {
            hotels.map((hotel: Hotel): JSX.Element => {
              return <HotelRow hotel={hotel} key={hotel.id} />
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default HotelTable