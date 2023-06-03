
function HotelRow({ hotel }) {
  return (
    <tr>
      <td>{hotel.name}</td>
      <td>{hotel.address}</td>
      <td>{hotel.location.lat}, {hotel.location.lon}</td>
    </tr>
  );
}

function HotelTable({ hotels }) {
  const rows = [];

  hotels.forEach((hotel) => {
    rows.push(
      <HotelRow
        hotel={hotel}
        key={hotel.id} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
    </form>
  );
}

function HotelApp({ hotels }) {
  return (
    <div>
      <SearchBar />
      <HotelTable hotels={hotels} />
    </div>
  );
}

const HOTELS = [
  {"id":1,"name":"Johns-Sauer","address":"3556 Portage Pass","location": {"lat":28.786611,"lon":77.136189}},
  {"id":2,"name":"Kutch, Hyatt and Morissette","address":"29603 Northland Drive","location": {"lat":28.468263,"lon":76.890521}},
  {"id":3,"name":"Wilkinson Inc","address":"277 Manufacturers Street","location": {"lat":28.498421,"lon":77.030328}},
  {"id":4,"name":"Hudson and Sons","address":"00 Grayhawk Park","location": {"lat":28.68445,"lon":77.337308}},
  {"id":5,"name":"Blanda, Cassin and Jaskolski","address":"45 Petterle Junction","location": {"lat":28.823993,"lon":77.478053}},
  {"id":6,"name":"Swaniawski-Feest","address":"94260 1st Lane","location": {"lat":28.798452,"lon":77.364951}},
  {"id":7,"name":"Feil, Bogan and Roberts","address":"917 Beilfuss Hill","location": {"lat":28.666975,"lon":77.450314}},
  {"id":8,"name":"Ryan, Reichel and Wyman","address":"09 Del Sol Avenue","location": {"lat":28.473493,"lon":76.973579}},
  {"id":9,"name":"Prohaska-Nader","address":"71597 Lyons Trail","location": {"lat":28.711042,"lon":77.063294}},
  {"id":10,"name":"Borer Inc","address":"57 Forest Dale Court","location": {"lat":28.834291,"lon":77.427318}}
];

export default function Home() {
  return (
    <HotelApp hotels={HOTELS} />
  )
}