import { Hotel } from "../types";

function HotelRow({ hotel }: {hotel: Hotel}) {
    return (
      <tr>
        <td>{hotel.name}</td>
        <td>{hotel.address}</td>
        <td>{hotel.location.lat}, {hotel.location.lon}</td>
      </tr>
    );
}

export default HotelRow